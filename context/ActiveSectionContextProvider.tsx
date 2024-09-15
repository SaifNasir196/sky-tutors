'use client'
import React, { useContext, useState, createContext } from 'react'
import { links } from '@/lib/data'


export type SectionName = (typeof links)[number]["name"];
type ActiveSectionContectProviderProps = {
    children: React.ReactNode
}

type ActiveSectionContextType = {
    activeSection: SectionName,
    setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
    lastClickTime: number,
    setLastClickTime: React.Dispatch<React.SetStateAction<number>>
}
const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null)

export const useActiveSectionContext = () => {
    const context = useContext(ActiveSectionContext);

    if (context == null) {
        throw new Error("Use this context within the Provider");
    }
    return context;
}

const ActiveSectionContextProvider = ({ children }: ActiveSectionContectProviderProps) => {
    const [activeSection, setActiveSection] = useState<SectionName>("Home")
    const [lastClickTime, setLastClickTime] = useState(0)
    return <ActiveSectionContext.Provider value={{
        activeSection,
        setActiveSection,
        lastClickTime,
        setLastClickTime
    }}>
        {children}
    </ActiveSectionContext.Provider>
}

export default ActiveSectionContextProvider