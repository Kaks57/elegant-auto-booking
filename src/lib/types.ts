
export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  type: string;
  year: number;
  price: number; // par jour
  images: string[];
  description: string;
  features: string[];
  specifications: {
    engine: string;
    transmission: string;
    power: string;
    topSpeed: string;
    acceleration: string;
    seats: number;
  };
  available: boolean;
  caution?: number; // Ajout du champ caution en option
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  vehicleId: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export const vehicles = [
  {
    id: 1,
    name: "XM",
    brand: "BMW",
    year: 2023,
    price: 1000,
    type: "SUV",
    caution: 8000,
    available: true,
    description: "Le BMW XM est le premier véhicule M originale depuis la légendaire BMW M1. Ce SUV hybride haute performance combine luxe et sportivité avec une puissance impressionnante et un design audacieux.",
    specifications: {
      engine: "V8 4.4L + électrique",
      transmission: "Automatique 8 vitesses",
      power: "653 ch",
      topSpeed: "250 km/h (limitée)",
      acceleration: "4.3 secondes",
      seats: 5
    },
    features: [
      "Système hybride rechargeable",
      "Intérieur en cuir Merino",
      "Système audio Bowers & Wilkins",
      "Technologie M xDrive",
      "Suspension adaptative Professional",
      "Système d'infodivertissement BMW iDrive 8",
      "Sièges M multifonctions chauffants et ventilés",
      "Éclairage d'ambiance"
    ],
    images: [
      "/images/xm.jpeg"
    ]
  },
  {
    id: 2,
    name: "Continental GT",
    brand: "Bentley",
    year: 2023,
    price: 1500,
    caution: 15000,
    type: "Coupé",
    available: true,
    description: "La Bentley Continental GT représente le summum du grand tourisme de luxe britannique. Alliant performances exceptionnelles et raffinement inégalé, elle incarne l'élégance sportive dans sa forme la plus pure.",
    specifications: {
      engine: "W12 6.0L",
      transmission: "Double embrayage 8 vitesses",
      power: "659 ch",
      topSpeed: "335 km/h",
      acceleration: "3.6 secondes",
      seats: 4
    },
    features: [
      "Intérieur en cuir naturel fait main",
      "Placages en bois précieux",
      "Système audio Naim premium",
      "Écran rotatif Bentley",
      "Suspension pneumatique intelligente",
      "Sièges massants à réglage 20 positions",
      "Toit panoramique",
      "Éclairage d'ambiance personnalisable"
    ],
    images: [
     "/images/continental.jpeg"
    ]
  },
  {
    id: 3,
    name: "Classe V300",
    brand: "Mercedes",
    year: 2023,
    price: 800,
    caution: 5000,
    type: "Van",
    available: true,
    description: "Le Mercedes Classe V300 est le nec plus ultra des monospaces de luxe. Spacieux, élégant et extrêmement confortable, il offre une expérience de voyage premium pour jusqu'à huit passagers avec un espace généreux pour les bagages.",
    specifications: {
      engine: "Diesel 2.0L",
      transmission: "Automatique 9G-TRONIC",
      power: "239 ch",
      topSpeed: "220 km/h",
      acceleration: "7.8 secondes",
      seats: 8
    },
    features: [
      "Sièges en cuir Nappa",
      "Climatisation THERMOTRONIC",
      "Système d'infodivertissement MBUX",
      "Portes coulissantes électriques",
      "Éclairage d'ambiance 64 couleurs",
      "Système audio Burmester",
      "Toit panoramique",
      "Assistance de stationnement active"
    ],
    images: [
      "/images/V300D.jpeg"
    ]
  },
  {
    id: 4,
    name: "Bentayga",
    brand: "Bentley",
    year: 2023,
    price: 1400,
    caution: 10000,
    type: "SUV",
    available: true,
    description: "Le Bentley Bentayga est le SUV le plus luxueux au monde. Il combine l'artisanat britannique traditionnel avec des technologies de pointe pour offrir une expérience de conduite sublime et des performances impressionnantes dans toutes les conditions.",
    specifications: {
      engine: "V8 4.0L",
      transmission: "Automatique 8 vitesses",
      power: "550 ch",
      topSpeed: "290 km/h",
      acceleration: "4.5 secondes",
      seats: 5
    },
    features: [
      "Intérieur en cuir supérieur fait main",
      "Système audio Naim premium",
      "Sièges massants chauffants et ventilés",
      "Suspension pneumatique adaptative",
      "Système de conduite tout-terrain",
      "Night Vision",
      "Système de divertissement arrière",
      "Finitions en bois précieux"
    ],
    images: [
   "/images/bentayga.jpeg"
    ]
  },
  {
    id: 5,
    name: "A45 S AMG",
    brand: "Mercedes",
    year: 2023,
    price: 600,
    caution: 4000,
    type: "Compacte",
    available: true,
    description: "La Mercedes A45 S AMG est la compacte la plus puissante au monde. Véritable bombe de poche, elle offre des performances dignes d'une supercar dans un format citadin, avec la qualité et le raffinement caractéristiques de Mercedes-AMG.",
    specifications: {
      engine: "4 cylindres 2.0L turbo",
      transmission: "Double embrayage 8 vitesses",
      power: "421 ch",
      topSpeed: "270 km/h",
      acceleration: "3.9 secondes",
      seats: 5
    },
    features: [
      "Système 4MATIC+ à transmission intégrale",
      "Système d'échappement AMG Performance",
      "Suspension AMG RIDE CONTROL",
      "Sièges baquets AMG Performance",
      "Système MBUX avec écran tactile",
      "Mode Drift",
      "Jantes AMG 19 pouces",
      "Système de freinage hautes performances"
    ],
    images: [
      "/images/A45 S.jpeg"
    ]
  },
  {
    id: 6,
    name: "Urus S",
    brand: "Lamborghini",
    year: 2023,
    price: 1800,
    caution: 15000,
    type: "SUV",
    available: true,
    description: "Le Lamborghini Urus S est un Super SUV qui redéfinit les règles du segment. Alliant les performances d'une supercar au côté pratique d'un SUV, il offre une expérience de conduite exaltante avec un style distinctif et une présence imposante.",
    specifications: {
      engine: "V8 4.0L Biturbo",
      transmission: "Automatique 8 vitesses",
      power: "666 ch",
      topSpeed: "305 km/h",
      acceleration: "3.5 secondes",
      seats: 5
    },
    features: [
      "Modes de conduite ANIMA",
      "Système audio Bang & Olufsen 3D",
      "Freins carbone-céramique",
      "Suspension pneumatique adaptative",
      "Sièges sport ventilés et chauffants",
      "Système d'échappement sport",
      "Système d'infodivertissement à écran tactile",
      "Toit panoramique"
    ],
    images: [
     "/images/urus.jpeg"
    ]
  },
  {
    id: 7,
    name: "296 GTB",
    brand: "Ferrari",
    year: 2023,
    price: 2200,
    caution: 15000,
    type: "Supercar",
    available: true,
    description: "La Ferrari 296 GTB est une berlinette hybride qui révolutionne l'expérience de conduite Ferrari. Combinant un V6 biturbo avec un moteur électrique, elle offre des performances extraordinaires tout en réduisant son empreinte environnementale.",
    specifications: {
      engine: "V6 3.0L Biturbo + électrique",
      transmission: "Double embrayage 8 vitesses",
      power: "830 ch",
      topSpeed: "330 km/h",
      acceleration: "2.9 secondes",
      seats: 2
    },
    features: [
      "Système hybride rechargeable",
      "Mode de conduite 100% électrique",
      "Aérodynamique active",
      "Système de son JBL Professional",
      "Intérieur en Alcantara et carbone",
      "Système d'échappement sport en titane",
      "Freins carbone-céramique",
      "Suspension adaptative"
    ],
    images: [
      "/images/ferrari.jpeg"
    ]
  },
  {
    id: 8,
    name: "911 Carrera",
    brand: "Porsche",
    year: 2023,
    price: 1100,
    type: "Sportive",
    caution: 8000,
    available: true,
    description: "La Porsche 911 Carrera est l'incarnation de la sportivité intemporelle. Avec son moteur flat-six emblématique et sa maniabilité exceptionnelle, elle offre un équilibre parfait entre performances quotidiennes et capacités sur circuit.",
    specifications: {
      engine: "Flat-six 3.0L Turbo",
      transmission: "PDK 8 vitesses",
      power: "385 ch",
      topSpeed: "293 km/h",
      acceleration: "4.2 secondes",
      seats: 4
    },
    features: [
      "Porsche Active Suspension Management",
      "Système Porsche Communication Management",
      "Sièges sport adaptatifs",
      "Système audio BOSE Surround",
      "Mode Sport et Sport Plus",
      "Jantes Carrera S 20/21 pouces",
      "Phares LED Matrix",
      "Freins performants"
    ],
    images: [
    "/images/911.jpeg"
    ]
  },
  {
    id: 9,
    name: "Huracán Spyder EVO",
    brand: "Lamborghini",
    year: 2023,
    price: 2500,
    caution: 15000,
    type: "Supercar",
    available: true,
    description: "La Lamborghini Huracán Spyder EVO combine le frisson de la conduite à ciel ouvert avec les performances légendaires de Lamborghini. Son design aérodynamique et son V10 atmosphérique offrent une expérience sensorielle incomparable.",
    specifications: {
      engine: "V10 5.2L atmosphérique",
      transmission: "Double embrayage 7 vitesses",
      power: "640 ch",
      topSpeed: "325 km/h",
      acceleration: "3.1 secondes",
      seats: 2
    },
    features: [
      "Toit rétractable électrique en 17 secondes",
      "Système LDVI (Lamborghini Dinamica Veicolo Integrata)",
      "Modes de conduite ANIMA",
      "Système d'échappement sport",
      "Intérieur en cuir et Alcantara",
      "Système d'infodivertissement avec navigation",
      "Aérodynamique active",
      "Freins carbone-céramique"
    ],
    images: [
     "/images/evo spyder .jpeg"
    ]
  },
  {
    id: 10,
    name: "RS6 ABT",
    brand: "Audi",
    year: 2023,
    price: 900,
    caution: 8000,
    type: "Break",
    available: true,
    description: "L'Audi RS6 ABT est un break de haute performance préparé par le célèbre préparateur ABT Sportsline. Combinant puissance extraordinaire, praticité quotidienne et technologie de pointe, elle offre des performances de supercar dans un format familial.",
    specifications: {
      engine: "V8 4.0L Biturbo",
      transmission: "Tiptronic 8 vitesses",
      power: "740 ch",
      topSpeed: "320 km/h",
      acceleration: "3.2 secondes",
      seats: 5
    },
    features: [
      "Kit carrosserie ABT aérodynamique",
      "Suspension pneumatique adaptive",
      "Système Audi Virtual Cockpit",
      "Système audio Bang & Olufsen Advanced",
      "Direction intégrale",
      "Système d'échappement sport ABT",
      "Sièges sport RS en cuir Valcona",
      "Jantes ABT 22 pouces"
    ],
    images: [
      "/images/rs6.jpeg"
    ]
  },
  {
    id: 11,
    name: "Classe G63 AMG",
    brand: "Mercedes",
    year: 2023,
    price: 1600,
    caution: 10000,
    type: "SUV",
    available: true,
    description: "Le Mercedes Classe G63 AMG est l'incarnation du luxe tout-terrain. Cette icône intemporelle combine des capacités off-road exceptionnelles avec les performances AMG et un niveau de luxe inégalé, créant un véhicule véritablement unique en son genre.",
    specifications: {
      engine: "V8 4.0L Biturbo",
      transmission: "Automatique 9G-TRONIC",
      power: "585 ch",
      topSpeed: "240 km/h",
      acceleration: "4.5 secondes",
      seats: 5
    },
    features: [
      "Trois blocages de différentiel",
      "Système d'échappement AMG Performance",
      "Intérieur designo en cuir Nappa",
      "Suspension AMG RIDE CONTROL",
      "Système MBUX à écran tactile",
      "Système audio Burmester",
      "Toit ouvrant électrique",
      "Assistance tout-terrain"
    ],
    images: [
      "/images/g63.jpeg"
    ]
  },
  {
    id: 12,
    name: "720S",
    brand: "McLaren",
    year: 2023,
    price: 2000,
    caution: 15000,
    type: "Supercar",
    available: true,
    description: "La McLaren 720S est une supercar qui repousse les limites de l'ingénierie automobile. Avec sa construction légère en carbone, son aérodynamique avancée et son moteur V8 biturbo, elle offre des performances à couper le souffle et une expérience de conduite pure.",
    specifications: {
      engine: "V8 4.0L Biturbo",
      transmission: "Double embrayage 7 vitesses",
      power: "720 ch",
      topSpeed: "341 km/h",
      acceleration: "2.9 secondes",
      seats: 2
    },
    features: [
      "Châssis Monocage II en carbone",
      "Portes papillon",
      "Suspension Proactive Chassis Control II",
      "Modes de conduite Comfort, Sport et Track",
      "Système d'échappement sport",
      "Système d'infodivertissement McLaren",
      "Freins carbone-céramique",
      "Aérodynamique active"
    ],
    images: [
      "/images/720S.jpeg"
    ]
  },
  {
    id: 13,
    name: "i8 Roadster",
    brand: "BMW",
    year: 2023,
    price: 800,
    caution: 8000,
    type: "Supercar",
    available: true,
    description: "La BMW i8 Roadster est une supercar hybride qui combine technologie de pointe, design futuriste et performance exceptionnelle. Avec son moteur hybride associant un moteur thermique et un moteur électrique, elle offre une expérience de conduite unique alliant puissance et efficacité.",
    specifications: {
      engine: "Moteur hybride 1.5L turbo + moteur électrique",
      transmission: "Transmission intégrale, 6 vitesses",
      power: "374 ch",
      topSpeed: "250 km/h",
      acceleration: "4.6 secondes (0-100 km/h)",
      seats: 2
    },
    features: [
      "Design futuriste avec portes à ouverture en élytre",
      "Système hybride plug-in",
      "Suspension adaptative",
      "Modes de conduite Comfort, Eco Pro et Sport",
      "Toit en tissu électriquement rétractable",
      "Système d'infodivertissement BMW iDrive",
      "Freins en carbone-céramique en option",
      "Aérodynamique active"
    ],
    images: [
      "/images/roadster.jpeg"
    ]
  },
  {
    id: 14,
    name: "Dawn",
    brand: "ROLLS ROYCE",
    year: 2023,
    price: 2200,
    caution: 30000,
    type: "Supercar",
    available: true,
    description: "La Rolls-Royce Dawn est un cabriolet de luxe alliant performance impressionnante et raffinement ultime. Ce modèle combine une puissance inégalée, une conduite fluide et une élégance intemporelle, tout en offrant une expérience de conduite ouverte et luxueuse pour les passionnés de voitures exceptionnelles.",
    specifications: {
      engine: "Moteur V12 6.6L Twin-Turbo",
      transmission: "Transmission automatique 8 vitesses",
      power: "563 ch",
      topSpeed: "250 km/h",
      acceleration: "4.9 secondes (0-100 km/h)",
      seats: 4
    },
    features: [
      "Design emblématique avec un toit rétractable en toile",
      "Système audio Bespoke de haute qualité",
      "Suspension pneumatique à régulation électronique",
      "Intérieur sur mesure avec matériaux de luxe",
      "Ecran d'infodivertissement tactile de dernière génération",
      "Freins en céramique haute performance",
      "Système de climatisation à trois zones",
      "Éclairage d'ambiance personnalisé"
    ],
    images: [
      "/images/rols royce.jpeg"
    ]
  },
  {
    id: 15,
    name: "S580",
    brand: "Mercedes",
    year: 2023,
    price: 800,
    caution: 6000,
    type: "Luxe Sedan",
    available: true,
    description: "La Mercedes-Benz S580 est une berline de luxe offrant une combinaison parfaite de confort, de performance et de technologie. Avec son moteur puissant, ses équipements haut de gamme et son design élégant, elle est conçue pour les conducteurs recherchant une expérience de conduite exceptionnelle, à la fois raffinée et dynamique.",
    specifications: {
      engine: "V8 4.0L Biturbo",
      transmission: "Transmission automatique 9 vitesses",
      power: "503 ch",
      topSpeed: "250 km/h",
      acceleration: "4.1 secondes (0-100 km/h)",
      seats: 5
    },
    features: [
      "Système MBUX avec écran tactile de 12,8 pouces",
      "Suspension pneumatique à régulation électronique AIRMATIC",
      "Intérieur cuir Nappa avec finitions bois de haute qualité",
      "Système audio Burmester haut de gamme",
      "Assistance à la conduite semi-autonome",
      "Toit panoramique en verre",
      "Éclairage d'ambiance adaptatif",
      "Système de climatisation à trois zones"
    ],
    images: [
      ""
    ]
  },
  {
    id: 16,
    name: "M135i",
    brand: "BMW",
    year: 2023,
    price: 200,
    caution: 4000,
    type: "Hatchback Sportif",
    available: true,
    description: "Le BMW M135i est une compacte sportive alliant performances dynamiques et technologie de pointe. Avec son moteur puissant et son design sportif, il offre une expérience de conduite agile et réactive, tout en conservant le confort et la qualité typiques de la marque BMW.",
    specifications: {
      engine: "Moteur 2.0L 4 cylindres turbo",
      transmission: "Transmission automatique 8 vitesses",
      power: "306 ch",
      topSpeed: "250 km/h",
      acceleration: "4.8 secondes (0-100 km/h)",
      seats: 5
    },
    features: [
      "Système d'infodivertissement iDrive avec écran tactile",
      "Suspension sport",
      "Système de freinage haute performance",
      "Design extérieur dynamique avec des éléments spécifiques M",
      "Volant sport M",
      "Système de conduite semi-autonome avec assistance au stationnement",
      "Éclairage d'ambiance personnalisé",
      "Jantes en alliage léger"
    ],
    images: [
      "/images/m135i.jpeg"
    ]
  },
  {
    id: 17,
    name: "8R",
    brand: "Volkswagen",
    year: 2023,
    price: 200,
    caution: 4000,
    type: "Hatchback Sportif",
    available: true,
    description: "La Volkswagen Golf 8R est une compacte sportive offrant des performances exceptionnelles et une conduite agile. Avec son moteur puissant, son design dynamique et ses technologies avancées, elle est conçue pour les amateurs de conduite sportive et de sensations fortes.",
    specifications: {
      engine: "Moteur 2.0L 4 cylindres turbo",
      transmission: "Transmission automatique 7 vitesses DSG",
      power: "320 ch",
      topSpeed: "250 km/h",
      acceleration: "4.7 secondes (0-100 km/h)",
      seats: 5
    },
    features: [
      "Système d'infodivertissement Discover Pro avec écran tactile",
      "Suspension sport adaptative",
      "Freins haute performance",
      "Design extérieur dynamique avec des éléments spécifiques R",
      "Volant sport avec commandes tactiles",
      "Système de conduite semi-autonome avec assistance au stationnement",
      "Éclairage d'ambiance personnalisable",
      "Jantes en alliage léger de 19 pouces"
    ],
    images: [
      "/images/golf r.jpeg"
    ]
  }
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+33123456789",
    bookings: []
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+33987654321",
    bookings: []
  }
];

export const bookings = [];
