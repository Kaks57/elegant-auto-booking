
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[650px] w-full overflow-hidden">
     {/* Video or image background */}
<div className="absolute inset-0 w-full h-full bg-black">
  <img
    src="public/images/treez.jpeg"
    alt="Luxury car"
    className="w-full h-full object-cover opacity-70"
    style={{ objectPosition: '0 70%' }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
</div>

      {/* Video or image background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <img
          src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2069&auto=format&fit=crop"
          alt="Luxury car"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
           Expérience de conduite inoubliable
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
           Des vehicules pour tout les gouts et les couleurs
            Experience Luxury on Wheels
          </p>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            Discover our exclusive collection of premium vehicles for rent. Elevate your journey with LuxuryRentalWorld.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/vehicles">
              <Button size="lg" className="bg-white text-luxury-900 hover:bg-white/90 px-6 py-6 text-lg flex items-center gap-2 group">
                Découvrir nos véhicules
                Explore Vehicles
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-6 text-lg">
                Créer un compte
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-slide-down"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
