'use client';

import { useEffect, Suspense } from 'react';

function SmoothScrollHandlerInner() {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Remove the hash from URL to prevent default behavior
      const elementId = hash.substring(1);
      const element = document.getElementById(elementId);
      
      if (element) {
        // Wait a bit for the page to render, then scroll
        setTimeout(() => {
          const headerHeight = 100; // Approximate header height
          const elementPosition = element.offsetTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}

export default function SmoothScrollHandler() {
  return (
    <Suspense fallback={null}>
      <SmoothScrollHandlerInner />
    </Suspense>
  );
}
