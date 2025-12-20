import React from 'react';
import { History, Award, Heart, Music2, MapPin } from 'lucide-react';

const AboutPage = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    {/* Header Section */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-display font-black text-brand-soar mb-6">
        Nossa <span className="text-brand-primary">História</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Coluna de Texto Principal (8 cols) */}
      <div className="lg:col-span-7 space-y-10 text-slate-600 text-lg leading-relaxed text-justify">
        
        <div>
          <h3 className="text-2xl font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <History className="text-brand-primary" /> Origem e Trajetória
          </h3>
          <p>
            A <strong className="text-brand-soar">Soar Music Studios</strong> foi fundada em 2019 em sua sede oficial, Arceburgo-MG. 
            Dedicada ao ensino da Música Popular, a escola já formou centenas de alunos ao longo desses anos no sul de Minas Gerais.
          </p>
        </div>

        <div>
           <h3 className="text-2xl font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Award className="text-brand-primary" /> O Fundador
          </h3>
          <p>
            O CEO da empresa, o músico graduado em licenciatura plena <strong className="text-brand-soar">Plínio Fagundes (Piu)</strong>, traz uma bagagem de ensino iniciada em 2007. 
            Após lecionar em cidades como Ribeirão Preto-SP, Juiz de Fora-MG e Mococa-SP, Plínio fundou o projeto Soar com uma abordagem distintiva no mercado.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border-l-4 border-brand-primary shadow-lg shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Metodologia Inovadora</h3>
          <p className="italic text-slate-500">
            "Rompemos com o método tradicional engessado, estendendo o ensino para aulas interativas, oficinas de ensaios e gravações profissionais."
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Heart className="text-brand-primary" /> Impacto Cultural e Social
          </h3>
          <p>
            Nosso objetivo é levar o acesso à arte e cultura para além da fronteira acadêmica. Buscamos cativar a nova juventude e todos os participantes 
            para vivenciar a música não apenas nas partituras, mas no desenvolvimento humano e socialização.
          </p>
          <p className="mt-4">
            A Soar marca presença em projetos de leis de incentivo (Aldir Blanc e Paulo Gustavo), produções audiovisuais, orquestras de ukulelês e corais em instituições parceiras (LBV, escolas e igrejas).
            Temos orgulho de nosso trabalho de inclusão, atendendo educação infantil, cadeirantes, autistas e idosos.
          </p>
        </div>

        <div>
           <h3 className="text-2xl font-display font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Music2 className="text-brand-primary" /> A Filosofia "Soar"
          </h3>
          <p>
            Nossa filosofia consiste em ir além da técnica musical. Buscamos aguçar a sensibilidade artística para que cada ser humano 
            <strong className="text-brand-primary"> "soe"</strong> como ele realmente é. Transformamos o mundo pela arte a partir do indivíduo, fazendo tudo <strong className="text-brand-primary">SOAR</strong>.
          </p>
        </div>

      </div>

      {/* Coluna Visual/Lateral (4 cols) */}
      <div className="lg:col-span-5 space-y-8 sticky top-24">
        
        {/* Imagens Ilustrativas */}
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-primary rounded-3xl transform rotate-3 transition-transform group-hover:rotate-0"></div>
            <img 
              src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/soar-cory.jpg" 
              alt="Ensino Musical Soar - Cory" 
              className="rounded-3xl shadow-2xl relative z-10 w-full h-auto border-4 border-white"
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-secondary rounded-3xl transform -rotate-2 transition-transform group-hover:rotate-0"></div>
            <img 
              src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/soar-oficina.jpg" 
              alt="Ensino Musical Soar - Oficina" 
              className="rounded-3xl shadow-2xl relative z-10 w-full h-auto border-4 border-white"
            />
          </div>
        </div>

        {/* Card de Unidades */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
          <h4 className="text-brand-soar font-bold uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Onde Estamos</h4>
          <ul className="space-y-3">
             <li className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-brand-primary" /> Arceburgo (Sede)
             </li>
             <li className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-brand-primary" /> Guaxupé
             </li>
             <li className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-brand-primary" /> Guaranésia
             </li>
             <li className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-brand-primary" /> Juruaia
             </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
);

export default AboutPage;