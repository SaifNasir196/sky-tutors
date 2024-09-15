import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { adminSidebarItems } from '@/lib/data'

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={`fixed inset-y-0 left-0 z-50 bg-background shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
            <div className="flex flex-col h-full">
                <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} h-16 bg-primary text-primary-foreground px-4`}>
                    {isOpen && <h1 className="text-xl font-bold">Admin</h1>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-primary-foreground"
                    >
                        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>
                <ScrollArea className="flex-grow">
                    <nav className="px-2 py-4">
                        <ul className="space-y-2">
                            {adminSidebarItems.map((item, index) => (
                                <li key={index}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={item.href} passHref>
                                                    <Button
                                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                                        className={`w-full justify-start items-start px-3`}
                                                    >
                                                        {/* <item.icon  /> */}
                                                        <span className={`h-4 w-4 ${isOpen && 'mr-4'}`}> {item.icon} </span>
                                                        {isOpen && item.label}
                                                    </Button>
                                                </Link>
                                            </TooltipTrigger>
                                            {!isOpen && (
                                                <TooltipContent side="right">
                                                    <p>{item.label}</p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </ScrollArea>
            </div>
        </div>
    )
}