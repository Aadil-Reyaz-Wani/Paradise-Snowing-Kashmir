"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { AlertError, AlertSuccess } from "@/components/ui/global-alerts";
import { submitContactForm } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number (10-15 digits)"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));

            const result = await submitContactForm(null, formData);

            if (result?.error) {
                setErrorMessage(result.error);
                setShowError(true);
            } else {
                setShowSuccess(true);
                reset();
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your Name"
                            {...register("name")}
                            className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            placeholder="+91 00000 00000"
                            {...register("phone")}
                            className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your travel plans..."
                        {...register("message")}
                        className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-bold text-lg h-12 rounded-xl bg-[#F8FAFC] text-primary shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] border-none"
                >
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    Send Message
                </Button>
            </form>


            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Message Sent!"
                description="Thank you for contacting us. We have received your message and will get back to you shortly."
                confirmText="Great!"
                onConfirm={() => setShowSuccess(false)}
            />

            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Failed to Send"
                description={errorMessage}
                confirmText="Try Again"
                onConfirm={() => setShowError(false)}
            />
        </>
    );
}
