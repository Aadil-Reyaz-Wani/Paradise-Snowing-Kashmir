import { getFeaturedTours } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";

export default async function FeaturedTours() {
    const featuredTours = await getFeaturedTours();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
                <Card key={tour.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-lg bg-card h-full flex flex-col">
                    <div className="h-64 relative overflow-hidden">
                        {tour.images && tour.images.length > 0 ? (
                            <BlurImage
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                                <MapPin className="h-8 w-8 opacity-50" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                                {tour.region}
                            </span>
                        </div>

                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-[0.5px] border-white/5 bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                <Clock className="h-3.5 w-3.5" />
                                {tour.duration_days} Days
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full border-[0.5px] border-white/5 bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                                {tour.trip_type}
                            </span>
                        </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold font-serif text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{tour.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{tour.short_description}</p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Starting from</p>
                                <p className="text-xl font-bold text-primary">₹{tour.base_price.toLocaleString()}</p>
                            </div>
                            <Button asChild className="rounded-xl h-10 px-6 bg-[#F8FAFC] text-primary font-bold text-xs tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.9),inset_2px_2px_4px_rgba(0,0,0,0.05)] transition-all duration-300 border-none">
                                <Link href={`/tours/${tour.slug}`}>
                                    View <ArrowRight className="ml-2 h-3 w-3 opacity-70" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
