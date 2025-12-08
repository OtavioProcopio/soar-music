import React from 'react';
import { ViewName } from '../config/types';
import HeaderBanner from './HeaderBanner';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
  children: React.ReactNode;
}

const Layout = ({ currentView, onNavigate, children }: LayoutProps) => {
  return (
    <div className="bg-white min-h-screen text-slate-800 flex flex-col font-sans selection:bg-brand-primary selection:text-white">
      <Navbar currentView={currentView} onNavigate={onNavigate} />
      <HeaderBanner />
      <main className="flex-grow animate-fade-in relative z-10">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Layout;