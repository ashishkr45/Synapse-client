import { ShareIcon, DeleteIcon, FileIcon, QuoteIcon, BookmarkIcon, CodeIcon, CalendarIcon, } from "../../icons/Icons";
import { IconProps } from "../../icons";
import { z } from "zod";
import { MediaEmbedCard, MediaType } from "./mediaCard";
import { extractEmbedType } from "../../utility/embedId";
import { NoteCard } from "./noteCade";

export const contentTypes = z.enum([
  "link",
  "document",
  "code",
  "note",
  "quote",
  "event",
  "bookmark",
]);

export interface CardProps {
  type: z.infer<typeof contentTypes>;
  title: string;
  tags: string[];
  time: Date | string;
  notes?: string;
  url?: string;
  isDarkMode: boolean;
  onDelete?: () => void;
}

// Exported so other components (like CreateContentModel) can reuse this exact same palette
export const lightPastelColors = [
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
  "bg-red-100 text-red-700 border-red-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
];

export const darkPastelColors = [
  "bg-pink-900/30 text-pink-300 border-pink-800/50",
  "bg-blue-900/30 text-blue-300 border-blue-800/50",
  "bg-green-900/30 text-green-300 border-green-800/50",
  "bg-yellow-900/30 text-yellow-300 border-yellow-800/50",
  "bg-purple-900/30 text-purple-300 border-purple-800/50",
  "bg-indigo-900/30 text-indigo-300 border-indigo-800/50",
  "bg-red-900/30 text-red-300 border-red-800/50",
  "bg-orange-900/30 text-orange-300 border-orange-800/50",
  "bg-teal-900/30 text-teal-300 border-teal-800/50",
  "bg-cyan-900/30 text-cyan-300 border-cyan-800/50",
];

const typeIcons: Record<string, React.FC<IconProps>> = {
  document: FileIcon,
  code: CodeIcon,
  quote: QuoteIcon,
  event: CalendarIcon,
  bookmark: BookmarkIcon,
  note: FileIcon,
  link: FileIcon,
};

export const Card = (props: CardProps) => {
  const { type, title, tags, time, url, notes, isDarkMode, onDelete } = props;

  // 1. Handle Notes
  if (type === "note") {
    return (
      <NoteCard
        title={title}
        tags={tags}
        time={time}
        notes={notes}
        isDarkMode={isDarkMode}
        onDelete={onDelete}
      />
    );
  }

  // 2. Handle Links (Embeds or Generic)
  if (type === "link" && url) {
    const mediaType = extractEmbedType(url);
    if (mediaType) {
      return (
        <MediaEmbedCard
          type={type}
          title={title}
          tags={tags}
          time={time}
          url={url}
          mediaType={mediaType as MediaType}
          isDarkMode={isDarkMode}
          onDelete={onDelete}
        />
      );
    }

    return (
      <DefaultCard
        type={type}
        title={title}
        tags={tags}
        time={time}
        content={url}
        isDarkMode={isDarkMode}
        isLink
        onDelete={onDelete}
      />
    );
  }

  // 3. Handle Everything Else (Code, Quote, Event, Bookmark, Document)
  return (
    <DefaultCard
      type={type}
      title={title}
      tags={tags}
      time={time}
      content={notes || "No content available."}
      isDarkMode={isDarkMode}
      onDelete={props.onDelete} 
    />
  );
};

interface DefaultCardProps {
  type: string;
  title: string;
  tags: string[];
  time: Date | string;
  content?: string;
  isDarkMode: boolean;
  isLink?: boolean;
  onDelete?: () => void;
}

