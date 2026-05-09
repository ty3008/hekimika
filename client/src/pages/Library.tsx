import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useApi } from '../hooks/useApi';

const getDriveThumbnail = (url: string) => {
    if (!url) return null;
    if (url.includes('/file/d/')) {
        const parts = url.split('/file/d/');
        const fileId = parts[1].split('/')[0];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    return null;
};

export default function Library() {
    const { data: freeResources, loading } = useApi<any[]>('/free-resources');
    
    // Filter out only FreeBooks
    const freeBooks = freeResources?.filter(r => r.type === 'FreeBook') || [];

    const sectionFade = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Helmet>
                <title>Our Library | Hekimika Resources</title>
                <meta name="description" content="Access our rich library of free books and writings aimed at imparting wisdom." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 flex">
                        <Link to="/resources" className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm font-bold">
                            <ArrowLeft size={16} /> Back to Resources
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <BookOpen size={32} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Our Library
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Access our collection of free books and writings aimed at imparting wisdom for your journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad bg-gray-50 min-h-[50vh]">
                <div className="container-xl">
                    <SectionTitle
                        overline="Free Resources"
                        title="Free Books & Writings"
                        subtitle="Explore our library of spiritually enriching content."
                    />

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-gold rounded-full animate-spin" style={{ borderTopColor: 'var(--gold)' }} />
                        </div>
                    ) : freeBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {freeBooks.map((item, index) => {
                                const thumbnail = item.image || getDriveThumbnail(item.google_drive_link || item.googleDriveLink);
                                
                                return (
                                    <motion.div key={item.id || item._id} {...sectionFade} transition={{ delay: index * 0.1 }} className="group">
                                        <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg border border-gray-100 relative bg-white flex items-center justify-center p-0">
                                            {thumbnail ? (
                                                <img 
                                                    src={thumbnail} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-contain p-2 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                                    <BookOpen size={48} className="text-gray-300" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                                                <p className="text-white text-sm font-medium leading-relaxed line-clamp-4">{item.short_description || item.shortDescription || item.desc}</p>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded">
                                                FREE BOOK
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-navy text-lg mb-1 leading-tight group-hover:text-gold transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.title}</h3>
                                        <p className="text-gray-400 text-xs mb-3">{item.short_description || item.shortDescription || item.desc}</p>
                                        <Link to={`/read/${item.id || item._id}`} className="inline-flex items-center gap-2 text-navy font-bold text-xs hover:text-gold transition-colors">
                                            Read Now <ArrowRight size={14} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>No Books Available Yet</h3>
                            <p className="text-gray-500">Check back soon for new free books and writings.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
