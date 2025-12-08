export type TipoUsuario = 'ALUNO' | 'PROFESSOR' | 'ADMIN'
export type TipoPlano = 'PRESENCIAL' | 'ONLINE'
export type ModalidadePlano = 'INDIVIDUAL' | 'GRUPO' | 'PROJETO_ARTISTICO'
export type StatusAssinatura = 'ATIVA' | 'INATIVA' | 'CANCELADA'
export type OrigemAssinatura = 'ONLINE' | 'MANUAL'
export type StatusPagamento = 'PENDENTE' | 'APROVADO' | 'RECUSADO'
export type TipoArquivo = 'IMAGEM' | 'PDF' | 'AUDIO' | 'TAB' | 'OUTRO'
export type VisibilidadeConteudo = 'PUBLICO' | 'PLANO' | 'ALUNO'

export interface Usuario {
  id: string
  nome: string
  tipo: TipoUsuario
  email: string
  telefone?: string
  foto_url?: string
  ativo: boolean
  criado_em: string
  atualizado_em: string
}

export interface Aluno {
  id: string
  usuario_id: string
  presencial: boolean
  online: boolean
  observacoes?: string
  criado_em: string
  atualizado_em: string
  usuario?: Usuario
  assinaturas?: Assinatura[]
}

export interface Professor {
  id: string
  usuario_id: string
  bio?: string
  instrumento_principal?: string
  experiencia?: string
  criado_em: string
  atualizado_em: string
  usuario?: Usuario
}

export interface Plano {
  id: string
  nome: string
  tipo: TipoPlano
  modalidade?: ModalidadePlano
  descricao?: string
  valor_mensal: number
  valor_com_contrato?: number
  valor_sem_contrato?: number
  vagas_max?: number
  vagas_ocupadas: number
  usa_agenda: boolean
  tem_oficinas: boolean
  tem_estudio: boolean
  ativo: boolean
  criado_em: string
  atualizado_em: string
}

export interface Assinatura {
  id: string
  aluno_id: string
  plano_id: string
  status: StatusAssinatura
  origem: OrigemAssinatura
  duracao_meses: number
  fidelidade: boolean
  dia_vencimento: number
  data_inicio?: string
  data_fim_prevista?: string
  cancelada_em?: string
  motivo_cancelamento?: string
  criado_em: string
  atualizado_em: string
  aluno?: Aluno
  plano?: Plano
  pagamentos?: Pagamento[]
}

export interface Pagamento {
  id: string
  assinatura_id: string
  valor: number
  multa_aplicada: number
  status: StatusPagamento
  gateway?: string
  external_ref?: string
  metadados?: any
  criado_em: string
  atualizado_em: string
  assinatura?: Assinatura
}

export interface Aula {
  id: string
  titulo: string
  descricao?: string
  youtube_url?: string
  thumbnail_url?: string
  duracao?: number
  gratuita: boolean
  visibilidade: VisibilidadeConteudo
  plano_id?: string
  professor_id?: string
  ordem?: number
  ativo: boolean
  criado_em: string
  atualizado_em: string
  plano?: Plano
  professor?: Professor
}

export interface Video {
  id: string
  titulo: string
  descricao?: string
  youtube_url: string
  thumbnail_url?: string
  playlist?: string
  professor_id?: string
  plano_id?: string
  visibilidade: VisibilidadeConteudo
  ordem?: number
  ativo: boolean
  criado_em: string
  atualizado_em: string
  plano?: Plano
  professor?: Professor
}

export interface MaterialDidatico {
  id: string
  aula_id?: string
  titulo: string
  descricao?: string
  tipo: 'PDF' | 'TABLATURE' | 'AUDIO' | 'OUTRO'
  storage_path: string
  tamanho_bytes?: number
  criado_em: string
  aula?: Aula
}

export interface Arquivo {
  id: string
  nome: string
  descricao?: string
  tipo: TipoArquivo
  bucket: string
  path: string
  tamanho_bytes?: number
  plano_id?: string
  aula_id?: string
  usuario_id?: string
  visibilidade: VisibilidadeConteudo
  criado_em: string
}

export interface DashboardStats {
  total_alunos: number
  total_professores: number
  total_assinaturas_ativas: number
  total_presenciais: number
  total_premium_digital: number
  faturamento_mes: number
  total_inadimplentes: number
  vagas_ocupadas_total: number
}
