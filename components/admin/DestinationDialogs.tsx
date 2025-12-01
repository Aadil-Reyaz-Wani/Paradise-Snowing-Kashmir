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
                <Button className="h-14 px-6 rounded-xl bg-[#F8FAFC] text-primary font-bold text-lg tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none gap-2">
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
                <Button size="icon" className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm transition-all hover:scale-105">
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
