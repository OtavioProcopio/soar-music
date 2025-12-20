# SOAR Music Studios - AI Coding Agent Instructions

## Project Overview
**Pure institutional website for SOAR Music Studios.** Production-ready public site showcasing courses, plans, teachers, and studios. Clean, simple architecture with zero backend dependencies. Static site optimized for performance and SEO.

## Architecture & Tech Stack

### Frontend Stack
- **React 19.2 + TypeScript 5.8** with Vite 6.2
- **Tailwind CSS** with custom design system
- **React Router DOM 7.10** for client-side routing
- **Lucide React 0.556** for icons
- **No backend, no auth, no database** - 100% static site

### Brand Colors
```css
--brand-primary: #17A6D8    /* Cyan */
--brand-secondary: #4F6F74  /* Slate Gray */
--brand-soar: #1e293b       /* Dark Blue */
```

### Project Structure
```
soarmusic/
├── src/
│   ├── components/          # Layout components (4 files)
│   │   ├── Layout.tsx      # Main wrapper with Navbar + Footer
│   │   ├── Navbar.tsx      # Responsive navigation with mobile menu
│   │   ├── Footer.tsx      # Footer with contact and social links
│   │   └── HeaderBanner.tsx # Top banner with contact info
│   ├── pages/              # Public pages (9 files)
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── PlansPage.tsx
│   │   ├── StudiosPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── ToolsPage.tsx
│   │   └── ContactPage.tsx
│   ├── config/             # Configuration (2 files)
│   │   ├── constants.ts   # All static data (single source of truth)
│   │   └── types.ts       # TypeScript interfaces
│   ├── App.tsx            # Router configuration
│   ├── main.tsx           # Entry point
│   ├── global.css         # Tailwind + custom styles
│   └── input.css          # Tailwind directives
├── public/                # Static assets
├── index.html             # HTML entry point
├── vite.config.ts         # Vite bundler config
├── tailwind.config.js     # Tailwind config
├── tsconfig.json          # TypeScript config
├── postcss.config.js      # PostCSS config
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies

Total: 18 TypeScript files | Bundle: 524KB (~120KB gzipped)
```

## Data Management

### Single Source of Truth: `src/config/constants.ts`

All site content lives here. **Never hardcode data in components.**

```typescript
export const CONTACT_CONFIG = {
  whatsapp: { display: '(35) 99129-5022', link: 'https://wa.me/5535991295022' },
  social: {
    instagram: 'https://www.instagram.com/soarmusicstudios/',
    facebook: 'https://www.facebook.com/soarmusicstudios',
    youtube: 'https://www.youtube.com/@PiuGuitar'
  },
  email: 'pliniofagundesdefaria@gmail.com'
};

export const PLANS: Plan[] = [...];      // 4 course plans
export const COURSES: Course[] = [...];  // Musical instruments
export const TEACHERS: Teacher[] = [...]; // Professor profiles
export const STUDIOS: StudioLocation[] = [...]; // Physical locations
export const FAQS: FAQItem[] = [...];    // Frequently asked questions
```

### Type Definitions: `src/config/types.ts`

```typescript
export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  colorTheme: 'cyan' | 'gold' | 'purple' | 'rose';
  imagePlaceholder: string;
}

export interface Course { id: string; name: string; description: string; imageUrl: string; }
export interface Teacher { id: string; name: string; role: string; bio: string; photoUrl: string; }
export interface StudioLocation { id: string; name: string; address: string; phone: string; mapUrl?: string; }
export interface FAQItem { id: string; question: string; answer: string; }
```

## Routing

### Route Configuration (`src/App.tsx`)

```tsx
<Layout>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/sobre" element={<AboutPage />} />
    <Route path="/cursos" element={<CoursesPage />} />
    <Route path="/planos" element={<PlansPage />} />
    <Route path="/studios" element={<StudiosPage />} />
    <Route path="/professores" element={<TeamPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/ferramentas" element={<ToolsPage />} />
    <Route path="/contato" element={<ContactPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Layout>
```

### Navigation Rules

- **Internal links**: `<Link to="/path">` from `react-router-dom`
- **External links**: `<a href="..." target="_blank" rel="noopener noreferrer">`
- **WhatsApp links**: Always use `CONTACT_CONFIG.whatsapp.link`

