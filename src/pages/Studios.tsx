import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { STUDIOS, CONTACT_CONFIG } from '../config/constants';

const StudiosPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-black text-brand-soar">Nossas <span className="text-brand-primary">Unidades</span></h2>
        <p className="text-slate-500 mt-2 text-lg">Visite o estúdio mais próximo de você.</p>
      </div>

      <div className="space-y-12">
        {STUDIOS.map((studio, index) => (
          <div key={studio.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow`}>
            {/* Map Container */}
            <div className="w-full lg:w-1/2 h-64 lg:h-auto min-h-[350px] relative bg-slate-100">
               {studio.mapUrl ? (
                 <iframe 
                   src={studio.mapUrl} 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="absolute inset-0 w-full h-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                 ></iframe>
               ) : (
                 <div className="flex items-center justify-center h-full text-slate-400">Mapa Indisponível</div>
               )}
            </div>

            {/* Info Container */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-xs mb-4 bg-brand-primary/5 w-fit px-3 py-1 rounded-full">
                <MapPin size={14} /> Unidade Soar
              </div>
              <h3 className="text-3xl font-display font-bold text-slate-800 mb-4">{studio.name}</h3>
              <p className="text-xl text-slate-600 mb-8 font-medium border-l-4 border-brand-primary pl-4">{studio.address}</p>
              
              <div className="flex items-center gap-4 text-slate-700 mb-8 bg-slate-50 p-4 rounded-xl w-fit border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                  <Phone size={20} />
                </div>
                <span className="text-lg font-bold tracking-wide">{CONTACT_CONFIG.whatsapp.display}</span>
              </div>

              <a 
                href={studio.mapUrl ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.address)}` : '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-fit px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/30 transform hover:-translate-y-0.5"
              >
                Traçar Rota no Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudiosPage;