"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { createTour, updateTour } from "@/lib/actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type TourFormProps = {
    tour?: any; // Replace with proper type
    isEditing?: boolean;
};

export default function TourForm({ tour, isEditing = false }: TourFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            }
        } catch (error) {
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
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? `Edit Tour: ${tour.title}` : "Create New Tour"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900 border-b pb-4">Basic Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Tour Title</label>
                            <input
                                name="title"
                                defaultValue={tour?.title}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Majestic Kashmir"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Slug (URL)</label>
                            <input
                                name="slug"
                                defaultValue={tour?.slug}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. majestic-kashmir-5n6d"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Region</label>
                            <select
                                name="region"
                                defaultValue={tour?.region || "Kashmir"}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="Kashmir">Kashmir</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Jammu">Jammu</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Trip Type</label>
                            <select
                                name="trip_type"
                                defaultValue={tour?.trip_type || "Family"}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="Family">Family</option>
                                <option value="Honeymoon">Honeymoon</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Group">Group</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Duration (Days)</label>
                            <input
                                name="duration_days"
                                type="number"
                                min="1"
                                defaultValue={tour?.duration_days || 5}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Base Price (₹)</label>
                            <input
                                name="base_price"
                                type="number"
                                min="0"
                                defaultValue={tour?.base_price}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Short Description</label>
                        <textarea
                            name="short_description"
                            defaultValue={tour?.short_description}
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Brief summary for cards..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Long Description</label>
                        <textarea
                            name="long_description"
                            defaultValue={tour?.long_description}
                            rows={6}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Detailed overview..."
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="is_active"
                            id="is_active"
                            defaultChecked={tour?.is_active ?? true}
                            className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                            Active (Visible to public)
                        </label>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900 border-b pb-4">Tour Images</h2>

                    {isEditing && tour?.images && tour.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {tour.images.map((img: any) => (
                                <div key={img.id} className="relative group aspect-video bg-slate-100 rounded-lg overflow-hidden">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${img.storage_path}`}
                                        alt="Tour"
                                        className="w-full h-full object-cover"
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
                                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ArrowLeft className="h-4 w-4 rotate-45" /> {/* Using ArrowLeft as X icon substitute or import X */}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Upload Images</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                className="hidden"
                                id="images-upload"
                                onChange={(e) => {
                                    const count = e.target.files?.length || 0;
                                    if (count > 0) toast.info(`${count} images selected`);
                                }}
                            />
                            <label htmlFor="images-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                    <Save className="h-6 w-6" /> {/* Using Save as Upload substitute or import Upload */}
                                </div>
                                <span className="text-sm font-medium text-slate-900">Click to upload images</span>
                                <span className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 5MB)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/tours"
                        className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isEditing ? "Update Tour" : "Create Tour"}
                    </button>
                </div>
            </form>
        </div>
    );
}
