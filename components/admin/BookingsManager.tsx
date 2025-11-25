"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/lib/actions";
import { Loader2, CheckCircle, XCircle, Clock, Calendar, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
            case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Total Bookings</p>
                    <p className="text-2xl font-bold text-slate-900">{initialBookings.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">
                        {initialBookings.filter(b => b.status === 'confirmed').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                        {initialBookings.filter(b => b.status === 'pending').length}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {initialBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">{booking.tour?.title || "Unknown Tour"}</h3>
                                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusColor(booking.status)} uppercase tracking-wide`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Booked on {format(new Date(booking.created_at), "PPP")}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-slate-900">₹{booking.total_price.toLocaleString()}</p>
                                    <p className={`text-sm font-medium ${booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        Payment: {booking.payment_status.toUpperCase()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Customer</p>
                                    <div className="flex items-start gap-2">
                                        <User className="h-4 w-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-slate-900">{booking.customer_name}</p>
                                            <p className="text-sm text-slate-600">{booking.travellers_adults} Adults, {booking.travellers_children} Kids</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Contact</p>
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-600 flex items-center gap-2">
                                            <Mail className="h-3 w-3" /> {booking.customer_email}
                                        </p>
                                        <p className="text-sm text-slate-600 flex items-center gap-2">
                                            <Phone className="h-3 w-3" /> {booking.customer_phone}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Trip Dates</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        <div>
                                            <p className="font-medium text-slate-900">{format(new Date(booking.start_date), "PPP")}</p>
                                            <p className="text-sm text-slate-600">{booking.tour?.duration_days} Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-2">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                disabled={updatingId === booking.id}
                                                className="w-full py-1.5 px-3 bg-green-600 text-white text-sm font-bold rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {updatingId === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                disabled={updatingId === booking.id}
                                                className="w-full py-1.5 px-3 bg-white text-red-600 border border-red-200 text-sm font-bold rounded hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                <XCircle className="h-3 w-3" />
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                            disabled={updatingId === booking.id}
                                            className="w-full py-1.5 px-3 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {initialBookings.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Calendar className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No bookings yet</h3>
                        <p className="text-slate-500">New bookings will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
