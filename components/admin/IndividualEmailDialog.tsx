"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Mail } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendIndividualEmail } from "@/lib/actions";
import { AlertSuccess, AlertError } from "@/components/ui/global-alerts";

export function IndividualEmailDialog({ email, showLabel = false }: { email: string, showLabel?: boolean }) {
    const [open, setOpen] = useState(false);
    const [state, action] = useActionState(sendIndividualEmail, null);
    const [mounted, setMounted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            setShowSuccess(true);
        } else if (state?.error) {
            setShowError(true);
        }
    }, [state]);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={showLabel
                    ? "w-full justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105"
                    : "h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105"
                }
            >
                <Mail className="h-4 w-4" />
                {showLabel ? "Send Email" : <span className="sr-only">Send Email</span>}
            </Button>
        );
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size={showLabel ? "default" : "icon"}
                        className={showLabel
                            ? "w-full justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105"
                            : "h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors hover:scale-105"
                        }
                    >
                        <Mail className="h-4 w-4" />
                        {showLabel ? "Send Email" : <span className="sr-only">Send Email</span>}
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-[525px] rounded-2xl bg-[#FDFBF7] border-primary/10 shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none rounded-lg" />

                    <DialogHeader className="relative z-10">
                        <DialogTitle className="font-serif text-2xl text-primary">Send Email</DialogTitle>
                        <DialogDescription>
                            Sending to <span className="font-medium text-foreground">{email}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <form action={action} className="space-y-6 relative z-10 mt-4">
                        <input type="hidden" name="email" value={email} />
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-primary font-medium">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="e.g., Regarding your inquiry..."
                                required
                                className="bg-white/50 border-primary/20 focus:border-primary focus:ring-0 rounded-xl h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-primary font-medium">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                className="min-h-[200px] bg-white/50 border-primary/20 focus:border-primary focus:ring-0 rounded-xl resize-none p-4"
                                required
                            />
                        </div>
                        <DialogFooter>
                            <SubmitButton />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Email Sent Successfully"
                description={`Your email to ${email} has been sent.`}
                confirmText="Done"
            />

            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Failed to Send"
                description={state?.error || "An unexpected error occurred."}
            />
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full h-14 bg-[#F8FAFC] text-primary font-bold text-lg rounded-xl tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                </>
            )}
        </Button>
    );
}
