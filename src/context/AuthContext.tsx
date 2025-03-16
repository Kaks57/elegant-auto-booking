
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { format, isWithinInterval, isBefore, addDays, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { vehicles } from "@/lib/types";

type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  joinDate?: string;
  bookingsCount?: number;
  phone?: string;
};

type Booking = {
  id: string;
  userId?: number;
  userName: string;
  userPhone: string;
  vehicleId: number;
  vehicleName: string;
  startDate: string;
  endDate: string;
  status: "terminée" | "active" | "à venir";
  amount: number;
  imageUrl: string;
  isGuestBooking?: boolean;
  location?: string; // Nouvel attribut pour stocker la localisation
  ipAddress?: string; // Nouvel attribut pour stocker l'adresse IP
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  addBooking: (booking: Omit<Booking, "id" | "userId" | "userName" | "userPhone"> & { guestName?: string; guestPhone?: string; }) => void;
  getUserBookings: () => Booking[];
  getAllBookings: () => Booking[];
  getAllUsers: () => User[];
  cancelBooking: (bookingId: string) => void;
  updateBooking: (bookingId: string, updatedBooking: Partial<Omit<Booking, "id" | "userId" | "userName" | "userPhone">>) => void;
  getBookingById: (bookingId: string) => Booking | undefined;
  isVehicleAvailable: (vehicleId: number, startDate: string, endDate: string, excludeBookingId?: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Données simulées des utilisateurs - Mise à jour des identifiants admin
let MOCK_USERS = [
  {
    id: 1,
    name: "Admin",
    email: "admin@admin.com", // Email simplifié pour faciliter l'accès
    password: "admin", // Mot de passe simplifié
    role: "admin" as const,
    joinDate: "2023-01-01",
    bookingsCount: 0,
    phone: "+33123456789"
  },
  {
    id: 2,
    name: "Client Test",
    email: "client@exemple.fr",
    password: "client123",
    role: "user" as const,
    joinDate: "2023-05-15",
    bookingsCount: 0,
    phone: "+33987654321"
  }
];

// Données simulées des réservations
let MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    userId: 2,
    userName: "Client Test",
    userPhone: "+33987654321",
    vehicleId: 1,
    vehicleName: "BMW XM",
    startDate: "2023-10-15",
    endDate: "2023-10-22",
    status: "terminée",
    amount: 8400,
    imageUrl: vehicles[0].images[0],
  },
];

