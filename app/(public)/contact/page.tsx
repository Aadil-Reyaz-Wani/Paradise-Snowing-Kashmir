import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/features/ContactForm";

export const metadata = {
    title: "Contact Us - Paradise Snowing Kashmir",
    description: "Get in touch with us to plan your dream trip to Kashmir and Ladakh.",
    openGraph: {
        title: "Contact Us - Paradise Snowing Kashmir",
        description: "Get in touch with us to plan your dream trip to Kashmir and Ladakh.",
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 pt-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Get in Touch</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Have questions? Want a custom itinerary? We are here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Phone / WhatsApp</h3>
                                        <p className="text-muted-foreground">+91 00000 00000</p>
                                        <p className="text-sm text-muted-foreground/60 mt-1">Available 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Email</h3>
                                        <p className="text-muted-foreground">info@paradisesnowingkashmir.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Office</h3>
                                        <p className="text-muted-foreground">
                                            Boulevard Road, Dal Lake,<br />
                                            Srinagar, Jammu and Kashmir 190001
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-primary p-8 rounded-2xl text-primary-foreground shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">Ready to plan your trip?</h2>
                            <p className="mb-6 opacity-90 text-lg">
                                The fastest way to reach us is via WhatsApp. We usually reply within minutes!
                            </p>
                            <a
                                href="https://wa.me/910000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-6 py-4 bg-background text-foreground font-bold rounded-xl hover:bg-background/90 transition-all shadow-md"
                            >
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
