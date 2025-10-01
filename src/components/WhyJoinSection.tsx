'use client';

import { tsaData } from '@/data/tsaData';

const WhyJoinSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Why Join TSA?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Technology Student Association and unlock your potential in technology, engineering, and leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tsaData.whyJoin.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">{item.icon}</div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
