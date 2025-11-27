import Link from "next/link";
import { LayoutDashboard, Map, Image as ImageIcon, CalendarDays, Users, LogOut, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/30">
            <aside className="w-72 bg-card border-r border-border/50 hidden md:flex flex-col shadow-sm">
                <div className="p-8 border-b border-border/50">
                    <h1 className="text-2xl font-bold font-serif text-foreground">Admin Panel</h1>
                    <p className="text-xs text-muted-foreground mt-1">Manage your paradise</p>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin">
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin/tours">
                            <Map className="h-5 w-5" />
                            Tours
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin/bookings">
                            <CalendarDays className="h-5 w-5" />
                            Bookings
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin/gallery">
                            <ImageIcon className="h-5 w-5" />
                            Gallery
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin/testimonials">
                            <Users className="h-5 w-5" />
                            Testimonials
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                        <Link href="/admin/destinations">
                            <Mountain className="h-5 w-5" />
                            Destinations
                        </Link>
                    </Button>
                </nav>
                <div className="p-6 border-t border-border/50">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Button>
                </div>
            </aside>
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
