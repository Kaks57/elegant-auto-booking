
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, Share2, Bookmark, Car, Fuel, Gauge, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { vehicles } from "@/lib/types";
import { toast } from "sonner";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  // Trouver le véhicule par id
  const vehicle = vehicles.find((v) => v.id === Number(id));
  
  // Si le véhicule n'est pas trouvé, rediriger vers la page des véhicules
  useEffect(() => {
    if (!vehicle) {
      navigate("/vehicles");
      toast.error("Véhicule introuvable");
    }
    
    // Défiler vers le haut lors du montage du composant
    window.scrollTo(0, 0);
  }, [vehicle, navigate]);

  // Gérer le changement d'image
  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };
  
  // Gérer le bouton de sauvegarde
  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Retiré des véhicules sauvegardés" : "Ajouté aux véhicules sauvegardés");
  };
  
  // Gérer le bouton de partage
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié dans le presse-papier !");
  };
  
  if (!vehicle) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Navigation de retour */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/vehicles" 
            className="inline-flex items-center text-luxury-600 hover:text-luxury-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour aux véhicules
          </Link>
        </div>
        
       {/* Galerie et détails du véhicule */}
<div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Gauche: Galerie */}
    <div className="lg:col-span-2 animate-fade-in">
      <div className="overflow-hidden rounded-lg mb-4">
        <img 
          src={vehicle.images[activeImage]} 
          alt={vehicle.name} 
          className="w-full h-[800px] object-cover object-center animate-blur-in" // Augmenter à 800px ou plus
        />
      </div>
              
              <div className="grid grid-cols-3 gap-4">
                {vehicle.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`overflow-hidden rounded-lg cursor-pointer transition-all ${
                      activeImage === index ? "ring-2 ring-luxury-900" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${vehicle.name} vue ${index + 1}`} 
                      className="w-full h-24 object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Droite: Formulaire de réservation */}
            <div className="animate-slide-up">
              <BookingForm vehicle={vehicle} />
            </div>
          </div>
        </div>
        
        {/* Informations sur le véhicule */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gauche: Détails */}
            <div className="lg:col-span-2 animate-slide-up">
              {/* En-tête */}
              <div className="flex flex-wrap items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
                  <div className="flex items-center text-luxury-600">
                    <span className="mr-2">{vehicle.brand}</span>
                    <span className="text-sm">•</span>
                    <span className="mx-2">{vehicle.year}</span>
                    <span className="text-sm">•</span>
                    <span className="ml-2">{vehicle.type}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShare}
                    aria-label="Partager"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleSave}
                    aria-label={isSaved ? "Retirer des véhicules sauvegardés" : "Sauvegarder dans les favoris"}
                    className={isSaved ? "text-luxury-900 border-luxury-200 bg-luxury-50" : ""}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
              
              {/* Onglets */}
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                  <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-fade-in">
                  <div className="prose max-w-none text-luxury-700">
                    <p className="text-lg">{vehicle.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Car className="h-5 w-5 mx-auto mb-2 text-luxury-900" />
                        <span className="block text-sm text-luxury-500">Type</span>
                        <span className="font-medium">{vehicle.type}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Fuel className="h-5 w-5 mx-auto mb-2 text-luxury-900" />
                        <span className="block text-sm text-luxury-500">Moteur</span>
                        <span className="font-medium">{vehicle.specifications.engine}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Gauge className="h-5 w-5 mx-auto mb-2 text-luxury-900" />
                        <span className="block text-sm text-luxury-500">Puissance</span>
                        <span className="font-medium">{vehicle.specifications.power}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Clock className="h-5 w-5 mx-auto mb-2 text-luxury-900" />
                        <span className="block text-sm text-luxury-500">0-100 km/h</span>
                        <span className="font-medium">{vehicle.specifications.acceleration}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="h-4 w-4 text-luxury-900 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="animate-fade-in">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Moteur</h3>
                        <p className="font-medium">{vehicle.specifications.engine}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Transmission</h3>
                        <p className="font-medium">{vehicle.specifications.transmission}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Puissance</h3>
                        <p className="font-medium">{vehicle.specifications.power}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Vitesse maximale</h3>
                        <p className="font-medium">{vehicle.specifications.topSpeed}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Accélération</h3>
                        <p className="font-medium">{vehicle.specifications.acceleration}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-luxury-500 mb-1">Places</h3>
                        <p className="font-medium">{vehicle.specifications.seats}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Droite: Véhicules similaires */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-semibold mb-4">Véhicules similaires</h3>
              
              <div className="space-y-4">
                {vehicles
                  .filter(v => v.id !== vehicle.id && v.type === vehicle.type)
                  .slice(0, 3)
                  .map(similarVehicle => (
                    <Link 
                      key={similarVehicle.id} 
                      to={`/vehicles/${similarVehicle.id}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="w-24 h-24 shrink-0">
                          <img 
                            src={similarVehicle.images[0]} 
                            alt={similarVehicle.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-luxury-900">{similarVehicle.name}</h4>
                          <p className="text-sm text-luxury-500">{similarVehicle.brand}</p>
                          <p className="text-sm font-semibold mt-1">{similarVehicle.price}€/jour</p>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
