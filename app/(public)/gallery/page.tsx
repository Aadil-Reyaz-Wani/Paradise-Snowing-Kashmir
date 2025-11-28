import { getGalleryImages } from "@/lib/api";
import { GalleryGrid } from "@/components/features/GalleryGrid";
import { Image as ImageIcon } from "lucide-react";

export const metadata = {
    title: "Gallery - Paradise Snowing Kashmir",
    description: "Glimpses of the paradise on earth. Photos from our trips to Kashmir and Ladakh.",
};

export default async function GalleryPage() {
    const images = await getGalleryImages();

    return (
        <div className="min-h-screen bg-background pt-20 md:pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-12 md:py-24 bg-secondary/30 mb-12">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-foreground">
                        Photo Gallery
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
                        See the magic of Kashmir and Ladakh through our lens. Real photos from our travelers.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4">
                {images.length === 0 ? (
                    <div className="text-center py-20 bg-card rounded-3xl border border-border/50">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No Images Found</h3>
                        <p className="text-muted-foreground">We are curating our best shots. Check back soon.</p>
                    </div>
                ) : (
                    <GalleryGrid images={images} />
                )}
            </div>
        </div>
    );
}
