import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  borderColor?: string;
  glowColor?: string;
  size?: 'small' | 'medium' | 'large';
  isDarkMode?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon,
  title, 
  description,
  size = "medium",
  isDarkMode = true
}) => {
  const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
    small: "p-4 sm:p-6 max-w-xs",
    medium: "p-6 sm:p-8 max-w-sm", 
    large: "p-8 sm:p-10 max-w-md"
  };

  return (
    <div className={`
      ${isDarkMode ? 'bg-slate-800/40' : 'bg-white/60'} backdrop-blur-sm rounded-2xl border-2 border-slate-400
      ${sizeClasses[size]} h-auto w-full 
      transition-all duration-100 hover:border-3 hover:border-blue-500
    `}>
      {/* Icon */}
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-colors duration-300 ${
          isDarkMode 
            ? 'text-white/80 group-hover:text-white' 
            : 'text-gray-700 group-hover:text-gray-900'
        }`}>
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className={`text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 transition-colors duration-300 ${
        isDarkMode 
          ? 'text-white group-hover:text-white/90' 
          : 'text-gray-900 group-hover:text-gray-700'
      }`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`text-xs sm:text-sm text-center leading-relaxed transition-colors duration-300 ${
        isDarkMode 
          ? 'text-gray-400 group-hover:text-gray-300' 
          : 'text-gray-600 group-hover:text-gray-500'
      }`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;