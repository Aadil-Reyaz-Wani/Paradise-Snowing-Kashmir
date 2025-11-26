import { getGalleryImages } from "@/lib/api";
import { Image as ImageIcon } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";

export const metadata = {
    title: "Gallery - Paradise Snowing Kashmir",
    description: "Glimpses of the paradise on earth. Photos from our trips to Kashmir and Ladakh.",
};

export default async function GalleryPage() {
    const images = await getGalleryImages();

    // Group images by category if needed, or just show a grid
    // For now, simple grid

    return (
        <div className="min-h-screen bg-background pt-24">
            <section className="relative py-20 bg-muted/30">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        Photo Gallery
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See the magic of Kashmir and Ladakh through our lens. Real photos from our travelers.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12"> {/* Added mt-12 for spacing after the new section */}
                {images.length === 0 ? (
                    <div className="text-center py-20 bg-muted rounded-2xl border border-dashed border-border">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No images in gallery yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="relative group aspect-square overflow-hidden rounded-xl bg-muted cursor-pointer">
                                {/* 
                  In a real app, use Next.js Image component with Supabase Storage URL 
                  For now, assuming storage_path might be a full URL or we need a helper to resolve it.
                  If it's just a path, we need to construct the public URL.
                */}
                                <BlurImage
                                    src={img.storage_path.startsWith('http') ? img.storage_path : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`}
                                    alt={img.caption || "Gallery Image"}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium truncate">
                                        {img.caption}
                                    </p>
                                </div>
                                {img.category && (
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-wide">
                                        {img.category}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
