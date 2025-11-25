import { Mail, Phone, MapPin, Send } from "lucide-react";

export const metadata = {
    title: "Contact Us - Paradise Snowing Kashmir",
    description: "Get in touch with us to plan your dream trip to Kashmir and Ladakh.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen py-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">Get in Touch</h1>
                    <p className="text-[var(--foreground)] opacity-80 max-w-2xl mx-auto text-lg">
                        Have questions? Want a custom itinerary? We are here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-[var(--surface)] p-8 rounded-3xl shadow-lg border border-[var(--border)]">
                            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--foreground)]">Phone / WhatsApp</h3>
                                        <p className="text-[var(--foreground)] opacity-80">+91 00000 00000</p>
                                        <p className="text-sm text-[var(--foreground)] opacity-60 mt-1">Available 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--foreground)]">Email</h3>
                                        <p className="text-[var(--foreground)] opacity-80">info@paradisesnowingkashmir.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--foreground)]">Office</h3>
                                        <p className="text-[var(--foreground)] opacity-80">
                                            Boulevard Road, Dal Lake,<br />
                                            Srinagar, Jammu and Kashmir 190001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--primary)] p-8 rounded-3xl text-[var(--primary-foreground)] shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Ready to plan your trip?</h2>
                            <p className="mb-6 opacity-90 text-lg">
                                The fastest way to reach us is via WhatsApp. We usually reply within minutes!
                            </p>
                            <a
                                href="https://wa.me/910000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-6 py-4 bg-[var(--surface)] text-[var(--foreground)] font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[var(--surface)] p-8 rounded-3xl shadow-lg border border-[var(--border)]">
                        <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none p-3 transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Phone</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none p-3 transition-all"
                                        placeholder="Your Phone"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none p-3 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none p-3 transition-all resize-none"
                                    placeholder="Tell us about your travel plans..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                <Send className="h-5 w-5" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
