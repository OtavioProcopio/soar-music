import React from 'react';
import { COURSES, CONTACT_CONFIG } from '../config/constants';
import { ArrowRight } from 'lucide-react';

const CoursesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-brand-soar mb-4">
                Nossos <span className="text-brand-primary">Cursos</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Escolha seu instrumento e comece a escrever sua história na música.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
                <div 
                    key={course.id} 
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                    {/* Imagem do Curso */}
                    <div className="h-64 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <img 
                            src={course.imageUrl} 
                            alt={course.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20">
                            <h3 className="text-3xl font-display font-black text-white italic tracking-tighter drop-shadow-md">
                                {course.name}
                            </h3>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="p-8">
                        <p className="text-slate-600 leading-relaxed font-medium mb-8 min-h-[60px]">
                            {course.description}
                        </p>
                        
                        <a 
                            href={CONTACT_CONFIG.whatsapp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-xl border-2 border-slate-100 text-brand-primary font-bold uppercase tracking-wider hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-brand-primary/20"
                        >
                            Saiba Mais <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default CoursesPage;