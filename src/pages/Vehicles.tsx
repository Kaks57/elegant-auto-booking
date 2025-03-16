
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Vehicle, vehicles as allVehicles } from "@/lib/types";

const Vehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  
  const [vehicles, setVehicles] = useState<Vehicle[]>(allVehicles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>(typeParam || "");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  
  // Get unique brands for filter
  const brands = Array.from(new Set(allVehicles.map((v) => v.brand))).sort();
  
  // Get unique types for filter
  const types = Array.from(new Set(allVehicles.map((v) => v.type))).sort();

  // Filter vehicles based on searchQuery, selectedType, and selectedBrand
  useEffect(() => {
    let filtered = [...allVehicles];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          v.type.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (selectedType) {
      filtered = filtered.filter((v) => v.type === selectedType);
    }
    
    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    }
    
    // Apply sorting
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setVehicles(filtered);
  }, [searchQuery, selectedType, selectedBrand, sortOption]);

  // Update URL params when type filter changes
  useEffect(() => {
    if (selectedType) {
      setSearchParams({ type: selectedType });
    } else {
      setSearchParams({});
    }
  }, [selectedType, setSearchParams]);

  // Set type filter from URL on initial load
  useEffect(() => {
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, [typeParam]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  // Handle brand filter change
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  // Handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedBrand("");
    setSortOption("default");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Header */}
        <div className="bg-luxury-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre Flotte de Luxe</h1>
              <p className="text-xl text-gray-300 mb-4">
                Choisissez parmi notre collection de véhicules premium pour une expérience inoubliable.
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search - Desktop */}
        <div className="bg-white border-b border-gray-200 py-4 hidden md:block animate-slide-down">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher des véhicules..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Select value={selectedType} onValueChange={handleTypeChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Type de Véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">Tous les Types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={selectedBrand} onValueChange={handleBrandChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Marque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-brands">Toutes les Marques</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={sortOption} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="price-asc">Prix: Croissant</SelectItem>
                      <SelectItem value="price-desc">Prix: Décroissant</SelectItem>
                      <SelectItem value="name-asc">Nom: A à Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={clearFilters}>
                  Effacer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search - Mobile */}
        <div className="bg-white border-b border-gray-200 py-4 md:hidden animate-slide-down">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-grow mr-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des véhicules..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                    <SheetDescription>
                      Affinez votre recherche de véhicules avec ces options.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Type de Véhicule</label>
                      <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-types">Tous les Types</SelectItem>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium">Marque</label>
                      <Select value={selectedBrand} onValueChange={handleBrandChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une marque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-brands">Toutes les Marques</SelectItem>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium">Trier par</label>
                      <Select value={sortOption} onValueChange={handleSortChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Par défaut</SelectItem>
                          <SelectItem value="price-asc">Prix: Croissant</SelectItem>
                          <SelectItem value="price-desc">Prix: Décroissant</SelectItem>
                          <SelectItem value="name-asc">Nom: A à Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <Button className="w-full" onClick={clearFilters}>
                      Effacer Tous les Filtres
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {vehicles.length > 0 ? (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-luxury-600">
                    Affichage de {vehicles.length} {vehicles.length === 1 ? "véhicule" : "véhicules"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((vehicle, index) => (
                    <div 
                      key={vehicle.id} 
                      className="animate-slide-up" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VehicleCard vehicle={vehicle} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucun véhicule trouvé</h3>
                <p className="text-gray-500 mb-6">
                  Essayez d'ajuster vos critères de recherche ou de filtrage
                </p>
                <Button onClick={clearFilters}>Effacer les Filtres</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vehicles;
