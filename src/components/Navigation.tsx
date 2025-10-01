import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100' : 'bg-white/10 backdrop-blur-sm'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Logo size="md" showText={true} isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => scrollToSection('home')}
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-gray-800 hover:text-tsa-navy' : 'text-white hover:text-blue-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-gray-800 hover:text-tsa-navy' : 'text-white hover:text-blue-200'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-gray-800 hover:text-tsa-navy' : 'text-white hover:text-blue-200'
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection('sponsors')}
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-gray-800 hover:text-tsa-navy' : 'text-white hover:text-blue-200'
              }`}
            >
              Sponsors
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`font-semibold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-gray-800 hover:text-tsa-navy' : 'text-white hover:text-blue-200'
              }`}
            >
              Contact
            </button>
            <button className={`text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              isScrolled ? 'bg-tsa-navy hover:bg-blue-800 text-white' : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
            }`}>
              Sponsor Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl">
            <div className="py-6 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:text-tsa-navy hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:text-tsa-navy hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection('leadership')}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:text-tsa-navy hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
              >
                Leadership
              </button>
              <button
                onClick={() => scrollToSection('sponsors')}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:text-tsa-navy hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
              >
                Sponsors
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:text-tsa-navy hover:bg-gray-50 font-semibold text-lg transition-all duration-300"
              >
                Contact
              </button>
              <div className="px-6 pt-4">
                <button className="btn-primary w-full text-lg">
                  Sponsor Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
