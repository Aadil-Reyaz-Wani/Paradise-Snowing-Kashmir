"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Footer() {
    return (
        <footer className="bg-card text-card-foreground border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
                                P
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none">Paradise</span>
                                <span className="text-xs font-medium tracking-wider text-muted-foreground">
                                    SNOWING KASHMIR
                                </span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Experience the magic of Kashmir with our curated tour packages.
                            From the snow-capped peaks of Gulmarg to the serene waters of Dal Lake,
                            we make your journey unforgettable.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/tours" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Packages
                                </Link>
                            </li>
                            <li>
                                <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                                <span>
                                    Boulevard Road, Dal Lake,<br />
                                    Srinagar, Kashmir 190001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <a href="tel:+919906700000" className="hover:text-foreground transition-colors">+91 99067 00000</a>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href="mailto:info@paradisesnowingkashmir.com" className="hover:text-foreground transition-colors">info@paradisesnowingkashmir.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to get special offers and travel inspiration.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                />
                            </div>
                            <button className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors shadow-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
