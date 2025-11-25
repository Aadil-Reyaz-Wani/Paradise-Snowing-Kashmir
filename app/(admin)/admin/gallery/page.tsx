import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
    const supabase = await createClient();
    const { data: images } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Gallery Management</h1>
            <GalleryManager initialImages={images || []} />
        </div>
    );
}
