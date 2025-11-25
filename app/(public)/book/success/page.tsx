import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage({ searchParams }: { searchParams: { bookingId: string } }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-md w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
                <p className="text-slate-600 mb-6">
                    Thank you for booking with us. Your trip is confirmed. We have sent a confirmation email to you.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-8 text-sm text-left">
                    <p className="text-slate-500 mb-1">Booking ID</p>
                    <p className="font-mono font-medium text-slate-900">{searchParams.bookingId}</p>
                </div>
                <Link
                    href="/"
                    className="block w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
