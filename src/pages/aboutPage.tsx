import Navigation from "../components/nevBar";
import Footer from "../components/ui/footer";
import { XIcon, LinkedInIcon, GithubIcon } from '../icons/Icons';

interface AboutPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void; 
}

const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode, toggleDarkMode}) => {
  const linkStyle = `transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`;

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#191a1a]' : 'bg-[#eaeaea]'
    }`}>
      
      {/* The 'relative' class remains on <main>, but min-h-screen has been removed. */}
      <main className="relative pb-6">
        
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Centering container for the card */}
        <div className="flex items-center justify-center px-4 py-24 sm:py-32">

          {/* The main "About Me" card */}
          <div className={`max-w-md w-full rounded-2xl p-8 md:p-10 shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/70 border border-gray-200/80'
          }`}>
            <div className="flex flex-col items-center text-center">
              
              {/* Profile Picture Placeholder */}
              <div className="w-24 h-24 bg-gray-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">A</span>
              </div>

              {/* Your Name */}
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Ashish Kumar
              </h1>

              {/* Your Email */}
              <a 
                href="mailto:ashish.kr@example.com" 
                className={`mt-2 text-md ${linkStyle}`}
              >
                ashishkr45943@gmail.com
              </a>

              {/* Social Links */}
              <div className="flex items-center space-x-6 mt-6">
                <a href="https://github.com/ashishkr45" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  <GithubIcon className="h-6 w-6" />
                </a>
                <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  <XIcon size="lg" />
                </a>
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  <LinkedInIcon size="lg" />
                </a>
              </div>

            </div>
          </div>
        </div>
        
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
};

export default AboutPage;