"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient } from "@/lib/supabase/public";
import { revalidatePath, revalidateTag } from "next/cache";
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
    highlights: z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return z.NEVER;
        }
    }).optional(),
    itinerary: z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return z.NEVER;
        }
    }).optional(),
    inclusions: z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return z.NEVER;
        }
    }).optional(),
    exclusions: z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return z.NEVER;
        }
    }).optional(),
});

export async function createTour(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

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
        highlights: formData.get("highlights") || "[]",
        itinerary: formData.get("itinerary") || "[]",
        inclusions: formData.get("inclusions") || "[]",
        exclusions: formData.get("exclusions") || "[]",
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields", issues: validatedFields.error.issues };
    }

    const { data: tourData, error } = await adminSupabase.from("tours").insert(validatedFields.data).select().single();

    if (error) {
        return { error: error.message };
    }

    // Handle Image Uploads in Parallel
    const images = formData.getAll("images") as File[];
    if (images.length > 0 && images[0].size > 0) {
        await Promise.all(images.map(async (image) => {
            const fileExt = image.name.split(".").pop();
            const fileName = `${tourData.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await adminSupabase.storage
                .from("tours")
                .upload(fileName, image);

            if (!uploadError) {
                await adminSupabase.from("tour_images").insert({
                    tour_id: tourData.id,
                    storage_path: fileName,
                });
            }
        }));
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    // revalidateTag("tours");
    return { success: true };
}

export async function updateTour(id: string, prevState: any, formData: FormData) {
    console.log(`Starting updateTour for ID: ${id}`);
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("User not authenticated");
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
        highlights: formData.get("highlights") || "[]",
        itinerary: formData.get("itinerary") || "[]",
        inclusions: formData.get("inclusions") || "[]",
        exclusions: formData.get("exclusions") || "[]",
    });

    if (!validatedFields.success) {
        console.log("Validation failed", validatedFields.error.issues);
        return { error: "Invalid fields", issues: validatedFields.error.issues };
    }

    console.log("Updating tour details...");
    const { error } = await adminSupabase
        .from("tours")
        .update(validatedFields.data)
        .eq("id", id);

    if (error) {
        console.error("Tour update error:", error);
        return { error: error.message };
    }

    // Handle New Image Uploads in Parallel
    const images = formData.getAll("images") as File[];
    console.log(`Processing ${images.length} images...`);

    if (images.length > 0 && images[0].size > 0) {
        await Promise.all(images.map(async (image) => {
            const fileExt = image.name.split(".").pop();
            const fileName = `${id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

            console.log(`Uploading image: ${fileName}`);
            const { error: uploadError } = await adminSupabase.storage
                .from("tours")
                .upload(fileName, image);

            if (uploadError) {
                console.error("Image upload error:", uploadError);
            } else {
                console.log("Image uploaded, inserting into tour_images...");
                await adminSupabase.from("tour_images").insert({
                    tour_id: id,
                    storage_path: fileName,
                });
            }
        }));
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    revalidatePath(`/tours/${validatedFields.data.slug}`);
    // revalidateTag("tours");
    return { success: true };
}

export async function deleteTourImage(imageId: string, storagePath: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    await adminSupabase.storage.from("tours").remove([storagePath]);
    await adminSupabase.from("tour_images").delete().eq("id", imageId);

    revalidatePath("/admin/tours");
    // revalidateTag("tours");
}

export async function deleteTour(id: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase.from("tours").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/tours");
    revalidatePath("/tours");
    // revalidateTag("tours");
}

export async function uploadGalleryImage(prevState: any, formData: FormData) {
    console.log("Starting uploadGalleryImage...");
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    // Debug: Check if Service Role Key is loaded (don't log the full key)
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log("SUPABASE_SERVICE_ROLE_KEY present:", !!serviceKey);
    if (serviceKey) console.log("Key length:", serviceKey.length);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("User not authenticated");
        return { error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const caption = formData.get("caption") as string;

    if (!file) {
        console.log("No file provided");
        return { error: "No file provided" };
    }

    // 1. Upload to Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log(`Attempting upload to 'gallery' bucket: ${filePath}`);

    const { error: uploadError } = await adminSupabase.storage
        .from("gallery")
        .upload(filePath, file);

    if (uploadError) {
        console.error("Storage Upload Error:", uploadError);
        return { error: `Storage Error: ${uploadError.message}` };
    }

    // 2. Insert into DB
    console.log("Upload successful, inserting into DB...");

    const { error: dbError } = await adminSupabase.from("gallery_images").insert({
        storage_path: filePath,
        category,
        caption,
    });

    if (dbError) {
        console.error("DB Insert Error:", dbError);
        return { error: `DB Error: ${dbError.message}` };
    }

    console.log("Gallery image added successfully");
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    // revalidateTag("gallery");
    return { success: true };
}

export async function deleteGalleryImage(id: string, storagePath: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    // 1. Delete from Storage
    const { error: storageError } = await adminSupabase.storage
        .from("gallery")
        .remove([storagePath]);

    if (storageError) {
        console.error("Storage delete error:", storageError);
        // Continue to delete from DB even if storage fails (orphan cleanup later)
    }

    // 2. Delete from DB
    const { error: dbError } = await adminSupabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

    if (dbError) {
        return { error: dbError.message };
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    // revalidateTag("gallery");
}

export async function createTestimonial(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

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

    const { error } = await adminSupabase.from("testimonials").insert({
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
    // revalidateTag("testimonials");
    return { success: true };
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase.from("testimonials").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    // revalidateTag("testimonials");
}

export async function updateBookingStatus(id: string, status: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/bookings");
}

// --- Destinations ---

export async function getDestinations() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }

    return data;
}

export async function getPublicDestinations() {
    const supabase = createPublicClient();
    const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching public destinations:", JSON.stringify(error, null, 2));
        return [];
    }

    return data;
}

export async function createDestination(formData: FormData) {
    const supabase = await createAdminClient();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const slug = name.toLowerCase().replace(/ /g, "-");

    let imagePath = "";
    if (image && image.size > 0) {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("gallery") // Using gallery bucket for now
            .upload(`destinations/${Date.now()}-${image.name}`, image);

        if (uploadError) throw new Error("Image upload failed");
        imagePath = uploadData.path;
    }

    const { error } = await supabase.from("destinations").insert({
        name,
        description,
        slug,
        image: imagePath,
        is_active: true,
    });

    if (error) throw new Error("Failed to create destination");
    revalidatePath("/destinations");
    revalidatePath("/admin/destinations");
}

export async function updateDestination(id: string, formData: FormData) {
    const supabase = await createAdminClient();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    const updates: any = { name, description };

    if (image && image.size > 0) {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("gallery")
            .upload(`destinations/${Date.now()}-${image.name}`, image);

        if (uploadError) throw new Error("Image upload failed");
        updates.image = uploadData.path;
    }

    const { error } = await supabase
        .from("destinations")
        .update(updates)
        .eq("id", id);

    if (error) throw new Error("Failed to update destination");
    revalidatePath("/destinations");
    revalidatePath("/admin/destinations");
}

export async function deleteDestination(id: string) {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("destinations").delete().eq("id", id);

    if (error) throw new Error("Failed to delete destination");
    revalidatePath("/destinations");
    revalidatePath("/admin/destinations");
}

export async function submitContactForm(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Valid phone number is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
    });

    const validatedFields = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields", issues: validatedFields.error.issues };
    }

    const { name, email, phone, message } = validatedFields.data;

    // 1. Save to Database
    const supabase = await createAdminClient(); // Use admin client to bypass RLS if needed, or ensure policy allows anon insert
    const { error: dbError } = await supabase.from("contacts").insert({
        name,
        email,
        phone,
        message,
    });

    if (dbError) {
        console.error("Contact DB Error:", dbError);
        return { error: "Failed to save message. Please try again." };
    }

    // 2. Send Email (using dedicated utility)
    try {
        const { sendEmail } = await import("./email");

        // Send ONE email to both Admin and Sender (via CC)
        // This reduces connection attempts and prevents timeouts
        const adminEmail = "snowingkashmir@gmail.com";
        const senderEmail = process.env.SMTP_USER;

        // If sender is different from admin, CC them. Otherwise just send to admin.
        const cc = (senderEmail && senderEmail !== adminEmail) ? senderEmail : undefined;

        let logoContent: Buffer | null = null;
        try {
            const logoPath = process.cwd() + "/PSK_Logo.png";
            logoContent = await import("fs").then(fs => fs.promises.readFile(logoPath));
        } catch (error) {
            console.warn("Failed to load email logo:", error);
        }

        const attachments = logoContent ? [{
            filename: 'logo.png',
            content: logoContent,
            cid: 'logo',
            contentType: 'image/png',
            contentDisposition: 'inline' as const
        }] : [];

        const logoHtml = logoContent ? `
            <div style="display: inline-block; padding: 10px; border: 1px solid rgba(26, 77, 46, 0.1); border-radius: 12px; margin-bottom: 12px;">
                <img src="cid:logo" alt="Logo" style="width: 48px; height: auto; display: block;" />
            </div>
        ` : '';

        await sendEmail({
            to: adminEmail,
            cc: cc,
            subject: `New Contact: ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #FDFBF7; padding: 24px; text-align: center; border-bottom: 1px solid rgba(26, 77, 46, 0.1);">
                        ${logoHtml}
                        <h2 style="color: #1a4d2e; margin: 0; font-family: serif; font-size: 24px;">New Message from Paradise Snowing Kashmir</h2>
                    </div>
                    <div style="padding: 32px; background-color: #ffffff;">
                        <p style="margin-top: 0; color: #555;">You have received a new inquiry from the website contact form.</p>
                        
                        <div style="margin-top: 24px; border-top: 1px solid #f0f0f0; padding-top: 24px;">
                            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a4d2e;">${email}</a></p>
                            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #1a4d2e;">${phone}</a></p>
                        </div>

                        <div style="margin-top: 24px; background-color: #FDFBF7; padding: 20px; border-radius: 8px; border: 1px solid rgba(26, 77, 46, 0.05);">
                            <p style="margin: 0 0 8px 0; font-weight: bold; color: #1a4d2e;">Message:</p>
                            <p style="margin: 0; color: #555; white-space: pre-wrap;">${message}</p>
                        </div>
                        
                        <div style="margin-top: 32px; text-align: center; font-size: 12px; color: #888;">
                            <p>&copy; ${new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            `,
            attachments: attachments
        });

    } catch (emailError) {
        console.error("Email Sending Error:", emailError);
    }

    return { success: true };
}

