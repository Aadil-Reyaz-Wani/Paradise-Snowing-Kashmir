import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = body;

        // 1. Verify Signature
        const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(bodyData.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // 2. Update Booking Status to Paid
        const { error } = await supabase
            .from("bookings")
            .update({
                status: "paid",
                payment_gateway: "razorpay",
                // Store payment ID if needed in a separate column or JSON
            })
            .eq("id", booking_id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
