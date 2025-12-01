"use client";

import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown, Send } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import ContactForm from "@/components/features/ContactForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* 1. Split Hero Section */}
            <section className="relative pt-24 pb-12 md:pt-48 md:pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 relative z-10 animate-fade-in-up">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-primary/60"></span>
                                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Contact Us</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-serif text-foreground mb-6 leading-[1.1]">
                                Let's Plan Your <br />
                                <span className="text-primary italic">Journey</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg mb-10">
                                Whether you have a question about our tours, need a custom itinerary, or just want to say hello, we are here for you.
                            </p>

                            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Online Now
                                </div>
                                <span className="text-border">|</span>
                                <div>Avg. Response: 10 Mins</div>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative aspect-square md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up delay-200">
                                <BlurImage
                                    src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop"
                                    alt="Kashmir Contact"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000"
                                    priority
                                />
                                {/* Decorative Badge */}
                                <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md border-t border-l border-white/20 p-6 rounded-tl-3xl">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest">24/7 Support</p>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-primary/5 rounded-[3rem] hidden md:block" />
                            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Contact Info & Form Grid */}
            <section className="py-12 md:py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Left Column: Contact Info */}
                        <div className="lg:col-span-5 space-y-8">
                            <h2 className="text-3xl font-bold font-serif mb-8">Get in Touch</h2>

                            {/* Info Cards */}
                            <div className="space-y-6">
                                {[
                                    { icon: Phone, title: "Phone / WhatsApp", value: "+91 70515 43381 / +91 97979 64143", sub: "Available 24/7 for urgent queries" },
                                    { icon: Mail, title: "Email Address", value: "snowingkashmir@gmail.com", sub: "We reply within 24 hours" },
                                    { icon: MapPin, title: "Head Office", value: "Chandil, Tangmarg", sub: "Jammu and Kashmir 193404" },
                                ].map((item, i) => (
                                    <div key={i} className="group bg-[#F8FAFC] p-6 rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 flex items-start gap-4 border-none">
                                        <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-primary shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-300 shrink-0 border-none">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{item.title}</h3>
                                            <p className="text-lg font-medium text-primary mt-1">{item.value}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp CTA */}
                            <div className="bg-[#F8FAFC] p-8 rounded-[2rem] text-foreground relative overflow-hidden shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] mt-12 border-none">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold font-serif mb-2">Quick Chat?</h3>
                                    <p className="text-muted-foreground mb-6">Connect with us instantly on WhatsApp.</p>
                                    <a
                                        href="https://wa.me/917051543381"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto font-bold text-lg h-14 px-8 rounded-xl bg-[#F8FAFC] text-primary tracking-wider shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC] transition-all duration-300 border-none"
                                    >
                                        <MessageSquare className="h-5 w-5" />
                                        Chat Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-[#F8FAFC] p-6 md:p-10 rounded-[2.5rem] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold font-serif mb-2">Send a Message</h2>
                                    <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Map Section */}
            <section className="h-[300px] md:h-[400px] w-full bg-muted grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://maps.google.com/maps?q=WANI+GUEST+HOUSE+Chandil+Jammu+and+Kashmir+193404&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>

            {/* 4. FAQ Section */}
            <section className="py-12 md:py-24 container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Common Questions</h2>
                        <p className="text-muted-foreground">Everything you need to know before you book.</p>
                    </div>

                    <div className="space-y-4">
                        <FAQItem
                            question="What is the best time to visit Kashmir?"
                            answer="Kashmir is a year-round destination. April to October is perfect for greenery and pleasant weather, while December to February is ideal for snow lovers and winter sports in Gulmarg."
                        />
                        <FAQItem
                            question="Is it safe for tourists?"
                            answer="Yes, Kashmir is very safe for tourists. Thousands of travelers visit every month. We also provide 24/7 on-ground support to ensure your safety and comfort."
                        />
                        <FAQItem
                            question="Do you customize tour packages?"
                            answer="Absolutely! We specialize in tailor-made itineraries. Whether you want a honeymoon trip, a family vacation, or an adventure tour, we customize everything to your preferences."
                        />
                        <FAQItem
                            question="How do I book a trip?"
                            answer="You can contact us via the form above, call us, or WhatsApp us. Once we finalize your itinerary, you can pay a deposit to confirm your booking."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#F8FAFC] rounded-2xl overflow-hidden shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left font-medium text-lg hover:bg-secondary/20 transition-colors"
            >
                {question}
                <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}
