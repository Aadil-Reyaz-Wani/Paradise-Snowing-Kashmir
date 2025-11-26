import { getFeaturedTours } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default async function FeaturedTours() {
    const featuredTours = await getFeaturedTours();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
                    <div className="h-56 bg-muted relative overflow-hidden">
                        {tour.images && tour.images.length > 0 ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                                alt={tour.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                                <MapPin className="h-8 w-8 opacity-50" />
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                            {tour.duration_days} Days
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-primary mb-3">
                            <span className="bg-primary/10 px-2 py-1 rounded-full">{tour.region}</span>
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">{tour.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tour.short_description}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                            <div>
                                <span className="text-xs text-muted-foreground">Starting from</span>
                                <p className="text-lg font-bold text-foreground">₹{tour.base_price.toLocaleString()}</p>
                            </div>
                            <Link
                                href={`/tours/${tour.slug}`}
                                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
