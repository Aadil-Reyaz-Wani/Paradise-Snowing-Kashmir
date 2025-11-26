"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Calendar, Users, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Script from "next/script";

const bookingSchema = z.object({
    customer_name: z.string().min(2, "Name is required"),
    customer_email: z.string().email("Invalid email"),
    customer_phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Valid phone number required (10-15 digits)"),
    start_date: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Date must be in the future",
    }),
    travellers_adults: z.coerce.number().min(1, "At least 1 adult"),
    travellers_children: z.coerce.number().min(0),
});

type BookingFormProps = {
    tour: {
        id: string;
        title: string;
        base_price: number;
        slug: string;
    };
};

export default function BookingForm({ tour }: BookingFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            start_date: "",
            travellers_adults: 1,
            travellers_children: 0,
        },
    });

    const adults = watch("travellers_adults") as number;
    const children = watch("travellers_children") as number;
    const totalPrice = (adults * tour.base_price) + (children * tour.base_price * 0.5);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await fetch("/api/bookings/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    tour_id: tour.id,
                    total_price: totalPrice,
                }),
            });

            const orderData = await response.json();

            if (!response.ok) {
                throw new Error(orderData.error || "Failed to create order");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Paradise Snowing Kashmir",
                description: `Booking for ${tour.title}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    const verifyResponse = await fetch("/api/bookings/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            booking_id: orderData.booking_id,
                        }),
                    });

                    if (verifyResponse.ok) {
                        toast.success("Booking confirmed!");
                        router.push(`/book/success?bookingId=${orderData.booking_id}`);
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: data.customer_name,
                    email: data.customer_email,
                    contact: data.customer_phone,
                },
                theme: {
                    color: "#0061a4",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[var(--surface)] p-8 rounded-3xl shadow-lg border border-[var(--border)]">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Enter Your Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Full Name</label>
                            <input
                                {...register("customer_name")}
                                className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none p-3 transition-all"
                                placeholder="John Doe"
                            />
                            {errors.customer_name && <p className="text-red-500 text-xs mt-1">{(errors.customer_name as any).message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email</label>
                                <input
                                    {...register("customer_email")}
                                    type="email"
                                    className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none p-3 transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.customer_email && <p className="text-red-500 text-xs mt-1">{(errors.customer_email as any).message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Phone</label>
                                <input
                                    {...register("customer_phone")}
                                    className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none p-3 transition-all"
                                    placeholder="+91..."
                                />
                                {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{(errors.customer_phone as any).message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Travel Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-[var(--foreground)] opacity-50" />
                                <input
                                    {...register("start_date")}
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                                />
                            </div>
                            {errors.start_date && <p className="text-red-500 text-xs mt-1">{(errors.start_date as any).message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Adults</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3.5 h-5 w-5 text-[var(--foreground)] opacity-50" />
                                    <input
                                        {...register("travellers_adults")}
                                        type="number"
                                        min="1"
                                        className="w-full pl-10 pr-4 py-3 bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Children</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3.5 h-5 w-5 text-[var(--foreground)] opacity-50" />
                                    <input
                                        {...register("travellers_children")}
                                        type="number"
                                        min="0"
                                        className="w-full pl-10 pr-4 py-3 bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4 shadow-md"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
                            Pay ₹{totalPrice.toLocaleString()}
                        </button>
                        <p className="text-xs text-center text-[var(--foreground)] opacity-60 mt-2">
                            Secure payment via Razorpay
                        </p>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--surface)] p-8 rounded-3xl border border-[var(--border)] shadow-sm">
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">Booking Summary</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[var(--foreground)] opacity-70">Tour</span>
                                <span className="font-medium text-[var(--foreground)]">{tour.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--foreground)] opacity-70">Base Price</span>
                                <span className="font-medium text-[var(--foreground)]">₹{tour.base_price.toLocaleString()} / adult</span>
                            </div>
                            <div className="border-t border-[var(--border)] my-2 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[var(--foreground)] opacity-70">Adults ({adults})</span>
                                    <span className="font-medium text-[var(--foreground)]">₹{(adults * tour.base_price).toLocaleString()}</span>
                                </div>
                                {children > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-[var(--foreground)] opacity-70">Children ({children})</span>
                                        <span className="font-medium text-[var(--foreground)]">₹{(children * tour.base_price * 0.5).toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-[var(--border)] pt-4 flex justify-between items-center">
                                <span className="font-bold text-[var(--foreground)] text-lg">Total</span>
                                <span className="font-bold text-[var(--primary)] text-2xl">₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
