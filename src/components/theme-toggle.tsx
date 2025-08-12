import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />
    } else if (theme === "light") {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />
    } else {
      // system theme - show based on actual preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      return systemPrefersDark ? 
        <Moon className="h-[1.2rem] w-[1.2rem]" /> : 
        <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  const getTitle = () => {
    if (theme === "light") return "Switch to dark mode"
    if (theme === "dark") return "Switch to system mode"
    return "Switch to light mode"
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={getTitle()}
      className="w-9 h-9 p-0"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}