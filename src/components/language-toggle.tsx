import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      title={language === "en" ? "Switch to French" : "Passer à l'anglais"}
      className="w-12 h-9 p-0 font-medium"
    >
      {language === "en" ? "FR" : "EN"}
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}