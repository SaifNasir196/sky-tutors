import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useActiveSectionContext, SectionName } from "@/context/ActiveSectionContextProvider"



const useActiveSectionView = (section: SectionName, threshold = 0.8) => {
    const { ref, inView } = useInView({ threshold })
    const { setActiveSection, lastClickTime } = useActiveSectionContext();

    useEffect(() => {
        if (inView && Date.now() - lastClickTime > 1000) setActiveSection(section)
    }, [inView, lastClickTime])

    return { ref }
}

export default useActiveSectionView