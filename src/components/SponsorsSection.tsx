import React from 'react';

const SponsorsSection: React.FC = () => {
  const sponsorTiers = [
    {
      name: 'Platinum',
      color: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300'
    },
    {
      name: 'Gold',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-300'
    },
    {
      name: 'Silver',
      color: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200'
    },
    {
      name: 'Bronze',
      color: 'bg-orange-50',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-300'
    }
  ];

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

        {/* Sponsor Benefits */}
        <div className="gradient-bg rounded-3xl p-12 md:p-16 mb-20 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
            Sponsorship Benefits
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-8 h-8 bg-tsa-red rounded-full flex items-center justify-center mt-1 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white text-xl leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Tiers */}
        <div className="mb-20">
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-12 text-center">
            Sponsorship Tiers
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorTiers.map((tier, index) => (
              <div key={index} className={`${tier.color} ${tier.borderColor} border-2 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}>
                <h4 className={`text-2xl font-heading font-bold ${tier.textColor} mb-6`}>
                  {tier.name}
                </h4>
                <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 shadow-inner">
                  <span className="text-gray-500 text-sm font-medium">Logo</span>
                </div>
                <p className={`text-base ${tier.textColor} opacity-75 font-medium`}>
                  Tier {index + 1} sponsorship level
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 md:p-16 shadow-xl">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
              Ready to Support the Future?
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Download our sponsorship packet to learn more about opportunities and benefits, or contact us directly to discuss how your organization can partner with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-primary text-lg">
                Download Sponsorship Packet
              </button>
              <button className="btn-secondary text-lg">
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
