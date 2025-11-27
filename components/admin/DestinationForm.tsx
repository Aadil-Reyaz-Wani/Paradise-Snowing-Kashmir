"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { createDestination, updateDestination } from "@/lib/actions";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const DestinationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

type DestinationFormProps = {
    destination?: {
        id: string;
        name: string;
        description: string;
        image: string;
    };
    onSuccess?: () => void;
};

export function DestinationForm({ destination, onSuccess }: DestinationFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(destination?.image || null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(DestinationSchema),
        defaultValues: {
            name: destination?.name || "",
            description: destination?.description || "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const onSubmit = async (data: any) => {
        if (!destination && !imageFile) {
            toast.error("Please upload an image");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            if (destination) {
                await updateDestination(destination.id, formData);
                toast.success("Destination updated successfully");
            } else {
                await createDestination(formData);
                toast.success("Destination created successfully");
            }
            router.refresh();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label>Name</Label>
                <Input
                    {...register("name")}
                    placeholder="e.g. Srinagar"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message as string}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    {...register("description")}
                    placeholder="Brief description of the destination..."
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message as string}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex items-center gap-4">
                    {preview && (
                        <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-border">
                            <BlurImage
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    setImageFile(null);
                                }}
                                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-secondary transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {destination ? "Update Destination" : "Create Destination"}
            </Button>
        </form>
    );
}
