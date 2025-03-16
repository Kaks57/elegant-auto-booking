
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Car, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Vehicle } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

interface BookingFormProps {
  vehicle: Vehicle;
}

const BookingForm: React.FC<BookingFormProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, addBooking, isVehicleAvailable } = useAuth();
  const today = new Date();
  const minBookingDate = addDays(today, 7); // Réservation minimum 7 jours à l'avance
  const [startDate, setStartDate] = useState<Date>(minBookingDate);
  const [endDate, setEndDate] = useState<Date>(addDays(minBookingDate, 1));
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const [isVehicleAvailableForDates, setIsVehicleAvailableForDates] = useState<boolean>(true);

  useEffect(() => {
    // Set phone number from user profile if available
    if (user?.phone) {
      setPhoneNumber(user.phone);
    }

    // Check vehicle availability for initial dates
    checkVehicleAvailability(startDate, endDate);
  }, [user]);

  // Check if the vehicle is available for the selected dates
  const checkVehicleAvailability = (start: Date, end: Date) => {
    const startDateStr = format(start, 'yyyy-MM-dd', { locale: fr });
    const endDateStr = format(end, 'yyyy-MM-dd', { locale: fr });
    
    const available = isVehicleAvailable(vehicle.id, startDateStr, endDateStr);
    setIsVehicleAvailableForDates(available);
  };

  // Calculer la durée de location et le prix total
  const rentalDays = differenceInDays(endDate, startDate) || 1;
  const totalPrice = vehicle.price * rentalDays;

  // Handle date changes
  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      // S'assurer que la date de fin est toujours après la date de début
      if (endDate <= date) {
        const newEndDate = addDays(date, 1);
        setEndDate(newEndDate);
        checkVehicleAvailability(date, newEndDate);
      } else {
        checkVehicleAvailability(date, endDate);
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setEndDate(date);
      checkVehicleAvailability(startDate, date);
    }
  };

  // Gérer la soumission de réservation
  const handleBooking = () => {
    if (!isVehicleAvailableForDates) {
      toast.error("Véhicule indisponible", {
        description: "Ce véhicule n'est pas disponible pour les dates sélectionnées ou la réservation doit être faite au moins 7 jours à l'avance.",
      });
      return;
    }

    // Vérifier si le numéro de téléphone est renseigné pour les utilisateurs non connectés
    if (!isAuthenticated && (!phoneNumber || phoneNumber.trim() === "")) {
      toast.error("Numéro de téléphone requis", {
        description: "Veuillez saisir un numéro de téléphone pour continuer.",
      });
      return;
    }

    // Vérifier si le nom est renseigné pour les utilisateurs non connectés
    if (!isAuthenticated && (!guestName || guestName.trim() === "")) {
      toast.error("Nom requis", {
        description: "Veuillez saisir votre nom pour continuer.",
      });
      return;
    }
    
    // Dans une vraie application, ceci enverrait la réservation au serveur
    setIsProcessing(true);
    
    try {
      // Créer la nouvelle réservation
      const newBooking = {
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brand} ${vehicle.name}`,
        startDate: format(startDate, 'yyyy-MM-dd', { locale: fr }),
        endDate: format(endDate, 'yyyy-MM-dd', { locale: fr }),
        status: "à venir" as const,
        amount: totalPrice,
        imageUrl: vehicle.images[0],
        // Si l'utilisateur n'est pas connecté, on ajoute les informations du client anonyme
        guestName: !isAuthenticated ? guestName : undefined,
        guestPhone: !isAuthenticated ? phoneNumber : undefined
      };
      
      // Ajouter la réservation
      const booking = addBooking(newBooking);
      
      if (booking) {
        // Add a timeout to simulate server processing
        setTimeout(() => {
          setIsProcessing(false);
          toast.success("Réservation confirmée !", {
            description: "Votre réservation a été enregistrée avec succès.",
          });
          
          // Rediriger vers le tableau de bord seulement si l'utilisateur est connecté
          if (isAuthenticated) {
            navigate("/dashboard");
          } else {
            // Pour les utilisateurs non connectés, afficher un message expliquant que 
            // leur réservation est visible par l'administrateur et qu'ils seront contactés
            toast.info("Information importante", {
              description: "Votre réservation a été enregistrée. Un administrateur vous contactera bientôt pour confirmer les détails.",
              duration: 8000,
            });
            navigate("/vehicles");
          }
        }, 1500);
      } else {
        setIsProcessing(false);
        toast.error("Erreur lors de la réservation", {
          description: "Une erreur est survenue. Veuillez réessayer.",
        });
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("Erreur lors de la réservation", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 animate-fade-in">
      <h3 className="text-xl font-semibold text-luxury-900 mb-6">Réserver votre véhicule</h3>
      
      {!isVehicleAvailableForDates && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Véhicule indisponible</AlertTitle>
          <AlertDescription>
            Ce véhicule n'est pas disponible pour les dates sélectionnées ou la réservation doit être faite au moins 7 jours à l'avance.
          </AlertDescription>
        </Alert>
      )}

      {/* Sélection de dates */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-luxury-700 mb-1">Date de prise en charge (min. 7 jours à l'avance)</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                disabled={(date) => date < minBookingDate}
                initialFocus
                locale={fr}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-luxury-700 mb-1">Date de retour</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                disabled={(date) => 
                  date < addDays(startDate, 1) || // Minimum 1 jour de location
                  date > addDays(startDate, 7)    // Maximum 7 jours de location
                }
                initialFocus
                locale={fr}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Informations utilisateur */}
        {isAuthenticated ? (
          <div>
            <label className="block text-sm font-medium text-luxury-700 mb-1">Numéro de téléphone</label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Votre numéro de téléphone"
              className="w-full"
              disabled={!!user?.phone}
            />
            {user?.phone && (
              <p className="text-xs text-gray-500 mt-1">
                Numéro de téléphone associé à votre compte
              </p>
            )}
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-luxury-700 mb-1">Votre nom</label>
              <Input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Votre nom complet"
                className="w-full"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Requis pour que l'administrateur puisse vous identifier
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-luxury-700 mb-1">Numéro de téléphone</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Votre numéro de téléphone"
                className="w-full"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Requis pour que l'administrateur puisse vous contacter
              </p>
            </div>
          </>
        )}
      </div>

      {/* Durée et tarification */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-luxury-700">Durée:</span>
          <span className="font-medium">{rentalDays} {rentalDays === 1 ? "jour" : "jours"}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-luxury-700">Prix par jour:</span>
          <span className="font-medium">{vehicle.price.toFixed(2)} €</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-luxury-900">Prix total:</span>
          <span className="text-xl font-bold text-luxury-900">{totalPrice.toFixed(2)} €</span>
        </div>
      </div>

      {/* Caractéristiques de la réservation */}
      <div className="my-6 space-y-3">
        <div className="flex items-center text-sm text-luxury-700">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          <span>Annulation gratuite jusqu'à 24h avant la prise en charge</span>
        </div>
        <div className="flex items-center text-sm text-luxury-700">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          <span>Assurance tous risques incluse</span>
        </div>
        <div className="flex items-center text-sm text-luxury-700">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          <span>Assistance clientèle 24/7</span>
        </div>
      </div>

      {/* Bouton de réservation */}
      <Button 
        className="w-full bg-luxury-900 hover:bg-luxury-800 text-white py-6"
        onClick={handleBooking}
        disabled={isProcessing || !isVehicleAvailableForDates}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <div className="animate-spin size-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
            Traitement en cours...
          </span>
        ) : (
          <span className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Réserver maintenant
          </span>
        )}
      </Button>
      
      <p className="text-xs text-luxury-500 text-center mt-4">
        En cliquant sur "Réserver maintenant", vous acceptez nos Conditions Générales d'Utilisation et notre Politique de Confidentialité
      </p>
    </div>
  );
};

export default BookingForm;
