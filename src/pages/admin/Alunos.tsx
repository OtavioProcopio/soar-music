import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { Aluno } from '../../types/database'
import { User, Check, X, Calendar, CreditCard } from 'lucide-react'

export const AdminAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAlunos()
  }, [])

  const loadAlunos = async () => {
    try {
      const data = await adminService.getAlunos()
      setAlunos(data)
    } catch (error) {
      console.error('Erro ao carregar alunos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-brand-soar">Gestão de Alunos</h1>
          <p className="text-slate-500 mt-2">Total: {alunos.length} alunos cadastrados</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Aluno</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Plano</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Tipo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alunos.map((aluno) => {
              const assinaturaAtiva = aluno.assinaturas?.find(a => a.status === 'ATIVA')
              const planoAtual = assinaturaAtiva?.plano

              return (
                <tr key={aluno.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{aluno.usuario?.nome}</p>
                        <p className="text-xs text-slate-500">ID: {aluno.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{aluno.usuario?.email}</td>
                  <td className="px-6 py-4">
                    {planoAtual ? (
                      <div>
                        <p className="font-semibold text-slate-800">{planoAtual.nome}</p>
                        <p className="text-xs text-slate-500">R$ {planoAtual.valor_mensal}</p>
                      </div>
                    ) : (
                      <span className="text-slate-400">Sem plano</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {assinaturaAtiva ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        ATIVA
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        INATIVA
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {aluno.presencial && (
                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">
                          Presencial
                        </span>
                      )}
                      {aluno.online && (
                        <span className="px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700">
                          Online
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition">
                        <CreditCard className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
