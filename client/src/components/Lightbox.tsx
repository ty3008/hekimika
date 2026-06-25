import { useState, useEffect, useCallback, useRef } from 'react';
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

    // Touch swipe state
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    const navigate = useCallback((newIndex: number) => {
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    }, [images.length, index]);

    const handlePrev = useCallback(() => navigate(index - 1), [index, navigate]);
    const handleNext = useCallback(() => navigate(index + 1), [index, navigate]);

    // Keyboard navigation
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

    // Touch / swipe handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);

        // Only swipe horizontally if it's more horizontal than vertical
        if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
            if (dx < 0) handleNext();
            else handlePrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Dark overlay */}
                <div
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Close button — larger tap target on mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors touch-manipulation"
                    aria-label="Close lightbox"
                >
                    <X size={28} />
                </button>

                {/* Counter */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium tracking-wide">
                    {index + 1} / {images.length}
                </div>

                {/* Previous button */}
                {images.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-3 md:left-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors touch-manipulation"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {/* Next button */}
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-3 md:right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors touch-manipulation"
                        aria-label="Next image"
                    >
                        <ChevronRight size={32} />
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
                            className="relative z-[1] w-[92vw] max-w-4xl aspect-video rounded-lg shadow-2xl overflow-hidden bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeId(images[index].youtubeUrl!)}?autoplay=1`}
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
                            className="relative z-[1] max-w-[88vw] max-h-[82vh] object-contain rounded-lg shadow-2xl select-none"
                            draggable={false}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile swipe hint — only on touch devices, fades quickly */}
                {images.length > 1 && (
                    <motion.p
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 text-xs tracking-wide md:hidden pointer-events-none"
                    >
                        Swipe to navigate
                    </motion.p>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
