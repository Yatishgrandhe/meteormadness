import React from 'react';
import { chapterInfo } from '../data/tsaData';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container-max">
        <div className="py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* School Information */}
            <div className="space-y-6">
              <div>
                <Logo size="sm" showText={false} className="mb-6" isScrolled={true} />
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  {chapterInfo.schoolName}
                </h3>
                <p className="text-lg text-blue-300 font-medium">TSA Chapter</p>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Empowering the next generation of technology leaders through hands-on learning and competitive excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-2xl font-heading font-bold mb-8 text-white">Quick Links</h4>
              <div className="space-y-4">
                <a href="#home" className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-lg">
                  Home
                </a>
                <a href="#events" className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-lg">
                  Events
                </a>
                <a href="#leadership" className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-lg">
                  Leadership
                </a>
                <a href="#sponsors" className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-lg">
                  Sponsors
                </a>
                <a href="#contact" className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 text-lg">
                  Contact
                </a>
              </div>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-2xl font-heading font-bold mb-8 text-white">Contact Us</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-tsa-navy rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${chapterInfo.contact.advisorEmail}`} className="text-gray-300 hover:text-white transition-colors text-lg">
                    {chapterInfo.contact.advisorEmail}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-tsa-navy rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-lg">Room {chapterInfo.meetingInfo.room}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-tsa-navy rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <a href={chapterInfo.contact.socialMedia} className="text-gray-300 hover:text-white transition-colors text-lg" target="_blank" rel="noopener noreferrer">
                    Follow Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-gray-400 text-lg">
              © 2024 {chapterInfo.schoolName} TSA Chapter. All rights reserved.
            </div>
            <div className="flex items-center space-x-8">
              <a 
                href="https://tsaweb.org" 
                className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official TSA Website
              </a>
              <button 
                className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;