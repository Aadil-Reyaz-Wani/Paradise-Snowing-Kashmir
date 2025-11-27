import { getTestimonials } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";

export default async function TestimonialsList() {
    const testimonials = await getTestimonials();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
                <Card key={t.id} className="h-full border-border/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl bg-card relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="h-24 w-24 text-primary rotate-180" />
                    </div>

                    <CardContent className="p-8 flex flex-col h-full relative z-10">
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < (t.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                                />
                            ))}
                        </div>

                        <blockquote className="text-lg text-foreground font-medium leading-relaxed mb-8 flex-grow">
                            "{t.text}"
                        </blockquote>

                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden border-2 border-background shadow-sm">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-foreground font-serif">{t.name}</p>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                    {t.location} • <span className="text-primary">{t.trip_type} Trip</span>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
