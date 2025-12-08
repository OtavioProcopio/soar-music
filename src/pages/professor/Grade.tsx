import React, { useEffect, useState } from 'react'
import { professorService, GradeAluno } from '../../services/professor.service'
import { Calendar, Plus, Edit, Trash2, Clock } from 'lucide-react'

export const ProfessorGrade: React.FC = () => {
  const [grade, setGrade] = useState<GradeAluno[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadGrade()
  }, [])

  const loadGrade = async () => {
    try {
      setLoading(true)
      const data = await professorService.getGradeAlunos()
      setGrade(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDesativar = async (id: string) => {
    if (!confirm('Deseja realmente desativar este horário?')) return
    
    try {
      await professorService.desativarHorarioGrade(id)
      await loadGrade()
    } catch (err: any) {
      alert('Erro: ' + err.message)
    }
  }

  const diasSemana = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO']

  const gradeOrganizada = diasSemana.map(dia => ({
    dia,
    horarios: grade.filter(h => h.dia_semana === dia && h.ativo)
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Grade de Horários</h1>
          <p className="text-gray-400">Gerenciar horários fixos dos alunos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Novo Horário
        </button>
      </div>

      <div className="space-y-6">
        {gradeOrganizada.map(({ dia, horarios }) => (
          <div key={dia} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              {dia}
            </h3>

            {horarios.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum horário agendado</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {horarios.map((horario) => (
                  <div
                    key={horario.id}
                    className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-semibold">
                          {horario.hora_inicio} - {horario.hora_fim}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDesativar(horario.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <p className="text-white font-medium">
                        {horario.aluno?.usuario?.nome_completo || 'Aluno'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {horario.plano?.nome || 'Plano'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Novo Horário */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-gray-900 rounded-xl w-full max-w-md shadow-2xl relative border border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Novo Horário</h3>
            <p className="text-gray-400 mb-4">
              Funcionalidade de criação será implementada com formulário completo.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
