import { getTestimonials } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function TestimonialsList() {
    const testimonials = await getTestimonials();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
                <Card key={t.id} className="p-8 border-border/50">
                    <div className="flex gap-1 mb-4">
                        {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                    <div>
                        <p className="font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.location} • {t.trip_type} Trip</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
