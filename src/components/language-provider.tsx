import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "fr"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: (key: string) => key,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.skills": "Skills",
    "nav.projects": "Projects", 
    "nav.publications": "Publications",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Mohammad Traboulsi",
    "hero.subtitle": "Coastal and Civil Engineer",
    "hero.specialization": "Specialized in Fluid Mechanics & Numerical Modeling",
    "hero.watchVideo": "Watch my research explained in few minutes",
    "hero.getInTouch": "Get In Touch",
    "hero.viewWork": "View Work",

    // Spotlight Section
    "spotlight.badge": "Research Spotlight",
    "spotlight.title": "Latest Research",
    "spotlight.description": "Watch an in-depth explanation of our latest coastal modeling research and the development of the LX-ST coupled model for shoreline evolution prediction.",
    "spotlight.articleTitle": "LX-ST Coupled Model Development",
    "spotlight.date": "December 2024",
    "spotlight.author": "Mohammad Traboulsi",
    "spotlight.videoDescription": "This video provides a comprehensive explanation of the LX-ST coupled model development for simulating long-term shoreline morphological evolution under climate change scenarios. Learn about the integration of longitudinal and cross-shore sediment transport mechanisms.",
    "spotlight.keyTopics": "Key Topics Covered:",
    "spotlight.topic1": "LX-ST model architecture and coupling methodology",
    "spotlight.topic2": "Multi-scenario climate impact simulations (SSP2-4.5, SSP5-8.5)",
    "spotlight.topic3": "Application to Lacanau site with sensitivity analysis",
    "spotlight.topic4": "Sediment transport integration and validation results",
    "spotlight.relatedResources": "Related Resources",
    "spotlight.viewPublication": "View Full Publication",
    "spotlight.relatedWork": "See Related Work at BRGM",
    "spotlight.researchImpact": "Research Impact",
    "spotlight.coverage": "Lacanau Site Coverage",
    "spotlight.scenarios": "Climate Scenarios",
    "spotlight.projection": "Projection Year",
    "spotlight.institution": "Research Institution",

    // Skills Section
    "skills.title": "Technical Skills",
    "skills.description": "Comprehensive expertise across programming languages, analytical tools, and specialized engineering software for coastal and environmental modeling.",
    "skills.programming": "Programming",
    "skills.analysis": "Analysis & Modeling",
    "skills.tools": "Tools & Technologies",
    "skills.keywords": "Research Keywords",

    // Projects Section  
    "projects.title": "Projects",
    "projects.description": "A collection of data science and technical projects showcasing expertise in machine learning, data analysis, and statistical modeling.",
    "projects.viewProject": "View Project",
    "projects.viewAll": "View All Projects on GitHub",

    // Publications Section
    "publications.title": "Publications & Research",
    "publications.description": "Research contributions in coastal engineering, fluid mechanics, and climate change impact assessment across international journals, conferences, and technical reports.",
    "publications.all": "All",
    "publications.journal": "Journal Papers",
    "publications.conference": "Conference Papers", 
    "publications.thesis": "Thesis",
    "publications.preprints": "Preprints",
    "publications.viewPublication": "View Publication",
    "publications.researchImpact": "Research Impact",
    "publications.publicationsCount": "Publications",
    "publications.projectsCount": "Research Projects",
    "publications.institutionsCount": "Institutions",
    "publications.phdStart": "Started PhD",

    // Experience Section
    "experience.title": "Professional Experience",
    "experience.description": "Hands-on experience in coastal engineering research and climate change impact assessment through internships at leading French research institutions.",

    // Education Section
    "education.title": "Education", 
    "education.description": "A progressive academic journey through specialized programs in coastal engineering, fluid mechanics, and computational methods across multiple international institutions.",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "Interested in collaboration, research opportunities, or discussing coastal engineering projects? I'd love to hear from you.",
    "contact.information": "Contact Information",
    "contact.researchAreas": "Research Areas",
    "contact.availableFor": "Available For",
    "contact.collaborations": "Research Collaborations",
    "contact.consulting": "Technical Consulting", 
    "contact.speaking": "Conference Speaking",
    "contact.partnerships": "Academic Partnerships",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.namePlaceholder": "Your full name",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.subjectPlaceholder": "Brief subject of your message",
    "contact.messagePlaceholder": "Tell me about your project, collaboration idea, or question...",
    "contact.sendButton": "Send Message",
    "contact.preparing": "Preparing Message...",
    "contact.emailNote": "Your message will open in your default email client",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.france": "France",
  },
  fr: {
    // Navigation
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.publications": "Publications", 
    "nav.experience": "Expérience",
    "nav.education": "Formation",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Mohammad Traboulsi",
    "hero.subtitle": "Ingénieur Côtier et Civil",
    "hero.specialization": "Spécialisé en Mécanique des Fluides et Modélisation Numérique",
    "hero.watchVideo": "Regarder ma recherche expliquée en quelques minutes",
    "hero.getInTouch": "Me Contacter",
    "hero.viewWork": "Voir Mon Travail",

    // Spotlight Section
    "spotlight.badge": "Recherche à l'Honneur",
    "spotlight.title": "Dernière Recherche",
    "spotlight.description": "Regardez une explication approfondie de nos dernières recherches en modélisation côtière et le développement du modèle couplé LX-ST pour la prédiction de l'évolution du littoral.",
    "spotlight.articleTitle": "Développement du Modèle Couplé LX-ST", 
    "spotlight.date": "Décembre 2024",
    "spotlight.author": "Mohammad Traboulsi",
    "spotlight.videoDescription": "Cette vidéo fournit une explication complète du développement du modèle couplé LX-ST pour simuler l'évolution morphologique à long terme du littoral sous les scénarios de changement climatique. Découvrez l'intégration des mécanismes de transport sédimentaire longitudinal et transversal.",
    "spotlight.keyTopics": "Sujets Clés Couverts :",
    "spotlight.topic1": "Architecture du modèle LX-ST et méthodologie de couplage",
    "spotlight.topic2": "Simulations d'impact climatique multi-scénarios (SSP2-4.5, SSP5-8.5)",
    "spotlight.topic3": "Application au site de Lacanau avec analyse de sensibilité",
    "spotlight.topic4": "Intégration du transport sédimentaire et résultats de validation",
    "spotlight.relatedResources": "Ressources Connexes",
    "spotlight.viewPublication": "Voir la Publication Complète",
    "spotlight.relatedWork": "Voir les Travaux Connexes au BRGM",
    "spotlight.researchImpact": "Impact de la Recherche",
    "spotlight.coverage": "Couverture du Site de Lacanau",
    "spotlight.scenarios": "Scénarios Climatiques",
    "spotlight.projection": "Année de Projection",
    "spotlight.institution": "Institution de Recherche",

    // Skills Section
    "skills.title": "Compétences Techniques",
    "skills.description": "Expertise complète dans les langages de programmation, les outils analytiques et les logiciels d'ingénierie spécialisés pour la modélisation côtière et environnementale.",
    "skills.programming": "Programmation",
    "skills.analysis": "Analyse et Modélisation",
    "skills.tools": "Outils et Technologies",
    "skills.keywords": "Mots-clés de Recherche",

    // Projects Section
    "projects.title": "Projets",
    "projects.description": "Une collection de projets de science des données et techniques démontrant une expertise en apprentissage automatique, analyse de données et modélisation statistique.",
    "projects.viewProject": "Voir le Projet",
    "projects.viewAll": "Voir Tous les Projets sur GitHub",

    // Publications Section
    "publications.title": "Publications et Recherche",
    "publications.description": "Contributions de recherche en ingénierie côtière, mécanique des fluides et évaluation de l'impact du changement climatique dans des revues internationales, conférences et rapports techniques.",
    "publications.all": "Tous",
    "publications.journal": "Articles de Revue",
    "publications.conference": "Articles de Conférence",
    "publications.thesis": "Thèse",
    "publications.preprints": "Prépublications",
    "publications.viewPublication": "Voir la Publication",
    "publications.researchImpact": "Impact de la Recherche",
    "publications.publicationsCount": "Publications",
    "publications.projectsCount": "Projets de Recherche",
    "publications.institutionsCount": "Institutions",
    "publications.phdStart": "Début du Doctorat",

    // Experience Section
    "experience.title": "Expérience Professionnelle",
    "experience.description": "Expérience pratique en recherche d'ingénierie côtière et évaluation de l'impact du changement climatique grâce à des stages dans des institutions de recherche françaises de premier plan.",

    // Education Section
    "education.title": "Formation",
    "education.description": "Un parcours académique progressif à travers des programmes spécialisés en ingénierie côtière, mécanique des fluides et méthodes computationnelles dans plusieurs institutions internationales.",

    // Contact Section
    "contact.title": "Me Contacter",
    "contact.description": "Intéressé par une collaboration, des opportunités de recherche ou pour discuter de projets d'ingénierie côtière ? J'aimerais avoir de vos nouvelles.",
    "contact.information": "Informations de Contact",
    "contact.researchAreas": "Domaines de Recherche",
    "contact.availableFor": "Disponible Pour",
    "contact.collaborations": "Collaborations de Recherche",
    "contact.consulting": "Conseil Technique",
    "contact.speaking": "Conférences",
    "contact.partnerships": "Partenariats Académiques",
    "contact.sendMessage": "Envoyer un Message",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.subject": "Sujet",
    "contact.message": "Message",
    "contact.namePlaceholder": "Votre nom complet",
    "contact.emailPlaceholder": "votre.email@exemple.com",
    "contact.subjectPlaceholder": "Bref sujet de votre message",
    "contact.messagePlaceholder": "Parlez-moi de votre projet, idée de collaboration ou question...",
    "contact.sendButton": "Envoyer le Message",
    "contact.preparing": "Préparation du Message...",
    "contact.emailNote": "Votre message s'ouvrira dans votre client email par défaut",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.france": "France",
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "portfolio-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("lang", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language)
      setLanguage(language)
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}