import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SecBrainIcon from "../icons/SecBrainIcon";

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add shadow/border dynamically
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = `text-sm font-medium transition-colors duration-200 ${
    isDarkMode ? 'text-[#86868B] hover:text-[#F5F5F7]' : 'text-[#86868B] hover:text-[#1D1D1F]'
  }`;

  return (
    <>
      <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        isDarkMode 
          ? `bg-[#000000]/70 ${scrolled ? 'border-b border-white/10' : 'border-b border-transparent'}` 
          : `bg-[#F5F5F7]/70 ${scrolled ? 'border-b border-black/5' : 'border-b border-transparent'}`
      }`}>
        
        <nav className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 h-14 md:h-16">
          
          {/* Brand / Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavigation("/")}
          >
            <SecBrainIcon width="24" height="24" className={`transition-transform duration-300 group-hover:scale-105 ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`} />
            <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
              isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}>
              Synapse
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation("/")} className={navLinkStyle}>
              Overview
            </button>
            <button onClick={() => handleNavigation("/about")} className={navLinkStyle}>
              About
            </button>
            
            <div className={`w-px h-4 ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>

            {/* Minimalist Theme Toggle (Icon Only) */}
            <button
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isDarkMode ? 'text-[#86868B] hover:text-[#F5F5F7]' : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>      
            
            <button 
              onClick={() => handleNavigation("/login")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-transform duration-200 hover:scale-[1.02] active:scale-95 text-white ${
                isDarkMode ? 'bg-[#0A84FF] hover:bg-[#007AFF]' : 'bg-[#0066CC] hover:bg-[#005BB5]'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Controls (Hamburger & Theme) */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 transition-colors ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Full-Screen Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ease-in-out ${
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Blur backdrop */}
        <div className={`absolute inset-0 backdrop-blur-2xl ${
          isDarkMode ? 'bg-[#000000]/80' : 'bg-[#F5F5F7]/90'
        }`} />
        
        {/* Menu Content */}
        <div className="relative pt-24 px-6 h-full flex flex-col">
          <div className="flex flex-col space-y-0">
            
            <button 
              onClick={() => handleNavigation("/")}
              className={`text-2xl font-semibold tracking-tight text-left py-4 border-b transition-colors ${
                isDarkMode ? 'text-[#F5F5F7] border-white/10' : 'text-[#1D1D1F] border-black/10'
              }`}
            >
              Overview
            </button>
            
            <button 
              onClick={() => handleNavigation("/about")}
              className={`text-2xl font-semibold tracking-tight text-left py-4 border-b transition-colors ${
                isDarkMode ? 'text-[#F5F5F7] border-white/10' : 'text-[#1D1D1F] border-black/10'
              }`}
            >
              About
            </button>

          </div>

          <div className="mt-8">
            <button 
              onClick={() => handleNavigation("/login")}
              className={`w-full py-4 rounded-2xl text-lg font-semibold transition-transform active:scale-95 text-white ${
                isDarkMode ? 'bg-[#0A84FF]' : 'bg-[#0066CC]'
              }`}
            >
              Sign In to Synapse
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;