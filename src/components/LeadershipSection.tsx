'use client';

import { tsaData } from '@/data/tsaData';

const LeadershipSection = () => {
  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated students leading our TSA chapter to success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tsaData.leadership.map((leader) => (
            <div key={leader.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-24 h-24 bg-tsa-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-1">
                {leader.name}
              </h3>
              <p className="text-tsa-navy font-medium mb-2">{leader.position}</p>
              <p className="text-gray-600 text-sm mb-3">{leader.grade}</p>
              <p className="text-gray-600 text-sm">
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
