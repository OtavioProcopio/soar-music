import React, { useState } from 'react';
import { Menu, X, Instagram, Youtube, Facebook } from 'lucide-react';
import { ViewName } from '../config/types';
import { CONTACT_CONFIG } from '../config/constants';

interface NavbarProps {
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; view: ViewName }[] = [
    { name: 'Home', view: 'home' },
    { name: 'Sobre', view: 'about' },
    { name: 'Cursos', view: 'courses' }, // Substituído Loja por Cursos
    { name: 'Planos', view: 'plans' },
    { name: 'Studios', view: 'studios' },
    { name: 'Professores', view: 'team' },
    { name: 'FAQ', view: 'faq' },
    { name: 'Ferramentas', view: 'tools' },
    { name: 'Contato', view: 'contact' },
  ];

  const handleNavClick = (view: ViewName) => {
    onNavigate(view);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Mobile */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleNavClick('home')}>
               <img 
                 src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/SOAR-MUSIC-STUDIOS-LOGO-A.png" 
                 alt="Soar Music Studios" 
                 className="w-14 h-14 object-contain"
               />
              <span className="font-display font-bold text-xl tracking-wide text-brand-soar lg:hidden">
                SOAR
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden xl:flex flex-1 items-center justify-end">
              <div className="ml-10 flex items-baseline space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      currentView === link.view
                        ? 'text-white bg-brand-primary shadow-md shadow-brand-primary/30'
                        : 'text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              
              <div className="ml-6 pl-6 border-l border-slate-200 flex items-center gap-4">
                 <div className="flex gap-3">
                    <a href={CONTACT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform">
                      <Instagram size={18} />
                    </a>
                    <a href={CONTACT_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors hover:scale-110 transform">
                      <Youtube size={18} />
                    </a>
                    <a href={CONTACT_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors hover:scale-110 transform">
                      <Facebook size={18} />
                    </a>
                 </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-brand-primary hover:bg-slate-100 focus:outline-none"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl absolute w-full z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view)}
                  className={`block w-full text-left px-4 py-4 rounded-md text-base font-bold uppercase tracking-wide border-l-4 transition-all ${
                     currentView === link.view
                        ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                        : 'border-transparent text-slate-600 hover:text-brand-primary hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="p-4 border-t border-slate-100 mt-2">
                 {/* Área do aluno removida do MVP */}
              </div>
              <div className="flex justify-center gap-8 py-6 border-t border-slate-100">
                 <a href={CONTACT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-primary">
                   <Instagram size={24} />
                 </a>
                 <a href={CONTACT_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500">
                   <Youtube size={24} />
                 </a>
                 <a href={CONTACT_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500">
                   <Facebook size={24} />
                 </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;