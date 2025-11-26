import Link from "next/link";
import { getAllTours } from "@/lib/api";
import { MapPin, Calendar, Filter } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";

export const metadata = {
    title: "Tour Packages - Paradise Snowing Kashmir",
    description: "Explore our curated tour packages for Kashmir, Ladakh, and Jammu.",
};

export default async function ToursPage() {
    const tours = await getAllTours();

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">All Tour Packages</h1>
                        <p className="text-muted-foreground mt-2">Find the perfect itinerary for your next adventure.</p>
                    </div>

                    {/* Placeholder for Filters - To be implemented with client components */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-card-foreground hover:bg-secondary transition-colors">
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                        <Link
                            href={`/tours/${tour.slug}`}
                            key={tour.id}
                            className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border flex flex-col"
                        >
                            <div className="h-56 bg-muted relative overflow-hidden">
                                {tour.images && tour.images.length > 0 ? (
                                    <BlurImage
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted">
                                        <MapPin className="h-10 w-10" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {tour.region}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {tour.duration_days} Days
                                    </span>
                                    <span>•</span>
                                    <span>{tour.trip_type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                                    {tour.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1">
                                    {tour.short_description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                    <div>
                                        <span className="text-xs text-muted-foreground block">Starting from</span>
                                        <span className="text-lg font-bold text-foreground">₹{tour.base_price.toLocaleString()}</span>
                                        <span className="text-xs text-muted-foreground ml-1">/ person</span>
                                    </div>
                                    <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {tours.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No tours found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
