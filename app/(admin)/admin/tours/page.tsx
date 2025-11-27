import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { deleteTour } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default async function AdminToursPage() {
    const supabase = await createClient();
    const { data: tours } = await supabase.from("tours").select("*").order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight text-foreground">Tours</h1>
                    <p className="text-muted-foreground mt-1">Manage your tour packages.</p>
                </div>
                <Button asChild className="gap-2 shadow-md">
                    <Link href="/admin/tours/new">
                        <Plus className="h-4 w-4" />
                        Add New Tour
                    </Link>
                </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground uppercase text-xs font-semibold tracking-wider border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Region</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {tours?.map((tour) => (
                                <tr key={tour.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-foreground">{tour.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{tour.region}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{tour.duration_days} Days</td>
                                    <td className="px-6 py-4 font-medium text-foreground">₹{tour.base_price.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${tour.is_active
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                            : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"
                                            }`}>
                                            {tour.is_active ? 'Active' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                                <Link href={`/tours/${tour.slug}`} target="_blank" title="View Live">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                                <Link href={`/admin/tours/${tour.id}`} title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                "use server";
                                                await deleteTour(tour.id);
                                            }}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!tours || tours.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                                        No tours found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
