import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Plano } from '../../types/database'
import { Users, AlertCircle, TrendingUp, Music } from 'lucide-react'

export const AdminVagas: React.FC = () => {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPlanos()
  }, [])

  const loadPlanos = async () => {
    try {
      setLoading(true)
      const data = await adminService.getPlanos()
      setPlanos(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getOcupacaoPercentual = (ocupadas: number, max: number | null) => {
    if (!max || max === 0) return 0
    return (ocupadas / max) * 100
  }

  const getOcupacaoColor = (percentual: number) => {
    if (percentual >= 90) return 'text-red-500'
    if (percentual >= 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getProgressBarColor = (percentual: number) => {
    if (percentual >= 90) return 'bg-red-500'
    if (percentual >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const totalVagas = planos.reduce((sum, p) => sum + (p.vagas_max || 0), 0)
  const totalOcupadas = planos.reduce((sum, p) => sum + (p.vagas_ocupadas || 0), 0)
  const totalDisponiveis = totalVagas - totalOcupadas
  const percentualGeral = totalVagas > 0 ? (totalOcupadas / totalVagas) * 100 : 0

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
          Erro ao carregar vagas: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Controle de Vagas</h1>
        <p className="text-gray-400">Acompanhar ocupação de vagas por plano</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total de Vagas</span>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-white">{totalVagas}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Vagas Ocupadas</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-white">{totalOcupadas}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Vagas Disponíveis</span>
            <Music className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">{totalDisponiveis}</div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Taxa de Ocupação</span>
            <AlertCircle className={`w-5 h-5 ${getOcupacaoColor(percentualGeral)}`} />
          </div>
          <div className={`text-3xl font-bold ${getOcupacaoColor(percentualGeral)}`}>
            {percentualGeral.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Lista de Planos */}
      <div className="space-y-4">
        {planos.map((plano) => {
          const percentual = getOcupacaoPercentual(plano.vagas_ocupadas || 0, plano.vagas_max)
          const disponiveisPlano = (plano.vagas_max || 0) - (plano.vagas_ocupadas || 0)

          return (
            <div
              key={plano.id}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Music className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plano.nome}</h3>
                    <p className="text-sm text-gray-400">{plano.tipo}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-2xl font-bold ${getOcupacaoColor(percentual)}`}>
                      {plano.vagas_ocupadas || 0}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-2xl font-bold text-gray-300">
                      {plano.vagas_max || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {disponiveisPlano} {disponiveisPlano === 1 ? 'vaga disponível' : 'vagas disponíveis'}
                  </p>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="relative">
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressBarColor(percentual)} transition-all duration-300`}
                    style={{ width: `${percentual}%` }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow-lg">
                    {percentual.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Alertas */}
              {percentual >= 90 && (
                <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Atenção! Vagas quase esgotadas para este plano
                  </span>
                </div>
              )}
              {percentual >= 70 && percentual < 90 && (
                <div className="mt-4 bg-yellow-500/10 border border-yellow-500 text-yellow-500 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Alerta: Poucas vagas restantes
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {planos.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhum plano cadastrado</p>
        </div>
      )}
    </div>
  )
}
