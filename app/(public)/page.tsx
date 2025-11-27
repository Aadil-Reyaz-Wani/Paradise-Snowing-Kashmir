import Link from "next/link";
import { ArrowRight, Star, Calendar, ShieldCheck, Users, MessageCircle, MapPin, ChevronRight, Play } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurImage } from "@/components/ui/blur-image";
import FeaturedTours from "@/components/features/FeaturedTours";
import TestimonialsList from "@/components/features/TestimonialsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paradise Snowing Kashmir | Premium Travel Experiences",
  description: "Experience the magic of Kashmir with our curated luxury tours. From houseboats in Srinagar to the peaks of Ladakh, we craft unforgettable journeys.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10" />
          <BlurImage
            src="/images/hero-bg.jpg"
            alt="Kashmir Valley Landscape"
            fill
            priority
            className="object-cover scale-105 animate-slow-zoom"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Accepting Bookings for Summer 2025</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-2xl">
              Discover the <br />
              <span className="italic font-light text-emerald-100">Soul of Kashmir</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
              Curated journeys through the "Paradise on Earth". Experience luxury houseboats, pristine valleys, and ancient culture.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 bg-white text-slate-900 hover:bg-white/90 shadow-xl shadow-black/20 transition-transform hover:scale-105">
                <Link href="/tours">
                  Explore Packages <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white transition-transform hover:scale-105">
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5 text-emerald-400" />
                  Plan via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </div>
        </div>
      </section>

      {/* Iconic Destinations - Horizontal Scroll */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 mb-12 flex items-end justify-between">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Iconic Destinations</h2>
            <p className="text-muted-foreground text-lg">From the floating markets of Srinagar to the moonscapes of Ladakh.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex group" asChild>
            <Link href="/destinations">
              View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Srinagar',
                image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop',
                desc: 'The City of Lakes. Experience the tranquility of Dal Lake and the charm of houseboats.',
                tag: 'Must Visit'
              },
              {
                name: 'Gulmarg',
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
                desc: 'Meadow of Flowers. A paradise for skiers in winter and nature lovers in summer.',
                tag: 'Adventure'
              },
              {
                name: 'Leh Ladakh',
                image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop',
                desc: 'Land of High Passes. A surreal landscape of mountains, monasteries, and blue lakes.',
                tag: 'Road Trip'
              },
            ].map((dest, i) => (
              <div key={dest.name} className="group flex flex-col gap-6">
                {/* Image Container */}
                <Link href="/destinations" className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block">
                  <BlurImage
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                      {dest.tag}
                    </span>
                  </div>
                </Link>

                {/* Content Container */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-bold font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                      {dest.name}
                    </h3>
                    <Button asChild size="icon" className="rounded-full bg-[#F8FAFC] text-primary hover:bg-[#F8FAFC] shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_4px_rgba(255,255,255,0.9),2px_2px_4px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.9),inset_2px_2px_4px_rgba(0,0,0,0.05)] transition-all duration-300 shrink-0 border-none">
                      <Link href="/destinations">
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
                    {dest.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Button variant="outline" className="w-full rounded-full" asChild>
              <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Curated Experiences</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Signature Tour Packages</h2>
            <p className="text-muted-foreground text-lg">Handpicked itineraries designed to give you the most authentic and luxurious experience of the valley.</p>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] rounded-3xl overflow-hidden bg-card border border-border/50 shadow-sm">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="pt-4 flex justify-between items-center">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <FeaturedTours />
          </Suspense>

          <div className="text-center mt-16">
            <Button asChild className="rounded-xl h-14 px-10 bg-[#F8FAFC] text-primary font-bold text-base tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none">
              <Link href="/tours">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground leading-tight">
                  We Don't Just Plan Trips, <br />
                  <span className="text-muted-foreground">We Craft Memories.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Born and raised in the valley, we offer an insider's perspective that standard travel agencies simply cannot match. From hidden trekking trails to the most authentic Wazwan cuisine, we show you the real Kashmir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Users, title: "Local Experts", desc: "Native guides with deep cultural knowledge." },
                  { icon: ShieldCheck, title: "Verified Stays", desc: "Personally inspected hotels and houseboats." },
                  { icon: Calendar, title: "Flexible Plans", desc: "Customizable itineraries to suit your pace." },
                  { icon: MessageCircle, title: "24/7 Support", desc: "Always just a phone call away." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-secondary/30 transition-colors">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold font-serif text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <BlurImage
                src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop"
                alt="Happy travelers in Kashmir"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-muted overflow-hidden">
                        <BlurImage src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={40} height={40} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <p className="text-sm font-bold text-foreground mt-1">Trusted by 1200+ Travelers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Guest Stories</h2>
            <p className="text-muted-foreground text-lg">Read about the experiences of travelers who explored paradise with us.</p>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-3xl border border-border/50 bg-card p-8 space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-32" />
                </div>
              ))}
            </div>
          }>
            <TestimonialsList />
          </Suspense>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold font-serif max-w-4xl mx-auto leading-tight">
            Ready to Experience the Magic of Kashmir?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Let us customize the perfect itinerary for you. No hidden costs, just pure memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild className="rounded-xl h-14 px-10 bg-[#F8FAFC] text-primary font-bold text-lg tracking-wider hover:bg-[#F8FAFC] shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(0,0,0,0.05)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.9),inset_2px_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 border-none">
              <Link href="/contact">
                Get a Free Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl text-lg h-14 px-10 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:scale-105 transition-transform">
              <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
