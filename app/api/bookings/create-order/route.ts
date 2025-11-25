import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();

        // 1. Create Booking in DB (Pending status)
        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .insert({
                tour_id: body.tour_id,
                customer_name: body.customer_name,
                customer_email: body.customer_email,
                customer_phone: body.customer_phone,
                travellers_adults: body.travellers_adults,
                travellers_children: body.travellers_children,
                start_date: body.start_date,
                total_price: body.total_price,
                status: "pending",
            })
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json({ error: bookingError.message }, { status: 500 });
        }

        // 2. Create Razorpay Order
        const options = {
            amount: Math.round(body.total_price * 100), // Amount in paise
            currency: "INR",
            receipt: booking.id,
            notes: {
                booking_id: booking.id,
                tour_id: body.tour_id,
            },
        };

        const order = await razorpay.orders.create(options);

        // 3. Update Booking with Order ID
        await supabase
            .from("bookings")
            .update({ payment_order_id: order.id })
            .eq("id", booking.id);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            booking_id: booking.id,
        });

    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
