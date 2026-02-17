
import React, { useRef, useState } from 'react';
import CameraModal from './CameraModal';

interface ChatInputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  selectedFile,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-slate-900/50 border-t border-border-dark w-full">
      <CameraModal 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
        onCapture={onFileSelect} 
      />

      {/* File Preview Badge */}
      {selectedFile && (
        <div className="mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-border-dark px-3 py-1.5 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm">
              {selectedFile.type.includes('image') ? 'image' : 'description'}
            </span>
            <span className="text-xs font-medium text-slate-200 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
            <button 
              onClick={removeFile}
              type="button"
              className="ml-1 text-slate-400 hover:text-white transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Container */}
      <form 
        onSubmit={onSubmit} 
        className="flex items-center gap-2 bg-slate-900 border border-border-dark rounded-2xl p-2 px-3 focus-within:border-primary/50 transition-all shadow-inner"
      >
        {/* Hidden File Input for Documents */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,image/png,image/jpeg"
          className="hidden"
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="size-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0"
          title="Attach file (PDF, PNG, JPG)"
        >
          <span className="material-symbols-outlined text-xl">attach_file</span>
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about your medicine..."
          className="flex-grow bg-transparent border-none focus:ring-0 text-white text-sm py-2 px-1 placeholder:text-slate-500"
          disabled={isLoading}
        />

        {/* Camera Button */}
        <button
          type="button"
          onClick={() => setIsCameraOpen(true)}
          className="size-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0"
          title="Take a photo"
        >
          <span className="material-symbols-outlined text-xl">photo_camera</span>
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading || (!value.trim() && !selectedFile)}
          className="size-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:grayscale transition-all shrink-0 shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined">send</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInputBox;
