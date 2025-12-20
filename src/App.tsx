import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PlansPage from './pages/PlansPage';
import StudiosPage from './pages/StudiosPage';
import TeamPage from './pages/TeamPage';
import FAQPage from './pages/FAQPage';
import ToolsPage from './pages/ToolsPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/planos" element={<PlansPage />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/professores" element={<TeamPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/ferramentas" element={<ToolsPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
