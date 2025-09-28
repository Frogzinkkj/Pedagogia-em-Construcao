"use client";

import Link from 'next/link';
import { BookHeart, Menu, X } from 'lucide-react';

import { useState, useEffect, type MouseEvent } from 'react';

import { usePathname } from 'next/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();


  useEffect(() => {

    const handleScroll = () => {
      
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.replace(/.*#/, '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
      });
      setIsMenuOpen(false);
    }
  };

  return (

    <header 
      className={`
        bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b
        transition-transform duration-300 ease-in-out
        ${isAtTop ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <BookHeart className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Pedagogia em Construção
          </span>
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6 text-md font-medium text-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><Link href="/#atividades" 
                  onClick={(e) => {
                    if (pathname === '/') {
                      handleLinkClick(e);
                    }
                  }} 
                  className="hover:text-primary transition-colors">
                    Atividades
                  </Link>
                </li>
              <li><Link href="/educators/1" className="hover:text-primary transition-colors">Sobre Mim</Link></li>
            </ul>
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-muted" aria-label="Abrir menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-background border-t">
          <ul className="flex flex-col items-center p-4 gap-4">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors text-lg">Início</Link></li>
            <li><Link href="/#atividades" onClick={handleLinkClick} className="hover:text-primary transition-colors text-lg">Atividades</Link></li>
            <li><Link href="/educators/1" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors text-lg">Sobre Mim</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}