import { ReactElement } from 'react';
import SecBrainIcon from '../icons/SecBrainIcon';
import { XIcon, Video, Docx, Links, Hash, HamBurger } from '../icons/Icons';

interface SideBarProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export function SideBar({ isCollapsed, onToggle }: SideBarProps) {
  const toggleSidebar = () => {
    onToggle(!isCollapsed);
  };

  return (
    <div className={`p-2 pt-3.5 mb-3 min-h-screen bg-white fixed shadow-2xl transition-all duration-300   ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <HamBurger size="md" color="#232948" />
      </button>

      {/* logo with mainText */}
      <div className='flex items-center mb-8 ml-3'>
        <div className="flex-shrink-0 w-10 flex justify-center">
          <SecBrainIcon width="40" height="40" />
        </div>
        <div className="flex-1 overflow-hidden">
          <span className={`text-xl antialiased font-bold text-gray-800 transition-all duration-300 block whitespace-nowrap pl-2 ${
            isCollapsed ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'
          }`}>
            Second Brain
          </span>
        </div>
      </div>

      {/* the rest of the hot-links */}
      <div className='space-y-1'>
        <IconTextPair 
          mainText='Tweets' 
          icon={<XIcon size='lg' color='#232948'/>} 
          isCollapsed={isCollapsed}
        />
        <IconTextPair 
          mainText='Videos' 
          icon={<Video size='lg' color='#232948'/>} 
          isCollapsed={isCollapsed}
        />
        <IconTextPair 
          mainText='Documents' 
          icon={<Docx size='lg' color='#232948'/>} 
          isCollapsed={isCollapsed}
        />
        <IconTextPair 
          mainText='Links' 
          icon={<Links size='lg' color='#232948'/>} 
          isCollapsed={isCollapsed}
        />
        <IconTextPair 
          mainText='Tags' 
          icon={<Hash size='lg' color='#232948'/>} 
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}

interface IconTextPairProps {
  mainText: string;
  icon: ReactElement;
  isCollapsed: boolean;
}

function IconTextPair({ mainText, icon, isCollapsed }: IconTextPairProps) {
  return (
    <div 
      className="group relative p-3 mx-2 flex items-center rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#f2f5fc] hover:shadow-md hover:scale-105 active:scale-95"
      title={isCollapsed ? mainText : undefined}
    >
      <div className="flex-shrink-0 w-6 flex justify-center items-center transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <div className="flex-1 overflow-hidden">
        <span className={`text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-all duration-300 block whitespace-nowrap pl-3 ${
          isCollapsed ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          {mainText}
        </span>
      </div>
      
      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
          {mainText}
        </div>
      )}
    </div>
  );
}