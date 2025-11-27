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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-foreground">Bookings Management</h1>
                <p className="text-muted-foreground mt-1">Track and manage customer reservations.</p>
            </div>
            <BookingsManager initialBookings={bookings || []} />
        </div>
    );
}
