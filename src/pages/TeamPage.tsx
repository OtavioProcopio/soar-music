import React from 'react';
import { TEACHERS } from '../config/constants';
import { Star, Award } from 'lucide-react';

const TeamPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-display font-black text-brand-soar mb-4">Mestres da <span className="text-brand-primary">Música</span></h2>
      <p className="text-slate-500 text-lg max-w-2xl mx-auto">
        Conheça os profissionais que irão guiar sua jornada. Nossa equipe é formada por músicos atuantes e graduados com vasta experiência de mercado.
      </p>
    </div>
    
    <div className="space-y-12">
      {TEACHERS.map((teacher) => (
        <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex flex-col md:flex-row">
            {/* Foto do Professor */}
            <div className="w-full md:w-1/3 lg:w-1/4 relative overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-purple/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src={teacher.photoUrl} 
                alt={teacher.name} 
                className="w-full h-full object-cover object-center min-h-[400px] md:min-h-full md:absolute transition-all duration-500 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
            
            {/* Conteúdo */}
            <div className="w-full md:w-2/3 lg:w-3/4 p-8 md:p-12 flex flex-col justify-center bg-white">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-display font-bold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors">{teacher.name}</h3>
                  <p className="text-brand-secondary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    <Star size={14} fill="currentColor" /> {teacher.role}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-100 pl-6 italic">
                  "{teacher.bio}"
                </div>
                
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider border border-slate-200">Licenciatura Plena</span>
                  <span className="px-4 py-2 rounded-full bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider border border-slate-200">Produtor Musical</span>
                  <span className="px-4 py-2 rounded-full bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider border border-slate-200">Carreira Artística</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TeamPage;