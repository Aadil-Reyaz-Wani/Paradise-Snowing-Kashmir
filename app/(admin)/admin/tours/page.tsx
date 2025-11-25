import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { deleteTour } from "@/lib/actions";

export default async function AdminToursPage() {
    const supabase = await createClient();
    const { data: tours } = await supabase.from("tours").select("*").order("created_at", { ascending: false });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Tours</h1>
                <Link
                    href="/admin/tours/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add New Tour
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Title</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Region</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Duration</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Price</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tours?.map((tour) => (
                            <tr key={tour.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{tour.title}</td>
                                <td className="px-6 py-4 text-slate-600">{tour.region}</td>
                                <td className="px-6 py-4 text-slate-600">{tour.duration_days} Days</td>
                                <td className="px-6 py-4 text-slate-600">₹{tour.base_price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tour.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                        }`}>
                                        {tour.is_active ? 'Active' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/tours/${tour.slug}`}
                                            target="_blank"
                                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                            title="View Live"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/tours/${tour.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        <form action={async () => {
                                            "use server";
                                            await deleteTour(tour.id);
                                        }}>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                                type="submit"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!tours || tours.length === 0) && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No tours found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
