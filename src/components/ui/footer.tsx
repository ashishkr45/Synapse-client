import React from 'react';
import SecBrainIcon from '../../icons/SecBrainIcon';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  
  const linkStyle = `transition-colors duration-200 text-sm ${
    isDarkMode 
      ? 'text-[#86868B] hover:text-[#F5F5F7]' 
      : 'text-[#86868B] hover:text-[#1D1D1F]'
  }`;
  
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className={`w-full pt-16 pb-8 border-t transition-colors duration-300 font-sans ${
      isDarkMode 
        ? 'bg-[#000000] border-white/10' 
        : 'bg-[#F5F5F7] border-black/5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="flex flex-col space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <SecBrainIcon width="28" height="28" className={isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}/>
              <span className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                Synapse
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
              Capture everything. Lose nothing. Your searchable second brain.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`font-semibold text-sm tracking-tight mb-4 ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                Explore
              </h3>
              <div className="flex flex-col space-y-3">
                <a href="#features" onClick={(e) => handleScroll(e, 'features')} className={linkStyle}>Features</a>
                <a href="/about" className={linkStyle}>About</a>
              </div>
            </div>

            <div>
              <h3 className={`font-semibold text-sm tracking-tight mb-4 ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                Connect
              </h3>
              <div className="flex flex-col space-y-3">
                <a href="mailto:ashishkr45943@gmail.com" className={linkStyle}>Contact Us</a>
                <a href="https://github.com/ashishkr45" target="_blank" rel="noreferrer" className={linkStyle}>GitHub</a>
              </div>
            </div>

            <div>
              <h3 className={`font-semibold text-sm tracking-tight mb-4 ${isDarkMode ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                Social
              </h3>
              <div className="flex flex-col space-y-3">
                <a href="https://twitter.com/ashishkr45" target="_blank" rel="noreferrer" className={linkStyle}>X (Twitter)</a>
                <a href="https://www.linkedin.com/in/ashishkr45/" target="_blank" rel="noreferrer" className={linkStyle}>LinkedIn</a>
              </div>
            </div>
          </div>

        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDarkMode ? 'border-white/10' : 'border-black/5'
        }`}>
          <p className={`text-xs ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
            &copy; {new Date().getFullYear()} Synapse. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className={`text-xs ${linkStyle}`}>Privacy Policy</a>
            <a href="#" className={`text-xs ${linkStyle}`}>Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;