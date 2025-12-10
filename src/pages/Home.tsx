import React from 'react';
import { Link } from 'react-router-dom';
import { Music, MapPin, Mic2, ArrowRight, PlayCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header - Título movido para baixo da imagem */}
      <div className="text-center mb-12 animate-fade-in">
  <h1 className="text-5xl md:text-7xl font-display font-black text-brand-primary tracking-tight mb-6">
  
  </h1>

  <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
    O lugar onde sua jornada musical começa.
  </p>
</div>



      {/* Institutional Video Section */}
      <div className="mb-16 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="relative pb-[56.25%] h-0 rounded-3xl overflow-hidden bg-slate-900 group">
             <iframe 
               src="https://www.youtube.com/embed/0hWXgHFLiU8?rel=0&modestbranding=1" 
               title="Institucional Soar Music Studios"
               className="absolute top-0 left-0 w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
          <div className="mt-4 flex items-center justify-between px-2">
             <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-xs">
                <PlayCircle size={16} /> Institucional
             </div>
             <p className="text-slate-400 text-xs font-medium">Assista e conheça nossa estrutura</p>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Link 
          to="/planos"
          className="group cursor-pointer bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-primary/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
            <Music className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors">Cursos & Planos</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">Conheça nossos planos Class, Gold, Shine e Master Class e evolua sua técnica.</p>
          <span className="text-brand-primary font-bold flex items-center text-sm uppercase tracking-wide">Ver Planos <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
        </Link>

        <Link 
           to="/studios"
           className="group cursor-pointer bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-accent/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent transition-colors">
            <MapPin className="w-8 h-8 text-brand-accent group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-800 mb-2 group-hover:text-brand-accent transition-colors">Nossas Unidades</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">Estamos presentes em Arceburgo, Guaranésia, Guaxupé e Juruaia.</p>
           <span className="text-brand-accent font-bold flex items-center text-sm uppercase tracking-wide">Ver Endereços <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
        </Link>

        <Link 
           to="/professores"
           className="group cursor-pointer bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-brand-purple/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-6 group-hover:bg-brand-purple transition-colors">
            <Mic2 className="w-8 h-8 text-brand-purple group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-800 mb-2 group-hover:text-brand-purple transition-colors">Professores</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">Conheça a equipe de mestres que vai transformar sua musicalidade.</p>
          <span className="text-brand-purple font-bold flex items-center text-sm uppercase tracking-wide">Conhecer Equipe <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
        </Link>
      </div>

      {/* FAQ CTA */}
      <div className="bg-gradient-to-r from-brand-soar to-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-display font-bold mb-2">Dúvidas sobre o funcionamento?</h3>
          <p className="text-slate-200">Confira nossa seção de Perguntas Frequentes e entenda nossa metodologia.</p>
        </div>
        <Link 
          to="/faq"
          className="px-8 py-4 bg-white text-brand-soar font-bold rounded-xl shadow-lg hover:bg-brand-primary hover:text-white transition-all transform hover:-translate-y-1 whitespace-nowrap relative z-10"
        >
          Ir para FAQ
        </Link>
      </div>
    </div>
  );
};

export default HomePage;