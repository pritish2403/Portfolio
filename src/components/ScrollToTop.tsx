import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when path changes
    window.scrollTo(0, 0);
    
    // For smooth scrolling to anchor links
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange, false);

    // Handle initial page load with hash
    if (window.location.hash) {
      // Small delay to ensure DOM is fully loaded
      const timer = setTimeout(() => {
        handleHashChange();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
