import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TourForm from "@/components/admin/TourForm";

export default async function EditTourPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: tour } = await supabase.from("tours").select("*").eq("id", params.id).single();

    if (!tour) {
        notFound();
    }

    return <TourForm tour={tour} isEditing />;
}
