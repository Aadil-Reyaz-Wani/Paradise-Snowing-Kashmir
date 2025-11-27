import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Wind, Mountain } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import { getPublicDestinations } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Destinations - Paradise Snowing Kashmir",
    description: "Explore the top destinations in Jammu, Kashmir, and Ladakh.",
    openGraph: {
        title: "Destinations - Paradise Snowing Kashmir",
        description: "Explore the top destinations in Jammu, Kashmir, and Ladakh.",
        images: ["https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop"],
    },
};

async function DestinationsList() {
    const destinations = await getPublicDestinations();

    if (destinations.length === 0) {
        return (
            <div className="text-center py-32 bg-secondary/10 rounded-[3rem] border border-border/50">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-foreground mb-3">No Destinations Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">We are currently curating our list of paradise locations. Please check back soon.</p>
            </div>
        );
    }

    return (
        <div className="space-y-16 md:space-y-32">
            {destinations.map((dest: any, idx: number) => (
                <div
                    key={dest.id}
                    className={cn(
                        "flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 lg:gap-24 group",
                        // Zig-Zag Logic: Even index = Image Left, Odd index = Image Right
                        idx % 2 === 1 && "md:flex-row-reverse"
                    )}
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] relative rounded-lg overflow-hidden shadow-2xl">
                            <BlurImage
                                src={dest.image?.startsWith("http") ? dest.image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${dest.image}`}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Subtle Overlay for depth */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* Decorative Elements - Hidden on mobile to reduce clutter */}
                        <div className={cn(
                            "hidden md:block absolute -z-10 w-full h-full border border-primary/20 rounded-xl top-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2",
                            idx % 2 === 0 ? "left-4" : "right-4"
                        )} />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 text-left space-y-4 md:space-y-8 px-1 md:px-0">
                        <div className="space-y-2 md:space-y-4">
                            <div className={cn(
                                "flex items-center gap-3 text-primary font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase",
                                "justify-start"
                            )}>
                                <span className="w-8 h-px bg-primary" />
                                <span>0{idx + 1}</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground leading-tight">
                                {dest.name}
                            </h2>
                        </div>

                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-light">
                            {dest.description}
                        </p>

                        <div className={cn("pt-2 md:pt-4", "flex justify-start")}>
                            <Button asChild className="rounded-xl h-12 md:h-14 px-8 bg-[#F8FAFC] text-primary font-bold tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none group/btn">
                                <Link href={`/tours?region=${dest.name}`}>
                                    Explore Packages
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function DestinationsSkeleton() {
    return (
        <div className="space-y-16 md:space-y-32">
            {[1, 2, 3].map((i) => (
                <div key={i} className={cn(
                    "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                    i % 2 === 1 && "md:flex-row-reverse"
                )}>
                    <Skeleton className="w-full md:w-1/2 aspect-[3/4] rounded-[2rem]" />
                    <div className="w-full md:w-1/2 space-y-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-16 w-3/4" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-12 w-40 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Destinations() {
    return (
        <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20 md:pb-32"> {/* Warm off-white background */}
            <div className="container mx-auto px-4 max-w-6xl">
                {/* 1. Soft Intro Header */}
                <div className="text-center mb-16 md:mb-32 space-y-4 md:space-y-6 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        <Mountain className="h-3 w-3 md:h-4 md:w-4" />
                        <span>The Journey Begins</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-serif text-foreground tracking-tight">
                        Discover <span className="italic text-primary font-light">Paradise</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed px-4">
                        A curated selection of the most breathtaking landscapes in Kashmir. Take your time, scroll through, and let the beauty unfold.
                    </p>

                    <div className="flex justify-center pt-8 opacity-50 animate-bounce">
                        <Wind className="h-5 w-5 md:h-6 md:w-6 rotate-90 text-muted-foreground" />
                    </div>
                </div>

                {/* 2. The Zig-Zag List */}
                <Suspense fallback={<DestinationsSkeleton />}>
                    <DestinationsList />
                </Suspense>

                {/* 3. Final CTA */}
                <div className="mt-20 md:mt-32 text-center space-y-6 md:space-y-8 py-16 md:py-24 border-t border-primary/10">
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground">
                        Your Journey Awaits
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto px-4">
                        Ready to witness these views in person? Let us handle the details while you make the memories.
                    </p>
                    <Button asChild className="rounded-xl h-14 md:h-16 px-10 md:px-12 text-base md:text-lg bg-[#F8FAFC] text-primary font-bold tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none">
                        <Link href="/contact">Start Planning</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
