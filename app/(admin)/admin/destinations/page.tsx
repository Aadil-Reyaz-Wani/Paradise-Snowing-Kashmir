import { Suspense } from "react";
import { getDestinations, deleteDestination } from "@/lib/actions";
import { DestinationForm } from "@/components/admin/DestinationForm";
import { BlurImage } from "@/components/ui/blur-image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default async function AdminDestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight text-foreground">Destinations</h1>
                    <p className="text-muted-foreground mt-1">Manage your travel destinations.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2 shadow-md">
                            <Plus className="h-4 w-4" /> Add Destination
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Destination</DialogTitle>
                            <DialogDescription>
                                Create a new destination to showcase on the website.
                            </DialogDescription>
                        </DialogHeader>
                        <DestinationForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-muted-foreground uppercase text-xs font-semibold tracking-wider border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {destinations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                                        No destinations found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                destinations.map((dest: any) => (
                                    <tr key={dest.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-muted shadow-sm border border-border/50">
                                                {dest.image ? (
                                                    <BlurImage
                                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${dest.image}`}
                                                        alt={dest.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                                        No Img
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-foreground">{dest.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                                            {dest.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${dest.is_active
                                                ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"
                                                }`}>
                                                {dest.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Destination</DialogTitle>
                                                        </DialogHeader>
                                                        <DestinationForm destination={dest} />
                                                    </DialogContent>
                                                </Dialog>

                                                <form action={async () => {
                                                    "use server";
                                                    await deleteDestination(dest.id);
                                                }}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
