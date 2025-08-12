# Mohammad Traboulsi - Portfolio Website

## Project Overview
This is a personal portfolio website for Mohammad Traboulsi, a Coastal and Civil Engineer specializing in Fluid Mechanics & Numerical Modeling. The site showcases his professional experience, skills, education, and contact information.

## Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: shadcn/ui (Radix-based component library)
- **Routing**: React Router DOM
- **State Management**: TanStack React Query
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with automated CI/CD

## Project Structure
```
src/
├── components/           # Main page sections
│   ├── About.tsx        # About section with professional focus and languages
│   ├── Contact.tsx      # Contact form and information
│   ├── Education.tsx    # Educational background
│   ├── Experience.tsx   # Professional experience and projects
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing hero section
│   ├── Skills.tsx       # Technical skills showcase
│   └── ui/             # Reusable UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main portfolio page
│   └── NotFound.tsx    # 404 page
├── App.tsx            # Main app component with routing
├── main.tsx           # App entry point with BrowserRouter
└── index.css          # Global styles and CSS variables
```

## Key Features
1. **Single Page Application**: Portfolio sections in one scrollable page
2. **Responsive Design**: Mobile-first approach with Tailwind CSS
3. **Custom Animations**: CSS animations for fade-up, float, and scroll effects
4. **Ocean/Coastal Theme**: Custom gradients and styling matching engineering focus
5. **Skills Visualization**: Interactive skill bars with proficiency levels
6. **Contact Form**: Integrated contact section
7. **Professional Sections**:
   - Hero with call-to-action buttons
   - About with professional focus and language skills
   - Technical skills with categories (Programming, Analysis, Tools)
   - Education timeline
   - Professional experience
   - Contact information

## Configuration Files
- **vite.config.ts**: Vite configuration with React SWC and path aliases
- **tailwind.config.ts**: Custom theme with ocean/coastal colors and animations
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration

## Deployment
- **GitHub Actions**: Automated deployment to GitHub Pages
- **Workflow**: Build on push to main, deploy to github-pages environment
- **SPA Support**: 404.html fallback for client-side routing

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Content Focus
The website showcases Mohammad Traboulsi's expertise in:
- Coastal and Civil Engineering
- Fluid Mechanics and Numerical Modeling
- OpenFOAM and Telemac simulation software
- Python, MATLAB, and data analysis
- Research in sediment transport and turbulence
- PhD research at Université Grenoble Alpes

## Design Theme
- **Color Scheme**: Ocean/coastal inspired with blues and gradients
- **Typography**: Inter font family with custom sizing
- **Animations**: Floating elements, fade-up transitions, smooth scrolling
- **Layout**: Clean, professional, section-based navigation

## Recent Changes
- Removed BrowserRouter wrapper from App component (routing now handled in main.tsx)
- Maintained single-page portfolio structure with smooth scrolling navigation