import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useImageModal } from "@/components/ImageModal";
import { useEffect } from "react";

const galleryImages = [
  { 
    src: "/images/hero_perfume.jpg", 
    title: "Velours Noir", 
    category: "Ароматы" 
  },
  { 
    src: "/images/perfume_glass.jpg", 
    title: "Rose Éternelle", 
    category: "Коллекция" 
  },
  { 
    src: "/images/perfume_gold.jpg", 
    title: "Золотая коллекция", 
    category: "Флаконы" 
  },
  { 
    src: "/images/collection.jpg", 
    title: "Наша коллекция", 
    category: "Коллекция" 
  },
  { 
    src: "/images/perfume_crystal.jpg", 
    title: "Cristal Blanc", 
    category: "Флаконы" 
  },
  { 
    src: "/images/atelier.jpg", 
    title: "Наша мастерская", 
    category: "Ателье" 
  },
  { 
    src: "/images/ingredients.png", 
    title: "Ингредиенты", 
    category: "Процесс" 
  },
  { 
    src: "/images/making.webp", 
    title: "Создание аромата", 
    category: "Процесс" 
  },
  { 
    src: "/images/boutique.jpg", 
    title: "Наш бутик", 
    category: "Бутик" 
  },
  { 
    src: "/images/perfume_wood.jpg", 
    title: "Натуральные основы", 
    category: "Ингредиенты" 
  },
  { 
    src: "/images/oud.jpg", 
    title: "Уд — сердце Востока", 
    category: "Ингредиенты" 
  },
  { 
    src: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=1000&auto=format&fit=crop", 
    title: "Флаконы ручной работы", 
    category: "Флаконы" 
  },
];

export default function Gallery() {
  const { openModal } = useImageModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1510]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#a08878] tracking-widest uppercase text-xs mb-4 animate-in slide-in-from-bottom-4">Визуальный мир ароматов</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 animate-in slide-in-from-bottom-4 tracking-wide">Галерея</h1>
            <p className="text-lg text-[#a08878] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 delay-100 italic">
              Красота, воплощённая в стекле, природе и искусстве парфюмерии
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid relative group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-zoom-in animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={() => openModal(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                  <span className="text-[#a08878] text-xs font-medium uppercase tracking-widest mb-1">{img.category}</span>
                  <h3 className="text-white text-lg font-serif font-bold">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
