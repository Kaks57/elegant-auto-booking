
import React from "react";
import { Link } from "react-router-dom";
import { Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CalendarDays, Info, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { isVehicleAvailable } = useAuth();
  
  // Vérifier la disponibilité du véhicule pour les prochains 7 jours
  const tomorrow = addDays(new Date(), 7); // Minimum 7 jours à l'avance
  const nextWeek = addDays(tomorrow, 7);
  
  const tomorrowFormatted = format(tomorrow, 'yyyy-MM-dd', { locale: fr });
  const nextWeekFormatted = format(nextWeek, 'yyyy-MM-dd', { locale: fr });
  
  const isAvailable = isVehicleAvailable(vehicle.id, tomorrowFormatted, nextWeekFormatted);

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover-lift">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-luxury-900 text-white px-3 py-1 rounded-full text-xs font-medium">
          {vehicle.type}
        </div>
        
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-500 text-white px-4 py-2 rounded-md text-lg font-bold">
              Indisponible
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-luxury-900 mb-1">{vehicle.name}</h3>
          <p className="text-sm text-luxury-500">{vehicle.brand} • {vehicle.year}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-xs text-luxury-700">
            <span className="block text-luxury-400">Moteur</span>
            {vehicle.specifications.engine}
          </div>
          <div className="text-xs text-luxury-700">
            <span className="block text-luxury-400">Puissance</span>
            {vehicle.specifications.power}
          </div>
          <div className="text-xs text-luxury-700">
            <span className="block text-luxury-400">0-100 km/h</span>
            {vehicle.specifications.acceleration}
          </div>
          <div className="text-xs text-luxury-700">
            <span className="block text-luxury-400">Places</span>
            {vehicle.specifications.seats}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-sm text-luxury-500">Tarif Journalier</span>
              <p className="text-xl font-semibold text-luxury-900">€{vehicle.price}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-luxury-500">Statut</span>
              <p className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                {isAvailable ? 'Disponible' : 'Indisponible'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/vehicles/${vehicle.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Info className="h-4 w-4 mr-2" />
                Détails
              </Button>
            </Link>
            <Link to={`/booking/${vehicle.id}`} className="flex-1">
              <Button className={`w-full ${isAvailable ? 'bg-luxury-900 hover:bg-luxury-800' : 'bg-gray-400 hover:bg-gray-500'} text-white`} disabled={!isAvailable}>
                {isAvailable ? (
                  <>
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Réserver
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Indisponible
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
