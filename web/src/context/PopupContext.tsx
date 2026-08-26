import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type PopupContextValue = {
  isOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextValue | null>(null)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openPopup = useCallback(() => setIsOpen(true), [])
  const closePopup = useCallback(() => setIsOpen(false), [])

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const ctx = useContext(PopupContext)
  if (!ctx) throw new Error('usePopup must be used within PopupProvider')
  return ctx
}