const DefaultCard = ({
  type,
  title,
  tags,
  time,
  content,
  isDarkMode,
  isLink,
  onDelete
}: DefaultCardProps) => {
  
  const getTagColor = (index: number) => {
    const colors = isDarkMode ? darkPastelColors : lightPastelColors;
    return colors[index % colors.length];
  };

  const Icon = typeIcons[type] || FileIcon;

  return (
    <article
      className={`${
        isDarkMode
          ? "bg-gray-800/30 border-slate-900 text-gray-50"
          : "bg-white border-gray-200 text-gray-900"
      } break-inside-avoid rounded-xl border shadow-sm hover:shadow-2xl transition-all duration-300 w-full mb-4`}
    >
      <div className="p-4">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <Icon size="sm" color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
            </div>
            <h3
              className={`text-sm font-semibold truncate ${
                isDarkMode ? "text-gray-50" : "text-gray-900"
              }`}
              title={title}
            >
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 hover:bg-gray-700/20 rounded transition-colors">
              <ShareIcon size="md" color={isDarkMode ? "#a1a1aa" : "#6b7280"} />
            </button>
            <button 
              className="p-1.5 hover:bg-red-500/10 rounded transition-colors group"
              onClick={onDelete}
            >
              <DeleteIcon size="md" color={isDarkMode ? "#a1a1aa" : "#6b7280"} />
            </button>
          </div>
        </div>

        {/* Dynamic Body Content based on Type */}
        <div className={`text-sm mb-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          
          {isLink ? (
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all inline-block mt-1"
            >
              {content}
            </a>
          
          ) : type === "code" ? (
            <div className={`mt-2 rounded-lg overflow-hidden border ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-gray-900 border-gray-800'}`}>
              <div className="flex items-center px-3 py-2 bg-black/20 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              <pre className="p-3 overflow-x-auto text-[13px] font-mono text-gray-300 whitespace-pre-wrap">
                <code>{content || "No code provided."}</code>
              </pre>
            </div>
            
          ) : type === "quote" ? (
            <blockquote className={`pl-4 py-1 my-2 border-l-4 italic ${isDarkMode ? 'border-indigo-500 text-gray-400' : 'border-indigo-500 text-gray-600'}`}>
              "{content || "No quote provided."}"
            </blockquote>

          ) : type === "event" ? (
            <div className={`flex items-start gap-3 p-3 mt-1 rounded-lg border ${isDarkMode ? 'bg-indigo-900/20 border-indigo-800/30' : 'bg-indigo-50 border-indigo-100'}`}>
              <div className="mt-0.5"><CalendarIcon size="sm" color={isDarkMode ? '#818cf8' : '#6366f1'} /></div>
              <span className="font-medium">{content || "No event details provided."}</span>
            </div>

          ) : type === "bookmark" ? (
            <div className={`flex items-start gap-3 p-3 mt-1 rounded-lg border ${isDarkMode ? 'bg-amber-900/20 border-amber-800/30' : 'bg-amber-50 border-amber-100'}`}>
              <div className="mt-0.5"><BookmarkIcon size="sm" color={isDarkMode ? '#fbbf24' : '#f59e0b'} /></div>
              <span className="font-medium break-words w-full">{content || "No bookmark details."}</span>
            </div>

          ) : (
            <p className="whitespace-pre-line mt-1">
              {content || "No content available."}
            </p>
          )}

        </div>

        {/* Footer */}
        <div className="space-y-2">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`${getTagColor(
                    index,
                  )} px-2 py-0.5 rounded-2xl text-xs font-medium`}
                >
                  {tag}
                </span>
              ))}
              <span
                className={`${
                  isDarkMode
                    ? "text-gray-300 bg-stone-700 border-stone-900"
                    : "text-gray-500 bg-slate-200 border-stone-600"
                } text-xs px-2 py-0.5 rounded-2xl font-medium ml-auto`}
              >
                {new Date(time).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          
          {(!tags || tags.length === 0) && (
             <div className="flex justify-end">
               <span
                className={`${
                  isDarkMode
                    ? "text-gray-300 bg-stone-700 border-stone-900"
                    : "text-gray-500 bg-slate-200 border-stone-600"
                } text-xs px-2 py-0.5 rounded-2xl font-medium`}
              >
                {new Date(time).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
             </div>
          )}
        </div>

      </div>
    </article>
  );
};