import React, { useEffect, useState } from 'react'
import { professorService, AlunoDoProf } from '../../services/professor.service'
import { Users, Mail, Phone, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'

export const ProfessorAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState<AlunoDoProf[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAlunos()
  }, [])

  const loadAlunos = async () => {
    try {
      setLoading(true)
      const data = await professorService.getMeusAlunos()
      setAlunos(data)
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
          Erro ao carregar alunos: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Meus Alunos</h1>
          <p className="text-gray-400">Alunos vinculados a você</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
          <Users className="w-5 h-5" />
          <span className="font-semibold">{alunos.length} Total</span>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Aluno</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Plano</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Situação</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Horário</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase">Contato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {aluno.nome_completo?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="font-medium text-white">{aluno.nome_completo}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {aluno.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300">{aluno.plano_nome || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                      aluno.tipo_aluno === 'PRESENCIAL'
                        ? 'bg-green-500/10 text-green-500 border-green-500'
                        : aluno.tipo_aluno === 'PREMIUM_DIGITAL'
                        ? 'bg-purple-500/10 text-purple-500 border-purple-500'
                        : 'bg-gray-500/10 text-gray-500 border-gray-500'
                    }`}>
                      {aluno.tipo_aluno}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {aluno.inadimplente ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500">
                        <AlertCircle className="w-3 h-3" />
                        INADIMPLENTE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500">
                        <CheckCircle className="w-3 h-3" />
                        EM DIA
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {aluno.dia_aula && aluno.horario ? (
                      <div>
                        <div className="font-medium">{aluno.dia_aula}</div>
                        <div className="text-sm text-gray-500">{aluno.horario}</div>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {aluno.telefone && (
                      <a
                        href={`tel:${aluno.telefone}`}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                      >
                        <Phone className="w-4 h-4" />
                        {aluno.telefone}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {alunos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum aluno vinculado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
