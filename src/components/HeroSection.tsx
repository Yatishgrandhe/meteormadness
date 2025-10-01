import React from 'react';
import { chapterInfo } from '../data/tsaData';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen gradient-bg flex items-center relative overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max relative z-30">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* Content */}
          <div className="text-white spacing-y-lg">
            <div className="spacing-y">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
                {chapterInfo.headline}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 leading-relaxed font-light">
                {chapterInfo.subHeadline}
              </p>
            </div>
            
            <div className="spacing-y">
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                {chapterInfo.mission}
              </p>
              
              {/* Why Join TSA Bullet Points */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-heading font-bold text-white mb-6">Why Join TSA?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-tsa-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg">Develop Real-World Skills</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-tsa-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg">Build Your Resume & Portfolio</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-tsa-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg">Compete and Achieve</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-tsa-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg">Network with Professionals</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-tsa-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-blue-100 text-lg">Become a Leader</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button className="btn-secondary text-lg">
                  Sponsor Us
                </button>
                <button className="btn-outline text-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="gradient-card rounded-3xl p-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center border-2 border-white/30">
                <div className="text-center text-white spacing-y-sm">
                  <svg className="w-20 h-20 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xl font-semibold">Hero Video/Image</p>
                    <p className="text-sm opacity-75">Team at competition</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-tsa-red rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
