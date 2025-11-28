"use client";

import { useState, useRef } from "react";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/actions";
import { Loader2, Trash2, Upload, Plus, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type GalleryImage = {
    id: string;
    storage_path: string;
    category: string | null;
    caption: string | null;
};

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
    const [isUploading, setIsUploading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleUpload = async (formData: FormData) => {
        setIsUploading(true);
        try {
            const result = await uploadGalleryImage(null, formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Image uploaded successfully");
                formRef.current?.reset();
                setSelectedFile(null);
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
            {/* Upload Section */}
            <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
                    <CardTitle className="text-xl font-bold font-serif text-primary flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload New Image
                    </CardTitle>
                    <CardDescription>Add high-quality images to your gallery.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form
                        ref={formRef}
                        action={handleUpload}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* Upload Zone */}
                        <div className="lg:col-span-4 space-y-2">
                            <Label htmlFor="file" className="text-sm font-semibold text-foreground">Image File</Label>
                            <div className="relative aspect-[4/3] border-2 border-dashed border-primary/20 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center text-center p-6 bg-background/50">
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                />
                                <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 shadow-sm">
                                    <Upload className="h-6 w-6" />
                                </div>
                                <div className="space-y-1 w-full flex flex-col items-center">
                                    <p className="font-bold text-foreground text-sm truncate max-w-[90%]">
                                        {selectedFile ? selectedFile.name : "Click to browse"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedFile ? "Image selected" : "SVG, PNG, JPG or GIF"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="caption" className="text-sm font-semibold text-foreground">Caption</Label>
                                <Input
                                    id="caption"
                                    type="text"
                                    name="caption"
                                    placeholder="e.g. Sunset at Dal Lake"
                                    className="h-12 rounded-xl border-primary/20 focus:border-primary bg-background/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-semibold text-foreground">Category</Label>
                                    <Select name="category" defaultValue="Nature">
                                        <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-background/50">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Nature">Nature</SelectItem>
                                            <SelectItem value="Adventure">Adventure</SelectItem>
                                            <SelectItem value="Culture">Culture</SelectItem>
                                            <SelectItem value="Hotels">Hotels</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold opacity-0 select-none">Action</Label>
                                    <Button
                                        type="submit"
                                        disabled={isUploading}
                                        className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-base"
                                    >
                                        {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                                        Upload Image
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {initialImages.map((img) => (
                    <div key={img.id} className="group relative bg-white/50 backdrop-blur-sm rounded-xl shadow-md border-none overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square bg-muted relative overflow-hidden">
                            <BlurImage
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`}
                                alt={img.caption || "Gallery Image"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(img.id, img.storage_path)}
                                    className="h-10 w-10 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform hover:bg-red-600"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/10">
                                    {img.category || "General"}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-bold text-primary font-serif truncate">{img.caption || "Untitled Image"}</p>
                            <p className="text-xs text-muted-foreground mt-1">ID: {img.id.slice(0, 8)}...</p>
                        </div>
                    </div>
                ))}
                {initialImages.length === 0 && (
                    <div className="col-span-full py-24 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-primary/10">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <ImageIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-serif mb-2">Gallery is empty</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Upload your first image to start building your gallery.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
