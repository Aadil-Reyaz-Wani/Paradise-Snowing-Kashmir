import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";

export const metadata = {
    title: "Destinations - Paradise Snowing Kashmir",
    description: "Explore the top destinations in Jammu, Kashmir, and Ladakh.",
};

const destinations = [
    {
        name: "Srinagar",
        description: "The summer capital, famous for Dal Lake, houseboats, and Mughal gardens.",
        image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop",
        slug: "srinagar"
    },
    {
        name: "Gulmarg",
        description: "The meadow of flowers, known for the world's highest gondola and skiing.",
        image: "https://images.unsplash.com/photo-1562602735-26322989201b?q=80&w=800&auto=format&fit=crop",
        slug: "gulmarg"
    },
    {
        name: "Pahalgam",
        description: "The valley of shepherds, starting point for Amarnath Yatra and home to Betaab Valley.",
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop",
        slug: "pahalgam"
    },
    {
        name: "Sonamarg",
        description: "The meadow of gold, gateway to Ladakh and home to the Thajiwas Glacier.",
        image: "https://images.unsplash.com/photo-1623163630656-7c98782a0b44?q=80&w=800&auto=format&fit=crop",
        slug: "sonamarg"
    },
    {
        name: "Leh",
        description: "The heart of Ladakh, rich in culture, monasteries, and stunning landscapes.",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop",
        slug: "leh"
    },
    {
        name: "Nubra Valley",
        description: "Known for its sand dunes, double-humped camels, and Diskit Monastery.",
        image: "https://images.unsplash.com/photo-1534234828563-023c91ad863a?q=80&w=800&auto=format&fit=crop",
        slug: "nubra"
    },
    {
        name: "Pangong Lake",
        description: "The world's highest saltwater lake that changes colors from blue to green to red.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
        slug: "pangong"
    }
];

export default function Destinations() {
    return (
        <div className="min-h-screen bg-background pt-24">
            {/* Hero Section */}
            <section className="relative py-20 bg-muted/30">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        Destinations
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Discover the breathtaking landscapes of Jammu, Kashmir, and Ladakh. From snow-capped peaks to lush green valleys.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {destinations.map((dest, idx) => (
                        <div key={dest.name} className={`group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                                <BlurImage
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-card-foreground mb-3">{dest.name}</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {dest.description}
                                </p>
                                <div>
                                    <Link
                                        href={`/tours?region=${dest.name}`} // Simple filter link for now
                                        className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                                    >
                                        View Packages <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
