import Navigation from "../components/nevBar";
import Footer from "../components/ui/footer";
import { XIcon, LinkedInIcon, GithubIcon } from '../icons/Icons';

interface AboutPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-black text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow flex items-center justify-center px-6 py-24">
        
        <div className={`max-w-2xl w-full rounded-[2.5rem] p-10 md:p-14 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#1C1C1E]/80 backdrop-blur-xl' 
            : 'bg-white/70 backdrop-blur-xl'
        }`}>
          
          <div className="flex flex-col items-center text-center">
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
              isDarkMode ? 'bg-[#2C2C2E]' : 'bg-[#EAEAED]'
            }`}>
              <span className="text-3xl font-medium tracking-tight">
                AK
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              Ashish Kumar
            </h1>
            <p className="text-base text-[#86868B] mb-8">
              Software Developer
            </p>
            <p className={`text-base leading-relaxed max-w-lg mb-12 ${
              isDarkMode ? 'text-[#A1A1A6]' : 'text-[#424245]'
            }`}>
              I’m a computer science student and full-stack developer focused on building
              clean, thoughtful digital experiences. Currently exploring backend systems,
              DevOps, and intelligent applications.
            </p>
            <div className="flex flex-col items-center gap-8 w-full">              
              <a 
                href="mailto:ashishkr45943@gmail.com" 
                className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 
                active:scale-95 ${
                  isDarkMode 
                    ? 'bg-[#0A84FF] hover:bg-[#007AFF]' 
                    : 'bg-[#0071E3] hover:bg-[#0066CC]'
                } text-white`}
              >
                Contact
              </a>
              <div className="flex items-center gap-3">
                <SocialLink href="https://github.com/ashishkr45" icon={<GithubIcon className="w-5 h-5" />} isDarkMode={isDarkMode} />
                <SocialLink href="https://twitter.com/ashishkr45" icon={<XIcon />} isDarkMode={isDarkMode} />
                <SocialLink href="https://linkedin.com/in/ashishkr45" icon={<LinkedInIcon />} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

const SocialLink = ({ href, icon, isDarkMode }: { href: string, icon: React.ReactNode, isDarkMode: boolean }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`p-3 rounded-full transition-all duration-200 ${
      isDarkMode 
        ? 'text-[#86868B] hover:text-white hover:bg-[#2C2C2E]' 
        : 'text-[#86868B] hover:text-black hover:bg-[#EAEAED]'
    }`}
  >
    {icon}
  </a>
);

export default AboutPage;