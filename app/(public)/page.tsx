import Link from "next/link";
import { ArrowRight, Star, Calendar, ShieldCheck, Users, MessageCircle } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurImage } from "@/components/ui/blur-image";
import FeaturedTours from "@/components/features/FeaturedTours";
import TestimonialsList from "@/components/features/TestimonialsList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <BlurImage
            src="/images/hero-bg.jpg"
            alt="Kashmir Valley Landscape"
            fill
            priority
            className="object-cover scale-105 animate-slow-zoom"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20 pt-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Accepting Bookings for Summer 2025
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight animate-fade-in-up delay-100 drop-shadow-lg">
              Experience Kashmir & Ladakh <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-blue-200">
                Like a Local
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-md font-medium">
              From houseboats to high-altitude lakes, we plan stays, transport, permits, and curated local experiences — you enjoy the paradise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
              <Link
                href="/tours"
                className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
              >
                Plan My Trip <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-lg font-bold rounded-full transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5 text-green-400" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-white/90 animate-fade-in-up delay-500 font-medium">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-200" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                  <p className="text-xs">4.9/5 from 1200+ Travelers</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <ShieldCheck className="h-6 w-6 text-teal-400" />
                <div className="text-left">
                  <p className="font-bold text-sm">100% Local Experts</p>
                  <p className="text-xs opacity-80">Based in Srinagar & Leh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Srinagar', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop' }, // Dal Lake
              { name: 'Gulmarg', image: 'https://images.unsplash.com/photo-1562602735-26322989201b?q=80&w=800&auto=format&fit=crop' }, // Snow
              { name: 'Leh Ladakh', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop' }, // Mountains
            ].map((dest) => (
              <div key={dest.name} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                <BlurImage
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                  <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
                    Explore Packages <ArrowRight className="h-4 w-4" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/destinations" className="text-foreground font-medium hover:text-primary inline-flex items-center gap-2">
              View All Destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Featured Packages</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-xl overflow-hidden border border-border/50 bg-card">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between pt-4">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <FeaturedTours />
          </Suspense>
          <div className="text-center mt-12">
            <Link href="/tours" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-foreground border border-border rounded-full hover:bg-secondary transition-colors">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Travel With Us?</h2>
            <p className="text-muted-foreground">We are locals who know every corner of Kashmir and Ladakh. We don't just book hotels; we craft experiences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Local Expertise</h3>
              <p className="text-muted-foreground">Born and raised in the valley, we know the hidden gems that standard tour packages miss.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Hassle-free Logistics</h3>
              <p className="text-muted-foreground">From inner-line permits for Ladakh to Shikara bookings in Srinagar, we handle everything.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">24/7 On-ground Support</h3>
              <p className="text-muted-foreground">We are always just a phone call away throughout your trip to ensure everything goes smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Guests Say</h2>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl border border-border/50 bg-card p-8 space-y-4">
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
    </div>
  );
}
