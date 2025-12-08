import React from 'react';
import { PRODUCTS } from '../config/constants';
import { ShoppingBag } from 'lucide-react';

const StorePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-brand-soar">Soar <span className="text-brand-primary">Store</span></h2>
            <p className="text-slate-500 mt-2">Produtos oficiais para sua jornada.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
                 <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-64 overflow-hidden relative bg-slate-100">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShoppingBag size={20} />
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">{product.category}</div>
                        <h3 className="text-slate-800 font-bold mb-3 text-lg leading-tight">{product.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-brand-primary font-black text-xl">R$ {product.price.toFixed(2)}</p>
                            <button className="text-xs font-bold uppercase text-slate-500 hover:text-brand-primary transition-colors">Ver Detalhes</button>
                        </div>
                    </div>
                 </div>
            ))}
        </div>
    </div>
)

export default StorePage;