
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-luxury-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-heading font-bold mb-4">LuxuryRentalWorld</h2>
            </Link>
            <p className="text-gray-300 mb-6 max-w-xs">
              Experience the epitome of luxury with our premium vehicle rental service. Elevate your journey with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Snapchat">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-300 hover:text-white transition-colors">Our Fleet</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/vehicles?type=Luxury" className="text-gray-300 hover:text-white transition-colors">Luxury Cars</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Sports" className="text-gray-300 hover:text-white transition-colors">Sports Cars</Link>
              </li>
              <li>
                <Link to="/vehicles?type=SUV" className="text-gray-300 hover:text-white transition-colors">SUVs</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Sedan" className="text-gray-300 hover:text-white transition-colors">Sedans</Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-gray-300 mr-3 shrink-0" />
                <span className="text-gray-300">123 Avenue des Champs-Élysées, 75008 Paris, France</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-gray-300 mr-3 shrink-0" />
                <a href="tel:+33123456789" className="text-gray-300 hover:text-white transition-colors">+33 1 23 45 67 89</a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-gray-300 mr-3 shrink-0" />
                <a href="mailto:info@luxuryrentalworld.com" className="text-gray-300 hover:text-white transition-colors">info@luxuryrentalworld.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LuxuryRentalWorld. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
