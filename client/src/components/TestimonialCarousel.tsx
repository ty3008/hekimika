import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../utils/constants';

export default function TestimonialCarousel() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const prev = () => {
        setDirection(-1);
        setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const next = () => {
        setDirection(1);
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
    };

    const t = TESTIMONIALS[index];

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
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className="w-2.5 h-2.5 rounded-full transition-all duration-200"
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
