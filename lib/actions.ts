"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TourSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    region: z.enum(["Kashmir", "Ladakh", "Jammu"]),
    duration_days: z.coerce.number().min(1),
    base_price: z.coerce.number().min(0),
    short_description: z.string().optional(),
    long_description: z.string().optional(),
    trip_type: z.string().optional(),
    is_active: z.boolean().optional(),
});

export async function createTour(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = TourSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        region: formData.get("region"),
        duration_days: formData.get("duration_days"),
        base_price: formData.get("base_price"),
        short_description: formData.get("short_description"),
        long_description: formData.get("long_description"),
        trip_type: formData.get("trip_type"),
        is_active: formData.get("is_active") === "on",
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields", issues: validatedFields.error.issues };
    }

    const { data: tourData, error } = await supabase.from("tours").insert(validatedFields.data).select().single();

    if (error) {
        return { error: error.message };
    }

    // Handle Image Uploads
    const images = formData.getAll("images") as File[];
    if (images.length > 0 && images[0].size > 0) {
        for (const image of images) {
            const fileExt = image.name.split(".").pop();
            const fileName = `${tourData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("tours")
                .upload(fileName, image);

            if (!uploadError) {
                await supabase.from("tour_images").insert({
                    tour_id: tourData.id,
                    storage_path: fileName,
                });
            }
        }
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    redirect("/admin/tours");
}

export async function updateTour(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = TourSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        region: formData.get("region"),
        duration_days: formData.get("duration_days"),
        base_price: formData.get("base_price"),
        short_description: formData.get("short_description"),
        long_description: formData.get("long_description"),
        trip_type: formData.get("trip_type"),
        is_active: formData.get("is_active") === "on",
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields", issues: validatedFields.error.issues };
    }

    const { error } = await supabase
        .from("tours")
        .update(validatedFields.data)
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    // Handle New Image Uploads
    const images = formData.getAll("images") as File[];
    if (images.length > 0 && images[0].size > 0) {
        for (const image of images) {
            const fileExt = image.name.split(".").pop();
            const fileName = `${id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("tours")
                .upload(fileName, image);

            if (!uploadError) {
                await supabase.from("tour_images").insert({
                    tour_id: id,
                    storage_path: fileName,
                });
            }
        }
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath(`/tours/${validatedFields.data.slug}`);
    redirect("/admin/tours");
}

export async function deleteTourImage(imageId: string, storagePath: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    await supabase.storage.from("tours").remove([storagePath]);
    await supabase.from("tour_images").delete().eq("id", imageId);

    revalidatePath("/admin/tours");
}

export async function deleteTour(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase.from("tours").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
}

export async function uploadGalleryImage(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const caption = formData.get("caption") as string;

    if (!file) {
        return { error: "No file provided" };
    }

    // 1. Upload to Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

    if (uploadError) {
        return { error: uploadError.message };
    }

    // 2. Insert into DB
    const { error: dbError } = await supabase.from("gallery_images").insert({
        storage_path: filePath,
        category,
        caption,
    });

    if (dbError) {
        return { error: dbError.message };
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
}

export async function deleteGalleryImage(id: string, storagePath: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
        .from("gallery")
        .remove([storagePath]);

    if (storageError) {
        console.error("Storage delete error:", storageError);
        // Continue to delete from DB even if storage fails (orphan cleanup later)
    }

    // 2. Delete from DB
    const { error: dbError } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

    if (dbError) {
        return { error: dbError.message };
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
}

export async function createTestimonial(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const rating = Number(formData.get("rating"));
    const text = formData.get("text") as string;
    const trip_type = formData.get("trip_type") as string;
    const show_on_homepage = formData.get("show_on_homepage") === "on";

    if (!name || !text || !rating) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase.from("testimonials").insert({
        name,
        location,
        rating,
        text,
        trip_type,
        show_on_homepage,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
}

export async function updateBookingStatus(id: string, status: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/bookings");
}
