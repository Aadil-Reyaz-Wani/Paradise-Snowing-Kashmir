"use client";

import { useState, useRef } from "react";
import { createTestimonial, deleteTestimonial } from "@/lib/actions";
import { Loader2, Trash2, Plus, Star, User, MessageSquare, MapPin, Quote } from "lucide-react";
import { toast } from "sonner";
import { AlertConfirm } from "@/components/ui/global-alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
    const isSubmittingRef = useRef(false);

    const formRef = useRef<HTMLFormElement>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
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
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteTarget(id);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteTestimonial(deleteTarget);
            toast.success("Testimonial deleted");
        } catch (error) {
            toast.error("Delete failed");
        } finally {
            setDeleteTarget(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Add Testimonial Form */}
            <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
                    <CardTitle className="text-xl font-bold font-serif text-primary flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Add New Testimonial
                    </CardTitle>
                    <CardDescription>Share client success stories.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form
                        ref={formRef}
                        action={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-foreground">Client Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    className="h-12 rounded-xl border-primary/20 focus:border-primary bg-background/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-semibold text-foreground">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Mumbai"
                                    className="h-12 rounded-xl border-primary/20 focus:border-primary bg-background/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="rating" className="text-sm font-semibold text-foreground">Rating</Label>
                                <Select name="rating" defaultValue="5">
                                    <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-background/50">
                                        <SelectValue placeholder="Select Rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5 Stars - Excellent</SelectItem>
                                        <SelectItem value="4">4 Stars - Very Good</SelectItem>
                                        <SelectItem value="3">3 Stars - Good</SelectItem>
                                        <SelectItem value="2">2 Stars - Fair</SelectItem>
                                        <SelectItem value="1">1 Star - Poor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="trip_type" className="text-sm font-semibold text-foreground">Trip Type</Label>
                                <Select name="trip_type" defaultValue="Family">
                                    <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-background/50">
                                        <SelectValue placeholder="Select Trip Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Family">Family</SelectItem>
                                        <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                                        <SelectItem value="Adventure">Adventure</SelectItem>
                                        <SelectItem value="Group">Group</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center pt-8 px-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="show_on_homepage"
                                        id="show_on_homepage"
                                        defaultChecked
                                        className="h-5 w-5 text-primary rounded border-primary/20 focus:ring-primary cursor-pointer"
                                    />
                                    <Label htmlFor="show_on_homepage" className="cursor-pointer font-medium">
                                        Show on Homepage
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="text" className="text-sm font-semibold text-foreground">Review Text</Label>
                            <Textarea
                                id="text"
                                name="text"
                                required
                                rows={4}
                                placeholder="Client's feedback..."
                                className="rounded-xl border-primary/20 focus:border-primary bg-background/50 resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-[180px] h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold text-base active:scale-[0.98] transition-all duration-200"
                            >
                                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                                Add Testimonial
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialTestimonials.map((item) => (
                    <Card key={item.id} className="border-none shadow-md bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                        <CardContent className="p-6 relative">
                            <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/5 rotate-180" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner shrink-0">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg text-primary font-serif">{item.name}</h3>
                                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20 flex items-center gap-1 px-1.5 py-0 h-5 text-[10px] rounded-md">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                <span className="font-bold">{item.rating}.0</span>
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                                            <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                                            <span>{item.trip_type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="text-muted-foreground text-sm italic leading-relaxed bg-background/50 p-4 rounded-xl border border-primary/5">
                                    "{item.text}"
                                </p>
                            </div>

                            <div className="mt-6 flex justify-between items-center border-t border-primary/5 pt-4 relative z-10">
                                <Badge variant={item.show_on_homepage ? "default" : "secondary"} className={`rounded-full px-3 py-1 ${item.show_on_homepage ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 border-0' : 'bg-muted text-muted-foreground'}`}>
                                    {item.show_on_homepage ? 'Visible on Homepage' : 'Hidden'}
                                </Badge>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteClick(item.id)}
                                    className="h-9 w-9 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                                    title="Delete"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {initialTestimonials.length === 0 && (
                    <div className="col-span-full py-24 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-primary/10">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <MessageSquare className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-serif mb-2">No testimonials yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Add your first client review to build trust with potential customers.
                        </p>
                    </div>
                )}
            </div>


            <AlertConfirm
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                title="Delete Testimonial?"
                description="This action cannot be undone. This will permanently delete the testimonial."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="destructive"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div >
    );
}
