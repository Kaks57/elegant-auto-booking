
import React from "react";
import { ChevronRight, Users, Award, Star, Shield, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  // Our values section
  const values = [
    {
      icon: <Star className="h-6 w-6 text-luxury-900" />,
      title: "Excellence",
      description: "Nous nous engageons à offrir uniquement des véhicules de la plus haute qualité et un service irréprochable."
    },
    {
      icon: <Shield className="h-6 w-6 text-luxury-900" />,
      title: "Confiance",
      description: "La transparence et l'honnêteté sont au cœur de notre relation avec nos clients."
    },
    {
      icon: <Users className="h-6 w-6 text-luxury-900" />,
      title: "Personnalisation",
      description: "Chaque client est unique, et nous adaptons notre service pour répondre à vos besoins spécifiques."
    },
    {
      icon: <Award className="h-6 w-6 text-luxury-900" />,
      title: "Prestige",
      description: "Nous vous offrons une expérience de conduite prestigieuse avec les marques les plus exclusives du monde."
    }
  ];

  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Header */}
        <div className="bg-luxury-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Nous</h1>
              <p className="text-xl text-gray-300 mb-4">
                Luxury Rental World est votre partenaire privilégié pour la location de véhicules d'exception.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold mb-6 text-luxury-900">Notre Histoire</h2>
                <div className="space-y-4 text-luxury-700">
                  <p>
                  Luxury Rental World est une agence spécialisée dans la location, la vente et le rachat de véhicules de prestige, ainsi que de citadines et d’utilitaires. Nous proposons un service sur mesure, à la hauteur de notre clientèle. Nous mettrons notre savoir-faire à votre service, alliant prudence et qualité. Faites-nous confiance en louant chez nous, et profitez également de notre service de recherche personnalisée pour des véhicules haut de gamme.                  </p>
                  <p>
                  Notre société offre également un service d'import-export de tous types de véhicules : citadines, 4x4, berlines, voitures sportives, SUV et utilitaires, vers le monde entier – Afrique, Asie, Europe, Amérique.                  </p>
                  <p>
                  Cette diversification nous permet de répondre à toutes les attentes de notre clientèle.                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/vehicles">
                    <Button className="bg-luxury-900">
                      Découvrir notre flotte
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative animate-slide-up overflow-hidden rounded-lg shadow-xl" style={{ animationDelay: "0.2s" }}>
  <img 
    src="public/images/WhatsApp Image 2025-03-15 at 20.22.54.jpeg" 
    alt="Voiture de luxe" 
    className="w-full h-auto object-cover"
    style={{ height: "580px", objectPosition: "center" }}
  />
</div>

            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 text-luxury-900">Nos Valeurs</h2>
              <p className="text-luxury-700">
                Chez Luxury Rental World, nous nous engageons à offrir bien plus qu'une simple location de voiture. Nos valeurs fondamentales guident chaque aspect de notre service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="bg-luxury-100 p-3 rounded-full inline-flex mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-luxury-900">{value.title}</h3>
                    <p className="text-luxury-700">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-slide-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <Car className="h-10 w-10 text-luxury-900 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Véhicules d'Exception</h3>
                    <p className="text-luxury-700">Notre flotte comprend uniquement les modèles les plus prestigieux et les plus récents.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <Award className="h-10 w-10 text-luxury-900 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Service Premium</h3>
                    <p className="text-luxury-700">Un service personnalisé et attentif pour une expérience vraiment exclusive.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <Shield className="h-10 w-10 text-luxury-900 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Sécurité Garantie</h3>
                    <p className="text-luxury-700">Tous nos véhicules sont régulièrement entretenus et inspectés pour votre sécurité.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <Users className="h-10 w-10 text-luxury-900 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Flexibilité</h3>
                    <p className="text-luxury-700">Des options de location flexibles pour répondre à vos besoins spécifiques.</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 animate-slide-up">
                <h2 className="text-3xl font-bold mb-6 text-luxury-900">Pourquoi Nous Choisir</h2>
                <div className="space-y-4 text-luxury-700">
                  <p>
                    Luxury Rental World se distingue par son engagement inébranlable envers l'excellence et la satisfaction client. Nous comprenons que louer une voiture de luxe n'est pas seulement une question de transport, mais une expérience à part entière.
                  </p>
                  <p>
                    Notre équipe passionnée connaît chaque véhicule de notre flotte dans les moindres détails et vous guidera pour trouver celui qui correspond parfaitement à vos attentes et à l'occasion que vous souhaitez célébrer.
                  </p>
                  <p>
                    Que ce soit pour un mariage, un événement d'entreprise, un week-end spécial ou simplement pour le plaisir de conduire une voiture exceptionnelle, nous vous offrons une expérience sur mesure qui dépasse vos attentes.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button className="bg-luxury-900">
                      Contactez-nous
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default About;
