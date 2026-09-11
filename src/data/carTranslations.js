// Traduções de conteúdo (descrição + destaques) de cada viatura, para
// espanhol, inglês e francês. A chave é o id do carro em cars.js. O
// português continua a viver em cars.js e serve de base/fallback.
const TRANSLATIONS = {
  1: {
    es: {
      descricao:
        "BMW Serie 3 320d en excelente estado de conservación, revisiones al día e historial completo. Equipado con paquete deportivo, llantas de aleación e interior de piel.",
      destaques: [
        "Un único propietario",
        "Historial de mantenimiento completo",
        'Llantas de aleación de 18"',
        "Interior de piel",
        "Navegación GPS",
        "Sensores de aparcamiento delanteros y traseros",
      ],
    },
    en: {
      descricao:
        "BMW 3 Series 320d in excellent condition, up-to-date servicing and full history. Equipped with a sport package, alloy wheels and leather interior.",
      destaques: [
        "Single owner",
        "Full maintenance history",
        '18" alloy wheels',
        "Leather interior",
        "GPS navigation",
        "Front and rear parking sensors",
      ],
    },
    fr: {
      descricao:
        "BMW Série 3 320d en excellent état, révisions à jour et historique complet. Équipée d'un pack sport, de jantes en alliage léger et d'un intérieur en cuir.",
      destaques: [
        "Un seul propriétaire",
        "Historique d'entretien complet",
        'Jantes en alliage léger 18"',
        "Intérieur en cuir",
        "Navigation GPS",
        "Capteurs de stationnement avant et arrière",
      ],
    },
  },
  2: {
    es: {
      descricao:
        "Mercedes-Benz Clase A elegante y económico, ideal para ciudad y viajes largos. Interior digital con el sistema MBUX y asistente de conducción.",
      destaques: [
        "Sistema multimedia MBUX",
        "Faros LED de alto rendimiento",
        "Cámara de marcha atrás",
        "Aire acondicionado automático bizona",
        "Apple CarPlay / Android Auto",
      ],
    },
    en: {
      descricao:
        "Elegant and economical Mercedes-Benz A-Class, ideal for city driving and long trips. Digital interior with the MBUX system and driving assistant.",
      destaques: [
        "MBUX multimedia system",
        "High-performance LED headlights",
        "Reversing camera",
        "Dual-zone automatic climate control",
        "Apple CarPlay / Android Auto",
      ],
    },
    fr: {
      descricao:
        "Mercedes-Benz Classe A élégante et économique, idéale pour la ville et les longs trajets. Intérieur numérique avec le système MBUX et assistant de conduite.",
      destaques: [
        "Système multimédia MBUX",
        "Phares LED haute performance",
        "Caméra de recul",
        "Climatisation automatique bizone",
        "Apple CarPlay / Android Auto",
      ],
    },
  },
  3: {
    es: {
      descricao:
        "Audi A4 Avant con muy pocos kilómetros, prácticamente como nuevo. Carrocería familiar con gran capacidad de maletero, ideal para quien busca espacio y confort.",
      destaques: [
        "Bajo kilometraje",
        "Aún en garantía de fábrica",
        "Virtual Cockpit digital",
        "Asientos con calefacción",
        "Sensores delanteros y traseros + cámara",
      ],
    },
    en: {
      descricao:
        "Audi A4 Avant with very low mileage, practically like new. Estate bodystyle with large boot capacity, ideal for those seeking space and comfort.",
      destaques: [
        "Low mileage",
        "Still under factory warranty",
        "Digital Virtual Cockpit",
        "Heated seats",
        "Front and rear sensors + camera",
      ],
    },
    fr: {
      descricao:
        "Audi A4 Avant avec un kilométrage très faible, pratiquement comme neuve. Carrosserie break avec un grand coffre, idéale pour ceux qui recherchent espace et confort.",
      destaques: [
        "Faible kilométrage",
        "Encore sous garantie constructeur",
        "Virtual Cockpit numérique",
        "Sièges chauffants",
        "Capteurs avant et arrière + caméra",
      ],
    },
  },
  4: {
    es: {
      descricao:
        "Volkswagen Golf, uno de los modelos más fiables y solicitados del mercado. Motor de gasolina eficiente, ideal para el uso diario.",
      destaques: [
        'Pantalla táctil de 8"',
        "Sensores de lluvia y luces automáticas",
        "Control de crucero adaptativo",
        "Llantas de aleación",
      ],
    },
    en: {
      descricao:
        "Volkswagen Golf, one of the most reliable and sought-after models on the market. Efficient petrol engine, great for daily use.",
      destaques: [
        '8" touchscreen',
        "Rain sensor and automatic lights",
        "Adaptive cruise control",
        "Alloy wheels",
      ],
    },
    fr: {
      descricao:
        "Volkswagen Golf, l'un des modèles les plus fiables et recherchés du marché. Moteur essence efficace, idéal pour un usage quotidien.",
      destaques: [
        "Écran tactile de 8 pouces",
        "Capteur de pluie et feux automatiques",
        "Régulateur de vitesse adaptatif",
        "Jantes en alliage léger",
      ],
    },
  },
  5: {
    es: {
      descricao:
        "Renault Clio prácticamente nuevo, con un kilometraje muy reducido. Excelente opción como primer coche o para uso urbano.",
      destaques: [
        "Casi sin uso — 8.000 km",
        "Aún en garantía de fábrica",
        "Pantalla multimedia Easy Link",
        "Sensores de aparcamiento traseros",
      ],
    },
    en: {
      descricao:
        "Renault Clio practically brand new, with very low mileage. Excellent option as a first car or for city use.",
      destaques: [
        "Barely used — 8,000 km",
        "Still under factory warranty",
        "Easy Link multimedia screen",
        "Rear parking sensors",
      ],
    },
    fr: {
      descricao:
        "Renault Clio pratiquement neuve, avec un kilométrage très réduit. Excellente option comme première voiture ou pour un usage urbain.",
      destaques: [
        "Quasiment neuve — 8 000 km",
        "Encore sous garantie constructeur",
        "Écran multimédia Easy Link",
        "Capteurs de stationnement arrière",
      ],
    },
  },
  6: {
    es: {
      descricao:
        "Peugeot 3008 SUV, espacioso y confortable, con el premiado i-Cockpit. Gran opción para familias que buscan más espacio sin renunciar al confort.",
      destaques: [
        "SUV con buen espacio interior",
        "i-Cockpit digital",
        "Cámara de marcha atrás 180º",
        "Techo panorámico",
        "Asistente de mantenimiento de carril",
      ],
    },
    en: {
      descricao:
        "Peugeot 3008 SUV, spacious and comfortable, with the award-winning i-Cockpit. Great option for families looking for more space without giving up comfort.",
      destaques: [
        "SUV with generous interior space",
        "Digital i-Cockpit",
        "180º reversing camera",
        "Panoramic sunroof",
        "Lane keep assist",
      ],
    },
    fr: {
      descricao:
        "Peugeot 3008, SUV spacieux et confortable, avec l'i-Cockpit primé. Excellente option pour les familles qui recherchent plus d'espace sans renoncer au confort.",
      destaques: [
        "SUV avec un bon espace intérieur",
        "i-Cockpit numérique",
        "Caméra de recul à 180°",
        "Toit panoramique",
        "Assistant de maintien dans la voie",
      ],
    },
  },
  7: {
    es: {
      descricao:
        "Tesla Model 3 con tracción total y gran autonomía. Piloto automático de serie, actualizaciones Over-The-Air y acceso a la red de cargadores Supercharger.",
      destaques: [
        "Tracción total (doble motor)",
        "Piloto automático incluido",
        'Pantalla central de 15"',
        "Carga rápida Supercharger",
        "Actualizaciones de software automáticas",
      ],
    },
    en: {
      descricao:
        "Tesla Model 3 with all-wheel drive and long range. Autopilot included as standard, Over-The-Air updates and access to the Supercharger network.",
      destaques: [
        "All-wheel drive (dual motor)",
        "Autopilot included",
        '15" central touchscreen',
        "Supercharger fast charging",
        "Automatic software updates",
      ],
    },
    fr: {
      descricao:
        "Tesla Model 3 avec transmission intégrale et grande autonomie. Pilote automatique de série, mises à jour Over-The-Air et accès au réseau de chargeurs Supercharger.",
      destaques: [
        "Transmission intégrale (double moteur)",
        "Pilote automatique inclus",
        "Écran central de 15 pouces",
        "Charge rapide Supercharger",
        "Mises à jour logicielles automatiques",
      ],
    },
  },
  8: {
    es: {
      descricao:
        "Porsche 911 Carrera, un icono deportivo mantenido con el máximo cuidado. Revisiones siempre en concesionario oficial, sin antecedentes de accidentes.",
      destaques: [
        "Historial 100% en concesionario oficial",
        "Asientos deportivos de piel",
        "Sistema de escape deportivo",
        "Llantas exclusivas Porsche",
        "Suspensión adaptativa PASM",
      ],
    },
    en: {
      descricao:
        "Porsche 911 Carrera, a sports icon kept in immaculate condition. Always serviced at an official dealer, no accident history.",
      destaques: [
        "100% official dealer service history",
        "Leather sport seats",
        "Sport exhaust system",
        "Exclusive Porsche wheels",
        "PASM adaptive suspension",
      ],
    },
    fr: {
      descricao:
        "Porsche 911 Carrera, une icône sportive entretenue avec le plus grand soin. Révisions toujours effectuées chez un concessionnaire officiel, sans antécédent d'accident.",
      destaques: [
        "Historique 100% chez un concessionnaire officiel",
        "Sièges sport en cuir",
        "Système d'échappement sport",
        "Jantes exclusives Porsche",
        "Suspension adaptative PASM",
      ],
    },
  },
  9: {
    es: {
      descricao:
        "Ford Focus equilibrado entre confort y economía, motor 1.0 EcoBoost eficiente. Excelente opción para la conducción diaria en ciudad y autopista.",
      destaques: [
        "Motor EcoBoost premiado internacionalmente",
        "Ford SYNC con Apple CarPlay/Android Auto",
        "Sensores de aparcamiento traseros",
        "Control de crucero",
      ],
    },
    en: {
      descricao:
        "Ford Focus, a balance of comfort and economy with an efficient 1.0 EcoBoost engine. Excellent choice for daily driving in the city and on the motorway.",
      destaques: [
        "Internationally award-winning EcoBoost engine",
        "Ford SYNC with Apple CarPlay/Android Auto",
        "Rear parking sensors",
        "Cruise control",
      ],
    },
    fr: {
      descricao:
        "Ford Focus, un équilibre entre confort et économie, avec un moteur 1.0 EcoBoost efficace. Excellente option pour une conduite quotidienne en ville et sur autoroute.",
      destaques: [
        "Moteur EcoBoost primé à l'international",
        "Ford SYNC avec Apple CarPlay/Android Auto",
        "Capteurs de stationnement arrière",
        "Régulateur de vitesse",
      ],
    },
  },
  10: {
    es: {
      descricao:
        "Toyota Corolla Híbrido, fiabilidad legendaria y un consumo muy reducido en ciudad. Ideal para quien busca bajos costes de mantenimiento a largo plazo.",
      destaques: [
        "Tecnología híbrida Toyota consagrada",
        "Toyota Safety Sense (asistentes de conducción)",
        "Consumo muy bajo en ciudad",
        "Garantía ampliada de la batería híbrida",
      ],
    },
    en: {
      descricao:
        "Toyota Corolla Hybrid, legendary reliability and very low city consumption. Ideal for those seeking low long-term maintenance costs.",
      destaques: [
        "Toyota's proven hybrid technology",
        "Toyota Safety Sense (driving assistants)",
        "Very low city fuel consumption",
        "Extended hybrid battery warranty",
      ],
    },
    fr: {
      descricao:
        "Toyota Corolla Hybride, fiabilité légendaire et consommation très réduite en ville. Idéale pour ceux qui recherchent de faibles coûts d'entretien à long terme.",
      destaques: [
        "Technologie hybride Toyota éprouvée",
        "Toyota Safety Sense (assistants de conduite)",
        "Consommation en ville très faible",
        "Garantie étendue de la batterie hybride",
      ],
    },
  },
  11: {
    es: {
      descricao:
        "Fiat 500 con un estilo inconfundible, ideal para ciudad. Kilometraje muy bajo y consumo reducido gracias al sistema mild-hybrid.",
      destaques: [
        "Diseño icónico italiano",
        "Sistema mild-hybrid",
        "Muy fácil de aparcar",
        "Aire acondicionado automático",
      ],
    },
    en: {
      descricao:
        "Fiat 500 with unmistakable style, ideal for the city. Very low mileage and reduced consumption thanks to the mild-hybrid system.",
      destaques: [
        "Iconic Italian design",
        "Mild-hybrid system",
        "Very easy to park",
        "Automatic air conditioning",
      ],
    },
    fr: {
      descricao:
        "Fiat 500 au style incomparable, idéale pour la ville. Kilométrage très faible et consommation réduite grâce au système mild-hybrid.",
      destaques: [
        "Design italien iconique",
        "Système mild-hybrid",
        "Très facile à garer",
        "Climatisation automatique",
      ],
    },
  },
  12: {
    es: {
      descricao:
        "Nissan Qashqai, uno de los SUV compactos más vendidos en Europa. Espacio, visibilidad y confort para toda la familia.",
      destaques: [
        "ProPILOT (asistente de conducción semiautónomo)",
        "Cámara 360º",
        "Portón eléctrico",
        "Pantalla multimedia con navegación",
      ],
    },
    en: {
      descricao:
        "Nissan Qashqai, one of the best-selling compact SUVs in Europe. Space, visibility and comfort for the whole family.",
      destaques: [
        "ProPILOT (semi-autonomous driving assistant)",
        "360º camera",
        "Electric tailgate",
        "Multimedia screen with navigation",
      ],
    },
    fr: {
      descricao:
        "Nissan Qashqai, l'un des SUV compacts les plus vendus en Europe. Espace, visibilité et confort pour toute la famille.",
      destaques: [
        "ProPILOT (assistant de conduite semi-autonome)",
        "Caméra à 360°",
        "Hayon électrique",
        "Écran multimédia avec navigation",
      ],
    },
  },
  13: {
    es: {
      descricao:
        "Kia Sportage con diseño moderno y un generoso espacio interior. Cuenta además con la garantía de fábrica Kia, una de las más largas del mercado.",
      destaques: [
        "Aún cubierto por la garantía de fábrica Kia",
        "Cuadro de instrumentos totalmente digital",
        "Asientos con calefacción y ventilación",
        "Asistente de mantenimiento de carril",
      ],
    },
    en: {
      descricao:
        "Kia Sportage with modern design and generous interior space. Still benefits from Kia's factory warranty, one of the longest in the market.",
      destaques: [
        "Still covered by Kia's factory warranty",
        "Fully digital instrument cluster",
        "Heated and ventilated seats",
        "Lane keep assist",
      ],
    },
    fr: {
      descricao:
        "Kia Sportage au design moderne et à l'espace intérieur généreux. Bénéficie encore de la garantie constructeur Kia, l'une des plus longues du marché.",
      destaques: [
        "Encore couvert par la garantie constructeur Kia",
        "Tableau de bord entièrement numérique",
        "Sièges chauffants et ventilés",
        "Assistant de maintien dans la voie",
      ],
    },
  },
  14: {
    es: {
      descricao:
        "Citroën C3 compacto y confortable, con suspensión de Amortiguadores de Recorrido Progresivo para mayor confort en firmes irregulares.",
      destaques: [
        "Suspensión Progressive Hydraulic Cushions",
        "Asientos Advanced Comfort",
        'Pantalla táctil de 7"',
        "Sensores de aparcamiento traseros",
      ],
    },
    en: {
      descricao:
        "Compact and comfortable Citroën C3, with Progressive Hydraulic Cushion suspension for greater comfort on uneven roads.",
      destaques: [
        "Progressive Hydraulic Cushions suspension",
        "Advanced Comfort seats",
        '7" touchscreen',
        "Rear parking sensors",
      ],
    },
    fr: {
      descricao:
        "Citroën C3 compacte et confortable, avec une suspension à Amortisseurs à Butée Hydraulique Progressive pour plus de confort sur route irrégulière.",
      destaques: [
        "Suspension Progressive Hydraulic Cushions",
        "Sièges Advanced Comfort",
        "Écran tactile de 7 pouces",
        "Capteurs de stationnement arrière",
      ],
    },
  },
  15: {
    es: {
      descricao:
        "BYD Atto 3, SUV eléctrico con buena autonomía y un interior muy bien equipado. Garantía de fábrica ampliada en la batería.",
      destaques: [
        "Autonomía superior a 400 km",
        "Garantía ampliada de la batería",
        "Interior premium con detalles exclusivos",
        "Carga rápida DC",
      ],
    },
    en: {
      descricao:
        "BYD Atto 3, an electric SUV with good range and a very well-equipped interior. Extended factory warranty on the battery.",
      destaques: [
        "Range of over 400 km",
        "Extended battery warranty",
        "Premium interior with exclusive details",
        "DC fast charging",
      ],
    },
    fr: {
      descricao:
        "BYD Atto 3, SUV électrique avec une bonne autonomie et un intérieur très bien équipé. Garantie constructeur étendue sur la batterie.",
      destaques: [
        "Autonomie supérieure à 400 km",
        "Garantie de batterie étendue",
        "Intérieur premium avec finitions exclusives",
        "Charge rapide DC",
      ],
    },
  },
  16: {
    es: {
      descricao:
        "Volvo XC60, referencia en seguridad y confort. Interior escandinavo de gran calidad y sistema mild-hybrid para mayor eficiencia.",
      destaques: [
        "Paquete de seguridad Volvo completo",
        "Asientos de cuero con calefacción",
        "Sistema de sonido Harman Kardon",
        "Techo panorámico",
      ],
    },
    en: {
      descricao:
        "Volvo XC60, a benchmark in safety and comfort. High-quality Scandinavian interior and a mild-hybrid system for greater efficiency.",
      destaques: [
        "Full Volvo safety package",
        "Heated leather seats",
        "Harman Kardon sound system",
        "Panoramic sunroof",
      ],
    },
    fr: {
      descricao:
        "Volvo XC60, une référence en matière de sécurité et de confort. Intérieur scandinave de grande qualité et système mild-hybrid pour plus d'efficacité.",
      destaques: [
        "Pack de sécurité Volvo complet",
        "Sièges en cuir chauffants",
        "Système audio Harman Kardon",
        "Toit panoramique",
      ],
    },
  },
  17: {
    es: {
      descricao:
        "Polestar 2, eléctrico de alto rendimiento con tracción total y un acabado minimalista escandinavo. Sistema de infoentretenimiento Android nativo.",
      destaques: [
        "Tracción total con doble motor",
        "Android Automotive nativo con Google integrado",
        "Asientos veganos en WeaveTech",
        "Suspensión deportiva Öhlins (ajustable)",
      ],
    },
    en: {
      descricao:
        "Polestar 2, a high-performance electric car with all-wheel drive and minimalist Scandinavian finish. Native Android infotainment system.",
      destaques: [
        "All-wheel drive with dual motor",
        "Native Android Automotive with Google built in",
        "Vegan WeaveTech seats",
        "Öhlins sport suspension (adjustable)",
      ],
    },
    fr: {
      descricao:
        "Polestar 2, véhicule électrique haute performance à transmission intégrale et finition minimaliste scandinave. Système d'infodivertissement Android natif.",
      destaques: [
        "Transmission intégrale à double moteur",
        "Android Automotive natif avec Google intégré",
        "Sièges vegan en WeaveTech",
        "Suspension sport Öhlins (réglable)",
      ],
    },
  },
  18: {
    es: {
      descricao:
        "Mini Cooper S, estilo británico inconfundible con una conducción ágil y divertida. Bajo kilometraje y muy bien equipado.",
      destaques: [
        "Motor 2.0 turbo de 178 cv",
        'Llantas exclusivas de 17"',
        "Techo en contraste",
        "Pantalla multimedia con Apple CarPlay",
      ],
    },
    en: {
      descricao:
        "Mini Cooper S, unmistakable British style with agile and fun driving. Low mileage and very well equipped.",
      destaques: [
        "2.0 turbo engine with 178 hp",
        '17" exclusive wheels',
        "Contrast roof",
        "Multimedia screen with Apple CarPlay",
      ],
    },
    fr: {
      descricao:
        "Mini Cooper S, style britannique incomparable avec une conduite agile et amusante. Faible kilométrage et très bien équipée.",
      destaques: [
        "Moteur 2.0 turbo de 178 ch",
        "Jantes exclusives de 17 pouces",
        "Toit contrasté",
        "Écran multimédia avec Apple CarPlay",
      ],
    },
  },
  19: {
    es: {
      descricao:
        "Jaguar F-Pace, SUV deportivo con el ADN de conducción típico de la marca británica. Interior de piel y acabados de gran calidad.",
      destaques: [
        "Interior de piel premium",
        "Sistema de sonido Meridian",
        "Tracción total inteligente",
        "Asientos con calefacción delanteros y traseros",
      ],
    },
    en: {
      descricao:
        "Jaguar F-Pace, a sporty SUV with the driving DNA typical of the British brand. Leather interior and high-quality finishes.",
      destaques: [
        "Premium leather interior",
        "Meridian sound system",
        "Intelligent all-wheel drive",
        "Front and rear heated seats",
      ],
    },
    fr: {
      descricao:
        "Jaguar F-Pace, SUV sportif avec l'ADN de conduite typique de la marque britannique. Intérieur en cuir et finitions de grande qualité.",
      destaques: [
        "Intérieur en cuir premium",
        "Système audio Meridian",
        "Transmission intégrale intelligente",
        "Sièges chauffants avant et arrière",
      ],
    },
  },
  20: {
    es: {
      descricao:
        "Ford Mustang GT con el icónico motor V8 5.0 atmosférico. Un clásico americano moderno, mantenido con mucho cuidado.",
      destaques: [
        "Motor V8 5.0 atmosférico",
        "Escape activo deportivo",
        "Asientos Recaro de piel",
        "Modo de conducción Track",
      ],
    },
    en: {
      descricao:
        "Ford Mustang GT with the iconic naturally aspirated 5.0 V8 engine. A modern American classic, kept in immaculate condition.",
      destaques: [
        "Naturally aspirated 5.0 V8 engine",
        "Active sport exhaust",
        "Recaro leather seats",
        "Track driving mode",
      ],
    },
    fr: {
      descricao:
        "Ford Mustang GT avec l'emblématique moteur V8 5.0 atmosphérique. Un classique américain moderne, entretenu avec le plus grand soin.",
      destaques: [
        "Moteur V8 5.0 atmosphérique",
        "Échappement sport actif",
        "Sièges Recaro en cuir",
        "Mode de conduite Track",
      ],
    },
  },
  21: {
    es: {
      descricao:
        "Cupra Formentor VZ, SUV coupé deportivo con carácter propio. Tracción total y frenos Brembo para una conducción muy envolvente.",
      destaques: [
        "Tracción total 4Drive",
        "Frenos Brembo",
        "Asientos deportivos en Dinamica",
        "Modo de conducción Cupra",
      ],
    },
    en: {
      descricao:
        "Cupra Formentor VZ, a sporty coupé-SUV with real character. All-wheel drive and Brembo brakes for a very engaging drive.",
      destaques: [
        "4Drive all-wheel drive",
        "Brembo brakes",
        "Dinamica sport seats",
        "Cupra driving mode",
      ],
    },
    fr: {
      descricao:
        "Cupra Formentor VZ, SUV coupé sportif au caractère unique. Transmission intégrale et freins Brembo pour une conduite très engageante.",
      destaques: [
        "Transmission intégrale 4Drive",
        "Freins Brembo",
        "Sièges sport en Dinamica",
        "Mode de conduite Cupra",
      ],
    },
  },
  22: {
    es: {
      descricao:
        "Mercedes-Benz E 300 de, híbrido enchufable diésel que combina la eficiencia eléctrica en ciudad con la autonomía del diésel en viaje. Confort y tecnología al nivel esperado de la Clase E.",
      destaques: [
        "Híbrido enchufable diésel (motor + eléctrico)",
        "Hasta 25 km solo en modo eléctrico",
        "Suspensión neumática AIRMATIC",
        "MBUX con pantalla doble",
        "Carga en enchufe doméstico o wallbox",
      ],
    },
    en: {
      descricao:
        "Mercedes-Benz E 300 de, a diesel plug-in hybrid that combines electric efficiency in the city with diesel range on long trips. Comfort and technology at the level expected from the E-Class.",
      destaques: [
        "Diesel plug-in hybrid (engine + electric)",
        "Up to 25 km in electric-only mode",
        "AIRMATIC air suspension",
        "MBUX with dual screen",
        "Charging via home socket or wallbox",
      ],
    },
    fr: {
      descricao:
        "Mercedes-Benz E 300 de, hybride rechargeable diesel qui allie l'efficacité de l'électrique en ville à l'autonomie du diesel sur route. Confort et technologie au niveau attendu de la Classe E.",
      destaques: [
        "Hybride rechargeable diesel (moteur + électrique)",
        "Jusqu'à 25 km en mode 100% électrique",
        "Suspension pneumatique AIRMATIC",
        "MBUX avec double écran",
        "Charge sur prise domestique ou wallbox",
      ],
    },
  },
  25: {
    es: {
      descricao:
        "Mercedes-Benz Clase C 220d con el paquete AMG Line, elegante y deportivo. Excelente relación entre confort, tecnología y consumo.",
      destaques: [
        "Paquete exterior e interior AMG Line",
        "MBUX con pantalla de gran tamaño",
        "Faros Multibeam LED",
        "Asientos delanteros con calefacción",
      ],
    },
    en: {
      descricao:
        "Mercedes-Benz C-Class 220d with the AMG Line package, elegant and sporty. Excellent balance of comfort, technology and fuel consumption.",
      destaques: [
        "AMG Line exterior and interior package",
        "MBUX with large display",
        "Multibeam LED headlights",
        "Heated front seats",
      ],
    },
    fr: {
      descricao:
        "Mercedes-Benz Classe C 220d avec le pack AMG Line, élégante et sportive. Excellent équilibre entre confort, technologie et consommation.",
      destaques: [
        "Pack extérieur et intérieur AMG Line",
        "MBUX avec grand écran",
        "Phares Multibeam LED",
        "Sièges avant chauffants",
      ],
    },
  },
  27: {
    es: {
      descricao:
        "Porsche Taycan 4S, el deportivo 100% eléctrico de Porsche. Prácticamente nuevo, combina la aceleración instantánea de un eléctrico con el ADN de conducción Porsche.",
      destaques: [
        "Tracción total con doble motor",
        "Arquitectura de 800V — carga ultrarrápida",
        "Suspensión neumática adaptativa",
        "Porsche Communication Management",
      ],
    },
    en: {
      descricao:
        "Porsche Taycan 4S, Porsche's fully electric sports car. Practically brand new, combining the instant acceleration of an EV with genuine Porsche driving DNA.",
      destaques: [
        "All-wheel drive with dual motor",
        "800V architecture — ultra-fast charging",
        "Adaptive air suspension",
        "Porsche Communication Management",
      ],
    },
    fr: {
      descricao:
        "Porsche Taycan 4S, la sportive 100% électrique de Porsche. Pratiquement neuve, elle allie l'accélération instantanée d'une électrique à l'ADN de conduite Porsche.",
      destaques: [
        "Transmission intégrale à double moteur",
        "Architecture 800V — charge ultra-rapide",
        "Suspension pneumatique adaptative",
        "Porsche Communication Management",
      ],
    },
  },
  28: {
    es: {
      descricao:
        "Porsche 911 Carrera 4S, prácticamente nuevo, con tracción total. El icono deportivo de Porsche en su versión más equilibrada entre rendimiento y uso diario.",
      destaques: [
        "Tracción total (Carrera 4)",
        "Suspensión deportiva PASM",
        "Frenos de disco perforados",
        "Asientos deportivos de piel",
      ],
    },
    en: {
      descricao:
        "Porsche 911 Carrera 4S, practically brand new, with all-wheel drive. Porsche's sports icon in its most balanced version between performance and everyday use.",
      destaques: [
        "All-wheel drive (Carrera 4)",
        "PASM sport suspension",
        "Perforated disc brakes",
        "Leather sport seats",
      ],
    },
    fr: {
      descricao:
        "Porsche 911 Carrera 4S, pratiquement neuve, à transmission intégrale. L'icône sportive de Porsche dans sa version la plus équilibrée entre performance et usage quotidien.",
      destaques: [
        "Transmission intégrale (Carrera 4)",
        "Suspension sport PASM",
        "Freins à disques perforés",
        "Sièges sport en cuir",
      ],
    },
  },
};

export default TRANSLATIONS;
