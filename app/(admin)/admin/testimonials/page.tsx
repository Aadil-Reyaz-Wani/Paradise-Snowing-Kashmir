import { createClient } from "@/lib/supabase/server";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default async function AdminTestimonialsPage() {
    const supabase = await createClient();
    const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-foreground">Testimonials Management</h1>
                <p className="text-muted-foreground mt-1">Manage client reviews and feedback.</p>
            </div>
            <TestimonialsManager initialTestimonials={testimonials || []} />
        </div>
    );
}
