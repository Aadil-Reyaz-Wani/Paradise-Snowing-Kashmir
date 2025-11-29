"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, Image as ImageIcon, CalendarDays, Users, LogOut, Mountain, Menu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { signOutAction } from "@/lib/actions";

export function MobileAdminNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

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
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-[#FDFBF7] border-r border-primary/10 flex flex-col gap-0 h-[100dvh]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none" />

                <SheetHeader className="p-8 border-b border-primary/5 relative z-10 flex-none">
                    <SheetTitle className="text-3xl font-bold font-serif text-primary text-left">Admin Panel</SheetTitle>
                    <p className="text-sm text-muted-foreground text-left mt-1 font-medium">Manage your paradise</p>
                </SheetHeader>

                <nav className="flex-1 overflow-y-auto p-6 space-y-3 relative z-10">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            asChild
                            variant="ghost"
                            className={`w-full justify-start gap-4 h-12 text-base rounded-xl transition-all duration-300 ${route.active
                                ? "bg-primary/10 text-primary font-bold shadow-sm"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6"
                                }`}
                            onClick={() => setOpen(false)}
                        >
                            <Link href={route.href}>
                                <route.icon className={`h-5 w-5 ${route.active ? "text-primary" : "text-muted-foreground/70 group-hover:text-primary"}`} />
                                {route.label}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <div className="p-6 pb-8 border-t border-primary/5 relative z-10 bg-[#FDFBF7] flex-none">
                    <form action={signOutAction}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-4 h-12 text-base rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 hover:pl-6 transition-all duration-300"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
