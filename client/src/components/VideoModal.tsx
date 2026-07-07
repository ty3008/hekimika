import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
    title?: string;
}

export default function VideoModal({ isOpen, onClose, videoId, title = 'Watch Our Story' }: VideoModalProps) {
    const handleClose = useCallback(() => onClose(), [onClose]);

    // Lock body scroll & keyboard support
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [isOpen, handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/92 backdrop-blur-md"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Panel */}
                    <motion.div
                        className="relative z-10 w-full max-w-5xl flex flex-col gap-0 rounded-2xl overflow-hidden"
                        style={{
                            boxShadow: '0 0 60px rgba(212,175,55,0.25), 0 30px 80px rgba(0,0,0,0.6)',
                            border: '1px solid rgba(212,175,55,0.3)',
                        }}
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-5 py-3.5"
                            style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(212,175,55,0.2)' }}
                        >
                            <p
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{ color: 'var(--gold)', fontFamily: 'Poppins, sans-serif' }}
                            >
                                {title}
                            </p>

                            {/* Watch on YouTube */}
                            <a
                                href={`https://www.youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                                style={{
                                    background: 'rgba(212,175,55,0.12)',
                                    color: 'var(--gold)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                }}
                                aria-label="Watch on YouTube"
                            >
                                <ExternalLink size={13} />
                                Watch on YouTube
                            </a>

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="ml-3 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 touch-manipulation"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: 'rgba(255,255,255,0.8)',
                                }}
                                aria-label="Close video"
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Video */}
                        <div className="aspect-video w-full bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full border-0"
                                title={title}
                            />
                        </div>

                        {/* Footer — mobile "Watch on YouTube" */}
                        <div
                            className="sm:hidden flex justify-center px-5 py-4"
                            style={{ background: 'var(--navy)', borderTop: '1px solid rgba(212,175,55,0.15)' }}
                        >
                            <a
                                href={`https://www.youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 touch-manipulation"
                                style={{
                                    background: 'rgba(212,175,55,0.15)',
                                    color: 'var(--gold)',
                                    border: '1px solid rgba(212,175,55,0.4)',
                                }}
                            >
                                <ExternalLink size={15} />
                                Watch on YouTube
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
