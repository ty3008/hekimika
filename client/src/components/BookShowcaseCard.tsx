import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, MessageCircle } from 'lucide-react';
import { whatsappLink, type CatalogBook } from '../utils/siteContent';

interface Props {
    book: CatalogBook;
    index?: number;
}

/**
 * A fully clickable book card. The whole card is a "stretched link" to the book's
 * Selar page. If a book isn't on Selar yet it falls back to a WhatsApp enquiry,
 * so the card is never a dead end.
 */
export default function BookShowcaseCard({ book, index = 0 }: Props) {
    const onSelar = Boolean(book.selarUrl);
    const href = onSelar
        ? book.selarUrl!
        : whatsappLink(`Hello Hekimika, I would like to get the book "${book.title}". Please let me know how I can get it.`);

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold/40 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[color:var(--gold)]"
        >
            {/* Cover */}
            <div className="relative aspect-square overflow-hidden bg-navy">
                {book.image ? (
                    <img
                        src={book.image}
                        alt={`${book.title} book cover`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center text-center p-8"
                        style={{ background: 'linear-gradient(135deg, #001226 0%, #001F3F 55%, #002855 100%)' }}
                    >
                        <BookOpen size={34} style={{ color: 'var(--gold)' }} className="mb-5 opacity-80" />
                        <span className="w-10 h-px mb-4" style={{ background: 'var(--gold)' }} />
                        <p className="font-bold text-xl leading-snug" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>
                            {book.title.replace(/^.*? – /, '')}
                        </p>
                        {book.series && <p className="text-white/50 text-xs uppercase tracking-[0.25em] mt-4">{book.series}</p>}
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {book.isNew && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                            New
                        </span>
                    )}
                    {!onSelar && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-navy shadow-lg">
                            Coming to Selar
                        </span>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                    {book.series ? (
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-70" style={{ color: 'var(--navy)' }}>
                            {book.series}
                        </p>
                    ) : (
                        <span />
                    )}
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        E-Book / Manual
                    </span>
                </div>

                <h3 className="text-navy font-bold text-lg leading-snug mb-1 group-hover:text-gold transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {book.title}
                </h3>
                <p className="text-xs text-gold font-medium mb-3">By Pastor Kevin Mulati</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{book.desc}</p>

                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-auto w-full text-sm after:absolute after:inset-0 after:content-['']"
                    aria-label={onSelar ? `Get ${book.title} on Selar` : `Ask about ${book.title} on WhatsApp`}
                >
                    {onSelar ? (
                        <>Get on Selar <ExternalLink size={14} /></>
                    ) : (
                        <>Ask on WhatsApp <MessageCircle size={14} /></>
                    )}
                </a>
            </div>
        </motion.article>
    );
}
