import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({ title: "Message envoyé", description: "Nous vous répondrons dans les plus brefs délais." });
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="bg-luxury-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
              <p className="text-xl text-gray-300 mb-4">Notre équipe est à votre disposition pour répondre à toutes vos questions.</p>
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-slide-up">
                <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputField label="Nom complet" id="name" register={register("name", { required: "Le nom est requis" })} error={errors.name} />
                  <InputField label="Email" id="email" register={register("email", { required: "L'email est requis", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Email invalide" } })} error={errors.email} />
                  <InputField label="Téléphone" id="phone" register={register("phone")} />
                  <InputField label="Sujet" id="subject" register={register("subject", { required: "Le sujet est requis" })} error={errors.subject} />
                  <TextareaField label="Message" id="message" register={register("message", { required: "Le message est requis" })} error={errors.message} />
                  <Button type="submit" className="w-full bg-luxury-900 hover:bg-luxury-800 text-white" disabled={isSubmitting}>
                    {isSubmitting ? <BeatLoader color="#fff" size={10} /> : <> <Send className="mr-2 h-4 w-4" /> Envoyer le message </>}
                  </Button>
                </form>
              </div>
              <ContactInfo />
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] lg:h-[500px] sm:h-[350px]">
          <MapContainer center={[48.854, 2.292]} zoom={15} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[48.854, 2.292]} icon={customIcon}>
              <Popup><strong>71 rue desnouettes</strong><br />75015, Paris, France</Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const InputField = ({ label, id, register, error }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...register} placeholder={label} aria-invalid={error ? "true" : "false"} />
    {error && <p className="text-red-600 text-sm">{error.message}</p>}
  </div>
);

const TextareaField = ({ label, id, register, error }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea id={id} {...register} placeholder={label} rows={6} aria-invalid={error ? "true" : "false"} />
    {error && <p className="text-red-600 text-sm">{error.message}</p>}
  </div>
);

const ContactInfo = () => (
  <div className="lg:pl-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
    <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
    <CardInfo icon={<MapPin />} title="Adresse" details={["71 rue desnouettes", "75015, Paris, France"]} />
    <CardInfo icon={<Phone />} title="Téléphone" details={["+33 6 72 74 06 85"]} />
  </div>
);

const CardInfo = ({ icon, title, details }) => (
  <Card>
    <CardContent className="flex items-start gap-4 p-6">
      <div className="bg-luxury-100 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        {details.map((detail, index) => <p key={index} className="text-gray-600">{detail}</p>)}
      </div>
    </CardContent>
  </Card>
);

export default Contact;
