import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
    youtubeId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function VideoModal({ youtubeId, isOpen, onClose }: VideoModalProps) {
    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKey);
        // Prevent scrolling on body when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Dark overlay */}
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
                        aria-label="Close modal"
                    >
                        <X size={28} />
                    </button>

                    {/* Content Container */}
                    <motion.div
                        className="relative w-full max-w-6xl z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Video Wrapper */}
                        <div className="w-full aspect-video rounded-xl md:rounded-3xl shadow-2xl overflow-hidden bg-black border border-white/10">
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full border-0"
                            />
                        </div>

                        {/* Actions Below Video */}
                        <div className="w-full mt-6 flex justify-center">
                            <a
                                href={`https://www.youtube.com/watch?v=${youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <ExternalLink size={20} />
                                <span>Watch on YouTube</span>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
