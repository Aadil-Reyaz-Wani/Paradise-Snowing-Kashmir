"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/lib/actions";
import { Loader2, CheckCircle, XCircle, Clock, Calendar, User, Mail, Phone, MapPin, CreditCard, Wallet } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Booking = {
    id: string;
    created_at: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    start_date: string;
    travellers_adults: number;
    travellers_children: number;
    total_price: number;
    status: string;
    payment_status: string;
    tour: {
        title: string;
        duration_days: number;
    };
};

export default function BookingsManager({ initialBookings }: { initialBookings: Booking[] }) {
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        if (!confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;

        setUpdatingId(id);
        try {
            await updateBookingStatus(id, newStatus);
            toast.success(`Booking marked as ${newStatus}`);
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'bg-green-500/10 text-green-700 ring-1 ring-green-600/20 border-0';
            case 'cancelled': return 'bg-red-500/10 text-red-700 ring-1 ring-red-600/20 border-0';
            case 'completed': return 'bg-blue-500/10 text-blue-700 ring-1 ring-blue-600/20 border-0';
            default: return 'bg-yellow-500/10 text-yellow-700 ring-1 ring-yellow-600/20 border-0';
        }
    };

    return (
        <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Calendar className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary font-serif">{initialBookings.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                            <CheckCircle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary font-serif">
                            {initialBookings.filter(b => b.status === 'confirmed').length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600">
                            <Clock className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary font-serif">
                            {initialBookings.filter(b => b.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
                {initialBookings.map((booking) => (
                    <Card key={booking.id} className="bg-[#F8FAFC] rounded-xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none overflow-hidden">
                        <CardContent className="p-0">
                            {/* Header */}
                            <div className="p-6 border-b border-primary/5 flex flex-col md:flex-row justify-between md:items-start gap-6 bg-primary/5">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-xl font-serif text-primary">{booking.tour?.title || "Unknown Tour"}</h3>
                                        <Badge variant="outline" className={`rounded-full px-3 py-1 ${getStatusBadgeVariant(booking.status)}`}>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary/60" />
                                        Booked on {format(new Date(booking.created_at), "PPP")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-primary font-serif">₹{booking.total_price.toLocaleString()}</p>
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2 ${booking.payment_status === 'paid' ? 'bg-green-500/10 text-green-700' : 'bg-yellow-500/10 text-yellow-700'}`}>
                                        <Wallet className="h-3 w-3" />
                                        {booking.payment_status}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
                                {/* Customer Info */}
                                <div className="space-y-3">
                                    <p className="text-xs text-primary/60 font-bold uppercase tracking-wider flex items-center gap-2">
                                        <User className="h-3 w-3" /> Customer
                                    </p>
                                    <div>
                                        <p className="font-bold text-foreground text-lg">{booking.customer_name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.travellers_adults} Adults, {booking.travellers_children} Kids</p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <p className="text-xs text-primary/60 font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Phone className="h-3 w-3" /> Contact
                                    </p>
                                    <div className="space-y-1">
                                        <p className="text-sm text-foreground flex items-center gap-2 hover:text-primary transition-colors">
                                            <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {booking.customer_email}
                                        </p>
                                        <p className="text-sm text-foreground flex items-center gap-2 hover:text-primary transition-colors">
                                            <Phone className="h-3.5 w-3.5 text-muted-foreground" /> {booking.customer_phone}
                                        </p>
                                    </div>
                                </div>

                                {/* Trip Dates */}
                                <div className="space-y-3">
                                    <p className="text-xs text-primary/60 font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Clock className="h-3 w-3" /> Trip Dates
                                    </p>
                                    <div>
                                        <p className="font-bold text-foreground text-lg">{format(new Date(booking.start_date), "PPP")}</p>
                                        <p className="text-sm text-muted-foreground">{booking.tour?.duration_days} Days Duration</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col justify-center gap-3">
                                    {booking.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                disabled={updatingId === booking.id}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl h-10"
                                                size="sm"
                                            >
                                                {updatingId === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                                Confirm Booking
                                            </Button>
                                            <Button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                disabled={updatingId === booking.id}
                                                variant="outline"
                                                className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20 rounded-xl h-10"
                                                size="sm"
                                            >
                                                <XCircle className="mr-2 h-4 w-4" />
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <Button
                                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                            disabled={updatingId === booking.id}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl h-10"
                                            size="sm"
                                        >
                                            Mark Completed
                                        </Button>
                                    )}
                                    {booking.status === 'cancelled' && (
                                        <div className="text-center p-2 bg-destructive/5 rounded-xl border border-destructive/10 text-destructive text-sm font-medium">
                                            Booking Cancelled
                                        </div>
                                    )}
                                    {booking.status === 'completed' && (
                                        <div className="text-center p-2 bg-blue-500/5 rounded-xl border border-blue-500/10 text-blue-600 text-sm font-medium">
                                            Trip Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {initialBookings.length === 0 && (
                    <div className="text-center py-24 bg-[#F8FAFC] rounded-3xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Calendar className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-serif mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            When customers book your tours, their reservations will appear here for you to manage.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
