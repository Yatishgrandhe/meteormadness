'use client';

import { useState, useEffect } from 'react';
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
import { useOperaOptimization } from '@/hooks/useOperaOptimization';

export default function Home() {
  const [isSponsorFormOpen, setIsSponsorFormOpen] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  
  // Apply Opera optimizations
  useOperaOptimization();

  useEffect(() => {
    // Check if we're on the admin page
    const checkAdminPage = () => {
      const admin = window.location.pathname === '/admin' || window.location.search.includes('admin=true');
      setIsAdminPage(admin);
    };

    checkAdminPage();
    
    // Listen for URL changes
    window.addEventListener('popstate', checkAdminPage);
    return () => window.removeEventListener('popstate', checkAdminPage);
  }, []);

  const openSponsorForm = () => {
    setIsSponsorFormOpen(true);
  };

  const closeSponsorForm = () => {
    setIsSponsorFormOpen(false);
  };

  // Add event listener for sponsor form buttons
  useEffect(() => {
    const handleSponsorClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      // Check if the clicked element or its parent is a "Sponsor Us" button
      if (button && button.textContent?.includes('Sponsor Us')) {
        e.preventDefault();
        e.stopPropagation();
        openSponsorForm();
      }
    };

    document.addEventListener('click', handleSponsorClick, true);
    return () => document.removeEventListener('click', handleSponsorClick, true);
  }, []);

  if (isAdminPage) {
    return <AdminPanel />;
  }

  return (
    <div className="App">
      <Navigation />
      <main>
        <HeroSection />
        <WhyJoinSection />
        <EventsSection />
        <PhotoGallery />
        <LeadershipSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <SponsorForm isOpen={isSponsorFormOpen} onClose={closeSponsorForm} />
    </div>
  );
}