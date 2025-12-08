import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { DashboardStats } from '../../types/database'
import { Users, GraduationCap, CreditCard, TrendingUp, AlertCircle, Calendar } from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
    </div>
  }

  const cards = [
    {
      title: 'Total de Alunos',
      value: stats?.total_alunos || 0,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: 'Total de Professores',
      value: stats?.total_professores || 0,
      icon: GraduationCap,
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      title: 'Assinaturas Ativas',
      value: stats?.total_assinaturas_ativas || 0,
      icon: Calendar,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    },
    {
      title: 'Presenciais',
      value: stats?.total_presenciais || 0,
      icon: Users,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-500'
    },
    {
      title: 'Premium Digital',
      value: stats?.total_premium_digital || 0,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      title: 'Faturamento Mês',
      value: `R$ ${stats?.faturamento_mes.toFixed(2) || '0.00'}`,
      icon: CreditCard,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    },
    {
      title: 'Inadimplentes',
      value: stats?.total_inadimplentes || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
      textColor: 'text-red-500'
    },
    {
      title: 'Vagas Ocupadas',
      value: stats?.vagas_ocupadas_total || 0,
      icon: Users,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500'
    }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black text-brand-soar">Dashboard Admin</h1>
        <p className="text-slate-500 mt-2">Visão geral da plataforma Soar Music Studios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color} bg-opacity-10`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Assinaturas por Plano</h2>
          <p className="text-slate-500">Gráfico será implementado com Recharts</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Receita Mensal</h2>
          <p className="text-slate-500">Gráfico de linha com evolução mensal</p>
        </div>
      </div>
    </div>
  )
}
