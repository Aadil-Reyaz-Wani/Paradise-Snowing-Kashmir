"use client";

import { useState, useRef } from "react";
import { createTestimonial, deleteTestimonial } from "@/lib/actions";
import { Loader2, Trash2, Plus, Star, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="space-y-8">
            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-serif flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Add New Testimonial
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        ref={formRef}
                        action={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Client Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Mumbai"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="rating">Rating (1-5)</Label>
                                <div className="relative">
                                    <select
                                        id="rating"
                                        name="rating"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                        defaultValue="5"
                                    >
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="trip_type">Trip Type</Label>
                                <div className="relative">
                                    <select
                                        id="trip_type"
                                        name="trip_type"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                        defaultValue="Family"
                                    >
                                        <option value="Family">Family</option>
                                        <option value="Honeymoon">Honeymoon</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Group">Group</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center pt-8">
                                <input
                                    type="checkbox"
                                    name="show_on_homepage"
                                    id="show_on_homepage"
                                    defaultChecked
                                    className="h-4 w-4 text-primary rounded border-input focus:ring-primary mr-2"
                                />
                                <Label htmlFor="show_on_homepage" className="cursor-pointer">
                                    Show on Homepage
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="text">Review Text</Label>
                            <Textarea
                                id="text"
                                name="text"
                                required
                                rows={3}
                                placeholder="Client's feedback..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-[150px]"
                            >
                                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                Add Testimonial
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialTestimonials.map((item) => (
                    <Card key={item.id} className="border-border/50 shadow-sm hover:shadow-md transition-all group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{item.name}</h3>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.location} • {item.trip_type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded text-yellow-600 text-xs font-bold border border-yellow-500/20">
                                    <Star className="h-3 w-3 fill-current" />
                                    {item.rating}
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm italic leading-relaxed">"{item.text}"</p>

                            <div className="mt-6 flex justify-between items-center border-t border-border/50 pt-4">
                                <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide ${item.show_on_homepage ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-muted text-muted-foreground border border-border'}`}>
                                    {item.show_on_homepage ? 'On Homepage' : 'Hidden'}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(item.id)}
                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
