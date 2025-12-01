"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Upload, X, MapPin, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { createDestination, updateDestination } from "@/lib/actions";
import { AlertSuccess } from "@/components/ui/global-alerts";
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
    const [preview, setPreview] = useState<string | null>(destination?.image ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${destination.image}` : null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
            } else {
                await createDestination(formData);
            }
            setShowSuccessAlert(true);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Destination Name
                        </Label>
                        <Input
                            {...register("name")}
                            placeholder="e.g. Srinagar, Gulmarg, Pahalgam"
                            className="h-12 rounded-xl border-primary/20 focus:border-primary bg-background/50"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive font-medium">{errors.name.message as string}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            Description
                        </Label>
                        <Textarea
                            {...register("description")}
                            placeholder="Brief description of the destination..."
                            className="min-h-[120px] rounded-xl border-primary/20 focus:border-primary bg-background/50 resize-none"
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive font-medium">{errors.description.message as string}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            Cover Image
                        </Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-primary/20 shadow-md group">
                                    <BlurImage
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreview(null);
                                                setImageFile(null);
                                            }}
                                            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 shadow-sm">
                                            <Upload className="h-8 w-8" />
                                        </div>
                                        <p className="mb-2 text-sm text-foreground font-medium">
                                            <span className="font-bold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-[#F8FAFC] text-primary font-bold text-lg rounded-xl tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none"
                    >
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (destination ? null : <Upload className="h-5 w-5 mr-2" />)}
                        {destination ? "Update Destination" : "Create Destination"}
                    </Button>
                </div>
            </form>

            <AlertSuccess
                open={showSuccessAlert}
                onOpenChange={setShowSuccessAlert}
                title={destination ? "Destination Updated!" : "Destination Created!"}
                description="The destination has been successfully saved. You can now add tours to this destination."
                confirmText="Done"
                onConfirm={() => {
                    setShowSuccessAlert(false);
                    router.refresh();
                    if (onSuccess) onSuccess();
                }}
            />
        </>
    );
}
