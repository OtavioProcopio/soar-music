import { supabase } from './supabase'
import { Usuario, TipoUsuario } from '../types/database'

export interface AuthState {
  user: Usuario | null
  loading: boolean
}

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    // Buscar dados do usuário na tabela usuarios
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single()
    
    if (userError) throw userError
    
    return { user: data.user, userData }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser(): Promise<Usuario | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    const { data: userData, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error) throw error
    
    return userData
  },

  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user?.tipo === 'ADMIN'
  },

  async checkUserType(tipo: TipoUsuario): Promise<boolean> {
    const user = await this.getCurrentUser()
    return user?.tipo === tipo
  },

  async signUp(email: string, password: string, nome: string) {
    // Criar usuário FREE automaticamente
    const { data, error } = await supabase.functions.invoke('criar-usuario-inicial', {
      body: {
        email,
        password,
        nome,
        tipo: 'ALUNO'
      }
    })
    
    if (error) throw error
    return data
  }
}
