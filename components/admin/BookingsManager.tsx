"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/lib/actions";
import { Loader2, CheckCircle, XCircle, Clock, Calendar, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
            case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            default: return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{initialBookings.length}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            {initialBookings.filter(b => b.status === 'confirmed').length}
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-600">
                            {initialBookings.filter(b => b.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                {initialBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-xl font-serif text-foreground">{booking.tour?.title || "Unknown Tour"}</h3>
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusColor(booking.status)} uppercase tracking-wide`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Booked on {format(new Date(booking.created_at), "PPP")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-foreground">₹{booking.total_price.toLocaleString()}</p>
                                    <p className={`text-sm font-bold uppercase tracking-wide mt-1 ${booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        Payment: {booking.payment_status}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-secondary/20 rounded-xl border border-border/50">
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Customer</p>
                                    <div className="flex items-start gap-3">
                                        <div className="bg-background p-2 rounded-full">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">{booking.customer_name}</p>
                                            <p className="text-sm text-muted-foreground">{booking.travellers_adults} Adults, {booking.travellers_children} Kids</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Contact</p>
                                    <div className="space-y-2">
                                        <p className="text-sm text-foreground flex items-center gap-2">
                                            <Mail className="h-3 w-3 text-muted-foreground" /> {booking.customer_email}
                                        </p>
                                        <p className="text-sm text-foreground flex items-center gap-2">
                                            <Phone className="h-3 w-3 text-muted-foreground" /> {booking.customer_phone}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Trip Dates</p>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-background p-2 rounded-full">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">{format(new Date(booking.start_date), "PPP")}</p>
                                            <p className="text-sm text-muted-foreground">{booking.tour?.duration_days} Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-3">
                                    {booking.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                disabled={updatingId === booking.id}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                                size="sm"
                                            >
                                                {updatingId === booking.id ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <CheckCircle className="mr-2 h-3 w-3" />}
                                                Confirm
                                            </Button>
                                            <Button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                disabled={updatingId === booking.id}
                                                variant="outline"
                                                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                                size="sm"
                                            >
                                                <XCircle className="mr-2 h-3 w-3" />
                                                Cancel
                                            </Button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <Button
                                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                            disabled={updatingId === booking.id}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                            size="sm"
                                        >
                                            Mark Completed
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {initialBookings.length === 0 && (
                    <div className="text-center py-16 bg-card rounded-3xl border border-border/50">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <Calendar className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground">New bookings will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
