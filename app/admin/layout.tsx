import { checkRole } from "@/lib/utils/roles";
import { redirect } from "next/navigation";
import LayoutComponent from "./components/layoutComponent";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (!checkRole('admin')) {
        redirect('/')
    }
    return (
        <div className="flex min-h-screen h-full bg-background">
            <LayoutComponent>
                {children}
            </LayoutComponent>
        </div>
    );
}
