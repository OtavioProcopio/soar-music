import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Pagamento, Assinatura } from '../../types/database'
import { DollarSign, TrendingUp, Calendar, FileText, Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export const AdminRelatorios: React.FC = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [assinaturas, setAssinaturas] = useState<Assinatura[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mesAtual] = useState(new Date().getMonth() + 1)
  const [anoAtual] = useState(new Date().getFullYear())

  useEffect(() => {
    loadDados()
  }, [])

  const loadDados = async () => {
    try {
      setLoading(true)
      const [pagamentosData, assinaturasData] = await Promise.all([
        adminService.getPagamentos(),
        adminService.getAssinaturas()
      ])
      setPagamentos(pagamentosData)
      setAssinaturas(assinaturasData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Cálculos financeiros
  const faturamentoMes = pagamentos
    .filter(p => {
      const data = new Date(p.data_vencimento)
      return p.status === 'PAGO' && data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual
    })
    .reduce((sum, p) => sum + (p.valor_pago || 0), 0)

  const receitaPrevista = pagamentos
    .filter(p => {
      const data = new Date(p.data_vencimento)
      return data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual
    })
    .reduce((sum, p) => sum + p.valor, 0)

  const inadimplencia = pagamentos
    .filter(p => p.status === 'ATRASADO')
    .reduce((sum, p) => sum + p.valor, 0)

  const multasAplicadas = pagamentos
    .filter(p => p.multa_aplicada && p.multa_aplicada > 0)
    .reduce((sum, p) => sum + (p.multa_aplicada || 0), 0)

  // Dados para gráficos
  const faturamentoPorMes = Array.from({ length: 6 }, (_, i) => {
    const mes = mesAtual - 5 + i
    const mesAjustado = mes <= 0 ? mes + 12 : mes
    const anoAjustado = mes <= 0 ? anoAtual - 1 : anoAtual

    const total = pagamentos
      .filter(p => {
        const data = new Date(p.data_vencimento)
        return p.status === 'PAGO' && data.getMonth() + 1 === mesAjustado && data.getFullYear() === anoAjustado
      })
      .reduce((sum, p) => sum + (p.valor_pago || 0), 0)

    return {
      mes: new Date(anoAjustado, mesAjustado - 1).toLocaleDateString('pt-BR', { month: 'short' }),
      valor: total
    }
  })

  const statusAssinaturas = [
    { name: 'Ativas', value: assinaturas.filter(a => a.status === 'ATIVA').length },
    { name: 'Inativas', value: assinaturas.filter(a => a.status === 'INATIVA').length },
    { name: 'Pendentes', value: assinaturas.filter(a => a.status === 'PENDENTE').length },
    { name: 'Canceladas', value: assinaturas.filter(a => a.status === 'CANCELADA').length }
  ]

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6b7280']

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
          Erro ao carregar relatórios: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Relatórios Financeiros</h1>
          <p className="text-gray-400">Análise de receita e desempenho</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Faturamento Mês</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            R$ {faturamentoMes.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Receita Prevista</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            R$ {receitaPrevista.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Meta do mês atual
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Inadimplência</span>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-400">
            R$ {inadimplencia.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Pagamentos em atraso
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Multas Aplicadas</span>
            <FileText className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-white">
            R$ {multasAplicadas.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Total de multas
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Faturamento */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Faturamento Últimos 6 Meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={faturamentoPorMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="mes" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="valor" fill="#8b5cf6" name="Faturamento (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Status de Assinaturas */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Status de Assinaturas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusAssinaturas}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusAssinaturas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Indicadores */}
      <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Indicadores de Desempenho</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Taxa de Conversão</p>
            <p className="text-2xl font-bold text-purple-500">
              {receitaPrevista > 0 ? ((faturamentoMes / receitaPrevista) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Ticket Médio</p>
            <p className="text-2xl font-bold text-purple-500">
              R$ {assinaturas.length > 0 ? (faturamentoMes / assinaturas.filter(a => a.status === 'ATIVA').length).toFixed(2) : '0.00'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Taxa de Inadimplência</p>
            <p className="text-2xl font-bold text-red-400">
              {receitaPrevista > 0 ? ((inadimplencia / receitaPrevista) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
