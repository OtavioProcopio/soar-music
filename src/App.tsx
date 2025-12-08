import React, { useState } from 'react';
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
  return <PublicSite />;
};

export default App;
