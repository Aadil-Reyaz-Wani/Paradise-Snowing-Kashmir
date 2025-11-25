"use client";

import { useState, useRef } from "react";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/actions";
import { Loader2, Trash2, Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";

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
        <div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Upload New Image</h2>
                <form
                    ref={formRef}
                    action={handleUpload}
                    className="flex flex-col md:flex-row gap-4 items-end"
                >
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image File</label>
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            required
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Caption</label>
                        <input
                            type="text"
                            name="caption"
                            placeholder="e.g. Dal Lake Sunset"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select
                            name="category"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="General">General</option>
                            <option value="Kashmir">Kashmir</option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        Upload
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {initialImages.map((img) => (
                    <div key={img.id} className="group relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="aspect-square bg-slate-100 relative">
                            <img
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${img.storage_path}`}
                                alt={img.caption || "Gallery Image"}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-medium text-slate-900 truncate">{img.caption || "No caption"}</p>
                            <p className="text-xs text-slate-500">{img.category}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(img.id, img.storage_path)}
                            className="absolute top-2 right-2 p-2 bg-white/90 text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
