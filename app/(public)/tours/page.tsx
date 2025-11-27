import Link from "next/link";
import { getAllTours } from "@/lib/api";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Tour Packages - Paradise Snowing Kashmir",
    description: "Explore our curated tour packages for Kashmir, Ladakh, and Jammu.",
};

export default async function ToursPage() {
    const tours = await getAllTours();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Clean Hero */}
            <section className="relative pt-32 pb-16 container mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-border/50 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
                    <Star className="w-3 h-3 fill-primary" />
                    Best Selling Packages
                </div>
                <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6 tracking-tight animate-fade-in-up delay-100">
                    Find Your Perfect Getaway
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium animate-fade-in-up delay-200">
                    Discover the magic of Kashmir with our expertly crafted tour packages.
                </p>
            </section>

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Enhanced Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {tours.map((tour, index) => (
                        <div
                            key={tour.id}
                            className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                        >
                            {/* Image Section */}
                            <div className="relative h-72 overflow-hidden">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                                {tour.images && tour.images.length > 0 ? (
                                    <BlurImage
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                                        alt={tour.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-secondary text-muted-foreground">
                                        <MapPin className="h-12 w-12 opacity-30" />
                                    </div>
                                )}

                                {/* Floating Glass Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-foreground text-xs font-bold uppercase tracking-wide shadow-sm">
                                        {tour.region}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[0.5px] border-primary/5 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                                        <Clock className="h-3.5 w-3.5" />
                                        {tour.duration_days} Days
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full border-[0.5px] border-border/10 bg-secondary/50 text-muted-foreground text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {tour.trip_type}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                                    {tour.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                                    {tour.short_description}
                                </p>

                                <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Starting from</p>
                                        <div className="flex items-baseline gap-1 whitespace-nowrap">
                                            <p className="text-2xl font-bold text-foreground">₹{tour.base_price.toLocaleString()}</p>
                                            <span className="text-xs text-muted-foreground">/ person</span>
                                        </div>
                                    </div>

                                    {/* Neumorphic Button */}
                                    <Button asChild className="rounded-xl h-11 px-6 bg-[#F8FAFC] text-primary font-bold tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none shrink-0 ml-4">
                                        <Link href={`/tours/${tour.slug}`}>
                                            View Details <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {tours.length === 0 && (
                    <div className="text-center py-32">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-serif text-foreground mb-2">No Packages Found</h3>
                        <p className="text-muted-foreground">We are currently curating new experiences. Check back soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
