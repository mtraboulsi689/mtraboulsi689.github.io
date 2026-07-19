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
    "nav.services": "What I Do",
    "nav.projects": "Projects",
    "nav.publications": "Publications",
    "nav.experience": "Case Studies",
    "nav.education": "Education",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero Section
    "hero.subtitle": "Consulting engineer — coastal & shoreline modelling",
    "hero.specialization": "I help engineering firms and coastal territories quantify shoreline retreat under sea-level rise, with numerical models I build and validate myself.",
    "hero.credentials": "Developer of the LX-ST shoreline evolution model · Coastal Risk Engineer at BRGM",
    "hero.watchVideo": "See the model in action (3 min)",
    "hero.getInTouch": "Discuss your project",
    "hero.viewWork": "See how I work",
    "hero.stats.modelledLabel": "coastline modelled",
    "hero.stats.horizonLabel": "projection horizon",
    "hero.stats.scenariosLabel": "climate scenarios",
    "hero.stats.published": "Env. Modelling & Software, 2025",
    "hero.stats.publishedLabel": "Latest publication",

    // What I Do Section
    "whatIDo.title": "What I Do",
    "whatIDo.description": "Three ways to work with me, from a single projection to a full model built for your site.",
    "whatIDo.studies.title": "Shoreline & Coastal Evolution Studies",
    "whatIDo.studies.description": "Trait-de-côte projections at 30- and 100-year horizons, with uncertainty bands, for regulatory studies and adaptation planning.",
    "whatIDo.modelDev.title": "Model Development & Engineering",
    "whatIDo.modelDev.description": "Custom morphodynamic models, MATLAB-to-Fortran/Python industrialization, and coupled Telemac systems built for your case.",
    "whatIDo.review.title": "Expert Review & Training",
    "whatIDo.review.description": "Independent audits of existing coastal models, and hands-on training in Telemac and shoreline-modelling methods.",

    // Spotlight Section
    "spotlight.badge": "Research Spotlight",
    "spotlight.articleTitle": "LX-ST Coupled Model Development",
    "spotlight.videoDescription": "This video provides a comprehensive explanation of the LX-ST coupled model development for simulating long-term shoreline morphological evolution under climate change scenarios. Learn about the integration of longitudinal and cross-shore sediment transport mechanisms.",
    "spotlight.videoTitle": "Research Explanation Video",
    "spotlight.playVideo": "Play video",
    "spotlight.openYoutube": "Open on YouTube",
    "spotlight.coverage": "Lacanau Site Coverage",
    "spotlight.scenarios": "Climate Scenarios",
    "spotlight.projection": "Projection Year",
    "spotlight.institution": "Research Institution",
    "spotlight.publishedIn": "Published in Environmental Modelling & Software (2025) • Research conducted at BRGM & University of Bordeaux",

    // Skills Section
    "skills.title": "Technical Skills",

    // Projects Section
    "projects.title": "Open Source",
    "projects.description": "Coastal engineering models and tools, released as working code.",

    // Publications Section
    "publications.title": "Publications & Research",
    "publications.description": "Research contributions in coastal engineering, fluid mechanics, and climate change impact assessment across international journals, conferences, and technical reports.",
    "publications.publicationsCount": "Publications",

    // Experience Section
    "experience.title": "Case Studies",
    "experience.description": "Selected engineering work: the problem, the model, and the result — at BRGM and Cerema.",
    "experience.caseStudyLabel": "The Case Study",
    "linkedinFeed.title": "Recent LinkedIn Posts",
    "linkedinFeed.description": "Recent professional updates and research notes from LinkedIn.",
    "linkedinFeed.viewPost": "View post",

    // Education Section
    "education.title": "Education",
    "education.description": "A progressive academic journey through specialized programs in coastal engineering, fluid mechanics, and computational methods across multiple international institutions.",
    "education.highlightsLabel": "Key Highlights",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.description": "Interested in collaboration, research opportunities, or discussing coastal engineering projects? I'd love to hear from you.",
    "contact.location": "Location",
    "contact.locationDetail": "France",
    "contact.sendMessage": "Send a Message",
    "contact.replyTime": "I usually reply within 2 business days.",
    "contact.formLabels.name": "Name",
    "contact.formLabels.email": "Email", 
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
    "about.description": "I build the models that tell coastal decision-makers where their shoreline will be in 2100 — and how much to trust that answer.",
    "about.professionalFocus": "Who I Am",
    "about.professionalFocusText1": "I trained as a civil engineer in Lebanon and followed the water to France, where I earned my PhD at BRGM and the University of Bordeaux working on one question: how do sandy coasts respond to a rising sea, over decades, at the scale where planning decisions are made?",
    "about.professionalFocusText2": "My answer is LX-ST, a shoreline-evolution model that couples cross-shore and longshore sediment transport. I built it, validated it on 5 km of coastline at Lacanau, ran it to 2100 under three climate scenarios, and published the method in Environmental Modelling & Software. Before that, I stress-tested France's largest estuary with Telemac at Cerema, and turned published research code into fast, portable engineering software.",
    "about.professionalFocusText3": "What drives me is the last mile: the distance between a peer-reviewed model and a decision a coastal community can defend. That is where I work — fluent in the equations, the code, and the conversation with the people who need the answer as a map, not a matrix. In Arabic, English, or French.",
    "about.basedInFrance": "Based in France",
    "about.languages": "Languages",
    "about.languagesText": "Arabic (native) · English (fluent) · French (professional)",
    "about.keyAchievements": "Highlights",
    "about.highlight1": "Developer of the LX-ST shoreline evolution model",
    "about.highlight2": "Published in Environmental Modelling & Software (2025)",
    "about.highlight3": "Contributor to French national climate-adaptation studies",
    "about.institutionsLabel": "Institutions",
    "about.institutionsList": "BRGM · Cerema · University of Bordeaux · EPOC",
    "about.thesisLink": "PhD Thesis (theses.fr)",
    "about.photoAlt": "Portrait of Mohammad Traboulsi",

    // Skills Section
    "skills.programmingTitle": "Programming",
    "skills.analysisTitle": "Analysis & Modeling",
    "skills.toolsTitle": "Tools & Technologies",

    // Experience Section
    "experience.errorLoading": "Error loading experience data:",
    "experience.present": "Present",

    // Publications Extra
    "publications.lastUpdated": "Last updated:",
    "publications.unableToLoad": "Unable to Load Publications",
    "publications.dataUpdatedWeekly": "Publications data is automatically updated weekly from OpenAlex. Please try again later.",
    "publications.citations": "Citations",
    "publications.openAccess": "Open Access",
    "publications.categories": "Categories",
    "publications.moreAuthors": "more",
    "publications.showLessAuthors": "show less",
    "publications.readAbstract": "Read full abstract",
    "publications.showLessAbstract": "Show less",
    "publications.copyDoi": "Click to copy DOI",
    "publications.doiCopied": "DOI copied!",
    "publications.category.article": "Article",
    "publications.category.preprint": "Preprint",
    "publications.category.conference": "Conference",

    // Footer
    "footer.copyright": "Mohammad Traboulsi. All rights reserved.",
    "footer.description": "Consulting engineer — coastal & shoreline modelling. I help engineering firms and coastal territories quantify shoreline retreat under sea-level rise.",
    "footer.navigate": "Navigate",
    "footer.documents": "Documents",
    "footer.cv": "CV (PDF)",
    "footer.capabilities": "Capability statement (PDF)",
    "footer.autoUpdated": "publications auto-updated weekly from OpenAlex",

    // Common
    "common.loading": "Loading...",
  },
  fr: {
    // Navigation
    "nav.services": "Ce Que Je Fais",
    "nav.projects": "Projets",
    "nav.publications": "Publications",
    "nav.experience": "Études de Cas",
    "nav.education": "Formation",
    "nav.about": "À Propos",
    "nav.contact": "Contact",

    // Hero Section
    "hero.subtitle": "Ingénieur conseil — modélisation côtière et littorale",
    "hero.specialization": "J'aide les bureaux d'études et les territoires littoraux à quantifier le recul du trait de côte sous l'effet de la montée du niveau marin, avec des modèles numériques que je développe et valide moi-même.",
    "hero.credentials": "Développeur du modèle d'évolution du littoral LX-ST · Ingénieur des risques côtiers au BRGM",
    "hero.watchVideo": "Voir le modèle en action (3 min)",
    "hero.getInTouch": "Discuter de votre projet",
    "hero.viewWork": "Voir comment je travaille",
    "hero.stats.modelledLabel": "de littoral modélisés",
    "hero.stats.horizonLabel": "horizon de projection",
    "hero.stats.scenariosLabel": "scénarios climatiques",
    "hero.stats.published": "Env. Modelling & Software, 2025",
    "hero.stats.publishedLabel": "Dernière publication",

    // What I Do Section
    "whatIDo.title": "Ce Que Je Fais",
    "whatIDo.description": "Trois façons de travailler avec moi, d'une simple projection à un modèle complet conçu pour votre site.",
    "whatIDo.studies.title": "Études d'Évolution Côtière et Littorale",
    "whatIDo.studies.description": "Projections du trait de côte à 30 et 100 ans, avec bandes d'incertitude, pour les études réglementaires et la planification de l'adaptation.",
    "whatIDo.modelDev.title": "Développement de Modèles & Ingénierie",
    "whatIDo.modelDev.description": "Modèles morphodynamiques sur mesure, industrialisation MATLAB vers Fortran/Python, et systèmes Telemac couplés conçus pour votre cas.",
    "whatIDo.review.title": "Expertise & Formation",
    "whatIDo.review.description": "Audits indépendants de modèles côtiers existants, et formations pratiques à Telemac et aux méthodes de modélisation du littoral.",

    // Spotlight Section
    "spotlight.badge": "Recherche à l'Honneur",
    "spotlight.articleTitle": "Développement du Modèle Couplé LX-ST", 
    "spotlight.videoDescription": "Cette vidéo fournit une explication complète du développement du modèle couplé LX-ST pour simuler l'évolution morphologique à long terme du littoral sous les scénarios de changement climatique. Découvrez l'intégration des mécanismes de transport sédimentaire longitudinal et transversal.",
    "spotlight.videoTitle": "Vidéo d'explication de la recherche",
    "spotlight.playVideo": "Lire la vidéo",
    "spotlight.openYoutube": "Ouvrir sur YouTube",
    "spotlight.coverage": "Couverture du Site de Lacanau",
    "spotlight.scenarios": "Scénarios Climatiques",
    "spotlight.projection": "Année de Projection",
    "spotlight.institution": "Institution de Recherche",
    "spotlight.publishedIn": "Publié dans Environmental Modelling & Software (2025) • Recherche menée au BRGM & Université de Bordeaux",

    // Skills Section
    "skills.title": "Compétences Techniques",

    // Projects Section
    "projects.title": "Open Source",
    "projects.description": "Modèles et outils d'ingénierie côtière, publiés sous forme de code fonctionnel.",

    // Publications Section
    "publications.title": "Publications et Recherche",
    "publications.description": "Contributions de recherche en ingénierie côtière, mécanique des fluides et évaluation de l'impact du changement climatique dans des revues internationales, conférences et rapports techniques.",
    "publications.publicationsCount": "Publications",

    // Experience Section
    "experience.title": "Études de Cas",
    "experience.description": "Travaux d'ingénierie sélectionnés : le problème, le modèle, et le résultat — au BRGM et au Cerema.",
    "experience.caseStudyLabel": "L'Étude de Cas",
    "linkedinFeed.title": "Publications LinkedIn récentes",
    "linkedinFeed.description": "Mises à jour professionnelles et notes de recherche récentes depuis LinkedIn.",
    "linkedinFeed.viewPost": "Voir la publication",

    // Education Section
    "education.title": "Formation",
    "education.description": "Un parcours académique progressif à travers des programmes spécialisés en ingénierie côtière, mécanique des fluides et méthodes computationnelles dans plusieurs institutions internationales.",
    "education.highlightsLabel": "Points Clés",

    // Contact Section
    "contact.title": "Me Contacter",
    "contact.description": "Intéressé par une collaboration, des opportunités de recherche ou pour discuter de projets d'ingénierie côtière ? J'aimerais avoir de vos nouvelles.",
    "contact.location": "Localisation",
    "contact.locationDetail": "France",
    "contact.sendMessage": "Envoyer un Message",
    "contact.replyTime": "Je réponds habituellement sous 2 jours ouvrables.",
    "contact.formLabels.name": "Nom",
    "contact.formLabels.email": "Email",
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
    "about.description": "Je construis les modèles qui indiquent aux décideurs du littoral où sera leur trait de côte en 2100 — et quelle confiance accorder à cette réponse.",
    "about.professionalFocus": "Qui Je Suis",
    "about.professionalFocusText1": "Ingénieur civil de formation au Liban, j'ai suivi l'eau jusqu'en France, où j'ai obtenu mon doctorat au BRGM et à l'Université de Bordeaux en travaillant sur une seule question : comment les côtes sableuses répondent-elles à la montée du niveau marin, sur des décennies, à l'échelle où se prennent les décisions d'aménagement ?",
    "about.professionalFocusText2": "Ma réponse s'appelle LX-ST, un modèle d'évolution du littoral qui couple le transport sédimentaire transversal et longitudinal. Je l'ai construit, validé sur 5 km de côte à Lacanau, projeté jusqu'en 2100 sous trois scénarios climatiques, et publié la méthode dans Environmental Modelling & Software. Auparavant, j'ai soumis le plus grand estuaire de France à des tests de résistance climatique avec Telemac au Cerema, et transformé du code de recherche publié en logiciel d'ingénierie rapide et portable.",
    "about.professionalFocusText3": "Ce qui me motive, c'est le dernier kilomètre : la distance entre un modèle validé par les pairs et une décision qu'une collectivité littorale peut défendre. C'est là que je travaille — à l'aise dans les équations, dans le code, et dans la conversation avec ceux qui ont besoin de la réponse sous forme de carte, pas de matrice. En arabe, en anglais ou en français.",
    "about.basedInFrance": "Basé en France",
    "about.languages": "Langues",
    "about.languagesText": "Arabe (langue maternelle) · Anglais (courant) · Français (professionnel)",
    "about.keyAchievements": "Points Forts",
    "about.highlight1": "Développeur du modèle d'évolution du littoral LX-ST",
    "about.highlight2": "Publié dans Environmental Modelling & Software (2025)",
    "about.highlight3": "Contributeur aux études nationales d'adaptation climatique",
    "about.institutionsLabel": "Institutions",
    "about.institutionsList": "BRGM · Cerema · Université de Bordeaux · EPOC",
    "about.thesisLink": "Thèse de Doctorat (theses.fr)",
    "about.photoAlt": "Portrait de Mohammad Traboulsi",

    // Skills Section
    "skills.programmingTitle": "Programmation",
    "skills.analysisTitle": "Analyse et Modélisation",
    "skills.toolsTitle": "Outils et Technologies",

    // Experience Section
    "experience.errorLoading": "Erreur de chargement des données d'expérience :",
    "experience.present": "aujourd'hui",

    // Publications Extra
    "publications.lastUpdated": "Dernière mise à jour :",
    "publications.unableToLoad": "Impossible de Charger les Publications",
    "publications.dataUpdatedWeekly": "Les données de publications sont automatiquement mises à jour chaque semaine depuis OpenAlex. Veuillez réessayer plus tard.",
    "publications.citations": "Citations",
    "publications.openAccess": "Accès Libre",
    "publications.categories": "Catégories",
    "publications.moreAuthors": "de plus",
    "publications.showLessAuthors": "réduire",
    "publications.readAbstract": "Lire le résumé complet",
    "publications.showLessAbstract": "Réduire",
    "publications.copyDoi": "Cliquer pour copier le DOI",
    "publications.doiCopied": "DOI copié !",
    "publications.category.article": "Article",
    "publications.category.preprint": "Prépublication",
    "publications.category.conference": "Conférence",

    // Footer
    "footer.copyright": "Mohammad Traboulsi. Tous droits réservés.",
    "footer.description": "Ingénieur conseil — modélisation côtière et littorale. J'aide les bureaux d'études et les territoires littoraux à quantifier le recul du trait de côte.",
    "footer.navigate": "Navigation",
    "footer.documents": "Documents",
    "footer.cv": "CV (PDF)",
    "footer.capabilities": "Plaquette de compétences (PDF)",
    "footer.autoUpdated": "publications mises à jour chaque semaine depuis OpenAlex",

    // Common
    "common.loading": "Chargement...",
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
