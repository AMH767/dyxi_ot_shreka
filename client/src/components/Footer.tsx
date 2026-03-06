import { MapPin, Phone, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e1510] text-white py-14 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
        {/* About */}
        <div>
          <h3 className="text-lg font-serif text-[#d4c4b5] mb-6 tracking-widest uppercase">Maison Velours</h3>
          <p className="text-[#a08878] mb-4 leading-relaxed text-sm">
            Московский парфюмерный дом, создающий авторские ароматы из редких натуральных ингредиентов. Каждый флакон — это история, рассказанная языком запахов.
          </p>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-lg font-serif text-[#d4c4b5] mb-6 tracking-widest uppercase">Контакты</h3>
          <div className="space-y-4">
            <p className="flex items-start gap-3 text-[#a08878] text-sm">
              <MapPin className="w-4 h-4 mt-1 shrink-0" />
              <span>Большая Никитская, 19, Москва, 125009</span>
            </p>
            <p className="flex items-center gap-3 text-[#a08878] text-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+7 (495) 123-45-67</span>
            </p>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-serif text-[#d4c4b5] mb-6 tracking-widest uppercase">Мы в соцсетях</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/maisonvelours" target="_blank" rel="noopener noreferrer" className="bg-[#3d2f25] hover:bg-[#5c4a3d] p-3 rounded-full transition-all text-[#d4c4b5] hover:-translate-y-1">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://t.me/maisonvelours" target="_blank" rel="noopener noreferrer" className="bg-[#3d2f25] hover:bg-[#5c4a3d] p-3 rounded-full transition-all text-[#d4c4b5] hover:-translate-y-1">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-[#3d2f25] text-center text-[#7d6657] text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} Maison Velours. Все права защищены.</p>
      </div>
    </footer>
  );
}
