import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

interface ProgramCardProps {
    title: string;
    slug: string;
    category: string;
    description: string;
    model: string;
    image: string;
    selarUrl: string;
    isOpenForIntake?: boolean;
    is_open_for_intake?: boolean;
    index?: number;
}

const modelLabel: Record<string, string> = {
    'Bootcamp': 'Bootcamp',
    '8-week': '8-Week Program',
    workshop: 'Workshop',
    ongoing: 'Ongoing',
};

export default function ProgramCard({ title, slug, category, description, model, image, index = 0 }: ProgramCardProps) {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigating if they clicked a button or link directly
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
        navigate(`/programs/${slug}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card group flex flex-col cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center p-0">
                {/* Skeleton Shimmer */}
                <AnimatePresence>
                    {!imageLoaded && (
                        <motion.div 
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse z-0"
                            style={{ 
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite linear'
                            }}
                        />
                    )}
                </AnimatePresence>

                <img
                    src={image}
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover overflow-hidden rounded-xl transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    loading="lazy"
                />
                <div className="absolute inset-0 gradient-overlay" />
                <div className="absolute top-3 left-3 z-10">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Clock size={13} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{modelLabel[model] || model}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{description}</p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/programs/${slug}`);
                        }}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 min-h-[48px] rounded-lg border-2 text-sm font-semibold transition-all duration-200 hover:bg-navy hover:text-white"
                        style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                    >
                        Learn More <ArrowRight size={14} />
                    </button>
                    <a
                        href="/contact"
                        className="w-full sm:flex-1 btn-primary py-3 px-4 min-h-[48px] text-sm flex items-center justify-center"
                    >
                        Join Community
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
