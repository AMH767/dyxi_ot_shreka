import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useImageModal } from "@/components/ImageModal";
import { ShoppingCart, Send, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  notes: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    title: "Velours Noir",
    category: "Восточные",
    price: 8900,
    images: ["/images/perfume_gold.jpg", "/images/hero_perfume.jpg"],
    description: "Глубокий восточный аромат с нотами редкого уда, тёплой амбры и мускуса. Для тех, кто ценит силу и загадочность.",
    notes: "Уд · Амбра · Мускус",
    inStock: true,
  },
  {
    id: 2,
    title: "Rose Éternelle",
    category: "Цветочные",
    price: 7500,
    images: ["/images/perfume_glass.jpg", "/images/collection.jpg"],
    description: "Романтический букет из дамасской розы и белого пиона на тёплой сандаловой основе. Нежность в каждой капле.",
    notes: "Роза · Пион · Сандал",
    inStock: true,
  },
  {
    id: 3,
    title: "Cristal Blanc",
    category: "Свежие",
    price: 6800,
    images: ["/images/perfume_crystal.jpg", "/images/making.webp"],
    description: "Свежий цитрусовый аккорд с сердцем жасмина и землистым ветивером. Чистота и элегантность в одном флаконе.",
    notes: "Бергамот · Жасмин · Ветивер",
    inStock: true,
  },
  {
    id: 4,
    title: "Oud Mystique",
    category: "Восточные",
    price: 12500,
    images: ["/images/oud.jpg", "/images/perfume_gold.jpg"],
    description: "Редкий уд из Камбоджи в сочетании с шафраном и розой. Аромат для особых случаев.",
    notes: "Уд · Шафран · Роза",
    inStock: true,
  },
  {
    id: 5,
    title: "Forêt Dorée",
    category: "Древесные",
    price: 7200,
    images: ["/images/perfume_wood.jpg", "/images/ingredients.png"],
    description: "Тёплый древесный аромат с нотами сандала, кедра и ванили. Уют и спокойствие в каждом флаконе.",
    notes: "Сандал · Кедр · Ваниль",
    inStock: true,
  },
  {
    id: 6,
    title: "Nuit de Paris",
    category: "Цветочные",
    price: 9100,
    images: ["/images/collection.jpg", "/images/perfume_glass.jpg"],
    description: "Элегантный вечерний аромат с ирисом, фиалкой и белым мускусом. Парижская ночь в стеклянном флаконе.",
    notes: "Ирис · Фиалка · Мускус",
    inStock: true,
  },
  {
    id: 7,
    title: "Ambre Soleil",
    category: "Восточные",
    price: 8200,
    images: ["/images/hero_perfume.jpg", "/images/oud.jpg"],
    description: "Солнечная амбра с нотами апельсина, корицы и сладкой ванили. Тепло и радость в каждой капле.",
    notes: "Амбра · Апельсин · Ваниль",
    inStock: true,
  },
  {
    id: 8,
    title: "Подарочный набор",
    category: "Подарки",
    price: 15900,
    images: ["/images/collection.jpg", "/images/perfume_crystal.jpg"],
    description: "Элегантный подарочный набор из трёх миниатюрных флаконов на выбор. Идеальный подарок для ценителей ароматов.",
    notes: "На выбор · 3 аромата · 15 мл",
    inStock: true,
  },
];

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export default function Shop() {
  const { openModal } = useImageModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["Все", "Восточные", "Цветочные", "Свежие", "Древесные", "Подарки"];
  
  const filteredProducts = selectedCategory === "Все" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один товар в корзину');
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    const botToken = '8770595665:AAHfdxUO4ve-dnovnO0PEZd_huCn2L_W0ug';
    const chatIds = ['914022105', '914022105'];
    
    const cartDetails = cart.map(item => `• ${item.title} x${item.quantity} — ${(item.price * item.quantity).toLocaleString()} ₽`).join('\n');
    
    const text = `✦ Новый заказ из Лавки Maison Velours!\n\n📦 Состав заказа:\n${cartDetails}\n\n💰 Итого: ${cartTotal.toLocaleString()} ₽\n\n👤 Клиент: ${userData.name}\n📞 Телефон: ${userData.phone}\n📧 Email: ${userData.email || 'Не указан'}\n✏️ Пожелания: ${userData.message || 'Не указаны'}\n\n⏳ Время заказа: ${new Date().toLocaleString()}`;

    try {
      const promises = chatIds.map(chatId => 
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: text })
        })
      );

      const responses = await Promise.all(promises);
      const results = await Promise.all(responses.map(r => r.json()));
      
      if (results.every((r: any) => r.ok)) {
        alert('Ваш заказ принят! Мы свяжемся с вами в ближайшее время для подтверждения.');
        form.reset();
        setCart([]);
      } else {
        throw new Error('Не все сообщения доставлены');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-clay-100">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-[#1e1510] py-20 border-b border-[#3d2f25]">
          <div className="container mx-auto px-6 text-center">
            <p className="text-[#a08878] tracking-widest uppercase text-xs mb-4 animate-in slide-in-from-bottom-4">Авторская парфюмерия</p>
            <h1 className="text-5xl font-serif font-bold text-white mb-4 animate-in slide-in-from-bottom-4 tracking-wide">
              Лавка ароматов
            </h1>
            <p className="text-xl text-[#a08878] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 delay-100 italic">
              Уникальные ароматы ручной работы для вашей истории
            </p>
          </div>
        </section>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <button 
            onClick={scrollToForm}
            className="fixed bottom-8 right-8 z-50 bg-clay-800 text-white p-4 shadow-2xl hover:bg-clay-900 transition-all active:scale-95 flex items-center gap-2"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-bold">{cart.length}</span>
          </button>
        )}

        {/* Filters */}
        <section className="bg-white py-8 sticky top-[65px] z-40 shadow-sm border-b border-clay-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 text-sm tracking-widest uppercase font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-clay-800 text-white"
                      : "bg-clay-100 text-clay-700 hover:bg-clay-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} addToCart={addToCart} openModal={openModal} />
              ))}
            </div>
          </div>
        </section>

        {/* Order Cart & Form Section */}
        <section ref={formRef} className="py-16 bg-white border-t border-clay-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                
                {/* Cart View */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-serif font-bold text-clay-800 mb-6 flex items-center gap-2 tracking-wide">
                    <ShoppingCart className="w-6 h-6" /> Ваш заказ
                  </h3>
                  
                  {cart.length === 0 ? (
                    <div className="bg-clay-50 border border-dashed border-clay-200 p-8 text-center">
                      <p className="text-clay-500 text-sm tracking-wide">Добавьте ароматы из лавки выше, чтобы оформить заказ</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="bg-white border border-clay-200 p-4 flex flex-col gap-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-clay-800 leading-tight font-serif">{item.title}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.id, -1)} className="bg-clay-100 hover:bg-clay-200 p-1 transition-colors">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-clay-800 w-6 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="bg-clay-100 hover:bg-clay-200 p-1 transition-colors">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-clay-700">{(item.price * item.quantity).toLocaleString()} ₽</span>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-clay-200 pt-4 flex justify-between items-center">
                        <span className="font-bold text-clay-800 tracking-wide uppercase text-sm">Итого:</span>
                        <span className="text-2xl font-bold text-clay-800 font-serif">{cartTotal.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Form */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-serif font-bold text-clay-800 mb-6 tracking-wide">Оформить заказ</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-clay-700 mb-2 text-xs tracking-widest uppercase">Ваше имя *</label>
                        <input type="text" id="name" name="name" required className="form-control" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-clay-700 mb-2 text-xs tracking-widest uppercase">Телефон *</label>
                        <input type="tel" id="phone" name="phone" required className="form-control" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-clay-700 mb-2 text-xs tracking-widest uppercase">Email</label>
                      <input type="email" id="email" name="email" className="form-control" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-clay-700 mb-2 text-xs tracking-widest uppercase">Пожелания</label>
                      <textarea id="message" name="message" rows={3} className="form-control"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full text-sm">
                      <Send className="mr-2 w-4 h-4" /> Оформить заказ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProductCard({ product, idx, addToCart, openModal }: any) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  return (
    <div 
      className="card group animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      <div 
        className="h-64 overflow-hidden cursor-zoom-in relative"
        onClick={() => openModal(product.images[currentImageIdx])}
        onMouseEnter={() => product.images.length > 1 && setCurrentImageIdx(1)}
        onMouseLeave={() => setCurrentImageIdx(0)}
      >
        <img 
          src={product.images[currentImageIdx]} 
          alt={product.title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108"
        />
        <div className="absolute top-3 left-3 bg-[#1e1510]/80 text-[#d4c4b5] text-xs px-3 py-1 tracking-widest uppercase">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[#a08878] text-xs tracking-widest uppercase mb-1">{product.notes}</p>
        <h3 className="text-lg font-bold text-clay-800 mb-2 font-serif">{product.title}</h3>
        <p className="text-gray-500 text-sm flex-1 leading-relaxed mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-clay-800 font-serif">{product.price.toLocaleString()} ₽</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-clay-800 text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-clay-900 transition-colors"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
