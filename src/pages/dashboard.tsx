import { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Card } from '../components/ui/spaceCard';
import CreateContentModel from '../components/createContentModel';
import DashNavigation from '../components/dashNevBar';
import { CardSkeleton } from '../components/ui/CardSkeleton';
import { DeleteConfirmationModal } from '../components/ui/deleteConfirmationModel';
import toast from 'react-hot-toast';

const contentFormSchema = z.object({
  type: z.enum([
    "article", "tweet", "link", "document", "youtube", 
    "code", "thread", "note", "quote", "event", 
    "bookmark", "post", "reel",
  ]),
  title: z.string(),
  link: z.string().optional(),
  note: z.string().optional(),
  tags: z.array(z.string()),
});
export type ContentFormData = z.infer<typeof contentFormSchema>;


const fetchUserContent = async () => {
  const token = localStorage.getItem('app_token');
  if (!token) throw new Error("Authentication token not found,!");

  const response = await axios.get('http://localhost:3000/api/content/board', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.content;
};

const createNewContent = async (newContentData: ContentFormData) => {
  const token = localStorage.getItem('app_token');
  if (!token) throw new Error("No authorization token found.");

  const response = await axios.post('http://localhost:3000/api/content/board', newContentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteContent = async (id: string) => {
  const token = localStorage.getItem('app_token');
  if (!token) throw new Error("No authorization token found.");
  console.log('[deleteContent] id:', id);

  await axios.delete(`http://localhost:3000/api/content/board/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

interface DashboardProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Dashboard({ isDarkMode, toggleDarkMode }: DashboardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  const { data: content, isLoading, isError } = useQuery({
    queryKey: ['userContent'],
    queryFn: fetchUserContent,
  });

  const createContentMutation = useMutation({
    mutationFn: createNewContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userContent'] });
      toast.success('Saved to Synapse');
    },
    onError: () => {
      toast.error('Failed to save content');
    }
  });
  
  const handleCreateContent = (data: ContentFormData) => {
    createContentMutation.mutate(data);
  };

  const deleteContentMutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userContent'] });
      toast.success('Item deleted');
    },
    onError: () => {
      toast.error('Failed to delete item');
    }
  });

  const handleDeleteClick = (id: string) => {
    setContentToDelete(id);
  };

  const confirmDelete = () => {
    if (contentToDelete) {
      deleteContentMutation.mutate(contentToDelete);
      setContentToDelete(null);
    }
  };


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-900' : 'bg-[#eaeaea]'} transition-all ease-linear duration-300 pl-4 pr-4`}>
      <DashNavigation
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onAddContentClick={() => setModalOpen(true)}
      />
      
      <CreateContentModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isDarkMode={isDarkMode}
        onSubmit={handleCreateContent}
      />

      <DeleteConfirmationModal
        isOpen={contentToDelete !== null}
        onClose={() => setContentToDelete(null)}
        onConfirm={confirmDelete}
        isDarkMode={isDarkMode}
      />

      <div className="p-4 pt-24">
        {isLoading && 
          <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-2'>
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} isDarkMode={isDarkMode} />
            ))}
          </div>
        }
        
        {isError && <p className="text-red-500">Error fetching your content.</p>}
        
        {/* EMPTY STATE */}
        {content && content.length === 0 && !isLoading && !isError && (
          <div className="flex flex-col items-center justify-center pt-20 pb-16 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-200/50'}`}>
              <svg className={`w-10 h-10 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Your space is empty
            </h2>
            <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Add your first link, note, or document to get started.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Add Content
            </button>
          </div>
        )}

        {/* CONTENT GRID */}
        {content && content.length > 0 && (
          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 max-w-[95%] mx-auto'>
            {content.map((item: any) => (
              <div 
                key={item._id}
                className="break-inside-avoid mb-4"
                style={{ 
                  breakInside: 'avoid',
                  pageBreakInside: 'avoid',
                  display: 'inline-block',
                  width: '100%'
                }}
              >
                <Card
                  type={item.type}
                  title={item.title}
                  tags={item.tags.map((tag: any) => tag.title)}
                  time={new Date(item.createdAt)}
                  notes={item.note}
                  url={item.link}
                  isDarkMode={isDarkMode}
                  onDelete={() => {
                    handleDeleteClick(item._id) 
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;