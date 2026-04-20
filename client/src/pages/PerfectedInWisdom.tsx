import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ProgramCard from '../components/ProgramCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { useApi } from '../hooks/useApi';
import { PROGRAMS, PROGRAM_CATEGORIES } from '../utils/constants';

interface Program {
    title: string;
    slug: string;
    category: string;
    description: string;
    model: string;
    image: string;
    selarUrl: string;
}

export default function PerfectedInWisdom() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    const [searchQuery, setSearchQuery] = useState('');

    // Use API but fallback to constants if it fails/loading
    const { data: apiPrograms, loading } = useApi<Program[]>('/programs', PROGRAMS);
    const programs = apiPrograms || PROGRAMS;

    const filteredPrograms = programs.filter((p) => {
        const matchCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <>
            <Helmet>
                <title>Perfected in Wisdom | Hekimika Programs</title>
                <meta name="description" content="Discover Hekimika's transforming programs for singles, couples, leaders, and the School of Purity and Healing." />
            </Helmet>

            {/* Hero */}
            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <SectionTitle
                        overline="Our Flagship Track"
                        title="Perfected in Wisdom"
                        subtitle="Comprehensive mentorship and building programs that focuses on providing Wisdom on major things in life such as Relationships, Leadership, Purity, Purpose, and Identity."
                        light
                    />
                </div>
            </section>

            {/* Filters & Grid */}
            <section className="section-pad bg-gray-50 min-h-screen">
                <div className="container-xl">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-2">
                            {PROGRAM_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                        ? 'bg-navy text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gold hover:text-navy'
                                        }`}
                                    style={{ background: activeCategory === cat ? 'var(--navy)' : undefined }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search programs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white text-sm"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    {loading && !apiPrograms ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-gold rounded-full animate-spin" style={{ borderTopColor: 'var(--gold)' }} />
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {filteredPrograms.map((program, i) => (
                                    <ProgramCard key={program.slug} {...program} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredPrograms.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>No programs found</h3>
                            <p className="text-gray-500">We couldn't find any programs matching your search criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                                className="mt-4 text-sm font-semibold"
                                style={{ color: 'var(--gold)' }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-pad">
                <div className="container-xl">
                    <SectionTitle
                        overline="Testimonials"
                        title="Voices of Transformation"
                        subtitle="Hear from those who have journeyed through our programs and experienced the Wisdom of God firsthand."
                    />
                    <TestimonialCarousel />
                </div>
            </section>
        </>
    );
}
