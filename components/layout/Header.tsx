"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mountain, ArrowRight, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Destinations", href: "/destinations" },
        { name: "Tours", href: "/tours" },
        { name: "Gallery", href: "/gallery" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    // Theme Logic:
    // 1. Home Page Top: Transparent Background, White Text (for Hero images).
    // 2. Scrolled OR Other Pages: Warm Glass Background, Primary/Dark Text.
    const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                    isTransparent
                        ? "bg-transparent border-transparent py-6"
                        : "bg-[#FDFBF7]/80 backdrop-blur-md border-primary/5 py-4 shadow-sm" // Warm off-white glass
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className={cn(
                                "p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-105",
                                isTransparent
                                    ? "bg-white/20 border-white/20 text-white"
                                    : "bg-primary/5 border-primary/10 text-primary"
                            )}>
                                <Mountain className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-xl font-bold font-serif leading-none tracking-tight transition-colors",
                                    isTransparent ? "text-white" : "text-foreground"
                                )}>
                                    Paradise
                                </span>
                                <span className={cn(
                                    "text-[10px] font-medium tracking-[0.2em] uppercase leading-tight transition-colors",
                                    isTransparent ? "text-white/80 group-hover:text-white" : "text-primary/80 group-hover:text-primary"
                                )}>
                                    Snowing Kashmir
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-all duration-300 relative group py-2 hover:scale-110",
                                        pathname === link.href
                                            ? (isTransparent ? "text-white font-bold" : "text-primary font-bold")
                                            : (isTransparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className={cn(
                                "h-8 w-px mx-2 transition-colors",
                                isTransparent ? "bg-white/20" : "bg-primary/10"
                            )} />

                            <Button
                                asChild
                                className={cn(
                                    "rounded-xl font-bold px-8 h-11 hover:scale-105 transition-all duration-300 shadow-lg",
                                    isTransparent
                                        ? "bg-white text-primary hover:bg-white/90 shadow-white/10"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                )}
                            >
                                <Link href="/tours">Book Now</Link>
                            </Button>
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "lg:hidden p-2 rounded-full transition-colors relative z-50",
                                isTransparent && !isMobileMenuOpen
                                    ? "text-white hover:bg-white/10"
                                    : "text-foreground hover:bg-primary/5"
                            )}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Light Theme */}
            <div className={cn(
                "fixed inset-0 z-40 bg-[#FDFBF7] lg:hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isMobileMenuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-4 invisible pointer-events-none"
            )}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03] pointer-events-none" />

                <div className="flex flex-col h-full relative z-10 pt-24 px-6 pb-8 overflow-y-auto gap-8">
                    <nav className="flex flex-col space-y-2">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "group flex items-center justify-between py-4 border-b border-primary/5 hover:border-primary/20 transition-all duration-300",
                                    pathname === link.href ? "pl-4 border-primary/20 bg-primary/5 rounded-lg" : "hover:pl-4"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-primary/40 group-hover:text-primary/60 transition-colors">
                                        0{i + 1}
                                    </span>
                                    <span className={cn(
                                        "text-lg font-serif font-medium transition-colors",
                                        pathname === link.href ? "text-primary" : "text-foreground group-hover:text-primary"
                                    )}>
                                        {link.name}
                                    </span>
                                </div>
                                <ArrowRight className={cn(
                                    "h-5 w-5 text-primary/40 transition-all duration-300",
                                    pathname === link.href
                                        ? "opacity-100 translate-x-0 text-primary"
                                        : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary"
                                )} />
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto space-y-8">
                        {/* Contact Info */}
                        <div className="space-y-4 p-6 rounded-2xl bg-white border border-primary/10 shadow-sm">
                            <h3 className="text-xs font-bold text-primary/60 uppercase tracking-widest">Get in Touch</h3>
                            <div className="space-y-3">
                                <a href="tel:+917051543381" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">+91 70515 43381</span>
                                </a>
                                <a href="mailto:snowingkashmir@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                                    <div className="p-2 rounded-full bg-primary/5 text-primary">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">snowingkashmir@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        {/* Socials & CTA */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 justify-center">
                                {[
                                    { Icon: Instagram, href: "https://www.instagram.com/paradise_snowing_kashmir?igsh=MXMzOXc5em96aHNoMw==" },
                                    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584314134155" }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border border-primary/10 hover:border-primary/30 shadow-sm">
                                        <social.Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                            <Button
                                asChild
                                className="w-full rounded-full bg-primary text-black font-bold h-14 text-lg hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                <Link href="/tours" onClick={() => setIsMobileMenuOpen(false)}>
                                    Book Your Trip
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}