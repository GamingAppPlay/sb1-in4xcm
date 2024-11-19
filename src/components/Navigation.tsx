import React, { useState, useEffect } from 'react';
import { Menu, X, Trophy } from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
}

interface NavigationProps {
  fighters: NavItem[];
}

export const Navigation: React.FC<NavigationProps> = ({ fighters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900/95'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-fight-blue" />
              <span className="font-bold text-xl text-white whitespace-nowrap">
                MMA Legends
              </span>
            </div>

            {/* Desktop Navigation with horizontal scroll */}
            <div className="hidden md:block flex-1 ml-6">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center space-x-4 whitespace-nowrap px-2">
                  {fighters.map((fighter) => (
                    <a
                      key={fighter.id}
                      href={`#${fighter.id}`}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 flex-shrink-0"
                    >
                      {fighter.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-auto inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/95 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-16">
              <span className="font-bold text-xl text-white">Fighters</span>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="block h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 px-2 py-4 overflow-y-auto">
              {fighters.map((fighter, index) => (
                <a
                  key={fighter.id}
                  href={`#${fighter.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 ${
                    index !== fighters.length - 1 ? 'mb-2' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideIn 0.4s ease-out forwards' : 'none'
                  }}
                >
                  {fighter.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}