import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Map, CalendarDays, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Tours</CardTitle>
                        <Map className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{toursCount || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active packages</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        <CalendarDays className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{bookingsCount || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">All time bookings</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Inquiries</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{pendingBookingsCount || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-serif">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border/50">
                        No recent activity to show.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
