"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AlertError, AlertSuccess } from "@/components/ui/global-alerts";
import { Loader2, ArrowLeft, Lock, Mountain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMessage(error.message);
                setShowError(true);
                setLoading(false); // Stop loading on error
                return;
            }

            setShowSuccess(true);
            // We don't stop loading here to prevent interaction while success dialog is shown
        } catch (error) {
            setErrorMessage("An unexpected error occurred");
            setShowError(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] relative overflow-hidden p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none" />

            {/* Back to Home */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                <Button asChild variant="ghost" className="rounded-xl gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/50 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary shadow-inner ring-1 ring-primary/20">
                            <Mountain className="h-10 w-10" />
                        </div>
                        <h1 className="text-3xl font-bold font-serif text-primary">Admin Login</h1>
                        <p className="text-muted-foreground text-sm mt-2 font-medium">Paradise Snowing Kashmir</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground/80 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground/80 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                        </Button>
                    </form>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-8">
                    &copy; {new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.
                </p>
            </div>


            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Login Failed"
                description={errorMessage}
                confirmText="Try Again"
                onConfirm={() => setShowError(false)}
            />

            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Welcome Back!"
                description="You have successfully logged in to the admin panel."
                confirmText="Enter Dashboard"
                onConfirm={() => {
                    router.push("/admin");
                    router.refresh();
                }}
            />
        </div >
    );
}
