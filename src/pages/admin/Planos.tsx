import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Plano } from '../../types/database'
import { Plus, Edit, Trash2, Users } from 'lucide-react'

export const AdminPlanos: React.FC = () => {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPlanos()
  }, [])

  const loadPlanos = async () => {
    try {
      const data = await adminService.getPlanos()
      setPlanos(data)
    } catch (error) {
      console.error('Erro ao carregar planos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-brand-soar">Gestão de Planos</h1>
          <p className="text-slate-500 mt-2">Total: {planos.length} planos cadastrados</p>
        </div>
        <button className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2">
          <Plus className="w-5 h-5" /> Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">{plano.nome}</h3>
              {plano.nome === 'Premium Digital Soar' && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">DIGITAL</span>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Tipo:</span> {plano.tipo}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Valor:</span> R$ {plano.valor_mensal}
              </p>
              {plano.valor_com_contrato && (
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Com contrato:</span> R$ {plano.valor_com_contrato}
                </p>
              )}
              {plano.vagas_max && (
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">Vagas:</span> {plano.vagas_ocupadas}/{plano.vagas_max}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              {plano.usa_agenda && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Agenda</span>}
              {plano.tem_oficinas && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Oficinas</span>}
              {plano.tem_estudio && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Estúdio</span>}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition font-semibold text-sm flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
