import Link from "next/link";
import { LayoutDashboard, Map, Image as ImageIcon, CalendarDays, Users, LogOut, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileAdminNav } from "@/components/admin/MobileAdminNav";
import { signOutAction } from "@/lib/actions";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">
            <aside className="w-80 bg-[#FDFBF7] border-r border-primary/10 hidden md:flex flex-col shadow-sm sticky top-0 h-screen z-40">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none" />

                <div className="p-8 border-b border-primary/5 relative z-10">
                    <h1 className="text-3xl font-bold font-serif text-primary">Admin Panel</h1>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Manage your paradise</p>
                </div>

                <nav className="flex-1 p-6 space-y-3 overflow-y-auto relative z-10">
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin">
                            <LayoutDashboard className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin/tours">
                            <Map className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Tours
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin/bookings">
                            <CalendarDays className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Bookings
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin/gallery">
                            <ImageIcon className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Gallery
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin/testimonials">
                            <Users className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Testimonials
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 hover:pl-6 transition-all duration-300">
                        <Link href="/admin/destinations">
                            <Mountain className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary" />
                            Destinations
                        </Link>
                    </Button>
                </nav>

                <div className="p-6 border-t border-primary/5 relative z-10 bg-[#FDFBF7]/50 backdrop-blur-sm">
                    <form action={signOutAction}>
                        <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-base rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 hover:pl-6 transition-all duration-300">
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="md:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card">
                    <div className="flex items-center gap-3">
                        <MobileAdminNav />
                        <h1 className="text-xl font-bold font-serif text-foreground">Admin Panel</h1>
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
