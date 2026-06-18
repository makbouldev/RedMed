export const products = [
  // 1. T-Shirts (category: "T-Shirts")
  {
    id: 1,
    name: "Oversized Tee / Mova Black",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/4b5f9d6062ee114476ac8fafb0d9f19e.jpg",
    hoverImage: "/products/tshirts/53f851e84db92524c89aa56a93cd4171.jpg",
    tag: "NEW",
    collection: "legacy",
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ],
    description: "Premium heavy cotton oversized t-shirt in deep carbon black. Features a boxy street silhouette, dropped shoulders, and premium raw edge details.",
    details: ["100% Cotton 280gsm", "Oversized boxy fit", "Ribbed crewneck", "Pre-shrunk finish"]
  },
  {
    id: 2,
    name: "Oversized Tee / Inspiration White",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/54109f437ad424782261735ce21a5508.jpg",
    hoverImage: "/products/tshirts/ab3e019f9efd706ae284e736096dbd84.jpg",
    tag: "BESTSELLER",
    collection: "legacy",
    sizes: [
      { size: "S", stock: 12 },
      { size: "M", stock: 18 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 }
    ],
    description: "Premium heavyweight white oversized t-shirt. A clean streetwear essential with a perfect drape and drop shoulders.",
    details: ["100% Premium Cotton", "Heavyweight 280gsm", "Thick neck ribbing", "Pre-shrunk finish"]
  },
  {
    id: 3,
    name: "Oversized Tee / Stitch Noir",
    category: "T-Shirts",
    price: "250 DH",
    numericPrice: 250,
    image: "/products/tshirts/7867b390d8362cc9e17da155d63b3743.jpg",
    hoverImage: "/products/tshirts/df648bea0a2dc2837d80475b410b7849.jpg",
    tag: "NEW",
    collection: "nate",
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 2 }
    ],
    description: "Vintage-washed heavy cotton oversized t-shirt in acid wash black. Gives an authentic retro streetwear feel.",
    details: ["Acid wash vintage finish", "Super heavy 300gsm cotton", "Distressed neck detailing", "Made in Morocco"]
  },
  {
    id: 4,
    name: "Oversized Tee / Peace Black",
    category: "T-Shirts",
    price: "220 DH",
    numericPrice: 220,
    image: "/products/tshirts/df648bea0a2dc2837d80475b410b7849.jpg",
    hoverImage: "/products/tshirts/4b5f9d6062ee114476ac8fafb0d9f19e.jpg",
    tag: "NEW",
    collection: "nate",
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 6 }
    ],
    description: "An essential oversized tee crafted from premium carded cotton. Perfect for layering in clean aesthetic fits.",
    details: ["Off-white natural tone", "Premium carded cotton", "Drop shoulders layout", "Breathable street design"]
  },

  // 2. Pants (category: "Pants")
  {
    id: 5,
    name: "Heavy Utility Cargo / Khaki Sand",
    category: "Pants",
    price: "380 DH",
    numericPrice: 380,
    image: "/prod_pants_cargo.png",
    hoverImage: "/prod_pants_cargo.png",
    tag: "NEW",
    collection: "legacy",
    sizes: [
      { size: "30", stock: 8 },
      { size: "32", stock: 12 },
      { size: "34", stock: 10 },
      { size: "36", stock: 6 }
    ],
    description: "Relaxed utility cargo pants in heavy sand cotton canvas. Features dual bellow side pockets, tactical straps, and adjustable cuffs.",
    details: ["100% Cotton Canvas", "Relaxed fit cargo profile", "Adjustable ankle cuffs", "Multi-pocket tactical design"]
  },
  {
    id: 6,
    name: "Wide Leg Cargo / Stealth Black",
    category: "Pants",
    price: "390 DH",
    numericPrice: 390,
    image: "/prod_pants_cargo.png",
    hoverImage: "/prod_pants_cargo.png",
    tag: "POPULAR",
    collection: "legacy",
    sizes: [
      { size: "30", stock: 5 },
      { size: "32", stock: 10 },
      { size: "34", stock: 12 },
      { size: "36", stock: 4 }
    ],
    description: "Modern wide-leg street cargo pants in stealth black. Highly durable tactical construction with reinforced knee panels.",
    details: ["Durable ripstop weave", "Wide leg street fit", "Reinforced knee joints", "Black hardware detailing"]
  },
  {
    id: 7,
    name: "Relaxed Fit Cargo / Army Green",
    category: "Pants",
    price: "380 DH",
    numericPrice: 380,
    image: "/prod_pants_cargo.png",
    hoverImage: "/prod_pants_cargo.png",
    tag: "NEW",
    collection: "nate",
    sizes: [
      { size: "30", stock: 6 },
      { size: "32", stock: 8 },
      { size: "34", stock: 12 },
      { size: "36", stock: 5 }
    ],
    description: "Classic utility cargo trousers in authentic army green wash. Designed with comfortable elastic waistband adjustments.",
    details: ["Vintage wash army green", "Adjustable comfort waist", "Deep tactical pockets", "Breathable cotton blend"]
  },
  {
    id: 8,
    name: "Street Jogger Pants / Heather Gray",
    category: "Pants",
    price: "350 DH",
    numericPrice: 350,
    image: "/prod_pants_cargo.png",
    hoverImage: "/prod_pants_cargo.png",
    tag: "BESTSELLER",
    collection: "nate",
    sizes: [
      { size: "30", stock: 10 },
      { size: "32", stock: 15 },
      { size: "34", stock: 8 },
      { size: "36", stock: 3 }
    ],
    description: "Heavyweight loopback french terry jogger pants in clean heather gray. Tailored for comfort in daily streetwear fits.",
    details: ["French terry heavy cotton", "Elastic drawstring waistband", "Ribbed ankle cuffs", "Stealth zipper side pockets"]
  },

  // 3. Sneakers (category: "Sneakers")
  {
    id: 9,
    name: "Retro Oversized Sneaker / Chalk White",
    category: "Sneakers",
    price: "480 DH",
    numericPrice: 480,
    image: "/prod_sneaker_white.png",
    hoverImage: "/prod_sneaker_black.png",
    tag: "POPULAR",
    collection: "legacy",
    sizes: [
      { size: "40", stock: 5 },
      { size: "41", stock: 8 },
      { size: "42", stock: 12 },
      { size: "43", stock: 9 },
      { size: "44", stock: 4 }
    ],
    description: "Luxury oversized chunky sneakers in white and cream leather. Designed with a structured platform rubber outsole and high-density foam padding.",
    details: ["Genuine leather panels", "Chunky platform sole", "Padded collar and tongue", "Made in Morocco"]
  },
  {
    id: 10,
    name: "Bold Platform Sneaker / Matte Black",
    category: "Sneakers",
    price: "480 DH",
    numericPrice: 480,
    image: "/prod_sneaker_black.png",
    hoverImage: "/prod_sneaker_white.png",
    tag: "NEW",
    collection: "legacy",
    sizes: [
      { size: "40", stock: 4 },
      { size: "41", stock: 6 },
      { size: "42", stock: 10 },
      { size: "43", stock: 8 },
      { size: "44", stock: 3 }
    ],
    description: "All-black premium leather platform sneakers. Exudes a bold dark streetwear aesthetic with high comfort orthotic inner soles.",
    details: ["Stealth matte black finish", "Chunky durable rubber sole", "Breathable mesh lining", "Custom orthotic footbed"]
  },
  {
    id: 11,
    name: "Luxury Runner Sneaker / Alabaster White",
    category: "Sneakers",
    price: "520 DH",
    numericPrice: 520,
    image: "/prod_sneaker_white.png",
    hoverImage: "/prod_sneaker_black.png",
    tag: "POPULAR",
    collection: "nate",
    sizes: [
      { size: "40", stock: 3 },
      { size: "41", stock: 7 },
      { size: "42", stock: 9 },
      { size: "43", stock: 5 },
      { size: "44", stock: 2 }
    ],
    description: "High-end luxury streetwear runners in clean alabaster white. Features premium leather overlays and custom branding details.",
    details: ["Alabaster white leather panels", "Slightly distressed panels", "Ultra-cushioned midsole", "Custom dust bag included"]
  },
  {
    id: 12,
    name: "Urban Street Sneaker / Stealth Black",
    category: "Sneakers",
    price: "499 DH",
    numericPrice: 499,
    image: "/prod_sneaker_black.png",
    hoverImage: "/prod_sneaker_white.png",
    tag: "NEW",
    collection: "nate",
    sizes: [
      { size: "40", stock: 4 },
      { size: "41", stock: 9 },
      { size: "42", stock: 11 },
      { size: "43", stock: 6 },
      { size: "44", stock: 3 }
    ],
    description: "Chunky platform trainers in full stealth black. Melds industrial utility styling with modern streetwear profiles.",
    details: ["Utility industrial profile", "Reinforced rubber platform", "High comfort padding", "Reflective detailing elements"]
  },

  // 4. Accessories (category: "Accessories")
  {
    id: 13,
    name: "Vintage Washed Cap / Off-Black",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/prod_acc_cap.png",
    hoverImage: "/prod_acc_cap.png",
    tag: "NEW",
    collection: "legacy",
    sizes: [{ size: "OS", stock: 20 }],
    description: "Classic 6-panel baseball cap crafted from vintage washed cotton twill. Adjustable clasp backing.",
    details: ["100% Cotton Twill", "Vintage wash effect", "Adjustable metal clasp strap", "One size fits most"]
  },
  {
    id: 14,
    name: "Street Baseball Cap / Carbon Gray",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/prod_acc_cap.png",
    hoverImage: "/prod_acc_cap.png",
    tag: "POPULAR",
    collection: "legacy",
    sizes: [{ size: "OS", stock: 15 }],
    description: "Heavy washed cotton grey baseball cap with minimalist street embroidery details.",
    details: ["Heavy grey washed cotton", "Embroidered front details", "Adjustable strap closure", "One size fits most"]
  },
  {
    id: 15,
    name: "Classic Utility Cap / Sand Beige",
    category: "Accessories",
    price: "160 DH",
    numericPrice: 160,
    image: "/prod_acc_cap.png",
    hoverImage: "/prod_acc_cap.png",
    tag: "NEW",
    collection: "nate",
    sizes: [{ size: "OS", stock: 12 }],
    description: "Tactical utility cap in sand beige wash. Designed with durable ripstop weaves.",
    details: ["Ripstop utility cotton", "Tactical back adjustment strap", "Low profile design", "Earth tone styling"]
  },
  {
    id: 16,
    name: "Retro Sports Cap / Forest Green",
    category: "Accessories",
    price: "150 DH",
    numericPrice: 150,
    image: "/prod_acc_cap.png",
    hoverImage: "/prod_acc_cap.png",
    tag: "BESTSELLER",
    collection: "nate",
    sizes: [{ size: "OS", stock: 18 }],
    description: "Athletic-inspired retro twill sports cap in forest green. Vintage clasp backing.",
    details: ["Retro collegiate styling", "Forest green washed cotton", "Breathable layout", "Adjustable strap closure"]
  }
];
