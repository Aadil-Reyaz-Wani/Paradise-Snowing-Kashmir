"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteDestination } from "@/lib/actions";
import { AlertConfirm } from "@/components/ui/global-alerts";
import { Button } from "@/components/ui/button";

export function DeleteDestinationButton({ id, name }: { id: string; name: string }) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await deleteDestination(id);
        setOpen(false);
    };

    return (
        <>
            <Button
                size="icon"
                onClick={() => setOpen(true)}
                className="h-9 w-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 shadow-sm transition-all hover:scale-105"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <AlertConfirm
                open={open}
                onOpenChange={setOpen}
                title={`Delete ${name}?`}
                description="This action cannot be undone. This will permanently delete the destination and its associated data."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="destructive"
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
            />
        </>
    );
}
