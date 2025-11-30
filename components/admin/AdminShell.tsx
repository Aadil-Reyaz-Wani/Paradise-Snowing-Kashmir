"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Map,
    Image as ImageIcon,
    CalendarDays,
    Users,
    LogOut,
    Mountain,
    Mail,
    Send,
    ChevronLeft,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileAdminNav } from "@/components/admin/MobileAdminNav";
import { signOutAction } from "@/lib/actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Optional: Load collapsed state from localStorage
        const savedState = localStorage.getItem("admin-sidebar-collapsed");
        if (savedState) {
            setIsCollapsed(savedState === "true");
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("admin-sidebar-collapsed", String(newState));
    };

    const routes = [
        {
            href: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
            active: pathname === "/admin",
        },
        {
            href: "/admin/tours",
            label: "Tours",
            icon: Map,
            active: pathname.startsWith("/admin/tours"),
        },
        {
            href: "/admin/bookings",
            label: "Bookings",
            icon: CalendarDays,
            active: pathname.startsWith("/admin/bookings"),
        },
        {
            href: "/admin/gallery",
            label: "Gallery",
            icon: ImageIcon,
            active: pathname.startsWith("/admin/gallery"),
        },
        {
            href: "/admin/testimonials",
            label: "Testimonials",
            icon: Users,
            active: pathname.startsWith("/admin/testimonials"),
        },
        {
            href: "/admin/destinations",
            label: "Destinations",
            icon: Mountain,
            active: pathname.startsWith("/admin/destinations"),
        },
        {
            href: "/admin/contacts",
            label: "Messages",
            icon: Mail,
            active: pathname.startsWith("/admin/contacts"),
        },
        {
            href: "/admin/newsletter",
            label: "Newsletter",
            icon: Send,
            active: pathname.startsWith("/admin/newsletter"),
        },
    ];

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "bg-[#FDFBF7] border-r border-primary/10 hidden md:flex flex-col shadow-sm sticky top-0 h-screen z-40 shrink-0 transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-20" : "w-80"
                )}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none" />

                <div className={cn(
                    "border-b border-primary/5 relative z-10 flex items-center transition-all duration-300",
                    isCollapsed ? "p-4 justify-center h-[89px]" : "p-8 justify-between"
                )}>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-3xl font-bold font-serif text-primary whitespace-nowrap overflow-hidden">Admin Panel</h1>
                            <p className="text-sm text-muted-foreground mt-1 font-medium whitespace-nowrap overflow-hidden">Manage your paradise</p>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className={cn("text-muted-foreground hover:text-primary", isCollapsed && "h-10 w-10")}
                    >
                        {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    </Button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto relative z-10 scrollbar-none">
                    <TooltipProvider delayDuration={0}>
                        {routes.map((route) => (
                            isCollapsed ? (
                                <Tooltip key={route.href}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-center h-12 rounded-xl transition-all duration-300",
                                                route.active
                                                    ? "bg-primary/10 text-primary shadow-sm"
                                                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            )}
                                        >
                                            <Link href={route.href}>
                                                <route.icon className="h-5 w-5" />
                                                <span className="sr-only">{route.label}</span>
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="font-medium">
                                        {route.label}
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <Button
                                    key={route.href}
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-4 h-12 text-base rounded-xl transition-all duration-300",
                                        route.active
                                            ? "bg-primary/10 text-primary font-bold shadow-sm"
                                            : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6"
                                    )}
                                >
                                    <Link href={route.href}>
                                        <route.icon className={cn("h-5 w-5", route.active ? "text-primary" : "text-muted-foreground/70 group-hover:text-primary")} />
                                        {route.label}
                                    </Link>
                                </Button>
                            )
                        ))}
                    </TooltipProvider>
                </nav>

                <div className={cn(
                    "border-t border-primary/5 relative z-10 bg-[#FDFBF7]/50 backdrop-blur-sm transition-all duration-300",
                    isCollapsed ? "p-4" : "p-6"
                )}>
                    <form action={signOutAction}>
                        {isCollapsed ? (
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-center h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span className="sr-only">Sign Out</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="font-medium text-destructive">
                                        Sign Out
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-4 h-12 text-base rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 hover:pl-6 transition-all duration-300"
                            >
                                <LogOut className="h-5 w-5" />
                                Sign Out
                            </Button>
                        )}
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300">
                <header className="md:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card">
                    <div className="flex items-center gap-3">
                        <MobileAdminNav />
                        <h1 className="text-xl font-bold font-serif text-foreground">Admin Panel</h1>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
