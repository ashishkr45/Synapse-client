import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDarkMode: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDarkMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 p-4">
      <div 
        className={`${
          isDarkMode ? 'bg-stone-800 text-gray-100 border-stone-700' : 'bg-white text-gray-900 border-gray-200'
        } rounded-2xl shadow-2xl border p-6 w-full max-w-sm transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-200`}
      >
        <h3 className="text-lg font-semibold mb-2">Delete Content</h3>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Are you sure you want to delete this card? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isDarkMode 
              ? 'hover:bg-stone-700 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};