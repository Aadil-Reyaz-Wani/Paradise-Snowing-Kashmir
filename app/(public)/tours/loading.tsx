import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <Skeleton className="h-10 w-64 mb-2" />
                        <Skeleton className="h-5 w-96" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col">
                            <Skeleton className="h-56 w-full" />
                            <div className="p-6 flex-1 flex flex-col">
                                <Skeleton className="h-4 w-32 mb-3" />
                                <Skeleton className="h-7 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-2/3 mb-6" />
                                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                    <Skeleton className="h-10 w-32" />
                                    <Skeleton className="h-5 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
