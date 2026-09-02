import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shareContent, ContentTag } from "../utility/contentApi";
import { Card } from "../components/ui/spaceCard";
import SecBrainIcon from "../icons/SecBrainIcon";

interface SharedContentProps {
  isDarkMode: boolean;
}

export default function SharedContentPage({ isDarkMode }: SharedContentProps) {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();

  const { data: content, isLoading, isError } = useQuery({
    queryKey: ["sharedContent", shareId],
    queryFn: () => shareContent(shareId as string),
    enabled: !!shareId,
  });

  return (
    <div className={`min-h-screen flex flex-col items-center pt-24 pb-12 px-4 transition-colors duration-300 font-sans ${
      isDarkMode ? "bg-[#000000] text-[#F5F5F7]" : "bg-[#F5F5F7] text-[#1D1D1F]"
    }`}>
      
      <div className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode ? "bg-[#000000]/70 border-white/10" : "bg-[#FFFFFF]/70 border-black/5"
      }`}>
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <SecBrainIcon width="20" height="20" className={isDarkMode ? "text-white" : "text-black"} />
            <span className="font-semibold text-sm tracking-tight">Synapse Shared</span>
          </div>
          <button 
            onClick={() => navigate("/")}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-transform duration-200 hover:scale-[1.02] active:scale-95 text-white ${
              isDarkMode ? "bg-[#0A84FF]" : "bg-[#0066CC]"
            }`}
          >
            Create your own
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin ${
              isDarkMode ? "border-[#0A84FF]" : "border-[#0066CC]"
            }`}></div>
            <p className="mt-4 text-sm font-medium text-gray-500">Loading shared content...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 border ${
              isDarkMode ? "bg-[#1C1C1E] border-white/10 text-gray-500" : "bg-white border-black/5 text-gray-400"
            }`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Content Unavailable</h2>
            <p className="text-gray-500">This link may have expired or been made private by the owner.</p>
          </div>
        )}

        {content && (
          <div className="pointer-events-none">
            <div className="[&_a]:pointer-events-auto">
              <Card
                type={content.type}
                title={content.title}
                tags={content.tags.map((tag: ContentTag) => tag.title)}
                time={new Date(content.createdAt)}
                notes={content.note}
                url={content.link}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

