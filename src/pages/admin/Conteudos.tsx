import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Aula, Video, MaterialDidatico } from '../../types/database'
import { Book, PlayCircle, FileText, Plus, Calendar } from 'lucide-react'

type TabType = 'aulas' | 'videos' | 'materiais'

export const AdminConteudos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('aulas')
  const [aulas, setAulas] = useState<Aula[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [materiais, setMateriais] = useState<MaterialDidatico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadConteudos()
  }, [])

  const loadConteudos = async () => {
    try {
      setLoading(true)
      const [aulasData, videosData, materiaisData] = await Promise.all([
        adminService.getAulas(),
        adminService.getVideos(),
        adminService.getMateriais()
      ])
      setAulas(aulasData)
      setVideos(videosData)
      setMateriais(materiaisData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
          Erro ao carregar conteúdos: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Conteúdos</h1>
          <p className="text-gray-400">Gerenciar aulas, vídeos e materiais didáticos</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Plus className="w-5 h-5" />
          Novo Conteúdo
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-900 rounded-xl p-2 border border-gray-800">
        <button
          onClick={() => setActiveTab('aulas')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'aulas'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Book className="w-5 h-5" />
          Aulas ({aulas.length})
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'videos'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <PlayCircle className="w-5 h-5" />
          Vídeos ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab('materiais')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'materiais'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <FileText className="w-5 h-5" />
          Materiais ({materiais.length})
        </button>
      </div>

      {/* Aulas Tab */}
      {activeTab === 'aulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aulas.map((aula) => (
            <div
              key={aula.id}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <Book className="w-6 h-6 text-purple-500" />
                </div>
                {aula.disponivel_premium && (
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-semibold border border-yellow-500">
                    PREMIUM
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{aula.titulo}</h3>
              
              {aula.descricao && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">{aula.descricao}</p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(aula.data_aula).toLocaleDateString('pt-BR')}
                </div>
                {aula.professor?.usuario?.nome_completo && (
                  <div className="text-sm text-gray-400">
                    Prof. {aula.professor.usuario.nome_completo}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  Editar
                </button>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition">
                  Detalhes
                </button>
              </div>
            </div>
          ))}

          {aulas.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">
              <Book className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhuma aula cadastrada</p>
            </div>
          )}
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition"
            >
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-purple-500" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{video.titulo}</h3>
                  {video.disponivel_premium && (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs font-semibold border border-yellow-500">
                      PREMIUM
                    </span>
                  )}
                </div>

                {video.descricao && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{video.descricao}</p>
                )}

                {video.aula?.titulo && (
                  <div className="text-sm text-gray-400 mb-4">
                    Aula: {video.aula.titulo}
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition">
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}

          {videos.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">
              <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum vídeo cadastrado</p>
            </div>
          )}
        </div>
      )}

      {/* Materiais Tab */}
      {activeTab === 'materiais' && (
        <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Título</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Aula</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Acesso</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Data</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {materiais.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-white">{material.titulo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{material.tipo || 'Documento'}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {material.aula?.titulo || '-'}
                    </td>
                    <td className="px-6 py-4">
                      {material.disponivel_premium ? (
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-semibold border border-yellow-500">
                          PREMIUM
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-semibold border border-green-500">
                          PÚBLICO
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(material.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition">
                          Editar
                        </button>
                        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition">
                          Download
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
                <p>Nenhum material didático cadastrado</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
