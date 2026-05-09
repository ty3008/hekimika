import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const CHANNELS = [
    {
        title: 'Hekimika Main Channel',
        desc: 'Watch powerful video teachings, live sessions, and ministry highlights by Pastor Kevin Mulati.',
        url: 'https://www.youtube.com/@Hekimika001',
        buttonText: 'Watch on Main Channel',
        color: '#FF0000'
    },
    {
        title: 'Impactful Bible Lessons Channel',
        desc: 'Catch up on all the impactful Bible lessons, interactive sessions, mentorship, and life-changing content.',
        url: 'https://www.youtube.com/@Kevinmulati111',
        buttonText: 'Watch Bible Lessons',
        color: '#FF0000'
    }
];

export default function VideoTeachings() {
    return (
        <>
            <Helmet>
                <title>Video Teachings | Hekimika Media</title>
                <meta name="description" content="Watch powerful video teachings and live sessions by Pastor Kevin Mulati on our dedicated YouTube channels." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <PlayCircle size={32} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Video Teachings
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Access our rich library of video teachings designed to impart wisdom for every season of life.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="Our Channels"
                        title="Watch & Learn"
                        subtitle="We stream and upload content across our dedicated channels to ensure you receive sound wisdom."
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                        {CHANNELS.map((ch, i) => (
                            <motion.div
                                key={ch.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: `${ch.color}10` }}>
                                    <PlayCircle size={40} style={{ color: ch.color }} />
                                </div>
                                <h3 className="text-2xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{ch.title}</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed max-w-sm">{ch.desc}</p>
                                <a 
                                    href={ch.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-auto"
                                >
                                    {ch.buttonText} <ArrowRight size={18} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
