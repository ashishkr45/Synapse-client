import { useNavigate } from "react-router-dom";
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
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-[#000000] text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow flex flex-col items-center">
        <section className="w-full max-w-5xl mx-auto px-4 pt-32 pb-20 md:pt-48 md:pb-24 flex flex-col items-center text-center">
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6">
            Capture everything. <br className="hidden md:block" />
            Lose nothing.
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-2xl font-medium tracking-tight mb-10 ${
            isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'
          }`}>
            Stop losing great articles and videos in endless tabs. Save URLs instantly, get rich previews, and build your searchable second brain.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 text-white ${
              isDarkMode 
                ? 'bg-[#0A84FF] hover:bg-[#007AFF]' 
                : 'bg-[#0066CC] hover:bg-[#005BB5]'
            }`}
          >
            Start saving for free
          </button>
        </section>
        <section id="features" className="w-full max-w-6xl mx-auto px-4 pb-32">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              A smarter way to save.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            
            <div className={`md:col-span-2 rounded-[2rem] p-10 md:p-12 border transition-colors duration-300 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${
                isDarkMode ? 'bg-[#2C2C2E] text-[#0A84FF]' : 'bg-[#F5F5F7] text-[#0066CC]'
              }`}>
                <Links size="lg" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-3">Rich Previews.</h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
                  Paste any URL and Synapse automatically extracts the title, description, and high-quality thumbnail. Your chaotic links instantly transform into a clean, readable library.
                </p>
              </div>
            </div>
            <div className={`rounded-[2rem] p-10 border transition-colors duration-300 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${
                isDarkMode ? 'bg-[#2C2C2E] text-[#30D158]' : 'bg-[#F5F5F7] text-[#34C759]'
              }`}>
                <Hash size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Intelligent Tags.</h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
                  Group your videos, articles, and research into highly searchable, customized categories.
                </p>
              </div>
            </div>
            <div className={`rounded-[2rem] p-10 border transition-colors duration-300 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${
                isDarkMode ? 'bg-[#2C2C2E] text-[#FF9F0A]' : 'bg-[#F5F5F7] text-[#FF9500]'
              }`}>
                <Docx size="lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Add Context.</h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
                  Don't just save it. Attach detailed personal notes directly to your saved links so you remember exactly why it mattered.
                </p>
              </div>
            </div>
            <div className={`md:col-span-2 rounded-[2rem] p-10 md:p-12 border transition-colors duration-300 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${
                isDarkMode ? 'bg-[#2C2C2E] text-[#BF5AF2]' : 'bg-[#F5F5F7] text-[#AF52DE]'
              }`}>
                <ShareIcon size="lg" color="currentColor" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-3">Share your curation.</h3>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-[#86868B]' : 'text-[#86868B]'}`}>
                  Compiled the ultimate list of system design resources? Bundle your saved links and share your curated spaces with teammates in a single click.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default LandingPage;