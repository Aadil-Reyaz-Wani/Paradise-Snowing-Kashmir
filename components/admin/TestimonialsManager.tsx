"use client";

import { useState, useRef } from "react";
import { createTestimonial, deleteTestimonial } from "@/lib/actions";
import { Loader2, Trash2, Plus, Star, User } from "lucide-react";
import { toast } from "sonner";

type Testimonial = {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    trip_type: string;
    show_on_homepage: boolean;
};

export default function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await createTestimonial(null, formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Testimonial added successfully");
                formRef.current?.reset();
            }
        } catch (error) {
            toast.error("Failed to add testimonial");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await deleteTestimonial(id);
            toast.success("Testimonial deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Add New Testimonial</h2>
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Rahul Sharma"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Mumbai"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                            <select
                                name="rating"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                defaultValue="5"
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Trip Type</label>
                            <select
                                name="trip_type"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                defaultValue="Family"
                            >
                                <option value="Family">Family</option>
                                <option value="Honeymoon">Honeymoon</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                        <div className="flex items-center pt-6">
                            <input
                                type="checkbox"
                                name="show_on_homepage"
                                id="show_on_homepage"
                                defaultChecked
                                className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mr-2"
                            />
                            <label htmlFor="show_on_homepage" className="text-sm font-medium text-slate-700">
                                Show on Homepage
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Review Text</label>
                        <textarea
                            name="text"
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Client's feedback..."
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                            Add Testimonial
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialTestimonials.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                                    <p className="text-xs text-slate-500">{item.location} • {item.trip_type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
                                <Star className="h-3 w-3 fill-current" />
                                {item.rating}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm italic">"{item.text}"</p>

                        <div className="mt-4 flex justify-between items-center border-t pt-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${item.show_on_homepage ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                {item.show_on_homepage ? 'On Homepage' : 'Hidden'}
                            </span>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
