"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mountain } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = isHomePage && !isScrolled;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
                ? "bg-transparent py-6"
                : "bg-background/80 backdrop-blur-md shadow-sm py-4"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`p-2 rounded-xl transition-colors ${isTransparent ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                            <Mountain className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xl font-bold leading-none tracking-tight transition-colors ${isTransparent ? "text-white" : "text-foreground"}`}>
                                Paradise
                            </span>
                            <span className={`text-[10px] font-medium tracking-[0.2em] uppercase leading-tight ${isTransparent ? "text-blue-200" : "text-primary"}`}>
                                Snowing Kashmir
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Destinations", href: "/destinations" },
                            { name: "Tours", href: "/tours" },
                            { name: "Gallery", href: "/gallery" },
                            { name: "About", href: "/about" },
                            { name: "Contact", href: "/contact" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${isTransparent ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-foreground"
                                    } ${pathname === link.href ? (isTransparent ? "text-white font-bold" : "text-primary font-bold") : ""}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
                            <ThemeToggle />
                            <Link
                                href="/tours"
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${isTransparent
                                    ? "bg-white text-blue-900 hover:bg-blue-50"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }`}
                            >
                                Book Now
                            </Link>
                        </div>
                    </nav>

                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-secondary"
                                }`}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    {[
                        { name: "Home", href: "/" },
                        { name: "Destinations", href: "/destinations" },
                        { name: "Tours", href: "/tours" },
                        { name: "Gallery", href: "/gallery" },
                        { name: "About", href: "/about" },
                        { name: "Contact", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-lg font-medium p-2 rounded-lg hover:bg-secondary ${pathname === link.href ? "text-primary bg-secondary/50" : "text-foreground"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/tours"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-3 bg-primary text-primary-foreground text-center font-bold rounded-xl hover:bg-primary/90 transition-colors"
                    >
                        Book Your Trip
                    </Link>
                </div>
            )}
        </header>
    );
}
