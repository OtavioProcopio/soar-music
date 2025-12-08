import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Footer from './Footer'
import { 
  LayoutDashboard, Users, GraduationCap, Package, Calendar, 
  FileText, CreditCard, Image, BarChart3, LogOut, Home 
} from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/usuarios', icon: Users, label: 'Usuários' },
    { path: '/admin/alunos', icon: Users, label: 'Alunos' },
    { path: '/admin/professores', icon: GraduationCap, label: 'Professores' },
    { path: '/admin/planos', icon: Package, label: 'Planos' },
    { path: '/admin/vagas', icon: Calendar, label: 'Vagas' },
    { path: '/admin/assinaturas', icon: FileText, label: 'Assinaturas' },
    { path: '/admin/conteudos', icon: FileText, label: 'Conteúdos' },
    { path: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos' },
    { path: '/admin/imagens', icon: Image, label: 'Imagens' },
    { path: '/admin/relatorios', icon: BarChart3, label: 'Relatórios' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-music to-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark/90 backdrop-blur-sm border-r border-brand-primary/20 fixed h-full overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-brand-primary/20">
          <div className="flex items-center gap-3">
            <img 
              src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/SOAR-MUSIC-STUDIOS-LOGO-A.png" 
              alt="Soar Music" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="font-display font-bold text-xl text-white">SOAR</h1>
              <p className="text-xs text-brand-accent">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-primary/10 transition text-gray-300 hover:text-white mb-4 border border-brand-primary/20"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Voltar ao Site</span>
          </Link>

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-primary/10 transition text-gray-300 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-primary/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition text-red-400 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
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
