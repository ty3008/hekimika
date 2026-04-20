import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

interface BookCardProps {
    title: string;
    author?: string;
    description: string;
    coverImage?: string;
    price: string;
    selarUrl: string;
    index?: number;
}

export default function BookCard({ title, author = 'Pastor Kevin Mulati', description, coverImage, price, selarUrl, index = 0 }: BookCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card group flex flex-col md:flex-row gap-0"
        >
            {/* Cover */}
            <div className="md:w-40 h-52 md:h-auto flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full p-6" style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))' }}>
                        <BookOpen size={40} style={{ color: 'var(--gold)' }} />
                        <p className="text-xs text-white/60 mt-2 text-center">{title}</p>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--gold)' }}>
                    {author}
                </p>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>
                        {price}
                    </span>
                    <a
                        href={selarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center gap-2"
                    >
                        Buy Softcopy <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
