'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chapter Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">CATATSA</h3>
            <p className="text-gray-300 mb-4">
              Technology Student Association at Catawba Ridge High School
            </p>
            <p className="text-gray-400 text-sm">
              Empowering students through technology, engineering, and leadership.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About TSA
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#leadership" className="text-gray-300 hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#sponsors" className="text-gray-300 hover:text-white transition-colors">
                  Sponsors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Get Involved</h3>
            <p className="text-gray-300 mb-4">
              Interested in joining TSA or becoming a sponsor?
            </p>
            <button 
              onClick={() => {
                const event = new CustomEvent('openSponsorForm');
                window.dispatchEvent(event);
              }}
              className="bg-tsa-navy text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 CATATSA - Technology Student Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
