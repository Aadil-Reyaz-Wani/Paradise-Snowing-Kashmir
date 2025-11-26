"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-destructive/10 p-6 rounded-full">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold">Something went wrong!</h1>
                <p className="text-muted-foreground">
                    We encountered an unexpected error. Please try again or contact support if the problem persists.
                </p>
                <div className="pt-6">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                        <RefreshCcw className="h-5 w-5" />
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
