"use client"

import { type ReactNode, createContext, useContext, useState } from "react"
import type { LanguageDirection } from "@/lib/words"

interface AppContextType {
  preferredDirection: LanguageDirection
  setPreferredDirection: (direction: LanguageDirection) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [preferredDirection, setPreferredDirection] = useState<LanguageDirection>("balti-to-english")

  return <AppContext.Provider value={{ preferredDirection, setPreferredDirection }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

