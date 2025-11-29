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

import { AddDestinationDialog, EditDestinationDialog } from "@/components/admin/DestinationDialogs";
import { DeleteDestinationButton } from "@/components/admin/DeleteDestinationButton";

export default async function AdminDestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-serif text-primary">Destinations</h1>
                    <p className="text-muted-foreground mt-1">Manage your travel destinations.</p>
                </div>
                <AddDestinationDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-primary/10">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Plus className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-serif mb-2">No destinations yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Create your first destination to start building your travel catalog.
                        </p>
                    </div>
                ) : (
                    destinations.map((dest: any) => (
                        <div key={dest.id} className="group relative bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="aspect-video relative overflow-hidden">
                                {dest.image ? (
                                    <BlurImage
                                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${dest.image}`}
                                        alt={dest.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/20 font-serif text-4xl font-bold">
                                        {dest.name.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0">


                                    <EditDestinationDialog destination={dest} />
                                    <DeleteDestinationButton id={dest.id} name={dest.name} />
                                </div>


                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-2xl font-bold text-white font-serif mb-1 drop-shadow-md">{dest.name}</h3>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${dest.is_active
                                        ? "bg-emerald-500/20 text-emerald-100 border border-emerald-500/30"
                                        : "bg-yellow-500/20 text-yellow-100 border border-yellow-500/30"
                                        }`}>
                                        {dest.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                    {dest.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div >
    );
}
