import React, { useEffect, useState } from 'react'
import { professorService, DashboardProfessor } from '../../services/professor.service'
import { Users, Calendar, BookOpen, AlertCircle, Clock, TrendingUp } from 'lucide-react'

export const ProfessorDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardProfessor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const data = await professorService.getDashboardStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
          Erro ao carregar dashboard: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Visão geral do seu trabalho</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total de Alunos Ativos</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalAlunosAtivos || 0}</div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Alunos Presenciais</span>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalAlunosPresenciais || 0}</div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Alunos Premium Digital</span>
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalAlunosPremium || 0}</div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total de Aulas Criadas</span>
            <BookOpen className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalAulas || 0}</div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Horários Ativos na Grade</span>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-white">{stats?.totalHorariosAtivos || 0}</div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Alunos Inadimplentes</span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-400">{stats?.alunosInadimplentes || 0}</div>
          <p className="text-xs text-gray-500 mt-1">Apenas visualização</p>
        </div>
      </div>

      {/* Alertas */}
      {stats && stats.alunosInadimplentes > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Atenção!</p>
            <p className="text-sm">
              Você tem {stats.alunosInadimplentes} aluno(s) com pagamento em atraso. 
              O financeiro já foi notificado automaticamente.
            </p>
          </div>
        </div>
      )}

      {/* Aulas do Dia */}
      {stats && stats.aulasDoDia.length > 0 && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-500" />
            Aulas de Hoje
          </h2>
          <div className="space-y-3">
            {stats.aulasDoDia.map((aula: any) => (
              <div
                key={aula.id}
                className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">
                    {aula.aluno?.usuario?.nome_completo || 'Aluno'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {aula.hora_inicio} - {aula.hora_fim}
                  </p>
                </div>
                {aula.aluno?.usuario?.telefone && (
                  <a
                    href={`tel:${aula.aluno.usuario.telefone}`}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    {aula.aluno.usuario.telefone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {stats && stats.aulasDoDia.length === 0 && (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Nenhuma aula agendada para hoje</p>
        </div>
      )}
    </div>
  )
}
