"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Calendar, Users, CreditCard, ShieldCheck, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { cn } from "@/lib/utils";

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
                    color: "#059669", // Primary Emerald Color
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

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Guest Details Section */}
                    <div className="bg-[#F8FAFC] p-4 md:p-8 rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Guest Details</h2>

                        <div className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                                <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                    <User className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                    <input
                                        {...register("customer_name")}
                                        className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                {errors.customer_name && <p className="text-red-500 text-xs">{(errors.customer_name as any).message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                        <Mail className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                        <input
                                            {...register("customer_email")}
                                            type="email"
                                            className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.customer_email && <p className="text-red-500 text-xs">{(errors.customer_email as any).message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                                    <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                        <Phone className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                        <input
                                            {...register("customer_phone")}
                                            className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    {errors.customer_phone && <p className="text-red-500 text-xs">{(errors.customer_phone as any).message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trip Details Section */}
                    <div className="bg-[#F8FAFC] p-4 md:p-8 rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                        <h2 className="text-xl font-bold font-serif text-foreground mb-6">Trip Details</h2>

                        <div className="space-y-6">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Travel Date</label>
                                <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                    <Calendar className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                    <input
                                        {...register("start_date")}
                                        type="date"
                                        className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                    />
                                </div>
                                {errors.start_date && <p className="text-red-500 text-xs">{(errors.start_date as any).message}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Adults */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Adults (12+ yrs)</label>
                                    <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                        <Users className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                        <input
                                            {...register("travellers_adults")}
                                            type="number"
                                            min="1"
                                            className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Children */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Children (5-11 yrs)</label>
                                    <div className="flex items-center w-full bg-white border border-border rounded-lg px-3 py-2.5 focus-within:border-primary transition-all">
                                        <Users className="h-5 w-5 text-muted-foreground/50 mr-3 shrink-0" />
                                        <input
                                            {...register("travellers_children")}
                                            type="number"
                                            min="0"
                                            className="w-full bg-transparent border-none outline-none placeholder:text-muted-foreground/40 text-sm p-0 text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#F8FAFC] p-4 md:p-6 rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                            <h3 className="text-lg font-bold font-serif text-foreground mb-6 pb-4 border-b border-border/50">Booking Summary</h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-start">
                                    <span className="text-muted-foreground">Tour Package</span>
                                    <span className="font-bold text-foreground text-right max-w-[60%]">{tour.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Base Price</span>
                                    <span className="font-medium text-foreground">₹{tour.base_price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">/ adult</span></span>
                                </div>

                                <div className="py-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Adults ({adults})</span>
                                        <span className="font-medium text-foreground">₹{(adults * tour.base_price).toLocaleString()}</span>
                                    </div>
                                    {children > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Children ({children})</span>
                                            <span className="font-medium text-foreground">₹{(children * tour.base_price * 0.5).toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-border pt-4 flex justify-between items-center">
                                    <span className="font-bold text-foreground text-lg">Total</span>
                                    <span className="font-bold text-primary text-2xl">₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-[#F8FAFC] text-primary font-bold text-lg rounded-xl tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-8 border-none"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
                                Pay ₹{totalPrice.toLocaleString()}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/80 bg-muted/50 py-2 rounded-lg">
                                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                <span>Secure Payment via Razorpay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
