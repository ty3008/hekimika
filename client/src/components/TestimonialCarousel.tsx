import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from '../utils/constants';

export default function TestimonialCarousel() {
    const { data: apiTestimonials, loading } = useApi<any[]>('/testimonials');
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [testimonials, setTestimonials] = useState<any[]>([]);

    useEffect(() => {
        if (!loading) {
            if (apiTestimonials && apiTestimonials.length > 0) {
                setTestimonials(apiTestimonials);
            } else {
                setTestimonials(FALLBACK_TESTIMONIALS);
            }
        }
    }, [apiTestimonials, loading]);

    const prev = () => {
        setDirection(-1);
        setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    };

    const next = () => {
        setDirection(1);
        setIndex((i) => (i + 1) % testimonials.length);
    };

    if (loading || testimonials.length === 0) {
        return (
            <div className="flex justify-center py-20 min-h-[300px] items-center">
                <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
            </div>
        );
    }

    const t = testimonials[index];

    return (
        <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.45 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center relative"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Quote size={24} style={{ color: 'var(--gold)' }} />
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic mb-8">
                        "{t.text}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: 'var(--gold)' }} />
                        <div className="text-left">
                            <p className="font-bold text-navy" style={{ color: 'var(--navy)', fontFamily: 'Poppins, sans-serif' }}>{t.name}</p>
                            <p className="text-sm" style={{ color: 'var(--gold)' }}>{t.program}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 mt-8">
                <button onClick={prev} className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:bg-gold hover:border-gold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                    <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                            style={{ background: i === index ? 'var(--gold)' : 'rgba(212,175,55,0.3)' }}
                        />
                    ))}
                </div>
                <button onClick={next} className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:bg-gold hover:border-gold" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
