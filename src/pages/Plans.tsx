import React from 'react';
import { PLANS, CONTACT_CONFIG } from '../config/constants';
import { CheckCircle2, Zap } from 'lucide-react';

const PlansPage = () => {
  const getThemeColor = (color: string) => {
    switch (color) {
      case 'gold': return 'border-yellow-500 shadow-yellow-500/10';
      case 'purple': return 'border-purple-500 shadow-purple-500/10';
      default: return 'border-brand-primary shadow-brand-primary/10';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'gold': return 'text-yellow-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-brand-primary';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
        case 'gold': return 'bg-yellow-50 text-yellow-700';
        case 'purple': return 'bg-purple-50 text-purple-700';
        default: return 'bg-sky-50 text-brand-primary';
      }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-black text-brand-soar mb-4">Escolha sua <span className="text-brand-primary">Trajetória</span></h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Descubra qual modalidade potencializa melhor o seu talento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`
              flex flex-col bg-white rounded-3xl overflow-hidden border 
              hover:-translate-y-2 transition-all duration-300 relative group shadow-xl
              ${plan.colorTheme === 'gold' ? 'border-yellow-200 shadow-yellow-100' : plan.colorTheme === 'purple' ? 'border-purple-200 shadow-purple-100' : 'border-slate-100 shadow-slate-200'}
            `}
          >
             {/* Image Header */}
             <div className="overflow-hidden relative bg-slate-100">
               <img src={plan.imagePlaceholder} alt={plan.name} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" />
             </div>

             <div className="p-6 flex-1 flex flex-col bg-white">
               <p className="text-slate-500 text-sm mb-6 min-h-[40px] leading-relaxed font-medium">{plan.description}</p>
               
               <ul className="space-y-4 mb-8 flex-1">
                 {plan.features.map((feature, i) => (
                   <li key={i} className="flex items-start text-sm text-slate-700">
                     <CheckCircle2 size={16} className={`mr-3 mt-0.5 flex-shrink-0 ${getTextColor(plan.colorTheme)}`} />
                     <span className="font-medium">{feature}</span>
                   </li>
                 ))}
               </ul>

               <a 
                href={CONTACT_CONFIG.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md
                  flex items-center justify-center gap-2
                  ${plan.colorTheme === 'gold' 
                    ? 'bg-yellow-500 hover:bg-yellow-400 text-white shadow-yellow-500/20' 
                    : plan.colorTheme === 'purple' 
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
                      : 'bg-brand-primary hover:bg-brand-secondary text-white shadow-brand-primary/20'}
                `}
               >
                 <Zap size={16} fill="currentColor" /> Matricule-se
               </a>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;