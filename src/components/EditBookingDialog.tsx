
import React, { useState, useEffect } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { vehicles } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EditBookingDialogProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({ bookingId, isOpen, onClose }) => {
  const { getBookingById, updateBooking } = useAuth();
  const booking = getBookingById(bookingId);
  const today = new Date();
  
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(addDays(today, 1));
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [vehiclePrice, setVehiclePrice] = useState<number>(0);

  useEffect(() => {
    if (booking) {
      // Convertir les dates de string à Date
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      
      setStartDate(start);
      setEndDate(end);
      
      // Trouver le véhicule pour obtenir son prix
      const vehicle = vehicles.find(v => v.id === booking.vehicleId);
      if (vehicle) {
        setVehiclePrice(vehicle.price);
        // Calculer le prix total
        const days = differenceInDays(end, start) || 1;
        setTotalPrice(vehicle.price * days);
      }
    }
  }, [booking]);

  // Recalculer le prix total quand les dates changent
  useEffect(() => {
    const days = differenceInDays(endDate, startDate) || 1;
    setTotalPrice(vehiclePrice * days);
  }, [startDate, endDate, vehiclePrice]);

  const handleSave = () => {
    if (!booking) return;
    
    updateBooking(bookingId, {
      startDate: format(startDate, 'yyyy-MM-dd', { locale: fr }),
      endDate: format(endDate, 'yyyy-MM-dd', { locale: fr }),
      amount: totalPrice,
    });
    
    onClose();
  };

  if (!booking) return null;

  // Calculer la durée de location en jours
  const rentalDays = differenceInDays(endDate, startDate) || 1;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la réservation</DialogTitle>
          <DialogDescription>
            Modifiez les dates de votre réservation pour {booking.vehicleName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date de début</label>
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
                  onSelect={(date) => {
                    if (date) {
                      setStartDate(date);
                      // S'assurer que la date de fin est toujours après la date de début
                      if (endDate <= date) {
                        setEndDate(addDays(date, 1));
                      }
                    }
                  }}
                  disabled={(date) => date < today}
                  initialFocus
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date de fin</label>
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
                  onSelect={(date) => date && setEndDate(date)}
                  disabled={(date) => 
                    date < addDays(startDate, 1) || // Minimum 1 jour de location
                    date > addDays(startDate, 7)    // Maximum 7 jours de location
                  }
                  initialFocus
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span>Durée:</span>
              <span className="font-medium">{rentalDays} {rentalDays === 1 ? "jour" : "jours"}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Prix par jour:</span>
              <span className="font-medium">{vehiclePrice.toFixed(2)} €</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">Prix total:</span>
              <span className="font-bold">{totalPrice.toFixed(2)} €</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
