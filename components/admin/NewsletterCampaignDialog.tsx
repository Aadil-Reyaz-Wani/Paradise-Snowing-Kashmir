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
import { Send, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendNewsletterCampaign } from "@/lib/actions";
import { AlertSuccess, AlertError } from "@/components/ui/global-alerts";

export function NewsletterCampaignDialog({ subscriberCount }: { subscriberCount: number }) {
    const [open, setOpen] = useState(false);
    const [state, action] = useActionState(sendNewsletterCampaign, null);
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
            <Button className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg shadow-primary/20 rounded-xl font-medium transition-all hover:scale-105">
                <Send className="h-4 w-4" />
                Send Campaign
            </Button>
        );
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg shadow-primary/20 rounded-xl font-medium transition-all hover:scale-105">
                        <Send className="h-4 w-4" />
                        Send Campaign
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-[525px] rounded-2xl bg-[#FDFBF7] border-primary/10 shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none rounded-lg" />

                    <DialogHeader className="relative z-10">
                        <DialogTitle className="font-serif text-2xl text-primary">Send Marketing Campaign</DialogTitle>
                        <DialogDescription>
                            Send an email to all {subscriberCount} active subscribers.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={action} className="space-y-6 relative z-10 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-primary font-medium">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="e.g., Special Winter Offer! ❄️"
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
                            <p className="text-xs text-muted-foreground">
                                HTML is not supported yet. Plain text only.
                            </p>
                        </div>
                        <DialogFooter>
                            <SubmitButton count={subscriberCount} />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Campaign Sent Successfully"
                description={state?.message || "Your newsletter campaign has been sent to all subscribers."}
                confirmText="Great!"
            />

            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Campaign Failed"
                description={state?.error || "Failed to send the campaign. Please try again."}
            />
        </>
    );
}

function SubmitButton({ count }: { count: number }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending || count === 0}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to {count} Subscribers
                </>
            )}
        </Button>
    );
}
