import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
import { Usuario } from '../types/database'

interface AuthContextType {
  user: Usuario | null
  loading: boolean
  isAdmin: boolean
  isProfessor: boolean
  isAluno: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, nome: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await checkUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setUser(null)
        setLoading(false)
        return
      }

      // Buscar dados do usuário da tabela usuarios
      const { data: usuarioData, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } else {
        setUser(usuarioData)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    if (!data.user) throw new Error('Usuário não encontrado')

    // Buscar dados completos do usuário
    const { data: usuarioData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) throw userError
    if (!usuarioData) throw new Error('Dados do usuário não encontrados')

    setUser(usuarioData)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const signUp = async (email: string, password: string, nome: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome_completo: nome
        }
      }
    })

    if (error) throw error
    if (!data.user) throw new Error('Erro ao criar usuário')

    // Criar registro na tabela usuarios
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert({
        id: data.user.id,
        email,
        nome_completo: nome,
        tipo: 'ALUNO',
        ativo: true
      })

    if (insertError) throw insertError
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.tipo === 'ADMIN',
        isProfessor: user?.tipo === 'PROFESSOR',
        isAluno: user?.tipo === 'ALUNO',
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