## Component Patterns

### Typical Page Component

```tsx
import React from 'react';
import { COURSES, CONTACT_CONFIG } from '../config/constants';
import { ArrowRight } from 'lucide-react';

const CoursesPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-16">
    <h2 className="text-4xl font-display font-black text-brand-soar mb-4">
      Nossos <span className="text-brand-primary">Cursos</span>
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {COURSES.map((course) => (
        <div key={course.id} className="bg-white rounded-3xl shadow-xl">
          <img src={course.imageUrl} alt={course.name} />
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <a href={CONTACT_CONFIG.whatsapp.link} target="_blank">
            Saiba Mais <ArrowRight />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default CoursesPage;
```

### Layout Component Structure

```tsx
// Layout.tsx wraps all pages
<Layout>
  <HeaderBanner />
  <Navbar />
  {children}  {/* Page content */}
  <Footer />
</Layout>
```

## Development Workflows

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
```

### Production Build
```bash
npm run build        # Build optimized bundle
npm run preview      # Preview production build locally
```

### No Environment Variables
This is a static site - no `.env` file needed.

## Build Optimization

### Manual Code Splitting (`vite.config.ts`)

```typescript
manualChunks: {
  'vendor-react': ['react', 'react-dom'],
  'vendor-router': ['react-router-dom'],
  'vendor-ui': ['lucide-react'],
  'components': [/* Layout components */],
  'public-pages': [/* All pages */]
}
```

**Result**: 524KB total (~120KB gzipped)

## Common Tasks

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add link in `Navbar.tsx` or `Footer.tsx`

### Add New Data Type
1. Define interface in `src/config/types.ts`
2. Export data array in `src/config/constants.ts`
3. Import and use: `import { NEW_DATA } from '../config/constants'`

### Update Contact Info
Edit `CONTACT_CONFIG` in `src/config/constants.ts` - changes reflect everywhere automatically

### Modify Styles
- **Global**: Edit `src/global.css`
- **Component**: Use Tailwind utility classes inline
- **Colors**: Modify `tailwind.config.js` theme

## Styling Guidelines

### Tailwind Utility Classes
```tsx
// Consistent spacing
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"

// Brand colors
className="text-brand-primary bg-brand-soar border-brand-secondary"

// Responsive design
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

// Hover effects
className="hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
```

### Typography Scale
- Display: `font-display font-black text-4xl` (Montserrat)
- Body: `font-normal text-base` (Inter)
- Accent: `font-bold uppercase tracking-wider`

## Common Pitfalls

1. ❌ **Don't use `<a href>` for internal routes** → Use `<Link to="/path">`
2. ❌ **Don't hardcode WhatsApp/contact** → Import `CONTACT_CONFIG`
3. ❌ **Don't add backend code** → This is a static site only
4. ❌ **Don't skip accessibility** → Use semantic HTML + alt text
5. ❌ **Don't forget mobile responsive** → Test all breakpoints

## Testing Checklist

- [ ] All 9 pages load without errors
- [ ] Mobile menu works on small screens
- [ ] All WhatsApp links use `CONTACT_CONFIG.whatsapp.link`
- [ ] Social links open in new tabs
- [ ] Images load correctly (Supabase CDN)
- [ ] Build completes: `npm run build`
- [ ] No TypeScript errors: `tsc --noEmit`
- [ ] Responsive on mobile/tablet/desktop

## Deployment

### Vercel (Configured)
- Push to `main` branch
- Auto-deploy on push
- SPA routing handled by `vercel.json`

### Production URL
- Live site: [soarmusic.vercel.app](https://soarmusic.vercel.app)

## Contact Information

```typescript
WhatsApp: (35) 99129-5022
Instagram: @soarmusicstudios
Facebook: /soarmusicstudios
YouTube: @PiuGuitar
Email: pliniofagundesdefaria@gmail.com
```

---

## Future Roadmap

The complete platform (authentication, admin panel, student/professor portals) will be built from scratch in the future using:
- Supabase for backend (auth + database + storage)
- MCP (Model Context Protocol) for AI integration
- Feature-based architecture for scalability

**Current focus**: Keep site simple, maintainable, and performant.
