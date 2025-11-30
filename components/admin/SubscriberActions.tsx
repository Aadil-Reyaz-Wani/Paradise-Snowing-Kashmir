"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteNewsletterSubscriber } from "@/lib/actions";
import { AlertConfirm, AlertSuccess, AlertError } from "@/components/ui/global-alerts";

export function DeleteSubscriberButton({ id, showLabel = false }: { id: string, showLabel?: boolean }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleDelete = async () => {
        const result = await deleteNewsletterSubscriber(id);
        if (result?.error) {
            setShowError(true);
        } else {
            setShowSuccess(true);
        }
        setShowConfirm(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size={showLabel ? "default" : "icon"}
                className={showLabel
                    ? "w-full justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-100 transition-colors hover:scale-105"
                    : "h-9 w-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors hover:scale-105"
                }
                onClick={() => setShowConfirm(true)}
            >
                <Trash2 className="h-4 w-4" />
                {showLabel && "Delete"}
            </Button>

            <AlertConfirm
                open={showConfirm}
                onOpenChange={setShowConfirm}
                title="Delete Subscriber"
                description="Are you sure you want to remove this email from the list? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="destructive"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />

            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Subscriber Removed"
                description="The email has been successfully removed from the list."
            />

            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Error"
                description="Failed to remove subscriber. Please try again."
            />
        </>
    );
}
