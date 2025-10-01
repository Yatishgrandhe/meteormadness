import React from 'react';
import { leadership } from '../data/tsaData';

const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-max">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-8">
            Our Leadership
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Meet the dedicated student officers and faculty advisors leading our chapter for the current school year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {leadership.map((leader, index) => (
            <div key={index} className="card text-center group">
              {/* Profile Image Placeholder */}
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-tsa-navy to-blue-600 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-white text-5xl font-bold">
                  {leader.name.charAt(1) || '?'}
                </div>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-tsa-navy transition-colors duration-300">
                {leader.name}
              </h3>
              <p className="text-tsa-navy font-semibold text-lg">
                {leader.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
