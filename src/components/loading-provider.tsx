import { createContext, useContext, useState, useEffect } from "react"

type LoadingState = {
  skills: boolean;
  projects: boolean;
  publications: boolean;
  experience: boolean;
  education: boolean;
  contact: boolean;
  spotlight: boolean;
}

type LoadingProviderProps = {
  children: React.ReactNode
}

type LoadingProviderState = {
  loading: LoadingState;
  setLoading: (section: keyof LoadingState, isLoading: boolean) => void;
  isAnyLoading: boolean;
}

const initialLoadingState: LoadingState = {
  skills: true,
  projects: true,
  publications: true,
  experience: true,
  education: true,
  contact: false,
  spotlight: false,
}

const initialState: LoadingProviderState = {
  loading: initialLoadingState,
  setLoading: () => null,
  isAnyLoading: true,
}

const LoadingProviderContext = createContext<LoadingProviderState>(initialState)

export function LoadingProvider({ children, ...props }: LoadingProviderProps) {
  const [loading, setLoadingState] = useState<LoadingState>(initialLoadingState)

  // Simulate loading for different sections with varying delays
  useEffect(() => {
    const loadingSections: Array<{ section: keyof LoadingState; delay: number }> = [
      { section: 'skills', delay: 800 },
      { section: 'projects', delay: 1200 },
      { section: 'publications', delay: 1000 },
      { section: 'experience', delay: 600 },
      { section: 'education', delay: 400 },
    ]

    const timers = loadingSections.map(({ section, delay }) =>
      window.setTimeout(() => {
        setLoadingState(prev => ({ ...prev, [section]: false }))
      }, delay),
    )

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [])

  const setLoading = (section: keyof LoadingState, isLoading: boolean) => {
    setLoadingState(prev => ({ ...prev, [section]: isLoading }))
  }

  const isAnyLoading = Object.values(loading).some(Boolean)

  const value = {
    loading,
    setLoading,
    isAnyLoading,
  }

  return (
    <LoadingProviderContext.Provider {...props} value={value}>
      {children}
    </LoadingProviderContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingProviderContext)

  if (context === undefined)
    throw new Error("useLoading must be used within a LoadingProvider")

  return context
}
