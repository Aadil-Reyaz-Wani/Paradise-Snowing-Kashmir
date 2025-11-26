import Link from "next/link";
import { Home, MapPin } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-6 rounded-full">
                        <MapPin className="h-12 w-12 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold">Page Not Found</h1>
                <p className="text-muted-foreground text-lg">
                    Looks like you've wandered off the path. The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                        <Home className="h-5 w-5" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
