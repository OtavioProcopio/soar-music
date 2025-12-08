import { supabase } from './supabase'
import { DashboardStats, Plano, Usuario, Aluno, Professor, Assinatura, Pagamento, Aula, Video, MaterialDidatico } from '../types/database'

export const adminService = {
  // ============ DASHBOARD ============
  async getDashboardStats(): Promise<DashboardStats> {
    const [
      { count: totalAlunos },
      { count: totalProfessores },
      { count: totalAssinaturasAtivas },
      { count: totalPresenciais },
      { count: totalPremiumDigital },
      { data: faturamento },
      { count: totalInadimplentes },
      { data: vagas }
    ] = await Promise.all([
      supabase.from('alunos').select('*', { count: 'exact', head: true }),
      supabase.from('professores').select('*', { count: 'exact', head: true }),
      supabase.from('assinaturas').select('*', { count: 'exact', head: true }).eq('status', 'ATIVA'),
      supabase.from('assinaturas').select('*, plano:planos(tipo)', { count: 'exact', head: true }).eq('status', 'ATIVA').eq('plano.tipo', 'PRESENCIAL'),
      supabase.from('assinaturas').select('*, plano:planos(nome)', { count: 'exact', head: true }).eq('status', 'ATIVA').eq('plano.nome', 'Premium Digital Soar'),
      supabase.from('pagamentos').select('valor, multa_aplicada').eq('status', 'APROVADO').gte('criado_em', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
      supabase.from('pagamentos').select('*', { count: 'exact', head: true }).eq('status', 'PENDENTE'),
      supabase.from('planos').select('vagas_ocupadas')
    ])

    const faturamentoMes = faturamento?.reduce((acc, p) => acc + Number(p.valor) + Number(p.multa_aplicada || 0), 0) || 0
    const vagasOcupadasTotal = vagas?.reduce((acc, p) => acc + p.vagas_ocupadas, 0) || 0

    return {
      total_alunos: totalAlunos || 0,
      total_professores: totalProfessores || 0,
      total_assinaturas_ativas: totalAssinaturasAtivas || 0,
      total_presenciais: totalPresenciais || 0,
      total_premium_digital: totalPremiumDigital || 0,
      faturamento_mes: faturamentoMes,
      total_inadimplentes: totalInadimplentes || 0,
      vagas_ocupadas_total: vagasOcupadasTotal
    }
  },

  // ============ USUÁRIOS ============
  async getUsuarios(tipo?: string) {
    let query = supabase.from('usuarios').select('*').order('nome')
    if (tipo) query = query.eq('tipo', tipo)
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async toggleUsuarioAtivo(id: string, ativo: boolean) {
    const { error } = await supabase
      .from('usuarios')
      .update({ ativo })
      .eq('id', id)
    if (error) throw error
  },

  // ============ ALUNOS ============
  async getAlunos() {
    const { data, error } = await supabase
      .from('alunos')
      .select(`
        *,
        usuario:usuarios(*),
        assinaturas(
          *,
          plano:planos(*)
        )
      `)
      .order('criado_em', { ascending: false })
    
    if (error) throw error
    return data
  },

  async ativarPlanoManual(alunoId: string, planoId: string) {
    const { data, error } = await supabase
      .from('assinaturas')
      .insert({
        aluno_id: alunoId,
        plano_id: planoId,
        origem: 'MANUAL',
        status: 'ATIVA',
        data_inicio: new Date().toISOString().split('T')[0]
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async cancelarAssinatura(assinaturaId: string, motivo: string, forcado: boolean = false) {
    // Verificar fidelidade
    const { data: assinatura, error: checkError } = await supabase
      .from('assinaturas')
      .select('fidelidade, data_inicio, duracao_meses')
      .eq('id', assinaturaId)
      .single()
    
    if (checkError) throw checkError
    
    if (!forcado && assinatura.fidelidade) {
      const dataInicio = new Date(assinatura.data_inicio)
      const dataFim = new Date(dataInicio)
      dataFim.setMonth(dataFim.getMonth() + assinatura.duracao_meses)
      
      if (new Date() < dataFim) {
        throw new Error('Assinatura ainda está em período de fidelidade. Apenas Admin pode cancelar.')
      }
    }
    
    const { error } = await supabase
      .from('assinaturas')
      .update({
        status: 'CANCELADA',
        cancelada_em: new Date().toISOString(),
        motivo_cancelamento: motivo
      })
      .eq('id', assinaturaId)
    
    if (error) throw error
  },

  // ============ PROFESSORES ============
  async getProfessores() {
    const { data, error } = await supabase
      .from('professores')
      .select(`
        *,
        usuario:usuarios(*)
      `)
      .order('criado_em', { ascending: false })
    
    if (error) throw error
    return data
  },

  async criarProfessor(usuarioId: string, dados: Partial<Professor>) {
    const { data, error } = await supabase
      .from('professores')
      .insert({
        usuario_id: usuarioId,
        ...dados
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // ============ PLANOS ============
  async getPlanos() {
    const { data, error } = await supabase
      .from('planos')
      .select('*')
      .order('nome')
    
    if (error) throw error
    return data
  },

  async criarPlano(plano: Partial<Plano>) {
    const { data, error } = await supabase
      .from('planos')
      .insert(plano)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async atualizarPlano(id: string, plano: Partial<Plano>) {
    const { data, error } = await supabase
      .from('planos')
      .update(plano)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deletarPlano(id: string) {
    const { error } = await supabase
      .from('planos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // ============ ASSINATURAS ============
  async getAssinaturas(filtros?: { planoId?: string; status?: string }) {
    let query = supabase
      .from('assinaturas')
      .select(`
        *,
        aluno:alunos(*, usuario:usuarios(*)),
        plano:planos(*)
      `)
      .order('criado_em', { ascending: false })
    
    if (filtros?.planoId) query = query.eq('plano_id', filtros.planoId)
    if (filtros?.status) query = query.eq('status', filtros.status)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  // ============ PAGAMENTOS ============
  async getPagamentos(filtros?: { inicio?: string; fim?: string; planoId?: string; status?: string }) {
    let query = supabase
      .from('pagamentos')
      .select(`
        *,
        assinatura:assinaturas(
          *,
          aluno:alunos(*, usuario:usuarios(*)),
          plano:planos(*)
        )
      `)
      .order('criado_em', { ascending: false })
    
    if (filtros?.inicio) query = query.gte('criado_em', filtros.inicio)
    if (filtros?.fim) query = query.lte('criado_em', filtros.fim)
    if (filtros?.status) query = query.eq('status', filtros.status)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  // ============ CONTEÚDOS ============
  async getAulas(filtros?: { planoId?: string; professorId?: string }) {
    let query = supabase
      .from('aulas')
      .select(`
        *,
        plano:planos(*),
        professor:professores(*, usuario:usuarios(*))
      `)
      .order('ordem')
    
    if (filtros?.planoId) query = query.eq('plano_id', filtros.planoId)
    if (filtros?.professorId) query = query.eq('professor_id', filtros.professorId)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getVideos(filtros?: { planoId?: string; professorId?: string }) {
    let query = supabase
      .from('videos')
      .select(`
        *,
        plano:planos(*),
        professor:professores(*, usuario:usuarios(*))
      `)
      .order('ordem')
    
    if (filtros?.planoId) query = query.eq('plano_id', filtros.planoId)
    if (filtros?.professorId) query = query.eq('professor_id', filtros.professorId)
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getMateriais() {
    const { data, error } = await supabase
      .from('materiais_didaticos')
      .select(`
        *,
        aula:aulas(*, plano:planos(*))
      `)
      .order('criado_em', { ascending: false })
    
    if (error) throw error
    return data
  },

  // ============ UPLOAD DE IMAGENS ============
  async uploadImagem(file: File, bucket: string = 'soar-site') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    // Registrar na tabela arquivos
    const { data, error } = await supabase
      .from('arquivos')
      .insert({
        nome: file.name,
        tipo: 'IMAGEM',
        bucket,
        path: filePath,
        tamanho_bytes: file.size,
        visibilidade: 'PUBLICO'
      })
      .select()
      .single()

    if (error) throw error

    return { ...data, publicUrl }
  }
}
