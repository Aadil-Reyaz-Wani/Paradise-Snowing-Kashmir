import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
    const supabase = await createClient();
    const { data: images } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-foreground">Gallery Management</h1>
                <p className="text-muted-foreground mt-1">Curate your visual storytelling.</p>
            </div>
            <GalleryManager initialImages={images || []} />
        </div>
    );
}
