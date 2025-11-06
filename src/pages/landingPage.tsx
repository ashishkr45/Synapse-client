import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/ui/featureCard";
import { Hash, Links, Docx, ShareIcon } from "../icons/Icons";
import Navigation from "../components/nevBar";
import Footer from "../components/ui/footer";

interface LandingPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void; 
}

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#191a1a]' : 'bg-[#eaeaea]'
    }`}>
      <main className="flex-grow">
        
        {/* Navigation Component */}
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Hero Section */}
        <div className="mb-20 md:mb-40 pt-3">
          <div className={`transition-colors duration-300 pt-32 md:pt-48 z-0 px-4 md:px-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {/* Headlines... */}
            <div className={`flex justify-center transition-colors duration-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium md:font-normal text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ease Your Brain
            </div> 
            <div className={`flex justify-center transition-colors duration-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium md:font-normal text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Store Ideas in
            </div> 
            {/* Gradient Text... */}
            <div className={`flex justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-6 md:pb-8 text-center`}>
              <span className="bg-gradient-to-r from-indigo-300 via-indigo-900 to-blue-900 bg-clip-text text-transparent">
                Second Brain
              </span>
            </div>
            {/* Description... */}
            <div className={`flex justify-center transition-colors duration-300 text-base sm:text-lg md:text-xl lg:text-2xl pb-8 md:pb-10 text-center max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Capture thoughts instantly. Organize effortlessly. 
              <br className="hidden sm:block" />
              Never lose a brilliant idea again.
            </div> 
          </div>

          {/* CTA Button... */}
          <div className="flex justify-center px-4">
            <button 
              className="px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-indigo-700 rounded-xl text-gray-50 hover:bg-blue-700 transition-colors duration-200 text-base md:text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div id="features" className={`transition-colors duration-300 px-4 md:px-8 lg:px-16 pt-16 md:pt-24`}>
          <div className={`max-w-7xl mx-auto p-32 rounded-3xl mb-20 backdrop-blur-md transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800/30 border border-gray-600/20' : 'bg-gray-400/20 border border-gray-300/30'
          }`}>
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Store Your Important Links
              </h2>
              <p className={`text-lg md:text-xl max-w-3xl mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Organize, categorize, and manage all your valuable content in one secure place
              </p>
            </div>
            {/* Feature Cards Grid... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-7">
              <FeatureCard icon={<Hash size="lg" />} title="Smart Tags" description="Organize your content with intelligent tagging system..." size="medium" isDarkMode={isDarkMode} />
              <FeatureCard icon={<Links size="lg" />} title="Link Previews" description="Get instant previews of your saved links..." size="medium" isDarkMode={isDarkMode} />
              <FeatureCard icon={<Docx size="lg" />} title="Notes & Documentation" description="Create and store detailed notes alongside your links..." size="medium" isDarkMode={isDarkMode} />
              <FeatureCard icon={<ShareIcon size="lg" color="#74777d"/>} title="Easy Sharing" description="Share your curated collections with teammates..." size="medium" isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer outside of main, without negative margin */}
      <Footer isDarkMode={isDarkMode} />
    </div>
    
  );
}

export default LandingPage;