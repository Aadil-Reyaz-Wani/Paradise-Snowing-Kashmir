import Link from "next/link";
import { ArrowRight, MapPin, Star, Calendar, ShieldCheck, Users } from "lucide-react";
import { getFeaturedTours, getTestimonials } from "@/lib/api";

export default async function Home() {
  const featuredTours = await getFeaturedTours();
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Personalized Trips to Kashmir & Ladakh,<br />Planned by Local Experts
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-slate-100">
            Experience the paradise on earth with custom itineraries, hassle-free permits, and curated stays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-colors"
            >
              Plan My Trip
            </Link>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Srinagar', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop' },
              { name: 'Gulmarg', image: 'https://images.unsplash.com/photo-1562602735-26322989201b?q=80&w=800&auto=format&fit=crop' },
              { name: 'Leh Ladakh', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800&auto=format&fit=crop' },
            ].map((dest) => (
              <div key={dest.name} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors z-10" />
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/destinations" className="text-slate-900 font-medium hover:underline inline-flex items-center gap-2">
              View All Destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                <div className="h-48 bg-slate-200 relative">
                  {/* Placeholder for tour image if not available */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600 mb-3">
                    <span className="bg-blue-50 px-2 py-1 rounded-full">{tour.region}</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{tour.duration_days} Days</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tour.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tour.short_description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500">From</span>
                      <p className="text-lg font-bold text-slate-900">₹{tour.base_price.toLocaleString()}</p>
                    </div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tours" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-900 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Travel With Us?</h2>
            <p className="text-slate-600">We are locals who know every corner of Kashmir and Ladakh. We don't just book hotels; we craft experiences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Local Expertise</h3>
              <p className="text-slate-600">Born and raised in the valley, we know the hidden gems that standard tour packages miss.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hassle-free Logistics</h3>
              <p className="text-slate-600">From inner-line permits for Ladakh to Shikara bookings in Srinagar, we handle everything.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 On-ground Support</h3>
              <p className="text-slate-600">We are always just a phone call away throughout your trip to ensure everything goes smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location} • {t.trip_type} Trip</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
