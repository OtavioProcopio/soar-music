import React from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Footer from './Footer'
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  FileText,
  Bell,
  LogOut,
  Music,
  Home
} from 'lucide-react'

export const ProfessorLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/professor/dashboard' },
    { icon: Users, label: 'Meus Alunos', path: '/professor/alunos' },
    { icon: Calendar, label: 'Grade de Horários', path: '/professor/grade' },
    { icon: BookOpen, label: 'Minhas Aulas', path: '/professor/aulas' },
    { icon: FileText, label: 'Materiais Didáticos', path: '/professor/materiais' },
    { icon: Bell, label: 'Notificações', path: '/professor/notificacoes' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-music to-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark/90 backdrop-blur-sm border-r border-brand-primary/20 flex flex-col fixed h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-brand-primary/20">
          <Link to="/professor/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Soar Music</h1>
              <p className="text-brand-accent text-xs">Painel Professor</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-brand-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold">
              {user?.nome_completo?.charAt(0) || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.nome_completo}
              </p>
              <p className="text-brand-accent text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-primary/10 transition text-gray-300 hover:text-white mb-4 border border-brand-primary/20"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium text-sm">Voltar ao Site</span>
          </Link>

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/50'
                  : 'text-gray-400 hover:text-white hover:bg-brand-primary/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-brand-primary/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-white hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <div className="flex-grow p-8">
          <Outlet />
        </div>
        <Footer onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />
      </main>
    </div>
  )
}
