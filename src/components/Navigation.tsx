'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-tsa-navy rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TSA</span>
              </div>
              <span className="text-xl font-heading font-bold text-gray-900">CATATSA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-tsa-navy transition-colors">
              About
            </Link>
            <Link href="#events" className="text-gray-700 hover:text-tsa-navy transition-colors">
              Events
            </Link>
            <Link href="#leadership" className="text-gray-700 hover:text-tsa-navy transition-colors">
              Leadership
            </Link>
            <Link href="#sponsors" className="text-gray-700 hover:text-tsa-navy transition-colors">
              Sponsors
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-tsa-navy transition-colors">
              Contact
            </Link>
            <button 
              onClick={() => {
                const event = new CustomEvent('openSponsorForm');
                window.dispatchEvent(event);
              }}
              className="bg-tsa-navy text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Sponsor Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-tsa-navy focus:outline-none focus:text-tsa-navy"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="#about" className="block px-3 py-2 text-gray-700 hover:text-tsa-navy transition-colors">
                About
              </Link>
              <Link href="#events" className="block px-3 py-2 text-gray-700 hover:text-tsa-navy transition-colors">
                Events
              </Link>
              <Link href="#leadership" className="block px-3 py-2 text-gray-700 hover:text-tsa-navy transition-colors">
                Leadership
              </Link>
              <Link href="#sponsors" className="block px-3 py-2 text-gray-700 hover:text-tsa-navy transition-colors">
                Sponsors
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-700 hover:text-tsa-navy transition-colors">
                Contact
              </Link>
              <button 
                onClick={() => {
                  const event = new CustomEvent('openSponsorForm');
                  window.dispatchEvent(event);
                }}
                className="block w-full text-left px-3 py-2 bg-tsa-navy text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Sponsor Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
