import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
        
        {/* Fallback - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
