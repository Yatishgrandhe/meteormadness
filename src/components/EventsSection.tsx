'use client';

import { tsaData } from '@/data/tsaData';

const EventsSection = () => {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for exciting competitions and conferences throughout the year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tsaData.events.map((event) => (
            <div key={event.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>
              <p className="text-gray-600">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
