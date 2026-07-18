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
  language: "fr",
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
    "hero.subtitle": "Coastal Risk Engineer, PhD",
    "hero.specialization": "Numerical modelling of shoreline evolution for climate risk & coastal engineering projects",
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
    "spotlight.videoTitle": "Research Explanation Video",
    "spotlight.playVideo": "Play video",
    "spotlight.openYoutube": "Open on YouTube",
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
    "spotlight.publishedIn": "Published in Environmental Modelling & Software (2025) • Research conducted at BRGM & University of Bordeaux",

    // Skills Section
    "skills.title": "Technical Skills",
    "skills.description": "Comprehensive expertise across programming languages, analytical tools, and specialized engineering software for coastal and environmental modeling.",
    "skills.programming": "Programming",
    "skills.analysis": "Analysis & Modeling",
    "skills.tools": "Tools & Technologies",
    "skills.keywords": "Research Keywords",

    // Projects Section  
    "projects.title": "Projects",
    "projects.description": "Open-source coastal engineering models and tools, alongside earlier data-analysis work.",
    "projects.viewProject": "View Project",

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
    "experience.description": "Professional experience in coastal risk engineering and climate change impact assessment at leading French research and engineering institutions.",
    "linkedinFeed.title": "Recent LinkedIn Posts",
    "linkedinFeed.description": "Recent professional updates and research notes from LinkedIn.",
    "linkedinFeed.viewPost": "View post",

    // Education Section
    "education.title": "Education", 
    "education.description": "A progressive academic journey through specialized programs in coastal engineering, fluid mechanics, and computational methods across multiple international institutions.",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "Interested in collaboration, research opportunities, or discussing coastal engineering projects? I'd love to hear from you.",
    "contact.getInTouch": "Get In Touch",
    "contact.location": "Location",
    "contact.locationDetail": "France",
    "contact.followMe": "Follow Me",
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
    "contact.replyTime": "I usually reply within 2 business days.",
    "contact.formLabels.name": "Name",
    "contact.formLabels.email": "Email", 
    "contact.formLabels.organization": "Organization",
    "contact.formLabels.role": "Role/Title",
    "contact.formLabels.phone": "Phone Number",
    "contact.formLabels.purpose": "Purpose",
    "contact.formLabels.message": "Message",
    "contact.formLabels.required": "*",
    "contact.form.purposePlaceholder": "Select the purpose of your message",
    "contact.form.messagePlaceholder": "Please provide details about your inquiry...",
    "contact.form.sending": "Sending...",
    "contact.form.sendButton": "Send Message",
    "contact.form.successTitle": "Message sent successfully!",
    "contact.form.successMessage": "Thank you! Your message has been sent successfully. I usually reply within 2 business days.",
    "contact.form.successNote": "If you don't hear back within 2 business days, email me at traboulsimohamed@gmail.com",
    "contact.form.errorTitle": "Failed to send message",
    "contact.form.tryAgain": "Try Again",
    "contact.form.validation.nameRequired": "Name is required",
    "contact.form.validation.emailRequired": "Email is required",
    "contact.form.validation.emailInvalid": "Please enter a valid email address",
    "contact.form.validation.purposeRequired": "Please select a purpose for your message",
    "contact.form.validation.messageRequired": "Message is required",
    "contact.form.validation.messageMinLength": "Message must be at least 10 characters long",
    "contact.form.validation.phoneInvalid": "Please enter a valid phone number",
    "contact.purpose.collaboration": "Research Collaboration",
    "contact.purpose.inquiry": "Research Inquiry", 
    "contact.purpose.speaking": "Speaking Opportunity",
    "contact.purpose.job": "Job Opportunity",
    "contact.purpose.media": "Media/Interview",
    "contact.purpose.other": "Other",
    "contact.purposeHint.collaboration": "Joint research projects, data sharing, or academic partnerships",
    "contact.purposeHint.inquiry": "Questions about my research, methodologies, or published work",
    "contact.purposeHint.speaking": "Conference presentations, workshops, or academic talks",
    "contact.purposeHint.job": "Employment opportunities, consulting, or project proposals", 
    "contact.purposeHint.media": "Interviews, articles, or media appearances",
    "contact.purposeHint.other": "General inquiries or topics not covered above",

    // About Section
    "about.title": "About Me",
    "about.description": "Passionate coastal and civil engineer with expertise in fluid mechanics, numerical modeling, and data analysis. Currently pursuing advanced research in environmental fluid mechanics at Université Grenoble Alpes.",
    "about.professionalFocus": "Professional Focus",
    "about.professionalFocusText1": "My work centers on understanding and modeling complex fluid dynamics in coastal and civil engineering applications. I specialize in sediment transport, turbulence analysis, and the development of numerical models to predict environmental changes and their impacts on coastal infrastructure.",
    "about.professionalFocusText2": "With extensive experience in both experimental and computational approaches, I bridge the gap between theoretical research and practical engineering solutions.",
    "about.basedInFrance": "Based in France",
    "about.languages": "Languages",
    "about.keyAchievements": "Key Achievements",
    "about.crnaGrant": "CRNA Grant Scholarship Recipient",
    "about.rankedFirst": "Ranked 1st in Master's Program (Très Bien)",
    "about.publishedResearch": "Published Research in International Journal",
    "about.bootcampGraduate": "Data Analysis & ML Bootcamp Graduate",

    // Skills Section
    "skills.clickToSeeMore": "Click on any skill to see applications and recent projects",
    "skills.applications": "Applications:",
    "skills.recentProjects": "Recent Projects:",
    "skills.programmingTitle": "Programming",
    "skills.analysisTitle": "Analysis & Modeling",
    "skills.toolsTitle": "Tools & Technologies",

    // Experience Section
    "experience.errorLoading": "Error loading experience data:",

    // Publications Extra
    "publications.lastUpdated": "Last updated:",
    "publications.unableToLoad": "Unable to Load Publications",
    "publications.dataUpdatedWeekly": "Publications data is automatically updated weekly from OpenAlex. Please try again later.",
    "publications.citations": "Citations",
    "publications.openAccess": "Open Access",
    "publications.categories": "Categories",

    // Footer
    "footer.copyright": "Mohammad Traboulsi. All rights reserved.",
    "footer.description": "Coastal Risk Engineer • Numerical Modelling for Climate Adaptation",

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
    "hero.subtitle": "Ingénieur des Risques Côtiers, Docteur",
    "hero.specialization": "Modélisation numérique de l'évolution du littoral pour les risques climatiques et projets d'ingénierie côtière",
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
    "spotlight.videoTitle": "Vidéo d'explication de la recherche",
    "spotlight.playVideo": "Lire la vidéo",
    "spotlight.openYoutube": "Ouvrir sur YouTube",
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
    "spotlight.publishedIn": "Publié dans Environmental Modelling & Software (2025) • Recherche menée au BRGM & Université de Bordeaux",

    // Skills Section
    "skills.title": "Compétences Techniques",
    "skills.description": "Expertise complète dans les langages de programmation, les outils analytiques et les logiciels d'ingénierie spécialisés pour la modélisation côtière et environnementale.",
    "skills.programming": "Programmation",
    "skills.analysis": "Analyse et Modélisation",
    "skills.tools": "Outils et Technologies",
    "skills.keywords": "Mots-clés de Recherche",

    // Projects Section
    "projects.title": "Projets",
    "projects.description": "Modèles et outils open-source en ingénierie côtière, ainsi que des travaux antérieurs d'analyse de données.",
    "projects.viewProject": "Voir le Projet",

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
    "experience.description": "Expérience professionnelle en ingénierie des risques côtiers et évaluation de l'impact du changement climatique au sein d'institutions françaises de recherche et d'ingénierie de premier plan.",
    "linkedinFeed.title": "Publications LinkedIn récentes",
    "linkedinFeed.description": "Mises à jour professionnelles et notes de recherche récentes depuis LinkedIn.",
    "linkedinFeed.viewPost": "Voir la publication",

    // Education Section
    "education.title": "Formation",
    "education.description": "Un parcours académique progressif à travers des programmes spécialisés en ingénierie côtière, mécanique des fluides et méthodes computationnelles dans plusieurs institutions internationales.",

    // Contact Section
    "contact.title": "Me Contacter",
    "contact.description": "Intéressé par une collaboration, des opportunités de recherche ou pour discuter de projets d'ingénierie côtière ? J'aimerais avoir de vos nouvelles.",
    "contact.getInTouch": "Me Contacter",
    "contact.location": "Localisation",
    "contact.locationDetail": "France",
    "contact.followMe": "Me Suivre",
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
    "contact.replyTime": "Je réponds habituellement sous 2 jours ouvrables.",
    "contact.formLabels.name": "Nom",
    "contact.formLabels.email": "Email",
    "contact.formLabels.organization": "Organisation",
    "contact.formLabels.role": "Rôle/Titre",
    "contact.formLabels.phone": "Numéro de Téléphone",
    "contact.formLabels.purpose": "Objectif",
    "contact.formLabels.message": "Message",
    "contact.formLabels.required": "*",
    "contact.form.purposePlaceholder": "Sélectionnez l'objectif de votre message",
    "contact.form.messagePlaceholder": "Veuillez fournir des détails sur votre demande...",
    "contact.form.sending": "Envoi en cours...",
    "contact.form.sendButton": "Envoyer le Message",
    "contact.form.successTitle": "Message envoyé avec succès !",
    "contact.form.successMessage": "Merci ! Votre message a été envoyé avec succès. Je réponds habituellement sous 2 jours ouvrables.",
    "contact.form.successNote": "Si vous n'avez pas de réponse sous 2 jours ouvrables, écrivez-moi à traboulsimohamed@gmail.com",
    "contact.form.errorTitle": "Échec de l'envoi du message",
    "contact.form.tryAgain": "Réessayer",
    "contact.form.validation.nameRequired": "Le nom est requis",
    "contact.form.validation.emailRequired": "L'email est requis",
    "contact.form.validation.emailInvalid": "Veuillez entrer une adresse email valide",
    "contact.form.validation.purposeRequired": "Veuillez sélectionner un objectif pour votre message",
    "contact.form.validation.messageRequired": "Le message est requis",
    "contact.form.validation.messageMinLength": "Le message doit contenir au moins 10 caractères",
    "contact.form.validation.phoneInvalid": "Veuillez entrer un numéro de téléphone valide",
    "contact.purpose.collaboration": "Collaboration de Recherche",
    "contact.purpose.inquiry": "Demande de Recherche",
    "contact.purpose.speaking": "Opportunité de Conférence",
    "contact.purpose.job": "Opportunité d'Emploi",
    "contact.purpose.media": "Médias/Interview",
    "contact.purpose.other": "Autre",
    "contact.purposeHint.collaboration": "Projets de recherche conjoints, partage de données ou partenariats académiques",
    "contact.purposeHint.inquiry": "Questions sur mes recherches, méthodologies ou travaux publiés",
    "contact.purposeHint.speaking": "Présentations de conférence, ateliers ou conférences académiques",
    "contact.purposeHint.job": "Opportunités d'emploi, conseil ou propositions de projets",
    "contact.purposeHint.media": "Interviews, articles ou apparitions médiatiques",
    "contact.purposeHint.other": "Demandes générales ou sujets non couverts ci-dessus",

    // About Section
    "about.title": "À Propos de Moi",
    "about.description": "Ingénieur côtier et civil passionné avec une expertise en mécanique des fluides, modélisation numérique et analyse de données. Actuellement en cours de recherche avancée en mécanique des fluides environnementale à l'Université Grenoble Alpes.",
    "about.professionalFocus": "Orientation Professionnelle",
    "about.professionalFocusText1": "Mon travail se concentre sur la compréhension et la modélisation de la dynamique complexe des fluides dans les applications d'ingénierie côtière et civile. Je me spécialise dans le transport sédimentaire, l'analyse de la turbulence et le développement de modèles numériques pour prédire les changements environnementaux et leurs impacts sur l'infrastructure côtière.",
    "about.professionalFocusText2": "Avec une vaste expérience dans les approches expérimentales et computationnelles, je fais le lien entre la recherche théorique et les solutions d'ingénierie pratiques.",
    "about.basedInFrance": "Basé en France",
    "about.languages": "Langues",
    "about.keyAchievements": "Réalisations Clés",
    "about.crnaGrant": "Récipiendaire de la Bourse CRNA",
    "about.rankedFirst": "Classé 1er du Programme de Master (Très Bien)",
    "about.publishedResearch": "Recherche Publiée dans une Revue Internationale",
    "about.bootcampGraduate": "Diplômé du Bootcamp d'Analyse de Données et ML",

    // Skills Section
    "skills.clickToSeeMore": "Cliquez sur une compétence pour voir les applications et projets récents",
    "skills.applications": "Applications :",
    "skills.recentProjects": "Projets Récents :",
    "skills.programmingTitle": "Programmation",
    "skills.analysisTitle": "Analyse et Modélisation",
    "skills.toolsTitle": "Outils et Technologies",

    // Experience Section
    "experience.errorLoading": "Erreur de chargement des données d'expérience :",

    // Publications Extra
    "publications.lastUpdated": "Dernière mise à jour :",
    "publications.unableToLoad": "Impossible de Charger les Publications",
    "publications.dataUpdatedWeekly": "Les données de publications sont automatiquement mises à jour chaque semaine depuis OpenAlex. Veuillez réessayer plus tard.",
    "publications.citations": "Citations",
    "publications.openAccess": "Accès Libre",
    "publications.categories": "Catégories",

    // Footer
    "footer.copyright": "Mohammad Traboulsi. Tous droits réservés.",
    "footer.description": "Ingénieur des Risques Côtiers • Modélisation Numérique pour l'Adaptation Climatique",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.france": "France",
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = "fr",
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
