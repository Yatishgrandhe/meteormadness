'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhyJoinSection from '@/components/WhyJoinSection';
import EventsSection from '@/components/EventsSection';
import PhotoGallery from '@/components/PhotoGallery';
import LeadershipSection from '@/components/LeadershipSection';
import SponsorsSection from '@/components/SponsorsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SponsorForm from '@/components/SponsorForm';
import AdminPanel from '@/components/AdminPanel';
import AdminLink from '@/components/AdminLink';

export default function Home() {
  const [isSponsorFormOpen, setIsSponsorFormOpen] = useState(false);

  // Check if we're on the admin page
  const isAdminPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/admin' || window.location.search.includes('admin=true'));

  const openSponsorForm = () => {
    setIsSponsorFormOpen(true);
  };

  const closeSponsorForm = () => {
    setIsSponsorFormOpen(false);
  };

  // Add event listener for sponsor form buttons
  if (typeof window !== 'undefined') {
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.textContent?.includes('Sponsor Us') || target.textContent?.includes('Become a Sponsor')) {
        openSponsorForm();
      }
    });
  }

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminPanel />
        <AdminLink />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <WhyJoinSection />
      <EventsSection />
      <PhotoGallery />
      <LeadershipSection />
      <SponsorsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <AdminLink />
      
      <SponsorForm 
        isOpen={isSponsorFormOpen} 
        onClose={closeSponsorForm} 
      />
    </div>
  );
}