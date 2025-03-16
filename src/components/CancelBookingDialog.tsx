
import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface CancelBookingDialogProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CancelBookingDialog: React.FC<CancelBookingDialogProps> = ({ bookingId, isOpen, onClose }) => {
  const { cancelBooking } = useAuth();
  
  const handleCancel = () => {
    cancelBooking(bookingId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Annuler la réservation</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 p-4 bg-amber-50 rounded-md">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <p className="text-sm text-amber-800">
            Si la réservation commence dans moins de 24 heures, des frais d'annulation peuvent s'appliquer.
          </p>
        </div>
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleCancel}>
            Confirmer l'annulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingDialog;
