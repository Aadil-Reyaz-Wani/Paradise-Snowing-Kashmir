import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Users, Map, CalendarDays, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    // Fetch basic stats
    const { count: toursCount } = await supabase.from('tours').select('*', { count: 'exact', head: true });
    const { count: bookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
    const { count: pendingBookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-500 font-medium text-sm">Total Tours</h3>
                        <Map className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{toursCount || 0}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-500 font-medium text-sm">Total Bookings</h3>
                        <CalendarDays className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{bookingsCount || 0}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-500 font-medium text-sm">Pending Inquiries</h3>
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{pendingBookingsCount || 0}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
                <div className="text-center py-8 text-slate-500">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}
