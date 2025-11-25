import Link from "next/link";
import { LayoutDashboard, Map, Image as ImageIcon, CalendarDays, Users, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/tours" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
                        <Map className="h-5 w-5" />
                        Tours
                    </Link>
                    <Link href="/admin/bookings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
                        <CalendarDays className="h-5 w-5" />
                        Bookings
                    </Link>
                    <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
                        <ImageIcon className="h-5 w-5" />
                        Gallery
                    </Link>
                    <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
                        <Users className="h-5 w-5" />
                        Testimonials
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
