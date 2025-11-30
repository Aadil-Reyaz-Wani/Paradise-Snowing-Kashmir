import { Users, Heart, Map, Award, ArrowRight, Star, Shield, Coffee } from "lucide-react";
import { BlurImage } from "@/components/ui/blur-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "About Us - Paradise Snowing Kashmir",
    description: "Learn about our story, our local expertise, and why we are the best choice for your Kashmir trip.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* 1. Split Hero Section - Premium & Clean */}
            <section className="relative pt-24 pb-12 md:pt-48 md:pb-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content - Left Side */}
                        <div className="w-full lg:w-1/2 relative z-10 animate-fade-in-up">
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-primary/60"></span>
                                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Est. 2014</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-serif text-foreground mb-6 leading-[1.1]">
                                The Soul <br />
                                <span className="text-primary italic">of Kashmir</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg mb-10">
                                We don't just guide you; we welcome you into our home. Experience the valley through the eyes of those who call it paradise.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium">
                                    <Users className="h-4 w-4" />
                                    <span>Family Run</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium">
                                    <Map className="h-4 w-4" />
                                    <span>Local Experts</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Content - Right Side */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative aspect-square md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up delay-200">
                                <BlurImage
                                    src="/images/shikara-about.jpg"
                                    alt="Kashmir Valley View"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000"
                                    priority
                                />
                                {/* Decorative Badge */}
                                <div className="absolute bottom-0 left-0 bg-white/10 backdrop-blur-md border-t border-r border-white/20 p-6 rounded-tr-3xl">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest">Srinagar, Kashmir</p>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-primary/5 rounded-[3rem] hidden md:block" />
                            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Founder's Story - Asymmetric Split */}
            <section className="py-12 md:py-24 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full lg:w-1/2 relative group px-4 md:px-0">
                        <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <BlurImage
                                src="/images/founder-waseem.jpg"
                                alt="Waseem Ahmad Wani - Founder"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 md:opacity-60" />

                            {/* Floating Name Badge */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl text-white">
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Founder</p>
                                    <h3 className="text-2xl md:text-3xl font-serif">Waseem Ahmad Wani</h3>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Element - Hidden on mobile for cleaner look */}
                        <div className="hidden md:block absolute -z-10 top-10 -right-10 w-full h-full border-2 border-primary/10 rounded-[2.5rem]" />
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                        <h2 className="text-2xl md:text-5xl font-bold font-serif text-foreground leading-tight">
                            "Whoever believes in Allah,<br />
                            <span className="text-primary">let him honor his guest.</span>"
                        </h2>

                        <div className="bg-[#F8FAFC] p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed text-left">
                            <p>
                                <span className="text-3xl md:text-4xl float-left mr-2 md:mr-3 mt-[-6px] md:mt-[-10px] font-serif text-primary">B</span>
                                orn in the winding alleys of Srinagar, I grew up with the timeless values of our faith. For us, hospitality (Ikram al-Dayf) is not just a custom; it is a sacred duty and a blessing from the Almighty.
                            </p>
                            <p>
                                I started Paradise Snowing Kashmir with a simple promise: to show you the Kashmir that exists beyond the postcards. The warmth of a shared noon chai, the silence of a hidden alpine lake, and the stories etched in our ancient architecture.
                            </p>
                            <p className="font-medium text-foreground">
                                When you travel with us, you aren't a tourist. You are our honored guest.
                            </p>
                        </div>

                        <div className="pt-2 md:pt-4 flex justify-center lg:justify-start">
                            <img src="/images/signature-waseem.png" alt="Signature" className="h-16 md:h-20 mix-blend-multiply dark:invert dark:mix-blend-screen opacity-80" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Us - Premium Grid */}
            <section className="py-12 md:py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-bold font-serif mb-3 md:mb-4">Why Travelers Trust Us</h2>
                        <p className="text-muted-foreground text-base md:text-lg">We craft experiences that are as seamless as they are unforgettable.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: Star,
                                title: "Curated Luxury",
                                desc: "Handpicked houseboats, boutique stays, and premium vehicles for unmatched comfort."
                            },
                            {
                                icon: Shield,
                                title: "Safety First",
                                desc: "24/7 on-ground support and experienced local guides ensuring a worry-free journey."
                            },
                            {
                                icon: Coffee,
                                title: "Authentic Experiences",
                                desc: "Beyond sightseeing—saffron harvesting, wazwan tasting, and village walks."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group relative bg-[#F8FAFC] p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-[-8px_-8px_16px_rgba(255,255,255,0.8),8px_8px_16px_rgba(0,0,0,0.05)] hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.8),4px_4px_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm text-primary group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="h-6 w-6 md:h-8 md:w-8" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold font-serif mb-2 md:mb-3 text-slate-800">{item.title}</h3>
                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Philosophy - Cinematic Parallax */}
            <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden my-16 md:my-24">
                <div className="absolute inset-0 z-0">
                    <BlurImage
                        src="/images/philosophy-bg.png"
                        alt="Philosophy Background"
                        fill
                        className="object-cover fixed-background scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                            <div className="h-px w-8 md:w-12 bg-white/60" />
                            <span className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">Our Philosophy</span>
                            <div className="h-px w-8 md:w-12 bg-white/60" />
                        </div>

                        <h2 className="text-2xl sm:text-4xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-10 leading-tight drop-shadow-2xl">
                            "We believe travel should <span className="italic text-white/90">change</span> you."
                        </h2>

                        <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed mb-8 md:mb-12 max-w-xl md:max-w-2xl mx-auto">
                            Leave with more than just photos. Take home a piece of the valley's soul, the silence of its mountains, and the warmth of its people.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
                            <div className="flex items-center justify-center gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-105">
                                <Award className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                                <span className="text-sm md:text-base font-medium tracking-wide">Excellence in Detail</span>
                            </div>
                            <div className="flex items-center justify-center gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform hover:scale-105">
                                <Heart className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                                <span className="text-sm md:text-base font-medium tracking-wide">Passion for Heritage</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Minimalist CTA */}
            <section className="py-12 md:py-24 container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-5xl font-bold font-serif mb-4 md:mb-6 text-foreground">Ready to start your journey?</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10">
                    Let us design a Kashmir itinerary that perfectly matches your dreams.
                </p>
                <Button asChild className="rounded-xl h-12 md:h-14 px-8 md:px-10 bg-[#F8FAFC] text-primary font-bold text-base md:text-lg tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none w-full sm:w-auto">
                    <Link href="/contact">
                        Plan My Trip <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 opacity-70" />
                    </Link>
                </Button>
            </section>
        </div>
    );
}
