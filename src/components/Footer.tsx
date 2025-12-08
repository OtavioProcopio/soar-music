import React from 'react';
import { Phone, MapPin, Info, Instagram, Youtube, Facebook } from 'lucide-react';
import { ViewName } from '../config/types';
import { CONTACT_CONFIG } from '../config/constants';

interface FooterProps {
  onNavigate: (view: ViewName) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black py-16 border-t border-brand-dark/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/SOAR-MUSIC-STUDIOS-LOGO-A.png" 
                alt="Soar Music Studios" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-display font-bold text-2xl tracking-wide">
                <span className="text-brand-primary">SOAR</span> <span className="text-brand-music text-sm font-normal block md:inline">MUSIC STUDIOS</span>
              </span>
            </div>
            <p className="text-brand-gray text-sm leading-relaxed max-w-xs">
              Muito mais que uma escola de música. Um centro de desenvolvimento artístico e humano focado na sua evolução.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider mb-6 border-b border-brand-dark/50 pb-2 w-fit">Navegação</h4>
            <ul className="space-y-3 text-sm text-brand-gray">
              <li><button onClick={() => onNavigate('plans')} className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300">Cursos & Planos</button></li>
              <li><button onClick={() => onNavigate('studios')} className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300">Nossas Unidades</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300">Dúvidas Frequentes</button></li>
              <li><button onClick={() => onNavigate('team')} className="hover:text-brand-primary hover:translate-x-1 transition-all duration-300">Corpo Docente</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold uppercase tracking-wider mb-6 border-b border-brand-dark/50 pb-2 w-fit">Fale Conosco</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-primary" /> 
                <a href={CONTACT_CONFIG.whatsapp.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.whatsapp.display}
                </a>
              </li>
              <li className="flex items-start gap-3"><MapPin size={16} className="text-brand-primary shrink-0" /> Sul de Minas Gerais<br/>(Arceburgo, Guaxupé, Juruaia, Guaranésia)</li>
              <li className="flex items-center gap-3"><Info size={16} className="text-brand-primary" /> {CONTACT_CONFIG.email}</li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-display font-bold uppercase tracking-wider mb-6 border-b border-brand-dark/50 pb-2 w-fit">Redes Sociais</h4>
             <div className="flex gap-4">
               <a href={CONTACT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gray hover:text-white hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary transition-all duration-300 transform hover:scale-110">
                 <Instagram size={24} />
               </a>
               <a href={CONTACT_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gray hover:text-white hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                 <Youtube size={24} />
               </a>
               <a href={CONTACT_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gray hover:text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                 <Facebook size={24} />
               </a>
             </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-dark/20 text-center text-brand-gray text-xs uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Soar Music Studios. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;