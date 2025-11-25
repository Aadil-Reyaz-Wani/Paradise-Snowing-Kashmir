"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                P
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none">Paradise</span>
                                <span className="text-xs font-medium tracking-wider text-slate-400">
                                    SNOWING KASHMIR
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Experience the magic of Kashmir with our curated tour packages.
                            From the snow-capped peaks of Gulmarg to the serene waters of Dal Lake,
                            we make your journey unforgettable.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/tours" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Packages
                                </Link>
                            </li>
                            <li>
                                <Link href="/destinations" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" /> Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
                                <span>
                                    Boulevard Road, Dal Lake,<br />
                                    Srinagar, Kashmir 190001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                                <a href="tel:+919906700000" className="hover:text-white transition-colors">+91 99067 00000</a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                                <a href="mailto:info@paradisesnowingkashmir.com" className="hover:text-white transition-colors">info@paradisesnowingkashmir.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            Subscribe to get special offers and travel inspiration.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Paradise Snowing Kashmir. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
