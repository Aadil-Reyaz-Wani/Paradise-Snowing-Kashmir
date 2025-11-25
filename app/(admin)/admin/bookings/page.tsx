import { createClient } from "@/lib/supabase/server";
import BookingsManager from "@/components/admin/BookingsManager";

export default async function AdminBookingsPage() {
    const supabase = await createClient();

    const { data: bookings } = await supabase
        .from("bookings")
        .select(`
      *,
      tour:tours(title, duration_days)
    `)
        .order("created_at", { ascending: false });

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Bookings Management</h1>
            <BookingsManager initialBookings={bookings || []} />
        </div>
    );
}
