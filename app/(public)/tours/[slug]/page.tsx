import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourBySlug } from "@/lib/api";
import { MapPin, Clock, Users, Check, X, Calendar, ArrowLeft, ShieldCheck } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tour = await getTourBySlug(slug);
    if (!tour) return { title: "Tour Not Found" };

    return {
        title: `${tour.title} - Paradise Snowing Kashmir`,
        description: tour.short_description,
        openGraph: {
            title: tour.title,
            description: tour.short_description,
            type: "website",
            images: tour.images && tour.images.length > 0
                ? [{
                    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`,
                    width: 1200,
                    height: 630,
                    alt: tour.title,
                }]
                : [],
        },
    };
}

export default async function TourDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tour = await getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-slate-900">
                <div className="absolute inset-0 bg-slate-900/40 z-10" />
                {tour.images && tour.images.length > 0 ? (
                    <BlurImage
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                        alt={tour.title}
                        fill
                        priority
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
                        <span className="text-white/20 text-9xl font-bold">IMAGE</span>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-slate-900/90 to-transparent pt-32 pb-12">
                    <div className="container mx-auto px-4">
                        <Link href="/tours" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Packages
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {tour.region}
                            </span>
                            <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {tour.trip_type}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tour.title}</h1>
                        <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                {tour.duration_days} Days / {tour.duration_days - 1} Nights
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                {tour.region}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {tour.long_description || tour.short_description}
                            </p>

                            {tour.highlights && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-foreground mb-4">Trip Highlights</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {tour.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                                                <div className="mt-1 bg-primary/10 p-1 rounded-full">
                                                    <Check className="h-3 w-3 text-primary" />
                                                </div>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>

                        {/* Itinerary */}
                        {tour.itinerary && (
                            <section>
                                <h2 className="text-2xl font-bold text-foreground mb-6">Day-wise Itinerary</h2>
                                <div className="space-y-8 border-l-2 border-border ml-3 pl-8 relative">
                                    {tour.itinerary.map((day: any, idx: number) => (
                                        <div key={idx} className="relative">
                                            <div className="absolute -left-[41px] top-0 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                                                {day.day}
                                            </div>
                                            <h3 className="text-lg font-bold text-foreground mb-2">{day.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{day.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Inclusions & Exclusions */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {tour.inclusions && (
                                <div className="bg-green-500/5 p-6 rounded-2xl border border-green-500/10">
                                    <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                                        <Check className="h-5 w-5" /> What's Included
                                    </h3>
                                    <ul className="space-y-2">
                                        {tour.inclusions.map((item, idx) => (
                                            <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                                                <span>•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {tour.exclusions && (
                                <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10">
                                    <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                                        <X className="h-5 w-5" /> What's Excluded
                                    </h3>
                                    <ul className="space-y-2">
                                        {tour.exclusions.map((item, idx) => (
                                            <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                                                <span>•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card rounded-2xl shadow-lg border border-border p-6">
                            <div className="mb-6">
                                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-foreground">₹{tour.base_price.toLocaleString()}</span>
                                    <span className="text-muted-foreground">/ person</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">*Prices may vary based on season and customization</p>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href={`/book/${tour.slug}`}
                                    className="block w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-center font-bold rounded-xl transition-colors shadow-lg"
                                >
                                    Book This Trip
                                </Link>
                                <a
                                    href={`https://wa.me/910000000000?text=Hi, I am interested in ${tour.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 bg-green-500 hover:bg-green-600 text-white text-center font-bold rounded-xl transition-colors shadow-lg"
                                >
                                    Customize on WhatsApp
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <h4 className="font-semibold text-foreground mb-4 text-sm">Why book with us?</h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-primary" />
                                        Verified Local Operators
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-primary" />
                                        24/7 On-ground Support
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        Flexible Cancellation
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
