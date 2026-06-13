import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageItem {
  title: string;
  desc: string;
  img: string;
}

interface LightboxProps {
  isOpen: boolean;
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(images.length - 1);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 cursor-zoom-out"
        >
          {/* Main Modal Container */}
          <motion.div
            initial={{ scale: 0.92, y: 20, filter: 'blur(10px)' }}
            animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ scale: 0.92, y: 20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 26, stiffness: 210 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#11311d] rounded-2xl max-w-5xl w-full overflow-hidden border border-white/10 shadow-2xl cursor-default flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[80vh]"
          >
            {/* Image Container Section */}
            <div className="relative flex-1 md:w-3/5 bg-black/40 flex items-center justify-center p-4 min-h-[300px] md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage.img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  src={currentImage.img}
                  alt={currentImage.title}
                  className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </AnimatePresence>

              {/* Hover Navigation Arrows inside the image pane */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 hover:scale-105 transition-all shadow-md cursor-pointer border border-white/10 active:scale-95"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 hover:scale-105 transition-all shadow-md cursor-pointer border border-white/10 active:scale-95"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Details Panel Section */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-linear-to-b from-[#1a4d2e] to-[#123620] border-t md:border-t-0 md:border-l border-white/10 text-white overflow-y-auto">
              <div>
                {/* Header Tag and Close Button */}
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-500/30">
                    School Event
                  </span>
                  
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-black/25 text-white hover:bg-black/45 hover:scale-105 flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-90"
                    aria-label="Close lightbox"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Details Content */}
                <h3 className="text-2xl font-bold mb-4 leading-tight bg-linear-to-r from-white to-green-100 bg-clip-text text-transparent">
                  {currentImage.title}
                </h3>
                
                <div className="w-12 h-1 bg-green-500 rounded-full mb-6"></div>
                
                <p className="text-green-100/90 leading-relaxed text-sm md:text-base font-medium">
                  {currentImage.desc}
                </p>
              </div>

              {/* Bottom controls / Pagination indicator */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-green-300/80 text-xs font-bold tracking-wider uppercase">
                  Image <span className="text-white font-extrabold">{currentIndex + 1}</span> of <span className="text-white font-extrabold">{images.length}</span>
                </span>
                
                {/* Small indicator dots */}
                <div className="flex gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onIndexChange(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex ? 'bg-green-400 w-4' : 'bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
