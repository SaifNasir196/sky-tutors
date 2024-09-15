import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { studentSidebarItems } from '@/lib/data'

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex flex-col h-full">
                <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} h-20 px-4`}>
                    {isOpen && <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">EduHub</h1>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-full"
                    >
                        {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                    </Button>
                </div>
                <ScrollArea className="flex-grow px-3">
                    <nav className="space-y-2 py-4">
                        {studentSidebarItems.map((item, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href={item.href} passHref>
                                            <Button
                                                variant={pathname === item.href ? "secondary" : "ghost"}
                                                className={`w-full justify-start items-center px-3 py-2 ${pathname === item.href
                                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                                    } rounded-lg transition-all duration-200`}
                                            >
                                                <span className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`}>
                                                    {item.icon}
                                                </span>
                                                {isOpen && <span className="font-medium">{item.label}</span>}
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    {!isOpen && (
                                        <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                                            <p>{item.label}</p>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </nav>
                </ScrollArea>
                <div className="mt-auto p-4">
                    <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} space-x-3 pb-4`}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatar.png" alt="User" />
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                        {isOpen && (
                            <div>
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-gray-400">john@example.com</p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start items-center px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200`}
                    >
                        <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isOpen && <span className="font-medium">Logout</span>}
                    </Button>
                </div>
            </div>
        </div>
    )
}