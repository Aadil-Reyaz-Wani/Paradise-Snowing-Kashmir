"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Packages", href: "/tours" },
        { name: "Destinations", href: "/destinations" },
        { name: "Gallery", href: "/gallery" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                        P
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold text-lg leading-none ${isScrolled ? "text-slate-900" : "text-white"}`}>
                            Paradise
                        </span>
                        <span className={`text-xs font-medium tracking-wider ${isScrolled ? "text-slate-500" : "text-white/80"}`}>
                            SNOWING KASHMIR
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-500 ${pathname === link.href
                                    ? "text-blue-600"
                                    : isScrolled
                                        ? "text-slate-600"
                                        : "text-white/90"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="tel:+919906700000"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/90 hover:text-white"
                            }`}
                    >
                        <Phone className="h-4 w-4" />
                        <span>+91 99067 00000</span>
                    </a>
                    <Link
                        href="/tours"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-slate-900" : "text-white"
                        }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl md:hidden flex flex-col p-4 gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-base font-medium p-2 rounded-lg hover:bg-slate-50 ${pathname === link.href ? "text-blue-600 bg-blue-50" : "text-slate-600"
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    <Link
                        href="/tours"
                        className="w-full py-3 bg-blue-600 text-white text-center font-bold rounded-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Your Trip
                    </Link>
                </div>
            )}
        </header>
    );
}
