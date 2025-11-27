"use client";

import { useState, useRef } from "react";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/actions";
import { Loader2, Trash2, Upload, Plus, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GalleryImage = {
    id: string;
    storage_path: string;
    category: string | null;
    caption: string | null;
};

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
    const [isUploading, setIsUploading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleUpload = async (formData: FormData) => {
        setIsUploading(true);
        try {
            const result = await uploadGalleryImage(null, formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Image uploaded successfully");
                formRef.current?.reset();
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string, path: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const result = await deleteGalleryImage(id, path);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Image deleted");
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-8">
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-serif flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        Upload New Image
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        ref={formRef}
                        action={handleUpload}
                        className="flex flex-col md:flex-row gap-6 items-end"
                    >
                        <div className="flex-1 w-full space-y-2">
                            <Label htmlFor="file">Image File</Label>
                            <Input
                                id="file"
                                type="file"
                                name="file"
                                accept="image/*"
                                required
                                className="cursor-pointer file:text-primary"
                            />
                        </div>
                        <div className="flex-1 w-full space-y-2">
                            <Label htmlFor="caption">Caption</Label>
                            <Input
                                id="caption"
                                type="text"
                                name="caption"
                                placeholder="e.g. Dal Lake Sunset"
                            />
                        </div>
                        <div className="w-full md:w-48 space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    name="category"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="Nature">Nature</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Hotels">Hotels</option>
                                </select>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isUploading}
                            className="w-full md:w-auto min-w-[120px]"
                        >
                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                            Upload
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {initialImages.map((img) => (
                    <div key={img.id} className="group relative bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-all">
                        <div className="aspect-square bg-muted relative overflow-hidden">
                            <BlurImage
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`}
                                alt={img.caption || "Gallery Image"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(img.id, img.storage_path)}
                                    className="h-10 w-10 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-bold text-foreground truncate">{img.caption || "No caption"}</p>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{img.category}</p>
                        </div>
                    </div>
                ))}
                {initialImages.length === 0 && (
                    <div className="col-span-full py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-secondary/10">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <ImageIcon className="h-8 w-8" />
                        </div>
                        <p className="text-muted-foreground">No images in gallery yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
