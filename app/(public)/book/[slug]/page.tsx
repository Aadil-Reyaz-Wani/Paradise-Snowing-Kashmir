import { getTourBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import BookingForm from "@/components/features/BookingForm";

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tour = await getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Booking</h1>
                    <p className="text-slate-600">You are booking: <span className="font-semibold text-slate-900">{tour.title}</span></p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <BookingForm tour={tour} />
                </div>
            </div>
        </div>
    );
}
