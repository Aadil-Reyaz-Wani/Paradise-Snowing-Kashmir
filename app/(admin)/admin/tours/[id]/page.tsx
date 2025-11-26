import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TourForm from "@/components/admin/TourForm";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: tour } = await supabase
        .from("tours")
        .select("*, images:tour_images(*)")
        .eq("id", id)
        .single();

    if (!tour) {
        notFound();
    }

    return <TourForm tour={tour} isEditing />;
}
