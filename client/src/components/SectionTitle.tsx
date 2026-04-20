import { motion } from 'framer-motion';

interface SectionTitleProps {
    overline?: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export default function SectionTitle({ overline, title, subtitle, centered = true, light = false }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
        >
            {overline && (
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                    {overline}
                </p>
            )}
            <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-navy'}`}
                style={{ fontFamily: 'Poppins, sans-serif', color: light ? '#fff' : 'var(--navy)' }}
            >
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-500'}`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
