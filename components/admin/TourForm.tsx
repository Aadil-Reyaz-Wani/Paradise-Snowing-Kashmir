"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTour, updateTour } from "@/lib/actions";
import { Loader2, Save, ArrowLeft, Upload, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlurImage } from "@/components/ui/blur-image";

type TourFormProps = {
    tour?: any; // Replace with proper type
    isEditing?: boolean;
};

export default function TourForm({ tour, isEditing = false }: TourFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = isEditing
                ? await updateTour(tour.id, null, formData)
                : await createTour(null, formData);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success(isEditing ? "Tour updated successfully" : "Tour created successfully");
                router.push("/admin/tours");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full h-10 w-10"
                >
                    <Link href="/admin/tours">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-serif text-foreground">
                        {isEditing ? `Edit Tour: ${tour.title}` : "Create New Tour"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEditing ? "Update the details of your existing tour package." : "Add a new tour package to your catalog."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif">Basic Details</CardTitle>
                                <CardDescription>Essential information about the tour.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Tour Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={tour?.title}
                                        required
                                        placeholder="e.g. Majestic Kashmir"
                                        className="text-lg font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (URL)</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        defaultValue={tour?.slug}
                                        required
                                        placeholder="e.g. majestic-kashmir-5n6d"
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">The unique URL identifier for this tour.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="region">Region</Label>
                                        <div className="relative">
                                            <select
                                                id="region"
                                                name="region"
                                                defaultValue={tour?.region || "Kashmir"}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                            >
                                                <option value="Kashmir">Kashmir</option>
                                                <option value="Ladakh">Ladakh</option>
                                                <option value="Jammu">Jammu</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="trip_type">Trip Type</Label>
                                        <div className="relative">
                                            <select
                                                id="trip_type"
                                                name="trip_type"
                                                defaultValue={tour?.trip_type || "Family"}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                            >
                                                <option value="Family">Family</option>
                                                <option value="Honeymoon">Honeymoon</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Group">Group</option>
                                                <option value="Custom">Custom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="duration_days">Duration (Days)</Label>
                                        <Input
                                            id="duration_days"
                                            name="duration_days"
                                            type="number"
                                            min="1"
                                            defaultValue={tour?.duration_days || 5}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="base_price">Base Price (₹)</Label>
                                        <Input
                                            id="base_price"
                                            name="base_price"
                                            type="number"
                                            min="0"
                                            defaultValue={tour?.base_price}
                                            required
                                            className="font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Textarea
                                        id="short_description"
                                        name="short_description"
                                        defaultValue={tour?.short_description}
                                        rows={3}
                                        placeholder="Brief summary for cards..."
                                        className="resize-none"
                                    />
                                    <p className="text-xs text-muted-foreground">Displayed on tour cards and summaries.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="long_description">Long Description</Label>
                                    <Textarea
                                        id="long_description"
                                        name="long_description"
                                        defaultValue={tour?.long_description}
                                        rows={8}
                                        placeholder="Detailed overview..."
                                        className="resize-y"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif">Tour Images</CardTitle>
                                <CardDescription>Manage the visual gallery for this tour.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isEditing && tour?.images && tour.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {tour.images.map((img: any) => (
                                            <div key={img.id} className="relative group aspect-square bg-muted rounded-xl overflow-hidden border border-border/50">
                                                <BlurImage
                                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${img.storage_path}`}
                                                    alt="Tour"
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={async () => {
                                                            if (!confirm("Delete this image?")) return;
                                                            const { deleteTourImage } = await import("@/lib/actions");
                                                            await deleteTourImage(img.id, img.storage_path);
                                                            toast.success("Image deleted");
                                                            router.refresh();
                                                        }}
                                                        className="h-9 w-9 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <Label>Upload New Images</Label>
                                    <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:bg-secondary/20 transition-colors group cursor-pointer relative">
                                        <input
                                            type="file"
                                            name="images"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            id="images-upload"
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                if (files.length > 0) {
                                                    toast.info(`${files.length} images selected`);
                                                    const newPreviews = files.map(file => URL.createObjectURL(file));
                                                    setPreviews(prev => {
                                                        prev.forEach(url => URL.revokeObjectURL(url));
                                                        return newPreviews;
                                                    });
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center gap-3 pointer-events-none">
                                            <div className="p-4 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform duration-300">
                                                <Upload className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-foreground">Click to upload images</p>
                                                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {previews.length > 0 && (
                                        <div className="space-y-3">
                                            <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Selected to Upload</Label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {previews.map((url, idx) => (
                                                    <div key={idx} className="relative aspect-square bg-muted rounded-xl overflow-hidden border border-primary/50 shadow-sm">
                                                        <BlurImage src={url} alt="Preview" fill className="object-cover" unoptimized />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="border-border/50 shadow-sm sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold font-serif">Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border/50">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base font-medium">Active Status</Label>
                                        <p className="text-xs text-muted-foreground">Visible to the public</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        id="is_active"
                                        defaultChecked={tour?.is_active ?? true}
                                        className="h-5 w-5 text-primary rounded border-input focus:ring-primary cursor-pointer accent-primary"
                                    />
                                </div>

                                <div className="pt-4 border-t border-border/50 space-y-3">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full font-bold shadow-md"
                                        size="lg"
                                    >
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isEditing ? "Update Tour" : "Create Tour"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/admin/tours">
                                            Cancel
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
