import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Map, CalendarDays, TrendingUp, Plus, Image as ImageIcon, Users, ArrowRight, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    const { count: newMessagesCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new');
    const { count: readMessagesCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'read');

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-serif text-primary">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, <span className="font-medium text-foreground">{user.email}</span></p>
                </div>
                <div className="flex items-center gap-3">
                    <Button asChild className="rounded-xl bg-[#F8FAFC] text-primary font-bold h-14 px-6 tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                        <Link href="/admin/tours/new">
                            <Plus className="mr-2 h-5 w-5" /> Create New Tour
                        </Link>
                    </Button>
                </div>
            </div>



            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Tours</p>
                                <div className="text-3xl font-bold text-primary mt-2 font-serif">{toursCount || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">Active packages listed</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <Map className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Link href="/admin/bookings" className="block">
                    <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none cursor-pointer h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                                    <div className="text-3xl font-bold text-primary mt-2 font-serif">{bookingsCount || 0}</div>
                                    <p className="text-xs text-muted-foreground mt-1">Lifetime reservations</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                                    <CalendarDays className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending Inquiries</p>
                                <div className="text-3xl font-bold text-orange-600 mt-2 font-serif">{pendingBookingsCount || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Link href="/admin/contacts" className="block">
                    <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none cursor-pointer h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Messages</p>
                                    <div className="text-3xl font-bold text-purple-600 mt-2 font-serif">
                                        {(newMessagesCount || 0) + (readMessagesCount || 0)}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Needs response</p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium border-t border-primary/5 pt-3">
                                <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    New: {newMessagesCount || 0}
                                </div>
                                <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    Read: {readMessagesCount || 0}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <Card className="lg:col-span-1 bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none h-full">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold font-serif text-primary">Quick Actions</CardTitle>
                        <CardDescription>Manage your content efficiently</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" asChild className="w-full justify-start h-12 text-base rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all group">
                            <Link href="/admin/contacts">
                                <MessageSquare className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                View Messages
                                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full justify-start h-12 text-base rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all group">
                            <Link href="/admin/bookings">
                                <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                View All Bookings
                                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full justify-start h-12 text-base rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all group">
                            <Link href="/admin/gallery">
                                <ImageIcon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                Manage Gallery
                                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full justify-start h-12 text-base rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all group">
                            <Link href="/admin/testimonials">
                                <Users className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                Update Testimonials
                                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2 bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold font-serif text-primary">Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-16 text-center bg-secondary/10 rounded-2xl border border-dashed border-primary/10">
                            <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-sm mb-4">
                                <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">No recent activity</h3>
                            <p className="text-muted-foreground max-w-sm mt-2">
                                New bookings and inquiries will appear here once your customers start interacting with the platform.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
