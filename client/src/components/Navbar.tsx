import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location !== "/") {
      window.location.href = `/${id}`;
      return;
    }
    
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#1e1510]/97 shadow-lg py-3" : "bg-[#1e1510]/80 py-5"} backdrop-blur-md border-b border-[#a08878]/20`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-[#e8ddd3] font-serif font-bold text-xl hover:text-white transition-all tracking-widest uppercase">
          <span className="text-[#a08878] text-2xl">✦</span>
          <span>Maison Velours</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 mr-12">
          <li>
            <button onClick={() => scrollToSection("#about")} className="text-[#d4c4b5] font-medium hover:text-white transition-colors relative group tracking-widest text-sm uppercase">
              О компании
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#a08878] transition-all group-hover:w-full"></span>
            </button>
          </li>
          <li>
            <Link href="/gallery" className={`text-[#d4c4b5] font-medium hover:text-white transition-colors relative group tracking-widest text-sm uppercase ${location === "/gallery" ? "text-white" : ""}`}>
              Галерея
              <span className={`absolute bottom-0 left-0 h-px bg-[#a08878] transition-all ${location === "/gallery" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
          </li>
          <li>
            <Link href="/shop" className={`text-[#d4c4b5] font-medium hover:text-white transition-colors relative group tracking-widest text-sm uppercase ${location === "/shop" ? "text-white" : ""}`}>
              Лавка
              <span className={`absolute bottom-0 left-0 h-px bg-[#a08878] transition-all ${location === "/shop" ? "w-full" : "w-0 group-hover:w-full"}`}></span>
            </Link>
          </li>
          <li>
            <button onClick={() => scrollToSection("#contact")} className="text-[#d4c4b5] font-medium hover:text-white transition-colors relative group tracking-widest text-sm uppercase">
              Контакты
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#a08878] transition-all group-hover:w-full"></span>
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#d4c4b5] hover:text-white transition-colors p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-[#1e1510]/98 backdrop-blur-md flex flex-col items-center justify-start pt-16 gap-10 transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button onClick={() => scrollToSection("#about")} className="text-lg font-medium text-[#d4c4b5] hover:text-white tracking-widest uppercase">О компании</button>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#d4c4b5] hover:text-white tracking-widest uppercase">Галерея</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#d4c4b5] hover:text-white tracking-widest uppercase">Лавка</Link>
          <button onClick={() => scrollToSection("#contact")} className="text-lg font-medium text-[#d4c4b5] hover:text-white tracking-widest uppercase">Контакты</button>
        </div>
      </div>
    </nav>
  );
}
