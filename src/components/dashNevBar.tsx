import React from 'react';
import SecBrainIcon from "../icons/SecBrainIcon";

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onAddContentClick: () => void; 
}

const DashNavigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode, onAddContentClick }) => {
  return (
    <div className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      
      <nav className={`pointer-events-auto flex items-center justify-between px-4 py-2.5 md:px-5 md:py-3 rounded-full 
        backdrop-blur-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 w-full max-w-5xl ${
        isDarkMode 
          ? 'bg-[#1C1C1E]/40 border-white/10 shadow-black/50 text-[#F5F5F7]'
          : 'bg-[#FFFFFF]/40 border-black/5 shadow-black/5 text-[#1D1D1F]'
      }`}>
        
        <div className='flex items-center space-x-2.5 cursor-pointer group'>
          <div className="flex justify-center transition-transform duration-300 group-hover:scale-105">
            <SecBrainIcon width="24" height="24" className="md:w-7 md:h-7" />
          </div>
          <span className="text-base md:text-lg font-semibold tracking-tight">
            Synapse
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">

          <button
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDarkMode 
                ? 'hover:bg-white/10 text-[#A1A1A6] hover:text-[#F5F5F7]' 
                : 'hover:bg-black/5 text-[#86868B] hover:text-[#1D1D1F]'
            }`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button 
            onClick={onAddContentClick}
            className={`ml-1 md:ml-2 font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 text-white text-sm md:text-base shadow-sm ${
              isDarkMode 
                ? 'bg-[#0A84FF] hover:bg-[#007AFF]' 
                : 'bg-[#0066CC] hover:bg-[#005BB5]'
            }`}
          >
            Add New
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashNavigation;