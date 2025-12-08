import React from 'react';
import { Phone, MessageCircle, Instagram, Youtube, Facebook, MapPin, Mail } from 'lucide-react';
import { CONTACT_CONFIG, STUDIOS } from '../config/constants';

const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-brand-soar mb-4">Fale com a <span className="text-brand-primary">Soar</span></h2>
            <p className="text-slate-500 text-lg">Estamos prontos para atender você.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Main Contact Card */}
            <div className="space-y-8">
                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                            <MessageCircle className="text-green-500" /> WhatsApp Oficial
                        </h3>
                        <p className="text-slate-500 mb-8">Atendimento rápido e exclusivo para todas as unidades.</p>
                        <a 
                            href={CONTACT_CONFIG.whatsapp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-green-500/30"
                        >
                            <Phone size={24} /> {CONTACT_CONFIG.whatsapp.display}
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                            <Mail className="text-brand-primary" /> E-mail
                        </h3>
                        <p className="text-slate-500 mb-4 text-sm">Para parcerias e assuntos administrativos.</p>
                        <a 
                            href={`mailto:${CONTACT_CONFIG.email}`}
                            className="text-brand-primary font-bold text-lg hover:underline"
                        >
                            {CONTACT_CONFIG.email}
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={CONTACT_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-brand-primary/30 transition-all flex flex-col items-center justify-center gap-3 group">
                        <Instagram size={32} className="text-slate-400 group-hover:text-brand-primary transition-colors" />
                        <span className="text-slate-600 font-bold text-sm">Instagram</span>
                    </a>
                    <a href={CONTACT_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-blue-400/30 transition-all flex flex-col items-center justify-center gap-3 group">
                        <Facebook size={32} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-slate-600 font-bold text-sm">Facebook</span>
                    </a>
                    <a href={CONTACT_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-red-400/30 transition-all flex flex-col items-center justify-center gap-3 group">
                        <Youtube size={32} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                        <span className="text-slate-600 font-bold text-sm">YouTube</span>
                    </a>
                </div>
            </div>

            {/* Locations List */}
            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="text-2xl font-bold text-brand-soar mb-8 border-l-4 border-brand-primary pl-4">Nossos Endereços</h3>
                <div className="space-y-8">
                    {STUDIOS.map((studio) => (
                        <div key={studio.id} className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-brand-primary/10 transition-colors">
                                <MapPin size={18} className="text-brand-primary" />
                            </div>
                            <div>
                                <h4 className="text-slate-800 font-bold text-lg mb-1 group-hover:text-brand-primary transition-colors">{studio.name}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm">{studio.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
)

export default ContactPage;