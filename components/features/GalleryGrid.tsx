"use client";

import { useState } from "react";
import { BlurImage } from "@/components/ui/blur-image";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
    id: string;
    storage_path: string;
    caption?: string | null;
    category?: string | null;
}

interface GalleryGridProps {
    images: GalleryImage[];
}

const CATEGORIES = ["All", "Nature", "Adventure", "Culture", "Hotels"];

export function GalleryGrid({ images }: GalleryGridProps) {
    const [filter, setFilter] = useState("All");
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = images.filter(
        (img) => filter === "All" || img.category?.toLowerCase() === filter.toLowerCase()
    );

    return (
        <div className="space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300",
                            filter === category
                                ? "bg-[#F8FAFC] text-primary font-bold shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)]"
                                : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in bg-muted"
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className="relative w-full">
                            <BlurImage
                                src={img.storage_path.startsWith('http') ? img.storage_path : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`}
                                alt={img.caption || "Gallery Image"}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                                <ZoomIn className="h-6 w-6" />
                            </div>
                        </div>

                        {/* Caption Badge */}
                        {img.caption && (
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-xl inline-block shadow-lg">
                                    {img.caption}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none overflow-hidden">
                    <DialogTitle className="sr-only">Image View</DialogTitle>
                    <div className="relative w-full h-[80vh] md:h-[90vh] bg-black/90 rounded-2xl overflow-hidden flex items-center justify-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {selectedImage && (
                            <div className="relative w-full h-full">
                                <BlurImage
                                    src={selectedImage.storage_path.startsWith('http') ? selectedImage.storage_path : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${selectedImage.storage_path}`}
                                    alt={selectedImage.caption || "Gallery Image"}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                {selectedImage.caption && (
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                                        <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