// Fonction simulée pour obtenir l'adresse IP de l'utilisateur
const getMockIpAddress = (): string => {
  // Générer une adresse IP aléatoire pour la simulation
  const octet1 = Math.floor(Math.random() * 255);
  const octet2 = Math.floor(Math.random() * 255);
  const octet3 = Math.floor(Math.random() * 255);
  const octet4 = Math.floor(Math.random() * 255);
  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

// Fonction simulée pour obtenir la localisation basée sur l'IP
const getMockLocation = (): string => {
  const cities = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"];
  return cities[Math.floor(Math.random() * cities.length)];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté (localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBookings = localStorage.getItem("bookings");
    const storedUsers = localStorage.getItem("users");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Charger les réservations sauvegardées
    if (storedBookings) {
      MOCK_BOOKINGS = JSON.parse(storedBookings);
    }
    
    // Charger les utilisateurs sauvegardés
    if (storedUsers) {
      MOCK_USERS = JSON.parse(storedUsers);
    }
  }, []);

  // Vérifier si un véhicule est disponible pour une période donnée
  const isVehicleAvailable = (vehicleId: number, startDate: string, endDate: string, excludeBookingId?: string) => {
    // Convertir les dates en objets Date
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    
    // Vérifier si la date de début est au moins 7 jours dans le futur
    const sevenDaysFromNow = addDays(new Date(), 7);
    if (isBefore(start, sevenDaysFromNow)) {
      return false; // La réservation doit être faite au moins 7 jours à l'avance
    }

    // Vérifier les chevauchements avec les réservations existantes
    return !MOCK_BOOKINGS.some(booking => {
      // Ignorer la réservation actuelle si on est en train de la modifier
      if (excludeBookingId && booking.id === excludeBookingId) {
        return false;
      }
      
      // Ignorer les réservations terminées
      if (booking.status === "terminée") {
        return false;
      }
      
      // Vérifier si le véhicule est le même
      if (booking.vehicleId !== vehicleId) {
        return false;
      }
      
      // Convertir les dates de réservation en objets Date
      const bookingStart = parseISO(booking.startDate);
      const bookingEnd = parseISO(booking.endDate);
      
      // Vérifier le chevauchement des périodes
      return (
        (isWithinInterval(start, { start: bookingStart, end: bookingEnd }) ||
         isWithinInterval(end, { start: bookingStart, end: bookingEnd }) ||
         isWithinInterval(bookingStart, { start, end }) ||
         isWithinInterval(bookingEnd, { start, end }))
      );
    });
  };

  const login = async (email: string, password: string) => {
    // Simuler une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Créer l'objet utilisateur sans le mot de passe
      const loggedInUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        joinDate: foundUser.joinDate,
        bookingsCount: foundUser.bookingsCount || 0,
        phone: foundUser.phone
      };
      
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${foundUser.name}!`,
      });
      
      navigate("/");
    } else {
      throw new Error("Identifiants invalides");
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    // Simuler une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier si l'email existe déjà
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error("Cet email est déjà utilisé");
    }
    
    // Créer un nouvel utilisateur et l'ajouter à MOCK_USERS
    const newUserId = MOCK_USERS.length + 1;
    const currentDate = format(new Date(), "yyyy-MM-dd", { locale: fr });
    
    const newMockUser = {
      id: newUserId,
      name,
      email,
      password,
      role: "user" as const,
      joinDate: currentDate,
      bookingsCount: 0,
      phone
    };
    
    // Ajouter l'utilisateur à la liste des utilisateurs simulés
    MOCK_USERS = [...MOCK_USERS, newMockUser];
    localStorage.setItem("users", JSON.stringify(MOCK_USERS));
    
    // Créer l'objet utilisateur sans le mot de passe pour le stocker
    const newUser = {
      id: newUserId,
      name,
      email,
      role: "user" as const,
      joinDate: currentDate,
      bookingsCount: 0,
      phone
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès",
    });
    
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté",
    });
    navigate("/");
  };

  // Ajouter une réservation
  const addBooking = (booking: Omit<Booking, "id" | "userId" | "userName" | "userPhone"> & { guestName?: string; guestPhone?: string; }) => {
    // Vérifier la disponibilité du véhicule
    if (!isVehicleAvailable(booking.vehicleId, booking.startDate, booking.endDate)) {
      toast({
        variant: "destructive",
        title: "Véhicule indisponible",
        description: "Ce véhicule n'est pas disponible pour les dates sélectionnées ou la réservation doit être faite au moins 7 jours à l'avance.",
      });
      return;
    }
    
    const bookingId = `b${MOCK_BOOKINGS.length + 1}`;
    
    // Simuler une adresse IP et une localisation
    const ipAddress = getMockIpAddress();
    const location = getMockLocation();
    
    // Gérer les réservations d'invités (non connectés)
    if (booking.guestName && booking.guestPhone) {
      const guestBooking: Booking = {
        id: bookingId,
        userName: booking.guestName,
        userPhone: booking.guestPhone,
        vehicleId: booking.vehicleId,
        vehicleName: booking.vehicleName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        amount: booking.amount,
        imageUrl: booking.imageUrl,
        isGuestBooking: true,
        location: location,
        ipAddress: ipAddress
      };
      
      // Ajouter la réservation
      MOCK_BOOKINGS = [...MOCK_BOOKINGS, guestBooking];
      localStorage.setItem("bookings", JSON.stringify(MOCK_BOOKINGS));
      
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès",
      });
      
      return guestBooking;
    }
    
    // Pour les utilisateurs connectés
    if (!user) return;
    
    const newBooking: Booking = {
      id: bookingId,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone || "Non spécifié",
      vehicleId: booking.vehicleId,
      vehicleName: booking.vehicleName,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      amount: booking.amount,
      imageUrl: booking.imageUrl,
      location: location,
      ipAddress: ipAddress
    };
    
    // Ajouter la réservation
    MOCK_BOOKINGS = [...MOCK_BOOKINGS, newBooking];
    localStorage.setItem("bookings", JSON.stringify(MOCK_BOOKINGS));
    
    // Mettre à jour le compteur de réservations de l'utilisateur
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex].bookingsCount = (MOCK_USERS[userIndex].bookingsCount || 0) + 1;
      localStorage.setItem("users", JSON.stringify(MOCK_USERS));
    }
    
    return newBooking;
  };

  // Obtenir une réservation par son ID
  const getBookingById = (bookingId: string) => {
    return MOCK_BOOKINGS.find(booking => booking.id === bookingId);
  };

  // Annuler une réservation
  const cancelBooking = (bookingId: string) => {
    if (!user) return;
    
    // Rechercher la réservation
    const bookingIndex = MOCK_BOOKINGS.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Réservation introuvable",
      });
      return;
    }
    
    // Vérifier que la réservation appartient à l'utilisateur ou qu'il est admin
    if (MOCK_BOOKINGS[bookingIndex].userId !== user.id && user.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Action non autorisée",
        description: "Vous n'êtes pas autorisé à annuler cette réservation",
      });
      return;
    }
    
    // Supprimer la réservation
    MOCK_BOOKINGS = MOCK_BOOKINGS.filter(booking => booking.id !== bookingId);
    localStorage.setItem("bookings", JSON.stringify(MOCK_BOOKINGS));
    
    toast({
      title: "Réservation annulée",
      description: "Votre réservation a été annulée avec succès",
    });
  };
  
  // Mettre à jour une réservation
  const updateBooking = (bookingId: string, updatedBooking: Partial<Omit<Booking, "id" | "userId" | "userName" | "userPhone">>) => {
    if (!user) return;
    
    // Rechercher la réservation
    const bookingIndex = MOCK_BOOKINGS.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Réservation introuvable",
      });
      return;
    }
    
    // Vérifier que la réservation appartient à l'utilisateur ou qu'il est admin
    if (MOCK_BOOKINGS[bookingIndex].userId !== user.id && user.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Action non autorisée",
        description: "Vous n'êtes pas autorisé à modifier cette réservation",
      });
      return;
    }
    
    // Vérifier la disponibilité du véhicule si les dates sont modifiées
    if (updatedBooking.startDate && updatedBooking.endDate) {
      const isAvailable = isVehicleAvailable(
        MOCK_BOOKINGS[bookingIndex].vehicleId,
        updatedBooking.startDate,
        updatedBooking.endDate,
        bookingId
      );
      
      if (!isAvailable) {
        toast({
          variant: "destructive",
          title: "Véhicule indisponible",
          description: "Ce véhicule n'est pas disponible pour les dates sélectionnées ou la réservation doit être faite au moins 7 jours à l'avance.",
        });
        return;
      }
    }
    
    // Mettre à jour la réservation
    MOCK_BOOKINGS[bookingIndex] = {
      ...MOCK_BOOKINGS[bookingIndex],
      ...updatedBooking
    };
    
    localStorage.setItem("bookings", JSON.stringify(MOCK_BOOKINGS));
    
    toast({
      title: "Réservation mise à jour",
      description: "Votre réservation a été modifiée avec succès",
    });
  };

  // Obtenir les réservations de l'utilisateur connecté
  const getUserBookings = () => {
    if (!user) return [];
    return MOCK_BOOKINGS.filter(booking => booking.userId === user.id);
  };

  // Obtenir toutes les réservations (pour l'admin)
  const getAllBookings = () => {
    return MOCK_BOOKINGS;
  };

  // Obtenir tous les utilisateurs (pour l'admin)
  const getAllUsers = () => {
    return MOCK_USERS.map(({ password, ...user }) => user);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout, 
      addBooking,
      getUserBookings,
      getAllBookings,
      getAllUsers,
      cancelBooking,
      updateBooking,
      getBookingById,
      isVehicleAvailable
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
