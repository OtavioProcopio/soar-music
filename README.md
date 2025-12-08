<div align="center">
  <img src="https://pdoynmsyyhdkjmivyplg.supabase.co/storage/v1/object/public/soar-site/SOAR-MUSIC-STUDIOS-LOGO-A.png" alt="Soar Music Studios" width="200"/>
  
  # 🎵 Soar Music Studios
  
  **Site Institucional MVP**
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OtavioProcopio/soar-music)
  ![React](https://img.shields.io/badge/React-19.2-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
  ![Vite](https://img.shields.io/badge/Vite-6.2-purple)
  ![License](https://img.shields.io/badge/license-MIT-green)
  
</div>

---

## 📖 Sobre o Projeto

Site institucional da **Soar Music Studios** - escola de música com unidades no Sul de Minas Gerais (Arceburgo, Guaranésia, Guaxupé e Juruaia).

### ✨ Características

- 🎨 **Design Moderno** - Interface clean e profissional
- 📱 **Responsivo** - Mobile-first design
- ⚡ **Performance** - Bundle otimizado (120 KB gzipped)
- 🎯 **SEO-Ready** - Meta tags e estrutura semântica
- 🚀 **Deploy Rápido** - Pronto para Vercel/Netlify

---

## 🏗️ Tecnologias

- **React 19.2** - Framework UI
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool ultrarrápido
- **Tailwind CSS 3.4** - Utility-first CSS
- **Lucide React** - Ícones modernos
- **PostCSS** - CSS processing

---

## 📂 Estrutura do Projeto

```
soarmusic/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Footer.tsx
│   │   ├── HeaderBanner.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── pages/            # Páginas do site
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Courses.tsx
│   │   ├── Plans.tsx
│   │   ├── Studios.tsx
│   │   ├── Team.tsx
│   │   ├── FAQ.tsx
│   │   ├── Tools.tsx
│   │   └── Contact.tsx
│   ├── config/           # Configurações
│   │   ├── constants.ts
│   │   └── types.ts
│   ├── App.tsx           # App principal
│   └── main.tsx          # Entry point
├── public/               # Assets estáticos
├── dist/                 # Build de produção
└── vite.config.ts        # Configuração Vite
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js 18+**
- **npm** ou **yarn**

### Instalação

```bash
# Clone o repositório
git clone git@github.com:OtavioProcopio/soar-music.git
cd soar-music

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
```

---

## 📦 Build de Produção

### Bundle Otimizado

```
dist/index.html                         1.88 kB │ gzip:  0.85 kB
dist/assets/index-*.css                48.01 kB │ gzip:  7.82 kB
dist/assets/vendor-react-*.js         326.23 kB │ gzip: 98.69 kB
dist/assets/public-pages-*.js          71.39 kB │ gzip: 10.84 kB
dist/assets/components-*.js            29.59 kB │ gzip:  6.95 kB
dist/assets/vendor-ui-*.js              6.84 kB │ gzip:  2.84 kB

Total: ~120 KB gzipped 🚀
```

### Code Splitting

O projeto implementa **manual chunks** para otimização:

- `vendor-react` - React core (cacheável)
- `vendor-ui` - Lucide icons + Recharts
- `components` - Componentes compartilhados
- `public-pages` - Páginas públicas

---

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OtavioProcopio/soar-music)

**Via CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Via GitHub:**
1. Conecte seu repositório na [Vercel](https://vercel.com)
2. Selecione a branch `main`
3. Deploy automático! ✨

### Outras Plataformas

- **Netlify**: Arraste a pasta `dist/` após `npm run build`
- **GitHub Pages**: Use `gh-pages` package
- **Cloudflare Pages**: Conecte via GitHub

---

## 🎨 Customização

### Cores da Marca

Definidas em `tailwind.config.js`:

```js
colors: {
  'brand-primary': '#1976D2',    // Azul SOAR
  'brand-music': '#4CAF50',      // Verde MUSIC
  'brand-secondary': '#039BE5',  // Azul claro
  'brand-accent': '#FFA726',     // Laranja
  'brand-purple': '#AB47BC',     // Roxo
  'brand-soar': '#0D47A1',       // Azul escuro
}
```

### Configurações do Site

Edite `src/config/constants.ts`:

```typescript
export const CONTACT_CONFIG = {
  whatsapp: { ... },
  email: '...',
  social: { ... }
}
```

---

## 🗂️ Git Flow

```
main                    ← Produção (deploy)
  ↑
  └─ site-institucional ← MVP público
       ↑
       └─ developer     ← Desenvolvimento
```

### Branches

- `main` - Código de produção
- `developer` - Base de desenvolvimento (inclui features futuras)
- `site-institucional` - Versão MVP pública (sem auth/admin)

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

## 👥 Contato

**Soar Music Studios**
- 📍 Sul de Minas Gerais (Arceburgo, Guaranésia, Guaxupé, Juruaia)
- 📧 contato@soarmusicstudios.com.br
- 📱 WhatsApp: (35) 99999-9999
- 🌐 Instagram: [@soarmusicstudios](https://instagram.com/soarmusicstudios)

---

<div align="center">
  
  **Desenvolvido com ❤️ por Soar Music Studios**
  
  [Website](https://soarmusicstudios.com.br) • [Instagram](https://instagram.com/soarmusicstudios) • [YouTube](https://youtube.com/@soarmusicstudios)
  
</div>
