import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminLoading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48 bg-gray-200/50" />
                    <Skeleton className="h-4 w-64 bg-gray-200/50" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl bg-gray-200/50" />
            </div>

            {/* Content Skeleton - Simulating a Grid of Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border-none shadow-sm bg-white/50">
                        <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-1/2 mb-2 bg-gray-200/50" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-full bg-gray-200/50" />
                                <Skeleton className="h-4 w-2/3 bg-gray-200/50" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Table Skeleton Alternative - Simulating a List */}
            <div className="rounded-xl border border-gray-100 bg-white/50 p-6 space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-6 w-32 bg-gray-200/50" />
                    <Skeleton className="h-9 w-24 rounded-lg bg-gray-200/50" />
                </div>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                        <Skeleton className="h-10 w-10 rounded-full bg-gray-200/50" />
                        <div className="space-y-1 flex-1">
                            <Skeleton className="h-4 w-1/3 bg-gray-200/50" />
                            <Skeleton className="h-3 w-1/4 bg-gray-200/50" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded-md bg-gray-200/50" />
                    </div>
                ))}
            </div>
        </div>
    );
}
