
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LogOut, CarFront, Clock, CalendarDays, User, CreditCard, Settings, PenLine, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import CancelBookingDialog from "@/components/CancelBookingDialog";
import EditBookingDialog from "@/components/EditBookingDialog";

const Dashboard = () => {
  const { user, isAuthenticated, logout, getUserBookings } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // États pour les dialogues
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      navigate("/login");
      toast({
        variant: "destructive",
        title: "Authentification requise",
        description: "Veuillez vous connecter pour accéder à votre tableau de bord",
      });
    } else {
      // Charger les réservations de l'utilisateur
      const userBookings = getUserBookings();
      setBookings(userBookings);
    }
  }, [isAuthenticated, navigate, toast, getUserBookings]);
  
  // Recharger les réservations quand une modification est effectuée
  useEffect(() => {
    if (isAuthenticated) {
      const userBookings = getUserBookings();
      setBookings(userBookings);
    }
  }, [getUserBookings, isAuthenticated, cancelDialogOpen, editDialogOpen]);

  const handleLogout = () => {
    logout();
  };
  
  // Fonctions pour les dialogues
  const openCancelDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCancelDialogOpen(true);
  };
  
  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setSelectedBookingId(null);
  };
  
  const openEditDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedBookingId(null);
  };

  // Traduction des statuts de réservation
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "terminée":
        return "Terminée";
      case "active":
        return "Active";
      case "à venir":
        return "À venir";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Traduction des couleurs de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "terminée":
        return "bg-gray-500";
      case "active":
        return "bg-green-500";
      case "à venir":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Barre latérale */}
            <div className="md:w-64 space-y-4">
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-luxury-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-luxury-900" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.name}</h3>
                    <p className="text-sm text-gray-500">Membre #{user?.id}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-2">
                  <button 
                    className={`w-full text-left p-3 rounded-md flex items-center space-x-3 ${activeTab === 'bookings' ? 'bg-luxury-100 text-luxury-900' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <CarFront className="h-5 w-5" />
                    <span>Mes Réservations</span>
                  </button>
                  
                  <button 
                    className={`w-full text-left p-3 rounded-md flex items-center space-x-3 ${activeTab === 'profile' ? 'bg-luxury-100 text-luxury-900' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-5 w-5" />
                    <span>Profil</span>
                  </button>
                  
                  <button 
                    className={`w-full text-left p-3 rounded-md flex items-center space-x-3 ${activeTab === 'payment' ? 'bg-luxury-100 text-luxury-900' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Moyens de paiement</span>
                  </button>
                  
                  <button 
                    className={`w-full text-left p-3 rounded-md flex items-center space-x-3 ${activeTab === 'settings' ? 'bg-luxury-100 text-luxury-900' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Contenu principal */}
            <div className="flex-1">
              <Tabs defaultValue="all" className="w-full">
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                  <h1 className="text-2xl font-bold mb-2">Mon Tableau de Bord</h1>
                  
                  {activeTab === 'bookings' && (
                    <>
                      <p className="text-gray-500 mb-6">Gérez vos réservations de véhicules</p>
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="all">Toutes</TabsTrigger>
                        <TabsTrigger value="active">Actives</TabsTrigger>
                        <TabsTrigger value="upcoming">À venir</TabsTrigger>
                      </TabsList>
                    </>
                  )}
                  
                  {activeTab === 'profile' && (
                    <p className="text-gray-500 mb-6">Gérez vos informations personnelles</p>
                  )}
                  
                  {activeTab === 'payment' && (
                    <p className="text-gray-500 mb-6">Gérez vos moyens de paiement</p>
                  )}
                  
                  {activeTab === 'settings' && (
                    <p className="text-gray-500 mb-6">Gérez les paramètres de votre compte</p>
                  )}
                </div>
                
                {activeTab === 'bookings' && (
                  <>
                    <TabsContent value="all" className="mt-0 space-y-4">
                      {bookings.length > 0 ? (
                        bookings.map((booking) => (
                          <Card key={booking.id} className="overflow-hidden animate-fade-in">
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="md:col-span-1">
                                <div className="h-full w-full aspect-[4/3] md:aspect-square">
                                  <img
                                    src={booking.imageUrl}
                                    alt={booking.vehicleName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="p-6 md:col-span-3">
                                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                                  <h3 className="text-xl font-bold">{booking.vehicleName}</h3>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {getStatusLabel(booking.status)}
                                  </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de début</p>
                                      <p className="font-medium">{booking.startDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de fin</p>
                                      <p className="font-medium">{booking.endDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Total</p>
                                      <p className="font-medium">{booking.amount.toFixed(2)} €</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3">
                                  <Button
                                    variant="outline"
                                    className="text-luxury-900 border-luxury-900 hover:bg-luxury-50"
                                    asChild
                                  >
                                    <Link to={`/vehicles/${booking.vehicleId}`}>
                                      Voir le véhicule
                                    </Link>
                                  </Button>
                                  
                                  {booking.status === "à venir" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        className="text-amber-600 border-amber-600 hover:bg-amber-50"
                                        onClick={() => openEditDialog(booking.id)}
                                      >
                                        <PenLine className="h-4 w-4 mr-2" />
                                        Modifier la réservation
                                      </Button>
                                      
                                      <Button
                                        variant="outline" 
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => openCancelDialog(booking.id)}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Annuler la réservation
                                      </Button>
                                    </>
                                  )}
                                  
                                  {booking.status === "terminée" && (
                                    <Button className="bg-luxury-900 hover:bg-luxury-800">
                                      Réserver à nouveau
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <Card className="p-8 text-center">
                          <p className="text-gray-500">Vous n'avez aucune réservation.</p>
                        </Card>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="active" className="mt-0 space-y-4">
                      {bookings
                        .filter((booking) => booking.status === "active")
                        .map((booking) => (
                          <Card key={booking.id} className="overflow-hidden animate-fade-in">
                            {/* Même contenu de carte que ci-dessus */}
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="md:col-span-1">
                                <div className="h-full w-full aspect-[4/3] md:aspect-square">
                                  <img
                                    src={booking.imageUrl}
                                    alt={booking.vehicleName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="p-6 md:col-span-3">
                                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                                  <h3 className="text-xl font-bold">{booking.vehicleName}</h3>
                                  <Badge className="bg-green-500">Active</Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de début</p>
                                      <p className="font-medium">{booking.startDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de fin</p>
                                      <p className="font-medium">{booking.endDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Total</p>
                                      <p className="font-medium">{booking.amount.toFixed(2)} €</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3">
                                  <Button
                                    variant="outline"
                                    className="text-luxury-900 border-luxury-900 hover:bg-luxury-50"
                                    asChild
                                  >
                                    <Link to={`/vehicles/${booking.vehicleId}`}>
                                      Voir le véhicule
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}

                      {bookings.filter((booking) => booking.status === "active").length === 0 && (
                        <Card className="p-8 text-center">
                          <p className="text-gray-500">Vous n'avez aucune réservation active.</p>
                        </Card>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="upcoming" className="mt-0 space-y-4">
                      {bookings
                        .filter((booking) => booking.status === "à venir")
                        .map((booking) => (
                          <Card key={booking.id} className="overflow-hidden animate-fade-in">
                            {/* Même contenu de carte que ci-dessus */}
                            <div className="grid md:grid-cols-4 gap-4">
                              <div className="md:col-span-1">
                                <div className="h-full w-full aspect-[4/3] md:aspect-square">
                                  <img
                                    src={booking.imageUrl}
                                    alt={booking.vehicleName}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="p-6 md:col-span-3">
                                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                                  <h3 className="text-xl font-bold">{booking.vehicleName}</h3>
                                  <Badge className="bg-blue-500">À venir</Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de début</p>
                                      <p className="font-medium">{booking.startDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Date de fin</p>
                                      <p className="font-medium">{booking.endDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-gray-500" />
                                    <div>
                                      <p className="text-sm text-gray-500">Total</p>
                                      <p className="font-medium">{booking.amount.toFixed(2)} €</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3">
                                  <Button
                                    variant="outline"
                                    className="text-luxury-900 border-luxury-900 hover:bg-luxury-50"
                                    asChild
                                  >
                                    <Link to={`/vehicles/${booking.vehicleId}`}>
                                      Voir le véhicule
                                    </Link>
                                  </Button>
                                  
                                  <Button
                                    variant="outline"
                                    className="text-amber-600 border-amber-600 hover:bg-amber-50"
                                    onClick={() => openEditDialog(booking.id)}
                                  >
                                    <PenLine className="h-4 w-4 mr-2" />
                                    Modifier la réservation
                                  </Button>
                                  
                                  <Button
                                    variant="outline" 
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                    onClick={() => openCancelDialog(booking.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Annuler la réservation
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}

                      {bookings.filter((booking) => booking.status === "à venir").length === 0 && (
                        <Card className="p-8 text-center">
                          <p className="text-gray-500">Vous n'avez aucune réservation à venir.</p>
                        </Card>
                      )}
                    </TabsContent>
                  </>
                )}
                
                {activeTab === 'profile' && (
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>Gérez vos données personnelles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-center text-gray-500">Le contenu de gestion du profil apparaîtrait ici</p>
                      <Button className="w-full bg-luxury-900 hover:bg-luxury-800">Enregistrer les modifications</Button>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === 'payment' && (
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle>Moyens de paiement</CardTitle>
                      <CardDescription>Gérez vos informations de paiement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-center text-gray-500">Le contenu de gestion des moyens de paiement apparaîtrait ici</p>
                      <Button className="w-full bg-luxury-900 hover:bg-luxury-800">Ajouter un moyen de paiement</Button>
                    </CardContent>
                  </Card>
                )}
                
                {activeTab === 'settings' && (
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle>Paramètres du compte</CardTitle>
                      <CardDescription>Gérez vos préférences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-center text-gray-500">Le contenu des paramètres apparaîtrait ici</p>
                      <Button className="w-full bg-luxury-900 hover:bg-luxury-800">Enregistrer les paramètres</Button>
                    </CardContent>
                  </Card>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Dialogues pour modifier/annuler les réservations */}
      {selectedBookingId && (
        <>
          <CancelBookingDialog 
            bookingId={selectedBookingId} 
            isOpen={cancelDialogOpen} 
            onClose={closeCancelDialog} 
          />
          
          <EditBookingDialog 
            bookingId={selectedBookingId}
            isOpen={editDialogOpen}
            onClose={closeEditDialog}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
