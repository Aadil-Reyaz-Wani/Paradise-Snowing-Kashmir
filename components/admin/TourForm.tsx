"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTour, updateTour } from "@/lib/actions";
import { Loader2, Save, ArrowLeft, Upload, Image as ImageIcon, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlurImage } from "@/components/ui/blur-image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TourFormProps = {
    tour?: any; // Replace with proper type
    isEditing?: boolean;
};

export default function TourForm({ tour, isEditing = false }: TourFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    // Dynamic Fields State
    const [highlights, setHighlights] = useState<string[]>(tour?.highlights || []);
    const [itinerary, setItinerary] = useState<any[]>(tour?.itinerary || []);
    const [inclusions, setInclusions] = useState<string[]>(tour?.inclusions || []);
    const [exclusions, setExclusions] = useState<string[]>(tour?.exclusions || []);

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
                                        <Select name="region" defaultValue={tour?.region || "Kashmir"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Kashmir">Kashmir</SelectItem>
                                                <SelectItem value="Ladakh">Ladakh</SelectItem>
                                                <SelectItem value="Jammu">Jammu</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="trip_type">Trip Type</Label>
                                        <Select name="trip_type" defaultValue={tour?.trip_type || "Family"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Trip Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Family">Family</SelectItem>
                                                <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                                                <SelectItem value="Adventure">Adventure</SelectItem>
                                                <SelectItem value="Group">Group</SelectItem>
                                                <SelectItem value="Custom">Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
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

                        {/* Highlights Section */}
                        <Card className="border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif">Trip Highlights</CardTitle>
                                <CardDescription>Key features of this tour package.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {highlights.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => {
                                                const newHighlights = [...highlights];
                                                newHighlights[idx] = e.target.value;
                                                setHighlights(newHighlights);
                                            }}
                                            placeholder="e.g. Shikara Ride on Dal Lake"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                const newHighlights = highlights.filter((_, i) => i !== idx);
                                                setHighlights(newHighlights);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setHighlights([...highlights, ""])}
                                    className="mt-2"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Highlight
                                </Button>
                                <input type="hidden" name="highlights" value={JSON.stringify(highlights)} />
                            </CardContent>
                        </Card>

                        {/* Itinerary Section */}
                        <Card className="border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif">Day-wise Itinerary</CardTitle>
                                <CardDescription>Detailed daily plan for the tour.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {itinerary.map((day, idx) => (
                                    <div key={idx} className="p-4 border rounded-xl space-y-4 bg-muted/30">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm bg-primary/10 text-primary px-2 py-1 rounded">Day {day.day}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newItinerary = itinerary.filter((_, i) => i !== idx);
                                                    // Re-index days
                                                    const reindexed = newItinerary.map((d, i) => ({ ...d, day: i + 1 }));
                                                    setItinerary(reindexed);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={day.title}
                                                onChange={(e) => {
                                                    const newItinerary = [...itinerary];
                                                    newItinerary[idx].title = e.target.value;
                                                    setItinerary(newItinerary);
                                                }}
                                                placeholder="e.g. Arrival in Srinagar"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={day.description}
                                                onChange={(e) => {
                                                    const newItinerary = [...itinerary];
                                                    newItinerary[idx].description = e.target.value;
                                                    setItinerary(newItinerary);
                                                }}
                                                placeholder="Details about the day's activities..."
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setItinerary([...itinerary, { day: itinerary.length + 1, title: "", description: "" }])}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Day
                                </Button>
                                <input type="hidden" name="itinerary" value={JSON.stringify(itinerary)} />
                            </CardContent>
                        </Card>

                        {/* Inclusions & Exclusions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border-border/50 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold font-serif text-green-600">Inclusions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {inclusions.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => {
                                                    const newInclusions = [...inclusions];
                                                    newInclusions[idx] = e.target.value;
                                                    setInclusions(newInclusions);
                                                }}
                                                placeholder="Included item..."
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newInclusions = inclusions.filter((_, i) => i !== idx);
                                                    setInclusions(newInclusions);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setInclusions([...inclusions, ""])}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Inclusion
                                    </Button>
                                    <input type="hidden" name="inclusions" value={JSON.stringify(inclusions)} />
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold font-serif text-red-600">Exclusions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {exclusions.map((item, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => {
                                                    const newExclusions = [...exclusions];
                                                    newExclusions[idx] = e.target.value;
                                                    setExclusions(newExclusions);
                                                }}
                                                placeholder="Excluded item..."
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    const newExclusions = exclusions.filter((_, i) => i !== idx);
                                                    setExclusions(newExclusions);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setExclusions([...exclusions, ""])}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Exclusion
                                    </Button>
                                    <input type="hidden" name="exclusions" value={JSON.stringify(exclusions)} />
                                </CardContent>
                            </Card>
                        </div>

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
                        <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold font-serif text-primary">Publishing</CardTitle>
                                <CardDescription>Control the visibility of this tour.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-primary/10">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base font-semibold text-foreground">Active Status</Label>
                                        <p className="text-xs text-muted-foreground">Visible to the public</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        id="is_active"
                                        defaultChecked={tour?.is_active ?? true}
                                        className="h-5 w-5 text-primary rounded border-primary/20 focus:ring-primary cursor-pointer accent-primary"
                                    />
                                </div>

                                <div className="pt-4 border-t border-primary/10 space-y-4">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full font-bold text-lg h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                        size="lg"
                                    >
                                        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                        {isEditing ? "Update Tour" : "Create Tour"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full h-12 text-base rounded-xl border-primary/20 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
