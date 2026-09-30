import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Mail } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import siaLogo from '@/assets/sia-logo.svg';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Research', path: '/research' },
    { name: 'Publications', path: '/publications' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'border-b border-border' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center"
            >
              <img src={siaLogo} alt="SIA Laboratories" className="h-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm uppercase tracking-widest font-bold transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-accent'
                      : 'text-white hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Contact Info */}
            <div className="hidden lg:flex items-center">
              <a
                href="mailto:jiaxubrian.sia@ntu.edu.sg"
                className="text-sm text-white font-bold hover:text-accent transition-colors duration-300"
              >
                jiaxubrian.sia@ntu.edu.sg
              </a>
            </div>

            {/* Mobile menu button */}
            <SheetTrigger asChild>
              <button
                className="lg:hidden flex h-11 w-11 items-center justify-center text-foreground hover:text-accent transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
          </div>
        </div>
      </nav>

      <SheetContent
        aria-describedby={undefined}
        className="flex h-[100dvh] w-full max-w-md flex-col gap-[24px] p-[24px] pb-[max(24px,env(safe-area-inset-bottom))] sm:max-w-md [&>button]:right-[12px] [&>button]:top-[12px] [&>button]:flex [&>button]:h-[44px] [&>button]:w-[44px] [&>button]:items-center [&>button]:justify-center [&>button>svg]:h-[24px] [&>button>svg]:w-[24px]"
      >
        <div className="shrink-0 pr-[48px]">
          <img src={siaLogo} alt="SIA Laboratories" className="h-[40px]" />
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
        </div>

        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <SheetClose asChild>
                  <Link
                    to={item.path}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`flex min-h-11 items-center py-2 text-2xl font-semibold transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border pt-[16px]">
          <a
            href="mailto:jiaxubrian.sia@ntu.edu.sg"
            className="flex min-h-[44px] items-center gap-[12px] text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <Mail className="h-[20px] w-[20px] shrink-0" />
            <span className="break-all">jiaxubrian.sia@ntu.edu.sg</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;
