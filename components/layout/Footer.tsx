"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Mountain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/lib/actions";
import { AlertSuccess, AlertError } from "@/components/ui/global-alerts";
import { useState, useEffect } from "react";

function NewsletterForm() {
    const [state, action] = useActionState(subscribeToNewsletter, null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setShowSuccess(true);
        } else if (state?.error) {
            setShowError(true);
        }
    }, [state]);

    return (
        <>
            <form action={action} className="space-y-3">
                <Input
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="bg-background"
                    required
                />
                <SubmitButton />
            </form>

            <AlertSuccess
                open={showSuccess}
                onOpenChange={setShowSuccess}
                title="Subscribed!"
                description={state?.message || "Successfully subscribed to the newsletter!"}
                confirmText="Great"
            />

            <AlertError
                open={showError}
                onOpenChange={setShowError}
                title="Subscription Failed"
                description={state?.error || "Something went wrong. Please try again."}
            />
        </>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            className="w-full font-bold rounded-xl bg-[#F8FAFC] text-primary tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none h-12"
        >
            {pending ? "Subscribing..." : "Subscribe"}
        </Button>
    );
}

export default function Footer() {
    return (
        <footer className="bg-secondary/30 border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/5 flex items-center justify-center text-primary">
                                <Mountain className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold font-serif text-xl leading-none">Paradise</span>
                                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
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
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/paradise_snowing_kashmir?igsh=MXMzOXc5em96aHNoMw==", color: "hover:bg-[#E1306C]" },
                                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584314134155", color: "hover:bg-[#1877F2]" },
                                { Icon: Twitter, href: "https://twitter.com/Snowingkashmir", color: "hover:bg-black" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center text-primary ${social.color} hover:text-white transition-all`}
                                >
                                    <social.Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 font-serif">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Packages", href: "/tours" },
                                { name: "Destinations", href: "/destinations" },
                                { name: "Gallery", href: "/gallery" },
                                { name: "About Us", href: "/about" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 font-serif">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                                <p className="text-muted-foreground leading-relaxed">
                                    Chandil, Tangmarg, <br />
                                    Jammu and Kashmir 193404
                                </p>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <a href="tel:+917051543381" className="hover:text-primary transition-colors">+91 70515 43381</a>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href="mailto:snowingkashmir@gmail.com" className="hover:text-primary transition-colors">snowingkashmir@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 font-serif">Newsletter</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to get special offers and travel inspiration.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
