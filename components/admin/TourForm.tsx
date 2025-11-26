"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTour, updateTour } from "@/lib/actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/tours"
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-500" />
                </Link>
                <h1 className="text-2xl font-bold text-foreground">
                    {isEditing ? `Edit Tour: ${tour.title}` : "Create New Tour"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Tour Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={tour?.title}
                                    required
                                    placeholder="e.g. Majestic Kashmir"
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
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <select
                                    id="region"
                                    name="region"
                                    defaultValue={tour?.region || "Kashmir"}
                                    className="flex h-12 w-full rounded-xl border-2 border-input bg-white px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-primary/50 dark:bg-card dark:border-input"
                                >
                                    <option value="Kashmir">Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Jammu">Jammu</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trip_type">Trip Type</Label>
                                <select
                                    id="trip_type"
                                    name="trip_type"
                                    defaultValue={tour?.trip_type || "Family"}
                                    className="flex h-12 w-full rounded-xl border-2 border-input bg-white px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-primary/50 dark:bg-card dark:border-input"
                                >
                                    <option value="Family">Family</option>
                                    <option value="Honeymoon">Honeymoon</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Group">Group</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>

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
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="long_description">Long Description</Label>
                            <Textarea
                                id="long_description"
                                name="long_description"
                                defaultValue={tour?.long_description}
                                rows={6}
                                placeholder="Detailed overview..."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_active"
                                id="is_active"
                                defaultChecked={tour?.is_active ?? true}
                                className="h-4 w-4 text-primary rounded border-input focus:ring-ring"
                            />
                            <Label htmlFor="is_active" className="mb-0 cursor-pointer">
                                Active (Visible to public)
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tour Images</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isEditing && tour?.images && tour.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {tour.images.map((img: any) => (
                                    <div key={img.id} className="relative group aspect-video bg-muted rounded-lg overflow-hidden">
                                        <BlurImage
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${img.storage_path}`}
                                            alt="Tour"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!confirm("Delete this image?")) return;
                                                const { deleteTourImage } = await import("@/lib/actions");
                                                await deleteTourImage(img.id, img.storage_path);
                                                toast.success("Image deleted");
                                                router.refresh();
                                            }}
                                            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ArrowLeft className="h-4 w-4 rotate-45" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Label>Upload Images</Label>
                            <div className="border-2 border-dashed border-input rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors">
                                <input
                                    type="file"
                                    name="images"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    id="images-upload"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length > 0) {
                                            toast.info(`${files.length} images selected`);
                                            // Create previews
                                            const newPreviews = files.map(file => URL.createObjectURL(file));
                                            setPreviews(prev => {
                                                // Revoke old previews to avoid leaks
                                                prev.forEach(url => URL.revokeObjectURL(url));
                                                return newPreviews;
                                            });
                                        }
                                    }}
                                />
                                <label htmlFor="images-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                    <div className="p-3 bg-primary/10 text-primary rounded-full">
                                        <Save className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Click to upload images</span>
                                    <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 10MB)</span>
                                </label>
                            </div>

                            {/* New Image Previews */}
                            {previews.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Selected to Upload:</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {previews.map((url, idx) => (
                                            <div key={idx} className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-primary/50">
                                                <BlurImage src={url} alt="Preview" fill className="object-cover" unoptimized />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/tours"
                        className="px-6 py-2 text-muted-foreground font-medium hover:bg-secondary rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isEditing ? "Update Tour" : "Create Tour"}
                    </button>
                </div>
            </form>
        </div>
    );
}
