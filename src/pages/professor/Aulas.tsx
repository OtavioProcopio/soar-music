import React, { useEffect, useState } from 'react'
import { professorService, AulaConteudo } from '../../services/professor.service'
import { BookOpen, Plus, Edit, Eye, Youtube, FileText, X, Trash2 } from 'lucide-react'

export const ProfessorAulas: React.FC = () => {
  const [aulas, setAulas] = useState<AulaConteudo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    youtube_url: '',
    gratuita: false,
    visibilidade: 'PUBLICO' as 'PLANO' | 'ALUNO' | 'PUBLICO',
    plano_id: '',
    aluno_id: ''
  })

  useEffect(() => {
    loadAulas()
  }, [])

  const loadAulas = async () => {
    try {
      setLoading(true)
      const data = await professorService.getMinhasAulas()
      setAulas(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDesativar = async (id: string) => {
    if (!confirm('Deseja realmente desativar esta aula?')) return
    
    try {
      await professorService.desativarAula(id)
      await loadAulas()
    } catch (err: any) {
      alert('Erro: ' + err.message)
    }
  }

  const validateYoutubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return ''
    let videoId = ''
    if (url.includes('youtu.be')) {
      videoId = url.split('/').pop() || ''
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0]
    }
    return `https://www.youtube.com/embed/${videoId}`
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.youtube_url || !validateYoutubeUrl(formData.youtube_url)) {
      alert('Por favor, insira uma URL válida do YouTube (youtube.com ou youtu.be)')
      return
    }

    try {
      setSaving(true)
      await professorService.criarAula({
        titulo: formData.titulo,
        descricao: formData.descricao,
        youtube_url: formData.youtube_url,
        gratuita: formData.gratuita,
        visibilidade: formData.visibilidade,
        plano_id: formData.plano_id || null,
        aluno_id: formData.aluno_id || null
      })
      
      setShowModal(false)
      setFormData({
        titulo: '',
        descricao: '',
        youtube_url: '',
        gratuita: false,
        visibilidade: 'PUBLICO',
        plano_id: '',
        aluno_id: ''
      })
      await loadAulas()
    } catch (err: any) {
      alert('Erro ao salvar aula: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Minhas Aulas</h1>
          <p className="text-gray-400">Conteúdo digital criado por você</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Nova Aula
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition flex flex-col"
          >
            {/* Video Player */}
            <div className="aspect-video bg-black">
              {aula.youtube_url ? (
                <iframe
                  src={getYoutubeEmbedUrl(aula.youtube_url)}
                  title={aula.titulo}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Youtube className="w-16 h-16 text-gray-700" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white flex-1">{aula.titulo}</h3>
                {aula.gratuita && (
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-semibold border border-green-500 ml-2">
                    GRÁTIS
                  </span>
                )}
              </div>

              {aula.descricao && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{aula.descricao}</p>
              )}

              {/* Visibilidade */}
              <div className="space-y-2 mb-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>
                    {aula.visibilidade === 'PLANO' && `Plano: ${aula.plano?.nome || 'N/A'}`}
                    {aula.visibilidade === 'ALUNO' && `Aluno: ${aula.aluno?.usuario?.nome_completo || 'N/A'}`}
                    {aula.visibilidade === 'PUBLICO' && 'Público'}
                  </span>
                </div>

                {aula.materiais_count !== undefined && aula.materiais_count > 0 && (
                  <div className="flex items-center gap-2 text-sm text-purple-400">
                    <FileText className="w-4 h-4" />
                    <span>{aula.materiais_count} material(is) anexado(s)</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-auto">
                <button 
                  onClick={() => handleDesativar(aula.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  title="Desativar aula"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {aulas.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhuma aula criada ainda</p>
        </div>
      )}

      {/* Modal Nova Aula */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Nova Aula</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Título</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.titulo}
                  onChange={e => setFormData({...formData, titulo: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Descrição</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  value={formData.descricao}
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Link do YouTube (Obrigatório)</label>
                <input
                  type="url"
                  required
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.youtube_url}
                  onChange={e => setFormData({...formData, youtube_url: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Cole o link completo do vídeo</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="gratuita"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                  checked={formData.gratuita}
                  onChange={e => setFormData({...formData, gratuita: e.target.checked})}
                />
                <label htmlFor="gratuita" className="text-sm text-gray-300">Aula Gratuita (visível para todos)</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Visibilidade</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.visibilidade}
                  onChange={e => setFormData({...formData, visibilidade: e.target.value as any})}
                >
                  <option value="PUBLICO">Público (Todos)</option>
                  <option value="PLANO">Por Plano</option>
                  <option value="ALUNO">Por Aluno Específico</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Salvando...' : 'Salvar Aula'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
