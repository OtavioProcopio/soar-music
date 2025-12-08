import React from 'react';

const HeaderBanner = () => (
  <div className="w-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-8 overflow-hidden">
    <img 
      src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/capa-site.png" 
      alt="Soar Music Studios - Capa Oficial" 
      className="max-w-full h-auto rounded-lg shadow-lg shadow-slate-200/80 border border-slate-100"
      width="1280"
      height="212"
    />
  </div>
);

export default HeaderBanner;