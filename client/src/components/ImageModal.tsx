import { create } from "zustand";
import { X } from "lucide-react";

interface ImageModalStore {
  isOpen: boolean;
  src: string;
  openModal: (src: string) => void;
  closeModal: () => void;
}

export const useImageModal = create<ImageModalStore>((set) => ({
  isOpen: false,
  src: "",
  openModal: (src: string) => set({ isOpen: true, src }),
  closeModal: () => set({ isOpen: false, src: "" }),
}));

export default function ImageModal() {
  const { isOpen, src, closeModal } = useImageModal();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center cursor-zoom-out animate-in fade-in duration-300"
      onClick={closeModal}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img 
          src={src} 
          alt="Full screen view" 
          className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
          onClick={(e) => e.stopPropagation()} 
        />
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-black/50 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}