import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavLink {
  name: string;
  to: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Education', to: 'education' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Certifications', to: 'certifications' },
  { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let scrollTimeout: number;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      let currentSection = 'home';

      // Find the section that's currently most visible in the viewport
      for (const link of navLinks) {
        const section = document.getElementById(link.to);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          
          // Check if section is visible in viewport
          if (sectionTop <= 100 && sectionBottom >= 100) {
            currentSection = link.to;
            break;
          }
        }
      }

      // If we're at the very top, set to home
      if (scrollPosition < 100) {
        currentSection = 'home';
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a small delay to prevent rapid changes
      scrollTimeout = setTimeout(() => {
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
          console.log('Active section changed to:', currentSection); // Debug log
        }
      }, 50);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection]); // Add activeSection as dependency

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const section = document.getElementById(to);
    if (section) {
      // Set active section immediately for better UX
      setActiveSection(to);
      
      // Smooth scroll to section
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const targetPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={e => handleAnchorClick(e, 'home')} 
            className="flex-shrink-0 flex items-center cursor-pointer group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-500 group-hover:to-purple-500">
              Pritish Divate
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={`#${link.to}`}
                onClick={e => handleAnchorClick(e, link.to)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === link.to
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                }`}
              >
                {link.name}
                {activeSection === link.to && (
                  <span className="block h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={`#${link.to}`}
                onClick={e => handleAnchorClick(e, link.to)}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  activeSection === link.to
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
