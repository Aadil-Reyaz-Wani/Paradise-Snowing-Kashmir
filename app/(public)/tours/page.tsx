import Link from "next/link";
import { getAllTours } from "@/lib/api";
import { MapPin, Calendar, Filter } from "lucide-react";

export const metadata = {
    title: "Tour Packages - Paradise Snowing Kashmir",
    description: "Explore our curated tour packages for Kashmir, Ladakh, and Jammu.",
};

export default async function ToursPage() {
    const tours = await getAllTours();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">All Tour Packages</h1>
                        <p className="text-slate-600 mt-2">Find the perfect itinerary for your next adventure.</p>
                    </div>

                    {/* Placeholder for Filters - To be implemented with client components */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour) => (
                        <Link
                            href={`/tours/${tour.slug}`}
                            key={tour.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col"
                        >
                            <div className="h-56 bg-slate-200 relative overflow-hidden">
                                {tour.images && tour.images.length > 0 ? (
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tours/${tour.images[0].storage_path}`}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                                        <MapPin className="h-10 w-10" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {tour.region}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {tour.duration_days} Days
                                    </span>
                                    <span>•</span>
                                    <span>{tour.trip_type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {tour.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1">
                                    {tour.short_description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                    <div>
                                        <span className="text-xs text-slate-500 block">Starting from</span>
                                        <span className="text-lg font-bold text-slate-900">₹{tour.base_price.toLocaleString()}</span>
                                        <span className="text-xs text-slate-500 ml-1">/ person</span>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {tours.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500">No tours found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
