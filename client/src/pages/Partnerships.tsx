import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Lightbulb, Heart, Shield } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';
import Lightbox from '../components/Lightbox';

// Image imports
import Dekut1 from '../assets/Dekut 1.webp';
import Dekut2 from '../assets/Dekut 2.webp';
import Dekut3 from '../assets/Dekut 3.webp';
import Dekut4 from '../assets/Dekut 4.webp';

import Egerton1 from '../assets/Egerton 1.webp';
import Egerton2 from '../assets/Egerton 2.webp';
import Egerton3 from '../assets/Egerton 3.webp';
import Egerton4 from '../assets/Egerton 4.webp';

import Germaine1 from '../assets/Germaine 1.webp';
import Germaine2 from '../assets/Germaine 2.webp';
import Germaine3 from '../assets/Germaine 3.webp';

const PARTNERS_GALLERIES = [
    {
        name: 'DeKUT City of Refuge',
        images: [
            { src: Dekut1, alt: 'DeKUT City of Refuge 1' },
            { src: Dekut2, alt: 'DeKUT City of Refuge 2' },
            { src: Dekut3, alt: 'DeKUT City of Refuge 3' },
            { src: Dekut4, alt: 'DeKUT City of Refuge 4' }
        ]
    },
    {
        name: 'Egerton University',
        images: [
            { src: Egerton1, alt: 'Egerton University 1' },
            { src: Egerton2, alt: 'Egerton University 2' },
            { src: Egerton3, alt: 'Egerton University 3' },
            { src: Egerton4, alt: 'Egerton University 4' }
        ]
    },
    {
        name: 'Germaine',
        images: [
            { src: Germaine1, alt: 'Germaine 1' },
            { src: Germaine2, alt: 'Germaine 2' },
            { src: Germaine3, alt: 'Germaine 3' }
        ]
    }
];

const OFFERINGS = [
    {
        icon: BookOpen,
        title: 'Discipleship Lessons in God\'s Word',
        desc: 'Foundational teachings that build a strong spiritual core in students.',
    },
    {
        icon: Award,
        title: 'Leadership',
        desc: 'Equipping students to lead with integrity, vision, and servant-hearted excellence.',
    },
    {
        icon: Heart,
        title: 'Love and Relationships',
        desc: 'Providing wisdom and clarity for building healthy, God-honoring relationships.',
    },
    {
        icon: Lightbulb,
        title: 'Success Talks',
        desc: 'Inspiring sessions on purpose, significance, and achieving excellence in life.',
    },
    {
        icon: Users,
        title: 'Capacity Building',
        desc: 'Developing skills and mindsets that prepare students for real-world impact.',
    },
    {
        icon: Shield,
        title: 'Dealing with Peer Pressure: Building Your Identity',
        desc: 'Empowering students to stand firm in who they are and resist negative influences.',
    },
    {
        icon: ArrowRight,
        title: 'Life after School',
        desc: 'Preparing students for the transition from academics to purpose-driven adult life.',
    },
];

export default function Partnerships() {
    const [activeGallery, setActiveGallery] = useState<number | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <Helmet>
                <title>Partnership with Institutions | Hekimika</title>
                <meta name="description" content="Hekimika offers solid mentorship programs to colleges, universities and high schools in areas like discipleship, leadership, and relationships." />
            </Helmet>

            {/* Hero */}
            <section
                className="pt-36 pb-24 px-4 md:px-8 lg:px-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}
            >
                <div className="container-xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(212,175,55,0.15)' }}>
                            <Users size={32} style={{ color: 'var(--gold)' }} />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Partnership with Institutions
                        </h1>
                        <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                            We offer solid mentorship programs to colleges, universities and high schools in the following areas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Offerings Grid */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="What We Offer"
                        title="Our Mentorship Areas"
                        subtitle="Comprehensive programs designed to build, equip, and transform students across key areas of life."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {OFFERINGS.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-lg hover:border-gold/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: 'rgba(212,175,55,0.15)' }}>
                                    <Icon size={24} style={{ color: 'var(--gold)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                    {title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl max-w-4xl mx-auto">
                    <SectionTitle
                        overline="The Impact"
                        title="Why Partner With Hekimika?"
                        subtitle="Our track record of transformative mentorship speaks for itself."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            { value: '1000+', label: 'Students Impacted' },
                            { value: '7+', label: 'Years of Ministry' },
                            { value: '11+', label: 'Programs Available' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
                            >
                                <p className="text-4xl font-bold mb-2" style={{ color: 'var(--gold)', fontFamily: 'Poppins, sans-serif' }}>{stat.value}</p>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Photo Galleries */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Partnerships"
                        title="Partners in Action"
                        subtitle="A visual celebration of our impact and active collaborations with institutions."
                    />
                    <div className="space-y-16 mt-12">
                        {PARTNERS_GALLERIES.map((partner, pIdx) => (
                            <div key={partner.name} className="border-b border-gray-100 pb-12 last:border-0 last:pb-0">
                                <h3 className="text-2xl font-bold text-navy mb-6 tracking-tight animate-fade-in" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    {partner.name}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {partner.images.map((img, iIdx) => (
                                        <motion.div
                                            key={iIdx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: iIdx * 0.08 }}
                                            className="group cursor-pointer overflow-hidden rounded-2xl relative shadow-md aspect-video"
                                            onClick={() => {
                                                setActiveGallery(pIdx);
                                                setLightboxIndex(iIdx);
                                            }}
                                        >
                                            <img
                                                src={img.src}
                                                alt={img.alt}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {activeGallery !== null && lightboxIndex !== null && (
                <Lightbox
                    images={PARTNERS_GALLERIES[activeGallery].images}
                    currentIndex={lightboxIndex}
                    onClose={() => {
                        setActiveGallery(null);
                        setLightboxIndex(null);
                    }}
                />
            )}


            {/* CTA */}
            <section className="py-24 px-4 text-center" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <SectionTitle
                        title="Bring Hekimika to Your Institution"
                        subtitle="We'd love to partner with your school, college, or university to build and mentor the next generation of wise leaders."
                        light
                        centered
                    />
                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <Link to="/contact" className="btn-primary px-8 py-4 inline-flex items-center gap-2">
                            Get in Touch <ArrowRight size={18} />
                        </Link>
                        <Link to="/about" className="btn-outline px-8 py-4 inline-flex items-center gap-2">
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