export async function getAdminContacts() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }

    return data;
}

export async function deleteContact(id: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase.from("contacts").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/contacts");
}

export async function updateContactStatus(id: string, status: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase
        .from("contacts")
        .update({ status })
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/contacts");
}

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}

// --- Newsletter ---

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
    });

    const validatedFields = schema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message };
    }

    const { email } = validatedFields.data;
    const supabase = await createAdminClient();

    // Check if already subscribed
    const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .single();

    if (existing) {
        return { error: "You are already subscribed!" };
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({
        email,
    });

    if (error) {
        console.error("Newsletter Subscription Error:", error);
        return { error: "Failed to subscribe. Please try again." };
    }

    return { success: true, message: "Successfully subscribed to the newsletter!" };
}

export async function getNewsletterSubscribers() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching subscribers:", error);
        return [];
    }

    return data;
}

export async function deleteNewsletterSubscriber(id: string) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const { error } = await adminSupabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/newsletter");
}

export async function sendNewsletterCampaign(prevState: any, formData: FormData) {
    const schema = z.object({
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
    });

    const validatedFields = schema.safeParse({
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message };
    }

    const { subject, message } = validatedFields.data;
    const supabase = await createAdminClient();

    // 1. Fetch all subscribers
    const { data: subscribers, error: fetchError } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("status", "active");

    if (fetchError || !subscribers) {
        return { error: "Failed to fetch subscribers." };
    }

    if (subscribers.length === 0) {
        return { error: "No active subscribers found." };
    }

    // 2. Send Emails
    let successCount = 0;
    let failCount = 0;

    try {
        const { sendEmail } = await import("./email");

        // Read logo once
        let logoContent: Buffer | null = null;
        try {
            const logoPath = process.cwd() + "/PSK_Logo.png";
            logoContent = await import("fs").then(fs => fs.promises.readFile(logoPath));
        } catch (error) {
            console.warn("Failed to load email logo:", error);
        }

        const attachments = logoContent ? [{
            filename: 'logo.png',
            content: logoContent,
            cid: 'logo',
            contentType: 'image/png',
            contentDisposition: 'inline' as const
        }] : [];

        const logoHtml = logoContent ? `
            <div style="display: inline-block; padding: 10px; border: 1px solid rgba(26, 77, 46, 0.1); border-radius: 12px; margin-bottom: 12px;">
                <img src="cid:logo" alt="Logo" style="width: 48px; height: auto; display: block;" />
            </div>
        ` : '';

        // Send in parallel (limit concurrency if list is huge, but for now Promise.all is fine for small lists)
        // For better reliability with Gmail, we might want to do it sequentially or in chunks, 
        // but let's try parallel first as it's faster.
        await Promise.all(subscribers.map(async (sub) => {
            const result = await sendEmail({
                to: sub.email,
                subject: subject,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
                        <div style="background-color: #FDFBF7; padding: 24px; text-align: center; border-bottom: 1px solid rgba(26, 77, 46, 0.1);">
                            ${logoHtml}
                            <h2 style="color: #1a4d2e; margin: 0; font-family: serif; font-size: 24px;">Paradise Snowing Kashmir</h2>
                        </div>
                        <div style="padding: 32px; background-color: #ffffff;">
                            <div style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</div>
                            
                            <div style="margin-top: 32px; border-top: 1px solid #f0f0f0; padding-top: 24px; text-align: center; font-size: 12px; color: #888;">
                                <p>You received this email because you subscribed to our newsletter.</p>
                                <p>&copy; ${new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                `,
                attachments: attachments
            });

            if (result.success) {
                successCount++;
            } else {
                failCount++;
            }
        }));

    } catch (error) {
        console.error("Campaign Error:", error);
        return { error: "Failed to execute campaign." };
    }

    return {
        success: true,
        message: `Campaign sent! Success: ${successCount}, Failed: ${failCount}`
    };
}

export async function sendIndividualEmail(prevState: any, formData: FormData) {
    const schema = z.object({
        email: z.string().email(),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
    });

    const validatedFields = schema.safeParse({
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message };
    }

    const { email, subject, message } = validatedFields.data;

    try {
        const { sendEmail } = await import("./email");

        const result = await sendEmail({
            to: email,
            subject: subject,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #1a4d2e; padding: 24px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0; font-family: serif; font-size: 24px;">Paradise Snowing Kashmir</h2>
                    </div>
                    <div style="padding: 32px; background-color: #ffffff;">
                        <div style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</div>
                        
                        <div style="margin-top: 32px; border-top: 1px solid #f0f0f0; padding-top: 24px; text-align: center; font-size: 12px; color: #888;">
                            <p>You received this email because you are a valued subscriber.</p>
                            <p>&copy; ${new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            `
        });

        if (!result.success) {
            return { error: "Failed to send email. Check server logs." };
        }

    } catch (error) {
        console.error("Individual Email Error:", error);
        return { error: "Failed to send email." };
    }

    return { success: true, message: `Email sent to ${email}!` };
}
