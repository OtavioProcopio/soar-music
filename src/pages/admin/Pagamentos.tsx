import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Pagamento } from '../../types/database'
import { DollarSign, CheckCircle, XCircle, Clock, AlertTriangle, Calendar } from 'lucide-react'

export const AdminPagamentos: React.FC = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPagamentos()
  }, [])

  const loadPagamentos = async () => {
    try {
      setLoading(true)
      const data = await adminService.getPagamentos()
      setPagamentos(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAGO': return 'bg-green-500/10 text-green-500 border-green-500'
      case 'PENDENTE': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500'
      case 'ATRASADO': return 'bg-red-500/10 text-red-500 border-red-500'
      case 'CANCELADO': return 'bg-gray-500/10 text-gray-500 border-gray-500'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAGO': return <CheckCircle className="w-4 h-4" />
      case 'PENDENTE': return <Clock className="w-4 h-4" />
      case 'ATRASADO': return <AlertTriangle className="w-4 h-4" />
      case 'CANCELADO': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
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
          Erro ao carregar pagamentos: {error}
        </div>
      </div>
    )
  }

  const totalArrecadado = pagamentos
    .filter(p => p.status === 'PAGO')
    .reduce((sum, p) => sum + (p.valor_pago || 0), 0)

  const totalPendente = pagamentos
    .filter(p => p.status === 'PENDENTE' || p.status === 'ATRASADO')
    .reduce((sum, p) => sum + (p.valor || 0), 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pagamentos</h1>
          <p className="text-gray-400">Gerenciar pagamentos e mensalidades</p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Arrecadado</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            R$ {totalArrecadado.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Pendente</span>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            R$ {totalPendente.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total de Pagamentos</span>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            {pagamentos.length}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Assinatura</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Valor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Valor Pago</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Multa</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Vencimento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Data Pgto</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-300 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pagamentos.map((pagamento) => (
                <tr key={pagamento.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {pagamento.assinatura?.aluno?.usuario?.nome_completo || 'Sem nome'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {pagamento.assinatura?.plano?.nome}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white">
                      R$ {pagamento.valor.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-500">
                      {pagamento.valor_pago ? `R$ ${pagamento.valor_pago.toFixed(2)}` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {pagamento.multa_aplicada && pagamento.multa_aplicada > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500">
                        <AlertTriangle className="w-3 h-3" />
                        R$ {pagamento.multa_aplicada.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(pagamento.status)}`}>
                      {getStatusIcon(pagamento.status)}
                      {pagamento.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {pagamento.data_pagamento 
                      ? new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {pagamento.status !== 'PAGO' && (
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition">
                          Confirmar
                        </button>
                      )}
                      <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition">
                        Detalhes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagamentos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum pagamento encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
