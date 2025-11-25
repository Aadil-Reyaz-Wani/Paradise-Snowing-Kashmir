import { createClient } from "@/lib/supabase/server";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function AdminTestimonialsPage() {
    const supabase = await createClient();
    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Testimonials Management</h1>
            <TestimonialsManager initialTestimonials={testimonials || []} />
        </div>
    );
}
