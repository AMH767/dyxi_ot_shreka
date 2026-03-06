import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
              DAK Ceramic
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    location === link.href ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Button variant="outline" className="ml-4 border-primary text-primary hover:bg-primary hover:text-white">
              Shop Now
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary/95 border-l-primary/20">
              <nav className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a
                      className={`text-lg font-medium transition-colors hover:text-accent ${
                        location === link.href ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h3 className="font-serif text-2xl font-bold mb-4">DAK Ceramic</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Handcrafted pottery designed for modern living. Each piece is unique, sustainable, and made with passion.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-accent">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="hover:text-white transition-colors">Home</a></Link></li>
                <li><Link href="/gallery"><a className="hover:text-white transition-colors">Gallery</a></Link></li>
                <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
                <li><Link href="/shop"><a className="hover:text-white transition-colors">Shop</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-accent">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Moscow, Russia</li>
                <li>hello@dakceramic.ru</li>
                <li>+7 (999) 000-00-00</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-accent">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-accent transition-colors"><Mail className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} DAK Ceramic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}