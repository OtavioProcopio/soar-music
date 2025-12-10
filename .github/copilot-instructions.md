# SOAR Music Studios - AI Coding Agent Instructions

## Project Overview
Music school platform with institutional website + admin/professor portals. **Currently on `site-institucional` branch** (MVP without auth). Full backend ready on `developer` branch with Supabase integration for multi-tenant school management.

## Architecture & Tech Stack

### Frontend
- **React 19.2 + TypeScript 5.8** with Vite 6.2 (dev server on port 3000)
- **Tailwind CSS** with custom brand colors (`brand-primary: #17A6D8`, `brand-secondary: #4F6F74`)
- **Navigation**: React Router DOM with standard routing - Use `<Link>` components and `useNavigate()` hook
- **Lucide React** for icons, **Recharts** for charts in admin panels

### Backend (Supabase - implemented but not in production)
- **15 tables** with full RLS policies (62 total policies)
- **3 role types**: ALUNO (student), PROFESSOR (teacher), ADMIN
- **Edge Functions**: `webhook-pagamento`, `ativacao-manual`
- **Storage buckets**: `soar-site` (public), `materiais`, `uploads-temporarios` (both private)

## Critical Patterns & Conventions

### 1. Branch Strategy (IMPORTANT)
```
main                    ← Production deployment
  └─ site-institucional ← CURRENT: MVP public site (no auth/backend)
       └─ developer     ← Full features with Supabase auth/admin
```
**Do NOT merge backend features to `site-institucional` without explicit approval.**

### 2. Data Management
- **Constants in `src/config/constants.ts`**: All static data (plans, teachers, studios, contact info)
- **Centralized contact config**: Use `CONTACT_CONFIG` object - never hardcode WhatsApp/email
- **Type definitions**: `src/config/types.ts` for frontend, `src/types/database.ts` for Supabase schemas

### 3. Component Structure
**Public Site Components** (`src/components/`):
- `Layout.tsx` - Wrapper with Navbar/Footer (no navigation props needed)
- `HeaderBanner.tsx` - Top banner with contact info
- Navigation via React Router `<Link to="/path">` components

**Protected Components** (developer branch):
- `AdminLayout.tsx` / `ProfessorLayout.tsx` - Sidebar layouts with `<Outlet />`
- `ProtectedRoute.tsx` - Guards with `requireAdmin` / `requireProfessor` props
- `AuthContext.tsx` - Provides `user`, `isAdmin`, `isProfessor`, `isAluno`

### 4. Service Layer Pattern
All Supabase operations go through service files:
- `src/services/auth.service.ts` - Authentication only
- `src/services/admin.service.ts` - 20+ admin CRUD methods (getDashboardStats, getAlunos, etc.)
- `src/services/professor.service.ts` - Class/student management
- **Never call `supabase.from()` directly in components** - always use service methods

### 5. Critical Business Logic

#### Automatic Slot Management
Planos (plans) have `vagas_max` / `vagas_ocupadas`. Triggers auto-increment/decrement on assinatura (subscription) status changes. **Never manually update vagas** - let triggers handle it.

#### Fixed Schedule System
- **Professor assigns schedule to student** (not student-selected)
- `grade_aluno` table defines weekly fixed schedule
- `agendamentos` table tracks actual class sessions

#### Content Visibility
Three levels: `PUBLICO` (all), `PLANO` (plan subscribers), `ALUNO` (specific students). RLS enforces via `visibilidade` column in `aulas` and `videos` tables.

## Development Workflows

### Run Locally
```bash
npm install
npm run dev  # Opens http://localhost:3000
```

### Build for Production
```bash
npm run build    # Creates optimized dist/ (manual chunks: vendor-react, vendor-supabase, etc.)
npm run preview  # Test production build locally
```

### Environment Variables
Required in `.env.local`:
```
VITE_SUPABASE_URL=https://pdoynmsyyhdkjmivyplg.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
GEMINI_API_KEY=<optional>
```

### Code Splitting Strategy (vite.config.ts)
Manual chunks optimize caching:
- `vendor-react` - React core (326KB)
- `vendor-router` - React Router
- `vendor-supabase` - Supabase SDK
- `components` - Shared components
- `public-pages` - Public site pages

**Target: ~120KB gzipped total bundle**

## Key Files Reference

### Essential Reading
- `supabase/docs/SUPABASE_IMPLEMENTATION.md` - Complete backend architecture
- `supabase/docs/ESTRUTURA_ADMIN.md` - Admin panel structure
- `README.md` - Deployment and bundle optimization details

### Typical Edit Targets
- **Add new page**: Add `<Route>` in `App.tsx` + create page component in `src/pages/`
- **Modify styles**: `tailwind.config.js` or inline Tailwind classes
- **Add navigation link**: Use `<Link to="/path">` in components (Navbar, Footer, etc.)
- **Add Supabase table**: Create migration in `supabase/migrations/`, update `src/types/database.ts`
- **New admin feature**: Extend `admin.service.ts` method + add page in `src/pages/admin/`

## Common Pitfalls

1. **Use React Router properly** - Always use `<Link to="/path">` for internal navigation, not `<a href>`
2. **Check current branch before adding auth code** - auth only exists in `developer` branch
3. **Never bypass service layer** - components shouldn't import `supabase` directly
4. **RLS policies are strict** - test with actual user roles, not service_role key
5. **Storage paths must match RLS policies** - see `arquivos` table `visibilidade` column
6. **SPA routing configured** - `vercel.json` has rewrites to handle client-side routing

## Testing Notes
- No automated tests currently implemented
- Manual testing workflow: Check `supabase/docs/FRONTEND_EXAMPLES.md` for API usage examples
- Use Supabase Dashboard SQL Editor to verify RLS policies: `SELECT * FROM <table>` as different roles

## Contact & Socials
All configured in `CONTACT_CONFIG` constant:
- WhatsApp: (35) 99129-5022
- Instagram: @soarmusicstudios
- Email: pliniofagundesdefaria@gmail.com

---

**When in doubt**: Check `supabase/docs/` for comprehensive backend documentation. The docs are well-maintained and explain all business logic decisions.
