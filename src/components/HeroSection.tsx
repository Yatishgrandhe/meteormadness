'use client';

import { tsaData } from '@/data/tsaData';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
      <div className="container-max">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {tsaData.chapterName}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Technology Student Association
          </p>
          <p className="text-lg md:text-xl mb-8 text-blue-200">
            {tsaData.schoolName} • {tsaData.schoolLocation}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const event = new CustomEvent('openSponsorForm');
                window.dispatchEvent(event);
              }}
              className="bg-white text-tsa-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Become a Sponsor
            </button>
            <a 
              href="#about" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-tsa-navy transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
