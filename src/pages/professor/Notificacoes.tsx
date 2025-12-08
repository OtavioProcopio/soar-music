import React, { useEffect, useState } from 'react'
import { professorService } from '../../services/professor.service'
import { Bell, AlertCircle, Info, TrendingUp } from 'lucide-react'

export const ProfessorNotificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadNotificacoes()
  }, [])

  const loadNotificacoes = async () => {
    try {
      setLoading(true)
      const data = await professorService.getNotificacoes()
      setNotificacoes(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'ALERTA': return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'INFO': return <Info className="w-5 h-5 text-blue-500" />
      case 'FINANCEIRO': return <TrendingUp className="w-5 h-5 text-green-500" />
      default: return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'ALERTA': return 'bg-red-500/10 border-red-500/50'
      case 'INFO': return 'bg-blue-500/10 border-blue-500/50'
      case 'FINANCEIRO': return 'bg-green-500/10 border-green-500/50'
      default: return 'bg-gray-500/10 border-gray-500/50'
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Notificações</h1>
        <p className="text-gray-400">Avisos e atualizações importantes</p>
      </div>

      <div className="space-y-4">
        {notificacoes.map((notif) => (
          <div
            key={notif.id}
            className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border ${getTipoColor(notif.tipo)}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getTipoIcon(notif.tipo)}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{notif.titulo}</h3>
                <p className="text-gray-400 text-sm mb-2">{notif.mensagem}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(notif.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        ))}

        {notificacoes.length === 0 && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 border border-gray-800 text-center">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma notificação no momento</p>
          </div>
        )}
      </div>
    </div>
  )
}
