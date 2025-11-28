"use client";

import { useState } from "react";
import { DestinationForm } from "@/components/admin/DestinationForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";

export function AddDestinationDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold text-base gap-2">
                    <Plus className="h-5 w-5" /> Add Destination
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary">Add New Destination</DialogTitle>
                    <DialogDescription>
                        Create a new destination to showcase on the website.
                    </DialogDescription>
                </DialogHeader>
                <DestinationForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export function EditDestinationDialog({ destination }: { destination: any }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" className="h-9 w-9 rounded-full bg-white/90 text-primary hover:bg-emerald-600 hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary">Edit Destination</DialogTitle>
                </DialogHeader>
                <DestinationForm destination={destination} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
