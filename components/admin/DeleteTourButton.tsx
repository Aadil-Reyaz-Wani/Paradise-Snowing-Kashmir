"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteTour } from "@/lib/actions";
import { AlertConfirm } from "@/components/ui/global-alerts";
import { Button } from "@/components/ui/button";

export function DeleteTourButton({ id, title, className }: { id: string; title: string; className?: string }) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await deleteTour(id);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className={className || "h-9 w-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all hover:scale-105"}
                title="Delete"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <AlertConfirm
                open={open}
                onOpenChange={setOpen}
                title={`Delete ${title}?`}
                description="This action cannot be undone. This will permanently delete the tour package and its associated data."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="destructive"
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
            />
        </>
    );
}
