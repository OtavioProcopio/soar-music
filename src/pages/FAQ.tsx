import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../config/constants';

const FAQPage = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold text-brand-soar">Perguntas Frequentes</h2>
        <p className="text-slate-500 mt-2">Tire suas dúvidas sobre a metodologia e funcionamento da Soar.</p>
      </div>
      <div className="space-y-4">
        {FAQS.map((faq) => (
          <div key={faq.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openId === faq.id ? 'bg-white border-brand-primary/30 shadow-lg' : 'bg-white border-slate-200 shadow-sm'}`}>
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
            >
              <span className={`font-bold text-lg ${openId === faq.id ? 'text-brand-primary' : 'text-slate-700'}`}>{faq.question}</span>
              {openId === faq.id ? <ChevronUp className="text-brand-primary" /> : <ChevronDown className="text-slate-400" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;