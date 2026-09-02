import { useState, useEffect } from "react";
import { CrossIcon, AddIcon, ChevronDownIcon } from "../icons/Icons";
import { z } from "zod";
import { ContentFormData } from "../utility/contentApi";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSubmit: (data: ContentFormData) => void;
}

const contentTypes = z.enum([
  "link",
  "code",
  "note",
  "quote",
  "event",
  "bookmark",
]);
type ContentType = z.infer<typeof contentTypes>;

const CreateContentModel = ({ open, onClose, isDarkMode, onSubmit }: CreateContentModelProps) => {
  const [selectedType, setSelectedType] = useState<ContentType | "">("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];

    if (!selectedType) newErrors.push("Please select a content type");
    if (!title.trim()) newErrors.push("Please enter a title");
    if (selectedType === "link" && !link.trim()) newErrors.push("Please enter a link");
    if (selectedType && selectedType !== "link" && !note.trim()) newErrors.push("Please enter your note");
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    onSubmit({
      type: selectedType as ContentType,
      title: title.trim(),
      link: link.trim() ? link.trim() : undefined,
      note: note.trim() ? note.trim() : undefined,
      tags: tags.filter(tag => tag.trim() !== "")
    });

    setSelectedType("");
    setTitle("");
    setLink("");
    setNote("");
    setTags([]);
    setCurrentTag("");
    onClose();
  };
  
  const formatTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (!open && !isAnimating) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100 backdrop-blur-md' : 'opacity-0 backdrop-blur-none'
      } ${isDarkMode ? 'bg-black/10' : 'bg-black/20'}`} 
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-lg p-8 rounded-[2rem] border shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-300 transform ${
          isAnimating ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        } ${
          isDarkMode 
            ? 'bg-[#1C1C1E]/80 backdrop-blur-3xl border-white/10 text-[#F5F5F7]' 
            : 'bg-white/80 backdrop-blur-3xl border-white/40 text-[#1D1D1F]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Create Content</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-[#86868B]' : 'hover:bg-black/5 text-[#86868B]'
            }`}
          >
            <CrossIcon size="md" color="currentColor" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Content Type</label>
            <Dropdown
              value={selectedType}
              onChange={setSelectedType}
              options={contentTypes.options.map(type => ({
                value: type,
                label: formatTypeName(type)
              }))}
              placeholder="Select what you're saving..."
              isDarkMode={isDarkMode}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Title</label>
            <Input 
              placeholder="Enter a descriptive title" 
              value={title}
              onChange={(value) => setTitle(value)} 
              isDarkMode={isDarkMode}
            />
          </div>

          {selectedType === "link" && (
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>URL</label>
              <Input 
                placeholder="https://" 
                value={link}
                onChange={(value) => setLink(value)}  
                isDarkMode={isDarkMode}
              />
            </div>
          )}
    
          {selectedType && selectedType !== "link" && (
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Note / Content</label>
              <textarea
                placeholder="Write your thoughts down..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl min-h-[120px] resize-y focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-white/5 border border-white/5 text-[#F5F5F7] placeholder-[#86868B] focus:bg-[#2C2C2E] focus:ring-[#0A84FF] focus:border-transparent' 
                    : 'bg-black/5 border border-transparent text-[#1D1D1F] placeholder-[#86868B] focus:bg-white focus:ring-[#0066CC] focus:border-transparent shadow-inner'
                }`}
              />
            </div>
          )}
    
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-[#A1A1A6]' : 'text-[#86868B]'}`}>Tags</label>
            <div className="flex gap-2 mb-3">
              <Input 
                placeholder="Add a tag..." 
                value={currentTag}
                onChange={(value) => setCurrentTag(value)}
                onKeyPress={handleKeyPress}
                isDarkMode={isDarkMode}
              />
              <button
                onClick={addTag}
                className={`px-4 py-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-[#F5F5F7]' 
                    : 'bg-black/5 hover:bg-black/10 text-[#1D1D1F]'
                }`}
              >
                Add
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                      isDarkMode 
                        ? 'bg-[#0A84FF]/10 text-[#0A84FF] border border-[#0A84FF]/20' 
                        : 'bg-[#0066CC]/10 text-[#0066CC] border border-[#0066CC]/20'
                    }`}
                  >
                    <span className="truncate max-w-[150px]">{tag}</span>
                    <button 
                      onClick={() => removeTag(tag)}
                      className="hover:opacity-60 font-bold transition-opacity"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
    
          {errors.length > 0 && (
            <div className={`mt-4 p-4 rounded-2xl border ${
              isDarkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'
            }`}>
              <div className={`text-sm space-y-1 font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {errors.map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 text-white ${
                isDarkMode ? 'bg-[#0A84FF] hover:bg-[#007AFF]' : 'bg-[#0066CC] hover:bg-[#005BB5]'
              }`}
            >
              <AddIcon size='md' color="#fff"/>
              Save Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputProps {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  isDarkMode: boolean;
}

function Input({ onChange, placeholder, value, onKeyPress, isDarkMode }: InputProps) {
  const themeClasses = isDarkMode 
    ? "bg-white/5 border-white/5 text-[#F5F5F7] placeholder-[#86868B] focus:bg-[#2C2C2E] focus:ring-[#0A84FF] focus:border-transparent" 
    : "bg-black/5 border-transparent text-[#1D1D1F] placeholder-[#86868B] focus:bg-white focus:ring-[#0066CC] focus:border-transparent shadow-inner";

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${themeClasses}`}
      />
    </div>
  );
}

interface DropdownProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  placeholder: string;
  isDarkMode: boolean;
}

function Dropdown<T extends string>({ value, onChange, options, placeholder, isDarkMode }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonThemeClasses = isDarkMode 
    ? "bg-white/5 border-white/5 text-[#F5F5F7] focus:bg-[#2C2C2E] focus:ring-[#0A84FF]" 
    : "bg-black/5 border-transparent text-[#1D1D1F] focus:bg-white focus:ring-[#0066CC] shadow-inner";
  
  const panelThemeClasses = isDarkMode 
    ? "bg-[#2C2C2E]/90 backdrop-blur-xl border-[#3A3A3C] shadow-black/50" 
    : "bg-white/90 backdrop-blur-xl border-black/5 shadow-black/10";
    
  const optionThemeClasses = isDarkMode 
    ? "text-[#F5F5F7] hover:bg-[#0A84FF] hover:text-white" 
    : "text-[#1D1D1F] hover:bg-[#0066CC] hover:text-white";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-2xl text-left focus:outline-none focus:ring-2 transition-all duration-200 flex justify-between items-center ${buttonThemeClasses}`}
      >
        <span className={value ? "" : "text-[#86868B]"}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <ChevronDownIcon size="sm" color={isDarkMode ? '#86868B' : '#86868B'} />
      </button>

      {isOpen && (
        <div className={`absolute z-20 w-full mt-2 border rounded-2xl shadow-xl overflow-hidden py-1 ${panelThemeClasses}`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left font-medium text-sm focus:outline-none transition-colors ${optionThemeClasses}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreateContentModel;