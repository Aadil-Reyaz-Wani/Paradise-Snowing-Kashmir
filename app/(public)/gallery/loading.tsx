import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Skeleton className="h-10 w-48 mx-auto mb-4" />
                    <Skeleton className="h-5 w-96 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
