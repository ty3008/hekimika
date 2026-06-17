import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxItem {
    src: string;
    alt?: string;
    youtubeUrl?: string;
}

interface LightboxProps {
    images: LightboxItem[];
    currentIndex: number;
    onClose: () => void;
}

const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
};

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
    const [index, setIndex] = useState(currentIndex);
    const [direction, setDirection] = useState(0);

    const navigate = useCallback((newIndex: number) => {
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    }, [images.length, index]);

    const handlePrev = useCallback(() => navigate(index - 1), [index, navigate]);
    const handleNext = useCallback(() => navigate(index + 1), [index, navigate]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, handlePrev, handleNext]);

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center animate-fade-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                {/* Dark overlay */}
                <div
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Close lightbox"
                >
                    <X size={32} />
                </button>

                {/* Counter */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium tracking-wide">
                    {index + 1} / {images.length}
                </div>

                {/* Previous button */}
                {images.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={36} />
                    </button>
                )}

                {/* Next button */}
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-4 z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight size={36} />
                    </button>
                )}

                {/* Content */}
                <AnimatePresence custom={direction} mode="wait">
                    {images[index].youtubeUrl ? (
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="relative z-[1] w-[90vw] max-w-4xl aspect-video rounded-lg shadow-2xl overflow-hidden bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeId(images[index].youtubeUrl)}?autoplay=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-0"
                            />
                        </motion.div>
                    ) : (
                        <motion.img
                            key={index}
                            src={images[index].src}
                            alt={images[index].alt || `Image ${index + 1}`}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="relative z-[1] max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
                            draggable={false}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
