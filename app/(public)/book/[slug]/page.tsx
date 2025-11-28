import { getTourBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import BookingForm from "@/components/features/BookingForm";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tour = await getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Simple Text Header */}
            <div className="container mx-auto px-4 pt-32 pb-10">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href={`/tours/${tour.slug}`}
                        className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 text-sm font-medium transition-colors hover:-translate-x-1 duration-300"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Tour Details
                    </Link>

                    <h1 className="text-2xl md:text-4xl font-bold font-serif text-foreground mb-2">
                        Complete Your Booking
                    </h1>
                    <p className="text-muted-foreground text-sm md:text-base">
                        You are booking <span className="font-semibold text-foreground">{slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <BookingForm tour={tour} />
                </div>
            </div>

            {/* Trust Badges */}
            <div className="container mx-auto px-4 pt-24 md:pt-32 pb-10 text-center">
                <div className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-secondary/30 px-4 py-2 rounded-full border border-border/50">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>
            </div>
        </div>
    );
}
