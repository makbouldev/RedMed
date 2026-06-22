import React from "react";

const defaultCategoriesData = [
  {
    name: "T-Shirts",
    key: "T-Shirts",
    tagline: "COTON LOURD / COUPE BOXY",
    image: "/bg_tshirts.png",
    desc: "Découvrez nos t-shirts de coupe oversized lourde conçus pour un tombé streetwear authentique."
  },
  {
    name: "Pantalons",
    key: "Pants",
    tagline: "UTILITAIRE TACTIQUE / COUPE RELÂCHÉE",
    image: "/bg_pants.png",
    desc: "Explorez nos pantalons cargos tactiques avec poches à soufflet et chevilles ajustables."
  },
  {
    name: "Baskets",
    key: "Sneakers",
    tagline: "PLATEFORMES ÉPAISSES / CUIR PREMIUM",
    image: "/bg_sneakers.png",
    desc: "Affirmez votre style avec nos sneakers plateforme à haut amorti fabriquées en cuir de qualité."
  },
  {
    name: "Accessoires",
    key: "Accessories",
    tagline: "SERGÉ LAVÉ / CASQUETTES AJUSTABLES",
    image: "/bg_accessories.png",
    desc: "Complétez votre silhouette avec nos casquettes rétro minimalistes en coton sergé délavé."
  }
];

export default function CategoriesPage({ onCategorySelect }) {
  const categoriesList = React.useMemo(() => {
    const saved = localStorage.getItem("redmed_categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(c => {
          let key = c.name;
          if (c.name === "Pantalons") key = "Pants";
          if (c.name === "Baskets") key = "Sneakers";
          if (c.name === "Accessoires") key = "Accessories";
          
          return {
            name: c.name,
            key: key,
            tagline: c.tagline,
            image: c.image,
            desc: c.desc
          };
        });
      } catch (e) {
        console.error(e);
      }
    }
    return defaultCategoriesData;
  }, []);

  return (
    <div className="categories-page animate-fade-in">
      <div className="container">
        <div className="categories-hero">
          <span className="categories-eyebrow">RedMed Collections</span>
          <h1 className="categories-main-title">Acheter par Catégorie</h1>
          <p className="categories-subtitle">
            Explorez nos pièces streetwear méticuleusement conçues, des coupes oversized aux accessoires haut de gamme.
          </p>
        </div>

        <div className="categories-grid-page">
          {categoriesList.map((cat) => (
            <div 
              key={cat.key} 
              className="category-page-card"
              onClick={() => onCategorySelect(cat.key)}
            >
              <div 
                className="category-page-card-bg"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="category-page-card-overlay" />
              <div className="category-page-card-content">
                <span className="category-page-card-tagline">{cat.tagline}</span>
                <h2 className="category-page-card-title">{cat.name}</h2>
                <p className="category-page-card-desc">{cat.desc}</p>
                <span className="category-page-card-btn">
                  Explorer la collection &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
