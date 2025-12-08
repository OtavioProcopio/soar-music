import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Assinatura } from '../../types/database'
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, Filter } from 'lucide-react'

export const AdminAssinaturas: React.FC = () => {
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<string>('TODOS')

  useEffect(() => {
    loadAssinaturas()
  }, [])

  const loadAssinaturas = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAssinaturas()
      setAssinaturas(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ATIVA': return 'bg-green-500/10 text-green-500 border-green-500'
      case 'INATIVA': return 'bg-red-500/10 text-red-500 border-red-500'
      case 'PENDENTE': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500'
      case 'CANCELADA': return 'bg-gray-500/10 text-gray-500 border-gray-500'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ATIVA': return <CheckCircle className="w-4 h-4" />
      case 'INATIVA': return <XCircle className="w-4 h-4" />
      case 'PENDENTE': return <Clock className="w-4 h-4" />
      case 'CANCELADA': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const assinaturasFiltradas = filtroStatus === 'TODOS' 
    ? assinaturas 
    : assinaturas.filter(a => a.status === filtroStatus)

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
          Erro ao carregar assinaturas: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Assinaturas</h1>
          <p className="text-gray-400">Gerenciar assinaturas de planos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
            <CreditCard className="w-5 h-5" />
            <span className="font-semibold">{assinaturasFiltradas.length} Total</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filtrar por status:</span>
          </div>
          <div className="flex gap-2">
            {['TODOS', 'ATIVA', 'INATIVA', 'PENDENTE', 'CANCELADA'].map(status => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filtroStatus === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Aluno</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Plano</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Fidelidade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Vencimento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Duração</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Início</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {assinaturasFiltradas.map((assinatura) => (
                <tr key={assinatura.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {assinatura.aluno?.usuario?.nome_completo?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {assinatura.aluno?.usuario?.nome_completo || 'Sem nome'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {assinatura.aluno?.usuario?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{assinatura.plano?.nome}</div>
                    <div className="text-sm text-gray-400">
                      R$ {assinatura.plano?.valor_mensal?.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(assinatura.status)}`}>
                      {getStatusIcon(assinatura.status)}
                      {assinatura.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {assinatura.fidelidade ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-500 border border-purple-500">
                        <CheckCircle className="w-3 h-3" />
                        COM FIDELIDADE
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Sem fidelidade</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      Dia {assinatura.dia_vencimento}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {assinatura.duracao_meses} meses
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(assinatura.data_inicio).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition">
                        Detalhes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {assinaturasFiltradas.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhuma assinatura encontrada
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
