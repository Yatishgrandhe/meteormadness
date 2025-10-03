import React from 'react';

const SponsorsSection: React.FC = () => {
  const sponsorTier = {
    name: 'Support TSA',
    amount: '$500+',
    color: 'bg-gradient-to-br from-tsa-navy to-blue-800',
    textColor: 'text-white',
    borderColor: 'border-tsa-navy'
  };

  const benefits = [
    "Showcase your company's commitment to STEM education and community development",
    "Gain access to a pipeline of talented, motivated, and skilled students for internships and future employment",
    "Receive recognition at our events and on our digital platforms",
    "Build relationships with the next generation of technology leaders"
  ];

  return (
    <section id="sponsors" className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-8">
            Become a Sponsor
          </h2>
          <p className="text-2xl md:text-3xl text-tsa-navy font-semibold mb-8">
            Partner with the Future of Technology
          </p>
          <p className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
            Your sponsorship directly supports the next generation of STEM leaders. Donations help us cover costs for competition materials, travel to state and national conferences, and technology for our lab. By investing in our chapter, you are investing in a skilled future workforce.
          </p>
        </div>

        {/* Sponsor Benefits - Mobile Optimized */}
        <div className="gradient-bg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 mb-12 sm:mb-16 lg:mb-20 shadow-2xl opera-optimize">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-8 sm:mb-12 text-center">
            Sponsorship Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 sm:space-x-6">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-tsa-red rounded-full flex items-center justify-center mt-1 shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Level - Single Tier */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-8 sm:mb-12 text-center">
            Sponsorship Level
          </h3>
          <div className="flex justify-center">
            <div className={`${sponsorTier.color} border-2 ${sponsorTier.borderColor} rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center transition-shadow duration-200 shadow-xl hover:shadow-2xl opera-optimize max-w-2xl`}>
              <div className="mb-6 sm:mb-8">
                <h4 className={`text-3xl sm:text-4xl font-heading font-bold ${sponsorTier.textColor} mb-2`}>
                  {sponsorTier.name}
                </h4>
                <p className={`text-xl sm:text-2xl ${sponsorTier.textColor} font-semibold opacity-90`}>
                  {sponsorTier.amount}
                </p>
              </div>
              
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-dashed border-white border-opacity-40 shadow-inner">
                <span className="text-white text-sm sm:text-base font-medium opacity-75">Your Logo Here</span>
              </div>
              
              <div className={`text-base sm:text-lg ${sponsorTier.textColor} opacity-90 leading-relaxed`}>
                <p className="mb-4">
                  Support our TSA chapter with a starting donation of $500 or more.
                </p>
                <p className="text-sm sm:text-base opacity-75">
                  All donations help us compete, learn, and grow as future technology leaders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Mobile Optimized */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 shadow-xl opera-optimize">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6 sm:mb-8">
              Ready to Support the Future?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Download our sponsorship packet to learn more about opportunities and benefits, or contact us directly to discuss how your organization can partner with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="btn-primary text-base sm:text-lg touch-manipulation">
                Download Sponsorship Packet
              </button>
              <button className="btn-secondary text-base sm:text-lg touch-manipulation">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
