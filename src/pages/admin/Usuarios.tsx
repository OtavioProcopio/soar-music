import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Usuario } from '../../types/database'
import { Users, Shield, UserCheck, UserX, Mail } from 'lucide-react'

export const AdminUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      setLoading(true)
      const data = await adminService.getUsuarios()
      setUsuarios(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAtivo = async (usuarioId: string, ativoAtual: boolean) => {
    try {
      await adminService.toggleUsuarioAtivo(usuarioId, !ativoAtual)
      await loadUsuarios()
    } catch (err: any) {
      alert('Erro ao atualizar status: ' + err.message)
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'ADMIN': return 'bg-red-500/10 text-red-500 border-red-500'
      case 'PROFESSOR': return 'bg-blue-500/10 text-blue-500 border-blue-500'
      case 'ALUNO': return 'bg-green-500/10 text-green-500 border-green-500'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500'
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
          Erro ao carregar usuários: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usuários</h1>
          <p className="text-gray-400">Gerenciar todos os usuários do sistema</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{usuarios.length} Total</span>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Usuário</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Telefone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Criado em</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {usuario.nome_completo?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-white">{usuario.nome_completo || 'Sem nome'}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {usuario.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getTipoColor(usuario.tipo)}`}>
                      <Shield className="w-3 h-3" />
                      {usuario.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{usuario.telefone || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    {usuario.ativo ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500">
                        <UserCheck className="w-3 h-3" />
                        ATIVO
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500">
                        <UserX className="w-3 h-3" />
                        INATIVO
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(usuario.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggleAtivo(usuario.id, usuario.ativo)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          usuario.ativo
                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        }`}
                      >
                        {usuario.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuarios.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum usuário encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
