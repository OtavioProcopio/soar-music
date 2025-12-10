import React from 'react';
import HeaderBanner from './HeaderBanner';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white min-h-screen text-slate-800 flex flex-col font-sans selection:bg-brand-primary selection:text-white">
      <Navbar />
      <HeaderBanner />
      <main className="flex-grow animate-fade-in relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;