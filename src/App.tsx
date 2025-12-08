import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ViewName } from './config/types';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import StudiosPage from './pages/Studios';
import AboutPage from './pages/About';
import PlansPage from './pages/Plans';
import TeamPage from './pages/Team';
import FAQPage from './pages/FAQ';
import ToolsPage from './pages/Tools';
import CoursesPage from './pages/Courses';
import ContactPage from './pages/Contact';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminAlunos } from './pages/admin/Alunos';
import { AdminPlanos } from './pages/admin/Planos';
import { AdminUsuarios } from './pages/admin/Usuarios';
import { AdminProfessores } from './pages/admin/Professores';
import { AdminVagas } from './pages/admin/Vagas';
import { AdminAssinaturas } from './pages/admin/Assinaturas';
import { AdminConteudos } from './pages/admin/Conteudos';
import { AdminPagamentos } from './pages/admin/Pagamentos';
import { AdminImagens } from './pages/admin/Imagens';
import { AdminRelatorios } from './pages/admin/Relatorios';
import { ProfessorLayout } from './components/ProfessorLayout';
import { ProfessorDashboard } from './pages/professor/Dashboard';
import { ProfessorAlunos } from './pages/professor/Alunos';
import { ProfessorGrade } from './pages/professor/Grade';
import { ProfessorAulas } from './pages/professor/Aulas';
import { ProfessorMateriais } from './pages/professor/Materiais';
import { ProfessorNotificacoes } from './pages/professor/Notificacoes';

// Public site wrapper component
const PublicSite: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewName>('home');

  const handleNavigate = (view: ViewName) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'studios': return <StudiosPage />;
      case 'about': return <AboutPage />;
      case 'plans': return <PlansPage />;
      case 'team': return <TeamPage />;
      case 'faq': return <FAQPage />;
      case 'tools': return <ToolsPage />;
      case 'courses': return <CoursesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate}>
      {renderView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicSite />} />
          <Route path="/login" element={<Login />} />

          {/* Admin routes - protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="alunos" element={<AdminAlunos />} />
            <Route path="professores" element={<AdminProfessores />} />
            <Route path="planos" element={<AdminPlanos />} />
            <Route path="vagas" element={<AdminVagas />} />
            <Route path="assinaturas" element={<AdminAssinaturas />} />
            <Route path="conteudos" element={<AdminConteudos />} />
            <Route path="pagamentos" element={<AdminPagamentos />} />
            <Route path="imagens" element={<AdminImagens />} />
            <Route path="relatorios" element={<AdminRelatorios />} />
          </Route>

          {/* Professor routes - protected */}
          <Route
            path="/professor"
            element={
              <ProtectedRoute requireProfessor>
                <ProfessorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/professor/dashboard" replace />} />
            <Route path="dashboard" element={<ProfessorDashboard />} />
            <Route path="alunos" element={<ProfessorAlunos />} />
            <Route path="grade" element={<ProfessorGrade />} />
            <Route path="aulas" element={<ProfessorAulas />} />
            <Route path="materiais" element={<ProfessorMateriais />} />
            <Route path="notificacoes" element={<ProfessorNotificacoes />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;