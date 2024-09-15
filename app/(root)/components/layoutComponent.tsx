'use client'
import { useState } from "react";
import Sidebar from "./sidebar";


const LayoutComponent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-56' : 'ml-8'}`}>
                {children}
            </main>
        </>
    );
}

export default LayoutComponent