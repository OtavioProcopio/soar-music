import React, { useEffect, useState } from 'react'
import { professorService, MaterialDidatico } from '../../services/professor.service'
import { FileText, Upload, Download, Trash2, File } from 'lucide-react'

export const ProfessorMateriais: React.FC = () => {
  const [materiais, setMateriais] = useState<MaterialDidatico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadMateriais()
  }, [])

  const loadMateriais = async () => {
    try {
      setLoading(true)
      const data = await professorService.getMateriais()
      setMateriais(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      await professorService.uploadMaterial(file, null, 'PDF')
      await loadMateriais()
    } catch (err: any) {
      alert('Erro ao fazer upload: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDesativar = async (id: string) => {
    if (!confirm('Deseja realmente desativar este material?')) return
    
    try {
      await professorService.desativarMaterial(id)
      await loadMateriais()
    } catch (err: any) {
      alert('Erro: ' + err.message)
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'PDF': return 'bg-red-500/10 text-red-500 border-red-500'
      case 'TABLATURE': return 'bg-blue-500/10 text-blue-500 border-blue-500'
      case 'AUDIO': return 'bg-green-500/10 text-green-500 border-green-500'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500'
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
          <h1 className="text-3xl font-bold text-white mb-2">Materiais Didáticos</h1>
          <p className="text-gray-400">Arquivos para suas aulas</p>
        </div>
        <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer">
          <Upload className="w-5 h-5" />
          {uploading ? 'Enviando...' : 'Upload Material'}
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            accept=".pdf,.mp3,.wav,.gp,.gpx,.txt"
          />
        </label>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Material</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Aula Vinculada</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Data</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {materiais.map((material) => (
                <tr key={material.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-white">{material.titulo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getTipoColor(material.tipo)}`}>
                      {material.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {material.aula?.titulo || 'Sem vínculo'}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(material.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <button
                        onClick={() => handleDesativar(material.id)}
                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {materiais.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum material enviado ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
