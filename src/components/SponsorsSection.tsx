'use client';

import { tsaData } from '@/data/tsaData';

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Sponsors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Thank you to our amazing sponsors who support our TSA chapter and STEM education.
          </p>
          <button 
            onClick={() => {
              const event = new CustomEvent('openSponsorForm');
              window.dispatchEvent(event);
            }}
            className="bg-tsa-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Become a Sponsor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tsaData.sponsors.map((sponsor) => (
            <div key={sponsor.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 font-bold text-lg">
                  {sponsor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                {sponsor.name}
              </h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                sponsor.level === 'Platinum' ? 'bg-yellow-100 text-yellow-800' :
                sponsor.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                sponsor.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {sponsor.level} Sponsor
              </span>
              <p className="text-gray-600 text-sm">
                {sponsor.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
