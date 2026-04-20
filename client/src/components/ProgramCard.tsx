import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface ProgramCardProps {
    title: string;
    slug: string;
    category: string;
    description: string;
    model: string;
    image: string;
    selarUrl: string;
    index?: number;
}

const modelLabel: Record<string, string> = {
    '8-week': '8-Week Program',
    workshop: 'Workshop',
    ongoing: 'Ongoing',
};

export default function ProgramCard({ title, slug, category, description, model, image, selarUrl, index = 0 }: ProgramCardProps) {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigating if they clicked the Join Program button directly
        if ((e.target as HTMLElement).closest('a')) return;
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
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 gradient-overlay" />
                <div className="absolute top-3 left-3">
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

                <div className="flex gap-3 mt-auto">
                    <Link
                        to={`/programs/${slug}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 text-sm font-semibold transition-all duration-200 hover:bg-navy hover:text-white"
                        style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                    >
                        Learn More <ArrowRight size={14} />
                    </Link>
                    <a
                        href={selarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary py-2.5 px-4 text-sm"
                    >
                        Join Program
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
