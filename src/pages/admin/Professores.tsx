import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Professor } from '../../types/database'
import { GraduationCap, Plus, Music, Mail, Phone } from 'lucide-react'

export const AdminProfessores: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProfessores()
  }, [])

  const loadProfessores = async () => {
    try {
      setLoading(true)
      const data = await adminService.getProfessores()
      setProfessores(data)
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
          Erro ao carregar professores: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Professores</h1>
          <p className="text-gray-400">Gerenciar corpo docente</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold">{professores.length} Total</span>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Plus className="w-5 h-5" />
            Novo Professor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professores.map((professor) => (
          <div
            key={professor.id}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {professor.usuario?.nome_completo?.charAt(0) || '?'}
              </div>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-semibold border border-blue-500">
                PROFESSOR
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {professor.usuario?.nome_completo || 'Sem nome'}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                {professor.usuario?.email}
              </div>
              {professor.usuario?.telefone && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4" />
                  {professor.usuario.telefone}
                </div>
              )}
            </div>

            {professor.especialidade && (
              <div className="flex items-center gap-2 mb-4">
                <Music className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">{professor.especialidade}</span>
              </div>
            )}

            {professor.biografia && (
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                {professor.biografia}
              </p>
            )}

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Editar
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition">
                Ver Aulas
              </button>
            </div>
          </div>
        ))}
      </div>

      {professores.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhum professor cadastrado</p>
        </div>
      )}
    </div>
  )
}
