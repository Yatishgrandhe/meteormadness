import React from 'react';
import { chapterInfo } from '../data/tsaData';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-max">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-8">
            Get Involved
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ready to join? We welcome all students with an interest in technology!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Meeting Information */}
          <div className="card">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Meeting Information
            </h3>
            <div className="spacing-y">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tsa-navy to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Meeting Day</p>
                  <p className="text-gray-600 text-lg">{chapterInfo.meetingInfo.day}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tsa-navy to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Meeting Time</p>
                  <p className="text-gray-600 text-lg">{chapterInfo.meetingInfo.time}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-tsa-navy to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Location</p>
                  <p className="text-gray-600 text-lg">Room {chapterInfo.meetingInfo.room}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Contact Information
            </h3>
            <div className="spacing-y">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-3">Faculty Advisor</h4>
                <p className="text-gray-600 text-lg mb-2">{chapterInfo.contact.advisorName}</p>
                <a 
                  href={`mailto:${chapterInfo.contact.advisorEmail}`}
                  className="text-tsa-navy hover:text-blue-700 font-semibold text-lg transition-colors duration-300"
                >
                  {chapterInfo.contact.advisorEmail}
                </a>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-3">Chapter President</h4>
                <a 
                  href={`mailto:${chapterInfo.contact.presidentEmail}`}
                  className="text-tsa-navy hover:text-blue-700 font-semibold text-lg transition-colors duration-300"
                >
                  {chapterInfo.contact.presidentEmail}
                </a>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-3">Follow Our Journey</h4>
                <a 
                  href={chapterInfo.contact.socialMedia}
                  className="text-tsa-navy hover:text-blue-700 font-semibold text-lg transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chapterInfo.contact.socialMedia}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="gradient-bg rounded-3xl p-12 md:p-16 shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
              Ready to Join TSA?
            </h3>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards becoming part of the next generation of technology leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-secondary text-lg">
                Sponsor Us
              </button>
              <button className="btn-outline text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;