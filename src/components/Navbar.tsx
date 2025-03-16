import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Véhicules", path: "/vehicles" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const handleAdminAccess = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/90 navbar-blur shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center space-x-2">
      <img
            src="/images/MOCK LOGO.png"
            alt="Logo"
            className="h-20 w-auto"
  />
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-luxury-600 ${
                  isScrolled || !isHomePage 
                    ? "text-luxury-800" 
                    : "text-white hover:text-white/80"
                } ${
                  location.pathname === link.path 
                    ? isScrolled || !isHomePage 
                      ? "text-luxury-900 font-semibold" 
                      : "text-white font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth buttons - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`transition-all ${
                      isScrolled || !isHomePage 
                        ? "text-luxury-800 border-luxury-200 hover:bg-luxury-50" 
                        : "text-white border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Administration
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className={`transition-all ${
                      isScrolled || !isHomePage 
                        ? "text-luxury-800 border-luxury-200 hover:bg-luxury-50" 
                        : "text-white border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className={`transition-all ${
                      isScrolled || !isHomePage 
                        ? "bg-luxury-900 text-white hover:bg-luxury-800" 
                        : "bg-white text-luxury-900 hover:bg-white/90"
                    }`}
                  >
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled || !isHomePage ? "text-luxury-900" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled || !isHomePage ? "text-luxury-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
