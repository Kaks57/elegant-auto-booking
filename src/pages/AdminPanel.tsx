
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Users, Car, Calendar, Phone, MapPin, Globe } from "lucide-react";
import { vehicles } from "@/lib/types";

// Importation des données depuis le contexte Auth
const AdminPanel = () => {
  const { user, isAuthenticated, getAllUsers, getAllBookings } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicleStats, setVehicleStats] = useState([]);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et est admin
    if (!isAuthenticated || user?.role !== "admin") {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour accéder à cette page",
      });
      navigate("/");
    } else {
      // Charger les données
      const allUsers = getAllUsers();
      setUsers(allUsers);
      
      const allBookings = getAllBookings();
      setBookings(allBookings);
      
      // Calculer les statistiques des véhicules
      calculateVehicleStats(allBookings);
    }
  }, [isAuthenticated, user, navigate, toast, getAllUsers, getAllBookings]);

  const calculateVehicleStats = (bookingsList) => {
    // Initialiser les statistiques de véhicules
    const stats = vehicles.map(vehicle => ({
      id: vehicle.id,
      name: `${vehicle.brand} ${vehicle.name}`,
      bookings: 0,
      totalRevenue: 0
    }));
    
    // Calculer les statistiques à partir des réservations
    bookingsList.forEach(booking => {
      const vehicleIndex = stats.findIndex(v => v.id === booking.vehicleId);
      if (vehicleIndex !== -1) {
        stats[vehicleIndex].bookings += 1;
        stats[vehicleIndex].totalRevenue += booking.amount;
      }
    });
    
    setVehicleStats(stats);
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Panneau d'administration</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-luxury-100 p-3 rounded-full mb-4">
                  <FileText className="h-6 w-6 text-luxury-900" />
                </div>
                <h3 className="text-2xl font-bold">{bookings.length}</h3>
                <p className="text-gray-500">Réservations totales</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold">{users.length}</h3>
                <p className="text-gray-500">Utilisateurs</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">{vehicles.length}</h3>
                <p className="text-gray-500">Véhicules</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-amber-100 p-3 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold">
                  {bookings.filter(b => b.status === "active").length}
                </h3>
                <p className="text-gray-500">Réservations actives</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="bookings">Réservations</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="vehicles">Statistiques véhicules</TabsTrigger>
              <TabsTrigger value="bookingCalendar">Calendrier des réservations</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Toutes les réservations</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Localisation</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.userName} {booking.isGuestBooking && <Badge variant="outline" className="ml-1">Invité</Badge>}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1 text-gray-500" />
                                {booking.userPhone || "Non spécifié"}
                              </div>
                            </TableCell>
                            <TableCell>{booking.vehicleName}</TableCell>
                            <TableCell>
                              {booking.startDate} - {booking.endDate}
                            </TableCell>
                            <TableCell>{booking.amount.toFixed(2)} €</TableCell>
                            <TableCell>
                              {booking.location ? (
                                <div className="flex flex-col">
                                  <div className="flex items-center text-xs">
                                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                    {booking.location || "Non spécifié"}
                                  </div>
                                  <div className="flex items-center text-xs mt-1">
                                    <Globe className="h-3 w-3 mr-1 text-gray-500" />
                                    {booking.ipAddress || "Non spécifié"}
                                  </div>
                                </div>
                              ) : (
                                "Non spécifié"
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  booking.status === "terminée"
                                    ? "bg-gray-500"
                                    : booking.status === "active"
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucune réservation disponible pour le moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tous les utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Réservations</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-gray-500" />
                              {user.phone || "Non spécifié"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.role === "admin"
                                  ? "bg-purple-500"
                                  : "bg-blue-500"
                              }
                            >
                              {user.role === "admin" ? "Admin" : "Client"}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate || "N/A"}</TableCell>
                          <TableCell>{user.bookingsCount || 0}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques des véhicules</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Véhicule</TableHead>
                        <TableHead>Réservations</TableHead>
                        <TableHead>Revenus totaux</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicleStats.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.id}</TableCell>
                          <TableCell>{vehicle.name}</TableCell>
                          <TableCell>{vehicle.bookings}</TableCell>
                          <TableCell>{vehicle.totalRevenue.toFixed(2)} €</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookingCalendar" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier des réservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Localisation</TableHead>
                          <TableHead>Date début</TableHead>
                          <TableHead>Date fin</TableHead>
                          <TableHead>Durée</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings
                          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                          .map((booking) => {
                            const startDate = new Date(booking.startDate);
                            const endDate = new Date(booking.endDate);
                            const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                            
                            return (
                              <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.vehicleName}</TableCell>
                                <TableCell>
                                  {booking.userName}
                                  {booking.isGuestBooking && <Badge variant="outline" className="ml-1">Invité</Badge>}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Phone className="h-3 w-3 mr-1 text-gray-500" />
                                    {booking.userPhone || "Non spécifié"}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {booking.location ? (
                                    <div className="flex flex-col">
                                      <div className="flex items-center text-xs">
                                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                        {booking.location}
                                      </div>
                                    </div>
                                  ) : (
                                    "Non spécifié"
                                  )}
                                </TableCell>
                                <TableCell>{booking.startDate}</TableCell>
                                <TableCell>{booking.endDate}</TableCell>
                                <TableCell>{durationDays} jour{durationDays > 1 ? 's' : ''}</TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      booking.status === "terminée"
                                        ? "bg-gray-500"
                                        : booking.status === "active"
                                        ? "bg-green-500"
                                        : "bg-blue-500"
                                    }
                                  >
                                    {booking.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
