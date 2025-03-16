
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { vehicles } from "@/lib/types";
import BookingForm from "@/components/BookingForm";

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState(vehicles.find((v) => v.id === Number(id)));
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Défilement vers le haut lors du montage du composant
    window.scrollTo(0, 0);

    // Récupération des données du véhicule
    if (!vehicle) {
      toast({
        variant: "destructive",
        title: "Véhicule introuvable",
        description: "Le véhicule que vous recherchez n'existe pas.",
      });
      navigate("/vehicles");
    }
  }, [vehicle, id, toast, navigate]);

  if (!vehicle) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold">Réservez votre {vehicle.brand} {vehicle.name}</h1>
            
            <Card className="overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={vehicle.images[0]} 
                  alt={`${vehicle.brand} ${vehicle.name}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Marque</p>
                    <p className="font-semibold">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modèle</p>
                    <p className="font-semibold">{vehicle.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Année</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-semibold">{vehicle.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détails de la location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tarif journalier</p>
                    <p className="text-xl font-bold">{vehicle.price.toFixed(2)} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location minimum</p>
                    <p className="font-medium">24 heures</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location maximum</p>
                    <p className="font-medium">7 jours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Caution requise</p>
                    <p className="font-medium">{vehicle.caution.toFixed(2)} €</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-slide-up">
            <BookingForm vehicle={vehicle} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
