export const products = [
  // 1. T-Shirts (category: "T-Shirts")
  {
    id: 1,
    name: "T-shirt Oversized / Mova Noir",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/4b5f9d6062ee114476ac8fafb0d9f19e.jpg",
    hoverImage: "/products/tshirts/53f851e84db92524c89aa56a93cd4171.jpg",
    tag: "NOUVEAU",
    collection: "legacy",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ],
    description: "T-shirt oversized premium en coton lourd noir. Coupe droite moderne, épaules tombantes et finitions soignées.",
    details: ["100% Coton 280g/m²", "Coupe oversized boxy", "Col rond épais", "Prérétréci au lavage"]
  },
  {
    id: 2,
    name: "T-shirt Oversized / Inspiration Blanc",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/54109f437ad424782261735ce21a5508.jpg",
    hoverImage: "/products/tshirts/ab3e019f9efd706ae284e736096dbd84.jpg",
    tag: "POPULAIRE",
    collection: "legacy",
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 18 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ],
    description: "T-shirt oversized premium blanc. Un essentiel du streetwear avec un tombé parfait w tissu lourd de qualité.",
    details: ["100% Coton Premium", "Tissu lourd 280g/m²", "Col rond résistant", "Prérétréci au lavage"]
  },
  {
    id: 3,
    name: "T-shirt Oversized / Stitch Noir",
    category: "T-Shirts",
    price: "250 DH",
    numericPrice: 250,
    image: "/products/tshirts/7867b390d8362cc9e17da155d63b3743.jpg",
    hoverImage: "/products/tshirts/df648bea0a2dc2837d80475b410b7849.jpg",
    tag: "NOUVEAU",
    collection: "nate",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 2 }
    ],
    description: "T-shirt oversized délavé effet vintage. Coton super lourd pour un style streetwear authentique et décontracté.",
    details: ["Effet délavé vintage", "Coton super lourd 300g/m²", "Col légèrement usé", "Fabriqué au Maroc"]
  },
  {
    id: 4,
    name: "T-shirt Oversized / Peace Noir",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/df648bea0a2dc2837d80475b410b7849.jpg",
    hoverImage: "/products/tshirts/4b5f9d6062ee114476ac8fafb0d9f19e.jpg",
    tag: "NOUVEAU",
    collection: "nate",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ],
    description: "T-shirt oversized basique fabriqué en coton peigné. Idéal pour un look quotidien simple et épuré.",
    details: ["Coton peigné de qualité", "Épaules tombantes", "Coupe confortable", "Tissu respirant"]
  },

  // 2. Pants (category: "Pants")
  {
    id: 5,
    name: "Cargo Utility / Sable Kaki",
    category: "Pants",
    price: "380 DH",
    numericPrice: 380,
    image: "/products/pants/15934233a307f7318bc0d5caf7d54942.jpg",
    hoverImage: "/products/pants/1c1f9e5b6b21a5e15ebdb79bacb336c1.jpg",
    tag: "NOUVEAU",
    collection: "legacy",
    sizes: [
      { size: "30", stock: 8 },
      { size: "32", stock: 12 },
      { size: "34", stock: 10 },
      { size: "36", stock: 6 }
    ],
    description: "Pantalon cargo en toile de coton lourde couleur sable. Poches latérales, sangles tactiques et chevilles ajustables.",
    details: ["100% Toile de Coton", "Coupe cargo décontractée", "Chevilles ajustables", "Multiples poches pratiques"]
  },
  {
    id: 6,
    name: "Cargo Wide Leg / Noir Stealth",
    category: "Pants",
    price: "390 DH",
    numericPrice: 390,
    image: "/products/pants/1eb216b1c2ec1c173d166372bff6d7e8.jpg",
    hoverImage: "/products/pants/55886ac7ee238735db148f49ade9bc99.jpg",
    tag: "POPULAIRE",
    collection: "legacy",
    sizes: [
      { size: "30", stock: 5 },
      { size: "32", stock: 10 },
      { size: "34", stock: 12 },
      { size: "36", stock: 4 }
    ],
    description: "Pantalon cargo large noir. Tissu ripstop ultra-résistant avec renforts aux genoux pour un style techwear moderne.",
    details: ["Tissu Ripstop résistant", "Coupe large moderne", "Genoux renforcés", "Fermetures éclair noires"]
  },
  {
    id: 7,
    name: "Cargo Relaxed / Vert Armée",
    category: "Pants",
    price: "380 DH",
    numericPrice: 380,
    image: "/products/pants/b9141202664b694e897810d741ee1316.jpg",
    hoverImage: "/products/pants/fcfa9dfa90f6fcd926c4b05ea4796d74.jpg",
    tag: "NOUVEAU",
    collection: "nate",
    sizes: [
      { size: "30", stock: 6 },
      { size: "32", stock: 8 },
      { size: "34", stock: 12 },
      { size: "36", stock: 5 }
    ],
    description: "Pantalon cargo classique vert armée délavé. Taille élastique ajustable pour un confort maximal au quotidien.",
    details: ["Vert armée délavé", "Taille élastique ajustable", "Poches cargo profondes", "Mélange coton respirant"]
  },
  {
    id: 8,
    name: "Jogger Street / Gris Chine",
    category: "Pants",
    price: "350 DH",
    numericPrice: 350,
    image: "/products/pants/fcfa9dfa90f6fcd926c4b05ea4796d74.jpg",
    hoverImage: "/products/pants/15934233a307f7318bc0d5caf7d54942.jpg",
    tag: "MEILLEURE VENTE",
    collection: "nate",
    sizes: [
      { size: "30", stock: 10 },
      { size: "32", stock: 15 },
      { size: "34", stock: 8 },
      { size: "36", stock: 3 }
    ],
    description: "Jogging molletonné lourd gris chine de haute qualité. Conçu pour le confort et le style streetwear quotidien.",
    details: ["Molleton de coton lourd", "Taille élastique avec cordon", "Chevilles côtelées", "Poches zippées discrètes"]
  },

  // 3. Sneakers (category: "Sneakers")
  {
    id: 9,
    name: "Baskets Oversized / Blanc Craie",
    category: "Sneakers",
    price: "480 DH",
    numericPrice: 480,
    image: "/products/Shoes/145cd5f983da69b64148aa3999ac9a26.jpg",
    hoverImage: "/products/Shoes/6905a0b3390db9910d509aeabb24714c.jpg",
    tag: "POPULAIRE",
    collection: "legacy",
    sizes: [
      { size: "40", stock: 5 },
      { size: "41", stock: 8 },
      { size: "42", stock: 12 },
      { size: "43", stock: 9 },
      { size: "44", stock: 4 }
    ],
    description: "Baskets épaisses de luxe en cuir blanc et crème. Semelle plateforme en caoutchouc et mousse intérieure haute densité.",
    details: ["Empiècements en cuir véritable", "Semelle plateforme épaisse", "Languette et col rembourrés", "Fabriqué au Maroc"]
  },
  {
    id: 10,
    name: "Baskets Platform / Noir Mat",
    category: "Sneakers",
    price: "480 DH",
    numericPrice: 480,
    image: "/products/Shoes/83087cf23b081640bd4dbff288598dc3.jpg",
    hoverImage: "/products/Shoes/ab3d3f284e9577f8a8df83a0b599bb4f.jpg",
    tag: "NOUVEAU",
    collection: "legacy",
    sizes: [
      { size: "40", stock: 4 },
      { size: "41", stock: 6 },
      { size: "42", stock: 10 },
      { size: "43", stock: 8 },
      { size: "44", stock: 3 }
    ],
    description: "Baskets à plateforme en cuir noir mat premium. Design sombre et épuré avec semelles intérieures confortables.",
    details: ["Finition noir mat stealth", "Semelle en caoutchouc durable", "Doublure en mesh respirant", "Semelle intérieure confort"]
  },
  {
    id: 11,
    name: "Baskets Luxury Runner / Blanc Albâtre",
    category: "Sneakers",
    price: "520 DH",
    numericPrice: 520,
    image: "/products/Shoes/6905a0b3390db9910d509aeabb24714c.jpg",
    hoverImage: "/products/Shoes/145cd5f983da69b64148aa3999ac9a26.jpg",
    tag: "POPULAIRE",
    collection: "nate",
    sizes: [
      { size: "40", stock: 3 },
      { size: "41", stock: 7 },
      { size: "42", stock: 9 },
      { size: "43", stock: 5 },
      { size: "44", stock: 2 }
    ],
    description: "Baskets de course haut de gamme blanc albâtre. Cuir premium et finitions soignées.",
    details: ["Empiècements cuir véritable", "Effet légèrement délavé", "Semelle intermédiaire amortissante", "Sac de rangement inclus"]
  },
  {
    id: 12,
    name: "Baskets Urban Street / Noir Stealth",
    category: "Sneakers",
    price: "499 DH",
    numericPrice: 499,
    image: "/products/Shoes/ab3d3f284e9577f8a8df83a0b599bb4f.jpg",
    hoverImage: "/products/Shoes/83087cf23b081640bd4dbff288598dc3.jpg",
    tag: "NOUVEAU",
    collection: "nate",
    sizes: [
      { size: "40", stock: 4 },
      { size: "41", stock: 9 },
      { size: "42", stock: 11 },
      { size: "43", stock: 6 },
      { size: "44", stock: 3 }
    ],
    description: "Baskets à plateforme épaisses noires. Style industriel moderne et grand confort au quotidien.",
    details: ["Design industriel moderne", "Plateforme en caoutchouc renforcé", "Rembourrage grand confort", "Détails réfléchissants"]
  },

  // 4. Accessories (category: "Accessories")
  {
    id: 13,
    name: "Casquette Vintage / Noir Délavé",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/products/accesoires/24c379891bd0e28d042dc1be2666d95e.jpg",
    hoverImage: "/products/accesoires/4a129340e274be2960be95e0682d3630.jpg",
    tag: "NOUVEAU",
    collection: "legacy",
    sizes: [{ size: "TU", stock: 20 }],
    description: "Casquette classique à 6 panneaux en coton sergé délavé. Fermoir en métal ajustable à l'arrière.",
    details: ["100% Coton Sergé", "Effet délavé vintage", "Attache métallique ajustable", "Taille unique"]
  },
  {
    id: 14,
    name: "Casquette Street / Gris Carbone",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/products/accesoires/99aa76dcfe44c48c4530a5f6a9bbb142.jpg",
    hoverImage: "/products/accesoires/b1ad9a5a175b7f53c9e24979b13a9adb.jpg",
    tag: "POPULAIRE",
    collection: "legacy",
    sizes: [{ size: "TU", stock: 15 }],
    description: "Casquette en coton lourd gris délavé avec une broderie minimaliste sur le devant.",
    details: ["Coton lourd gris délavé", "Broderie minimaliste", "Fermeture réglable", "Taille unique"]
  },
  {
    id: 15,
    name: "Casquette Utility / Beige Sable",
    category: "Accessories",
    price: "160 DH",
    numericPrice: 160,
    image: "/products/accesoires/dcb481a8eff1b3ceb6b5b7a0e37d0da3.jpg",
    hoverImage: "/products/accesoires/4a129340e274be2960be95e0682d3630.jpg",
    tag: "NOUVEAU",
    collection: "nate",
    sizes: [{ size: "TU", stock: 12 }],
    description: "Casquette tactique beige sable. Tissu ripstop léger et résistant.",
    details: ["Coton Ripstop résistant", "Sangle de réglage tactique", "Design épuré", "Couleur terre naturelle"]
  },
  {
    id: 16,
    name: "Casquette Retro / Vert Forêt",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/products/accesoires/4a129340e274be2960be95e0682d3630.jpg",
    hoverImage: "/products/accesoires/24c379891bd0e28d042dc1be2666d95e.jpg",
    tag: "MEILLEURE VENTE",
    collection: "nate",
    sizes: [{ size: "TU", stock: 18 }],
    description: "Casquette rétro en coton sergé vert forêt. Fermoir en métal classique.",
    details: ["Style rétro vintage", "Coton délavé vert forêt", "Tissu respirant", "Fermeture réglable"]
  }
];
