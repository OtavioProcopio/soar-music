import { supabase } from './supabase'

export interface DashboardProfessor {
  totalAlunosAtivos: number
  totalAlunosPresenciais: number
  totalAlunosPremium: number
  totalAulas: number
  totalHorariosAtivos: number
  alunosInadimplentes: number
  aulasDoDia: any[]
}

export interface AlunoDoProf {
  id: string
  nome_completo: string
  email: string
  tipo_aluno: 'FREE' | 'PRESENCIAL' | 'PREMIUM_DIGITAL'
  plano_nome: string | null
  inadimplente: boolean
  dia_aula: string | null
  horario: string | null
  telefone: string | null
}

export interface GradeAluno {
  id: string
  aluno_id: string
  plano_id: string
  professor_id: string
  dia_semana: string
  hora_inicio: string
  hora_fim: string
  ativo: boolean
  aluno?: {
    usuario: {
      nome_completo: string
      email: string
    }
  }
  plano?: {
    nome: string
  }
}

export interface AulaConteudo {
  id: string
  titulo: string
  descricao: string | null
  youtube_url: string | null
  gratuita: boolean
  visibilidade: 'PLANO' | 'ALUNO' | 'PUBLICO'
  plano_id: string | null
  aluno_id: string | null
  professor_id: string
  ativo: boolean
  created_at: string
  plano?: {
    nome: string
  }
  aluno?: {
    usuario: {
      nome_completo: string
    }
  }
  materiais_count?: number
}

export interface MaterialDidatico {
  id: string
  titulo: string
  tipo: 'PDF' | 'TABLATURE' | 'AUDIO' | 'OUTRO'
  url: string
  aula_id: string | null
  professor_id: string
  ativo: boolean
  created_at: string
  aula?: {
    titulo: string
  }
}

class ProfessorService {
  private async getProfessorId(userId: string): Promise<string> {
    const { data, error } = await supabase
      .from('professores')
      .select('id')
      .eq('usuario_id', userId)
      .single()
    
    if (error || !data) throw new Error('Professor não encontrado')
    return data.id
  }

  async getDashboardStats(): Promise<DashboardProfessor> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    // Total de alunos ativos na grade
    const { count: alunosGrade } = await supabase
      .from('grade_aluno')
      .select('aluno_id', { count: 'exact', head: true })
      .eq('professor_id', professorId)
      .eq('ativo', true)

    // Total de alunos presenciais (com plano presencial)
    const { data: alunosPresenciais } = await supabase
      .from('grade_aluno')
      .select(`
        aluno_id,
        plano:planos!inner(usa_agenda)
      `)
      .eq('professor_id', professorId)
      .eq('ativo', true)
      .eq('planos.usa_agenda', true)

    // Total de alunos premium digital (sem grade, mas com acesso a aulas do professor)
    const { data: alunosPremium } = await supabase
      .from('assinaturas')
      .select(`
        aluno_id,
        plano:planos!inner(nome)
      `)
      .eq('status', 'ATIVA')
      .eq('planos.nome', 'Premium Digital Soar')

    // Total de aulas criadas
    const { count: totalAulas } = await supabase
      .from('aulas')
      .select('*', { count: 'exact', head: true })
      .eq('professor_id', professorId)
      .eq('ativo', true)

    // Total de horários ativos na grade
    const { count: totalHorarios } = await supabase
      .from('grade_aluno')
      .select('*', { count: 'exact', head: true })
      .eq('professor_id', professorId)
      .eq('ativo', true)

    // Alunos inadimplentes
    const { data: inadimplentes } = await supabase
      .from('grade_aluno')
      .select(`
        aluno_id,
        aluno:alunos!inner(
          assinaturas!inner(
            pagamentos!inner(status)
          )
        )
      `)
      .eq('professor_id', professorId)
      .eq('ativo', true)
      .eq('alunos.assinaturas.pagamentos.status', 'ATRASADO')

