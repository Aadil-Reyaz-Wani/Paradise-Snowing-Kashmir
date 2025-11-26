import { Users, Heart, Map, Award } from "lucide-react";

export const metadata = {
    title: "About Us - Paradise Snowing Kashmir",
    description: "Learn about our story, our local expertise, and why we are the best choice for your Kashmir trip.",
    openGraph: {
        title: "About Us - Paradise Snowing Kashmir",
        description: "Learn about our story, our local expertise, and why we are the best choice for your Kashmir trip.",
        images: ["https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop"],
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            {/* Hero */}
            <div className="relative h-[40vh] bg-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop")' }}
                />
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-100">
                        Born in the valley, sharing its magic with the world.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-6">Meet Your Local Expert</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Hello! I'm Aadil, the founder of Paradise Snowing Kashmir. I was born and raised in Srinagar, surrounded by the majestic Himalayas and the serene Dal Lake.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            For over 10 years, I have been organizing trips for travelers from all over the world. My goal is not just to show you the tourist spots, but to help you experience the real Kashmir – the hospitality, the culture, and the hidden gems that only locals know.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Whether you want a luxury houseboat stay, a trekking adventure in Ladakh, or a cozy winter getaway in Gulmarg, I personally oversee every detail of your trip.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                        {/* Placeholder for Owner Photo */}
                        <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                            <Users className="h-20 w-20" />
                            <span className="sr-only">Owner Photo</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-secondary p-8 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Heart className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Personalized Care</h3>
                        <p className="text-muted-foreground">
                            We treat every guest like family. No cookie-cutter packages; everything is tailored to your needs.
                        </p>
                    </div>
                    <div className="bg-secondary p-8 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Map className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Local Knowledge</h3>
                        <p className="text-muted-foreground">
                            We know the best times to visit, the best routes to take, and the best places to eat authentic Wazwan.
                        </p>
                    </div>
                    <div className="bg-secondary p-8 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Trusted Service</h3>
                        <p className="text-muted-foreground">
                            With hundreds of happy travelers, we pride ourselves on transparency, safety, and reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
