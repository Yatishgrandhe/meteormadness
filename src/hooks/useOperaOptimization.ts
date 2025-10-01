'use client';

import { useEffect } from 'react';

export const useOperaOptimization = () => {
  useEffect(() => {
    // Detect Opera browser
    const isOpera = /Opera|OPR/.test(navigator.userAgent);
    
    if (isOpera) {
      // Add Opera-specific optimizations
      document.documentElement.classList.add('opera-browser');
      
      // Reduce motion for better performance
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // Optimize scroll performance
      let ticking = false;
      const optimizeScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Force hardware acceleration on scroll
            document.body.style.transform = 'translate3d(0, 0, 0)';
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', optimizeScroll, { passive: true });
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', optimizeScroll);
        document.documentElement.classList.remove('opera-browser', 'reduce-motion');
        document.body.style.transform = '';
      };
    }
  }, []);
};