    // Aulas de hoje
    const diasMap: {[key: string]: string} = {
      'segunda': 'SEGUNDA', 'terça': 'TERCA', 'quarta': 'QUARTA', 
      'quinta': 'QUINTA', 'sexta': 'SEXTA', 'sábado': 'SABADO', 'domingo': 'DOMINGO'
    }
    const diaSemanaEnum = diasMap[new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase().split('-')[0]] || 'SEGUNDA'

    const { data: aulasDoDia } = await supabase
      .from('grade_aluno')
      .select(`
        *,
        aluno:alunos!inner(
          usuario:usuarios(nome_completo, telefone)
        )
      `)
      .eq('professor_id', professorId)
      .eq('dia_semana', diaSemanaEnum)
      .eq('ativo', true)

    return {
      totalAlunosAtivos: alunosGrade || 0,
      totalAlunosPresenciais: alunosPresenciais?.length || 0,
      totalAlunosPremium: alunosPremium?.length || 0,
      totalAulas: totalAulas || 0,
      totalHorariosAtivos: totalHorarios || 0,
      alunosInadimplentes: inadimplentes?.length || 0,
      aulasDoDia: aulasDoDia || []
    }
  }

  async getMeusAlunos(): Promise<AlunoDoProf[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    const { data, error } = await supabase
      .from('grade_aluno')
      .select(`
        *,
        aluno:alunos!inner(
          usuario:usuarios!inner(id, nome_completo, email, telefone),
          assinaturas(
            status,
            plano:planos(nome),
            pagamentos(status)
          )
        )
      `)
      .eq('professor_id', professorId)
      .eq('ativo', true)

    if (error) throw error

    // Deduplicar alunos (um aluno pode ter várias aulas na grade)
    const alunosMap = new Map()
    
    data.forEach((item: any) => {
      if (!alunosMap.has(item.aluno.usuario.id)) {
        alunosMap.set(item.aluno.usuario.id, {
          id: item.aluno.usuario.id,
          nome_completo: item.aluno.usuario.nome_completo,
          email: item.aluno.usuario.email,
          telefone: item.aluno.usuario.telefone,
          tipo_aluno: 'PRESENCIAL' as const,
          plano_nome: item.aluno.assinaturas?.[0]?.plano?.nome,
          inadimplente: item.aluno.assinaturas?.[0]?.pagamentos?.some((p: any) => p.status === 'ATRASADO') || false,
          dia_aula: item.dia_semana,
          horario: `${item.hora_inicio} - ${item.hora_fim}`
        })
      }
    })

    return Array.from(alunosMap.values())
  }

  async getGradeAlunos(): Promise<GradeAluno[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    const { data, error } = await supabase
      .from('grade_aluno')
      .select(`
        *,
        aluno:alunos!inner(
          usuario:usuarios(nome_completo, email)
        ),
        plano:planos(nome, usa_agenda)
      `)
      .eq('professor_id', professorId)
      .order('dia_semana', { ascending: true })
      .order('hora_inicio', { ascending: true })

    if (error) throw error
    return data || []
  }

  async criarHorarioGrade(data: {
    aluno_id: string
    plano_id: string
    dia_semana: string
    hora_inicio: string
    hora_fim: string
  }): Promise<GradeAluno> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    // Verificar se o plano usa agenda
    const { data: plano } = await supabase
      .from('planos')
      .select('usa_agenda')
      .eq('id', data.plano_id)
      .single()

    if (!plano?.usa_agenda) {
      throw new Error('Este plano não usa agenda fixa')
    }

    // Verificar conflito de horário
    const { data: conflito } = await supabase
      .from('grade_aluno')
      .select('id')
      .eq('professor_id', professorId)
      .eq('dia_semana', data.dia_semana)
      .eq('ativo', true)
      .or(`and(hora_inicio.lte.${data.hora_inicio},hora_fim.gt.${data.hora_inicio}),and(hora_inicio.lt.${data.hora_fim},hora_fim.gte.${data.hora_fim})`)

    if (conflito && conflito.length > 0) {
      throw new Error('Conflito de horário detectado')
    }

    const { data: novoHorario, error } = await supabase
      .from('grade_aluno')
      .insert({
        ...data,
        professor_id: professorId,
        ativo: true
      })
      .select()
      .single()

    if (error) throw error
    return novoHorario
  }

  async atualizarHorarioGrade(id: string, data: {
    dia_semana?: string
    hora_inicio?: string
    hora_fim?: string
  }): Promise<GradeAluno> {
    const { data: horario, error } = await supabase
      .from('grade_aluno')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return horario
  }

  async desativarHorarioGrade(id: string): Promise<void> {
    const { error } = await supabase
      .from('grade_aluno')
      .update({ ativo: false })
      .eq('id', id)

    if (error) throw error
  }

  async getMinhasAulas(): Promise<AulaConteudo[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    const { data, error } = await supabase
      .from('aulas')
      .select(`
        *,
        plano:planos(nome),
        aluno:alunos(
          usuario:usuarios(nome_completo)
        )
      `)
      .eq('professor_id', professorId)
      .eq('ativo', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Contar materiais por aula
    const aulasComMateriais = await Promise.all(
      (data || []).map(async (aula) => {
        const { count } = await supabase
          .from('materiais_didaticos')
          .select('*', { count: 'exact', head: true })
          .eq('aula_id', aula.id)
          .eq('ativo', true)

        return {
          ...aula,
          materiais_count: count || 0
        }
      })
    )

    return aulasComMateriais
  }

  async criarAula(data: {
    titulo: string
    descricao?: string
    youtube_url?: string
    gratuita: boolean
    visibilidade: 'PLANO' | 'ALUNO' | 'PUBLICO'
    plano_id?: string | null
    aluno_id?: string | null
  }): Promise<AulaConteudo> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    const { data: novaAula, error } = await supabase
      .from('aulas')
      .insert({
        titulo: data.titulo,
        descricao: data.descricao,
        youtube_url: data.youtube_url,
        gratuita: data.gratuita,
        visibilidade: data.visibilidade,
        plano_id: data.plano_id,
        aluno_id: data.aluno_id,
        professor_id: professorId,
        ativo: true
      })
      .select()
      .single()

    if (error) throw error
    return novaAula
  }

  async atualizarAula(id: string, data: Partial<AulaConteudo>): Promise<AulaConteudo> {
    const { data: aula, error } = await supabase
      .from('aulas')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return aula
  }

  async desativarAula(id: string): Promise<void> {
    const { error } = await supabase
      .from('aulas')
      .update({ ativo: false })
      .eq('id', id)

    if (error) throw error
  }

  async getMateriais(): Promise<MaterialDidatico[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    const { data, error } = await supabase
      .from('materiais_didaticos')
      .select(`
        *,
        aula:aulas(titulo)
      `)
      .eq('professor_id', professorId)
      .eq('ativo', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async uploadMaterial(file: File, aulaId: string | null, tipo: 'PDF' | 'TABLATURE' | 'AUDIO' | 'OUTRO'): Promise<MaterialDidatico> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const professorId = await this.getProfessorId(user.id)

    // Upload do arquivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('materiais-didaticos')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    // Gerar URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('materiais-didaticos')
      .getPublicUrl(fileName)

    // Registrar no banco
    const { data: material, error } = await supabase
      .from('materiais_didaticos')
      .insert({
        titulo: file.name,
        tipo,
        url: publicUrl,
        aula_id: aulaId,
        professor_id: professorId,
        ativo: true
      })
      .select()
      .single()

    if (error) throw error
    return material
  }

  async desativarMaterial(id: string): Promise<void> {
    const { error } = await supabase
      .from('materiais_didaticos')
      .update({ ativo: false })
      .eq('id', id)

    if (error) throw error
  }

  async getNotificacoes() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Não autenticado')

    const { data, error } = await supabase
      .from('notificacoes')
      .select('*')
      .eq('usuario_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  }
}

export const professorService = new ProfessorService()
