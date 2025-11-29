import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil, Trash2, Eye, MapPin, Calendar, IndianRupee } from "lucide-react";
import { deleteTour } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteTourButton } from "@/components/admin/DeleteTourButton";

export default async function AdminToursPage() {
    const supabase = await createClient();
    const { data: tours } = await supabase.from("tours").select("*").order("created_at", { ascending: false });

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-serif text-primary">Tour Packages</h1>
                    <p className="text-muted-foreground mt-1">Manage and organize your travel offerings.</p>
                </div>
                <Button asChild className="rounded-xl shadow-lg shadow-primary/20 h-12 px-6 text-base">
                    <Link href="/admin/tours/new">
                        <Plus className="mr-2 h-5 w-5" />
                        Create New Tour
                    </Link>
                </Button>
            </div>

            {/* Desktop View - Table */}
            <Card className="hidden md:block border-none shadow-md bg-white/50 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-primary/5 text-primary uppercase text-xs font-bold tracking-wider border-b border-primary/10">
                            <tr>
                                <th className="px-6 py-5">Package Details</th>
                                <th className="px-6 py-5">Region</th>
                                <th className="px-6 py-5">Duration</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {tours?.map((tour) => (
                                <tr key={tour.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div>
                                            <div className="font-bold text-base text-foreground font-serif">{tour.title}</div>
                                            <div className="text-xs text-muted-foreground font-mono mt-1">{tour.slug}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                                            {tour.region}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                                            {tour.duration_days} Days
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center font-medium text-foreground">
                                            <IndianRupee className="h-3.5 w-3.5 mr-1 text-primary" />
                                            {tour.base_price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Badge
                                            variant="outline"
                                            className={`rounded-full px-3 py-1 border-0 ${tour.is_active
                                                ? "bg-green-500/10 text-green-700 ring-1 ring-green-600/20"
                                                : "bg-yellow-500/10 text-yellow-700 ring-1 ring-yellow-600/20"
                                                }`}
                                        >
                                            {tour.is_active ? 'Active' : 'Draft'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors hover:scale-105" title="View Live">
                                                <Link href={`/tours/${tour.slug}`} target="_blank">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105" title="Edit">
                                                <Link href={`/admin/tours/${tour.id}`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <DeleteTourButton id={tour.id} title={tour.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!tours || tours.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <p className="text-lg font-medium text-foreground">No tours found</p>
                                            <p className="text-muted-foreground max-w-sm">
                                                Get started by creating your first tour package to showcase your destinations.
                                            </p>
                                            <Button asChild variant="outline" className="mt-4 rounded-xl">
                                                <Link href="/admin/tours/new">
                                                    Create Tour
                                                </Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Mobile View - Cards */}
            <div className="md:hidden grid gap-4">
                {tours?.map((tour) => (
                    <Card key={tour.id} className="border-none shadow-md bg-white/50 backdrop-blur-sm overflow-hidden rounded-xl">
                        <CardContent className="p-5 space-y-4">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground font-serif leading-tight">{tour.title}</h3>
                                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate max-w-[200px]">{tour.slug}</p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={`rounded-full px-2.5 py-0.5 text-xs border-0 shrink-0 ${tour.is_active
                                        ? "bg-green-500/10 text-green-700 ring-1 ring-green-600/20"
                                        : "bg-yellow-500/10 text-yellow-700 ring-1 ring-yellow-600/20"
                                        }`}
                                >
                                    {tour.is_active ? 'Active' : 'Draft'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center text-muted-foreground bg-white/40 p-2 rounded-lg">
                                    <MapPin className="h-4 w-4 mr-2 text-primary/70" />
                                    <span className="truncate">{tour.region}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground bg-white/40 p-2 rounded-lg">
                                    <Calendar className="h-4 w-4 mr-2 text-primary/70" />
                                    <span>{tour.duration_days} Days</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                                <div className="flex items-center font-bold text-lg text-primary">
                                    <IndianRupee className="h-4 w-4 mr-1" />
                                    {tour.base_price.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors hover:scale-105">
                                        <Link href={`/tours/${tour.slug}`} target="_blank">
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105">
                                        <Link href={`/admin/tours/${tour.id}`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <DeleteTourButton id={tour.id} title={tour.title} className="h-8 w-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors hover:scale-105" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {(!tours || tours.length === 0) && (
                    <div className="flex flex-col items-center justify-center space-y-3 py-12 text-center bg-white/50 backdrop-blur-sm rounded-xl border-none shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <p className="text-lg font-medium text-foreground">No tours found</p>
                        <Button asChild variant="outline" className="mt-4 rounded-xl">
                            <Link href="/admin/tours/new">
                                Create Tour
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
