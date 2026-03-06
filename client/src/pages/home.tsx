import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useImageModal } from "@/components/ImageModal";
import { Heart, Send, MapPin, Phone, Clock, Instagram, Leaf, Droplets, Star, Award } from "lucide-react";

export default function Home() {
  const { openModal } = useImageModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const botToken = '8770595665:AAHfdxUO4ve-dnovnO0PEZd_huCn2L_W0ug';
    const chatIds = ['914022105', '914022105'];
    
    const text = `✦ Новая заявка в Maison Velours!\n\n👤 Клиент: ${data.name}\n📞 Телефон: ${data.phone}\n📧 Email: ${data.email || 'Не указан'}\n🌹 Интересующий аромат: ${data.fragrance}\n✏️ Пожелания: ${data.message || 'Не указаны'}\n\n⏳ Время заявки: ${new Date().toLocaleString()}`;

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
        alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        form.reset();
      } else {
        throw new Error('Не все сообщения доставлены');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="hero-content mx-auto">
            <p className="text-[#a08878] tracking-[6px] uppercase text-sm mb-4 animate-in slide-in-from-bottom-8 duration-700">Парфюмерный дом</p>
            <h1 className="animate-in slide-in-from-bottom-8 duration-1000">Maison Velours</h1>
            <p className="animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              Искусство аромата, рождённое из природы.<br />
              Каждый флакон — это история, рассказанная языком запахов.
            </p>
            <div className="hero-buttons animate-in slide-in-from-bottom-8 duration-1000 delay-500 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn btn-primary">
                Связаться с нами <span className="ml-2">→</span>
              </a>
              <a href="#about" className="btn btn-secondary">
                <span className="mr-2">✦</span> О компании
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-white">
        <div className="container mx-auto px-6">
          <h2 className="section-title">О компании</h2>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div 
                className="overflow-hidden shadow-2xl h-[350px] lg:h-[520px] cursor-zoom-in"
                onClick={() => openModal('/images/atelier.jpg')}
              >
                <img 
                  src="/images/atelier.jpg" 
                  alt="Maison Velours Atelier" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="max-w-lg mx-auto lg:mx-0">
                <p className="text-[#a08878] tracking-widest uppercase text-xs mb-3">С 2018 года</p>
                <h3 className="text-3xl font-bold text-clay-800 mb-6 font-serif leading-tight">Maison Velours — парфюмерный дом с душой</h3>
                <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                  Мы создаём авторские ароматы, вдохновлённые природой, путешествиями и редкими ингредиентами со всего мира. Каждый наш парфюм — это уникальная история, воплощённая в стекле и аромате.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Наша мастерская находится в самом сердце Москвы. Мы работаем с натуральными маслами уда, розы, амбры, ветивера и сотнями других редких компонентов, создавая ароматы, которые живут на коже и в памяти.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-clay-200 p-5">
                    <Leaf className="text-clay-600 w-7 h-7 mb-3" />
                    <h4 className="font-bold text-clay-800 mb-1 tracking-wide">Натуральные ингредиенты</h4>
                    <p className="text-sm text-gray-500">Только природные компоненты высшего качества</p>
                  </div>
                  <div className="border border-clay-200 p-5">
                    <Droplets className="text-clay-600 w-7 h-7 mb-3" />
                    <h4 className="font-bold text-clay-800 mb-1 tracking-wide">Ручная работа</h4>
                    <p className="text-sm text-gray-500">Каждый флакон создаётся вручную с любовью</p>
                  </div>
                  <div className="border border-clay-200 p-5">
                    <Star className="text-clay-600 w-7 h-7 mb-3" />
                    <h4 className="font-bold text-clay-800 mb-1 tracking-wide">Авторские рецептуры</h4>
                    <p className="text-sm text-gray-500">Уникальные формулы, разработанные нашими мастерами</p>
                  </div>
                  <div className="border border-clay-200 p-5">
                    <Award className="text-clay-600 w-7 h-7 mb-3" />
                    <h4 className="font-bold text-clay-800 mb-1 tracking-wide">Персональный подход</h4>
                    <p className="text-sm text-gray-500">Создаём ароматы под индивидуальный заказ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-clay-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#a08878] tracking-widest uppercase text-xs mb-4">Наша философия</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 tracking-wide leading-tight max-w-3xl mx-auto">
            «Аромат — это невидимая часть личности, самый незабываемый способ представиться»
          </h2>
          <p className="text-clay-300 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Мы верим, что каждый человек заслуживает своего уникального аромата. Наши парфюмеры создают ароматные истории, которые отражают характер, настроение и воспоминания.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-serif text-[#a08878] font-bold mb-2">200+</div>
              <div className="text-clay-300 tracking-widest uppercase text-xs">Уникальных ароматов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif text-[#a08878] font-bold mb-2">7</div>
              <div className="text-clay-300 tracking-widest uppercase text-xs">Лет мастерства</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif text-[#a08878] font-bold mb-2">5000+</div>
              <div className="text-clay-300 tracking-widest uppercase text-xs">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fragrances */}
      <section className="section bg-clay-100">
        <div className="container mx-auto px-6">
          <h2 className="section-title">Избранные ароматы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FragranceCard 
              title="Velours Noir"
              notes="Уд · Амбра · Мускус"
              description="Глубокий восточный аромат с нотами редкого уда и тёплой амбры. Для тех, кто ценит силу и загадочность."
              image="/images/perfume_gold.jpg"
              type="Eau de Parfum"
              openModal={openModal}
            />
            <FragranceCard 
              title="Rose Éternelle"
              notes="Роза · Пион · Сандал"
              description="Романтический букет из дамасской розы и белого пиона на тёплой сандаловой основе. Нежность в каждой капле."
              image="/images/perfume_glass.jpg"
              type="Eau de Parfum"
              openModal={openModal}
            />
            <FragranceCard 
              title="Cristal Blanc"
              notes="Бергамот · Жасмин · Ветивер"
              description="Свежий цитрусовый аккорд с сердцем жасмина и землистым ветивером. Чистота и элегантность в одном флаконе."
              image="/images/perfume_crystal.jpg"
              type="Eau de Toilette"
              openModal={openModal}
            />
          </div>
          <div className="text-center mt-12">
            <a href="/shop" className="btn btn-primary">
              Смотреть все ароматы →
            </a>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <p className="text-[#a08878] tracking-widest uppercase text-xs mb-3">Наши ингредиенты</p>
              <h2 className="text-3xl font-serif font-bold text-clay-800 mb-6 leading-tight">Редкие компоненты со всего мира</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Мы путешествуем по всему миру в поисках лучших ингредиентов. Уд из Камбоджи, роза из Болгарии, нероли из Марокко, ваниль с Мадагаскара — каждый компонент отбирается лично нашими парфюмерами.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Уд (Агаровое дерево)", origin: "Камбоджа, Индия" },
                  { name: "Дамасская роза", origin: "Болгария, Турция" },
                  { name: "Амбра серая", origin: "Атлантический океан" },
                  { name: "Ветивер", origin: "Гаити, Индонезия" },
                  { name: "Ваниль Бурбон", origin: "Мадагаскар" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-clay-200 pb-3">
                    <span className="font-medium text-clay-800">{item.name}</span>
                    <span className="text-sm text-[#a08878] tracking-wide">{item.origin}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div 
                className="overflow-hidden shadow-2xl h-[400px] cursor-zoom-in"
                onClick={() => openModal('/images/ingredients.png')}
              >
                <img 
                  src="/images/ingredients.png" 
                  alt="Ингредиенты" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-clay-800 ">
        <div className="container mx-auto px-6">
          <h2 className="section-title !border-clay-500 after:bg-clay-500">Контакты</h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <div className="bg-clay-700 p-8 rounded-sm shadow-xl h-full">
                <h3 className="text-2xl font-bold mb-6 font-serif tracking-wide">Свяжитесь с нами</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-clay-600 p-3 rounded-full mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 tracking-wide uppercase text-sm">Адрес</h4>
                      <p className="text-clay-200">Большая Никитская, 19, Москва, 125009</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-clay-600 p-3 rounded-full mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 tracking-wide uppercase text-sm">Телефон</h4>
                      <p className="text-clay-200">
                        <a href="tel:+74951234567" className="hover:text-clay-300 transition-colors">
                          +7 (495) 123-45-67
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-clay-600 p-3 rounded-full mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 tracking-wide uppercase text-sm">Часы работы</h4>
                      <p className="text-clay-200">ПН-ВС: 11:00 — 21:00</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium mb-4 tracking-wide uppercase text-sm">Мы в соцсетях</h4>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/maisonvelours" target="_blank" rel="noopener noreferrer" className="bg-clay-600 hover:bg-clay-500 p-3 rounded-full transition-all  hover:-translate-y-1">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://t.me/maisonvelours" target="_blank" rel="noopener noreferrer" className="bg-clay-600 hover:bg-clay-500 p-3 rounded-full transition-all hover:-translate-y-1">
                      <Send className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-clay-700 p-8 rounded-sm shadow-xl">
                <h3 className="text-2xl font-bold mb-6 font-serif tracking-wide">Оставить заявку</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-clay-200 mb-2 text-sm tracking-widest uppercase">Ваше имя</label>
                    <input type="text" id="name" name="name" required className="form-control bg-clay-600 border-clay-500 text-white placeholder-clay-300" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-clay-200 mb-2 text-sm tracking-widest uppercase">Телефон</label>
                    <input type="tel" id="phone" name="phone" required className="form-control bg-clay-600 border-clay-500 text-white placeholder-clay-300" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-clay-200 mb-2 text-sm tracking-widest uppercase">Email</label>
                    <input type="email" id="email" name="email" className="form-control bg-clay-600 border-clay-500 text-white placeholder-clay-300" />
                  </div>
                  <div>
                    <label htmlFor="fragrance" className="block text-clay-200 mb-2 text-sm tracking-widest uppercase">Интересующий аромат</label>
                    <select id="fragrance" name="fragrance" required className="form-control bg-clay-600 border-clay-500 text-white">
                      <option value="">Выберите аромат</option>
                      <option value="Velours Noir">Velours Noir</option>
                      <option value="Rose Éternelle">Rose Éternelle</option>
                      <option value="Cristal Blanc">Cristal Blanc</option>
                      <option value="Oud Mystique">Oud Mystique</option>
                      <option value="Forêt Dorée">Forêt Dorée</option>
                      <option value="Индивидуальный заказ">Индивидуальный заказ</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-clay-200 mb-2 text-sm tracking-widest uppercase">Ваши пожелания</label>
                    <textarea id="message" name="message" rows={3} className="form-control bg-clay-600 border-clay-500 text-white placeholder-clay-300"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full text-sm bg-[#a08878] hover:bg-[#7d6657]">
                    <Send className="mr-2 w-4 h-4" /> Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FragranceCard({ title, notes, description, image, type, openModal }: any) {
  return (
    <div className="card group">
      <div 
        className="h-56 overflow-hidden cursor-zoom-in relative"
        onClick={() => openModal(image)}
      >
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4 bg-[#1e1510]/80 text-[#d4c4b5] text-xs px-3 py-1 tracking-widest uppercase">
          {type}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[#a08878] text-xs tracking-widest uppercase mb-2">{notes}</p>
        <h3 className="text-xl font-bold text-clay-800 mb-3 font-serif">{title}</h3>
        <p className="text-gray-500 text-sm flex-1 leading-relaxed">{description}</p>
        <a href="/shop" className="mt-4 text-clay-700 text-sm font-medium tracking-widest uppercase hover:text-clay-900 transition-colors inline-flex items-center gap-1">
          В лавку →
        </a>
      </div>
    </div>
  );
}
