import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Heart, Lightbulb, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

import FoundersImg from '../assets/Pst Kevin and Lilian.webp';

const ARMS = [
    {
        icon: Lightbulb,
        title: 'Perfected in Wisdom',
        description: 'This is the transformative mentorship and building arm of Hekimika that focuses on imparting Wisdom in specific areas.',
        to: '/perfected-in-wisdom',
    },
    {
        icon: Heart,
        title: 'Wisdom Moments',
        description: 'This is the platform for impartation of the Wisdom of God through organized meetings, forums, teachings, blogs, devotionals, etc.',
        to: '/wisdom-moments',
    },
    {
        icon: Target,
        title: 'Young & Wise',
        description: 'A youth-focused arm dedicated to mentoring teenagers through magazines, interactive sessions, mentorship, and YouTube content.',
        to: '/young-and-wise',
    },
];

export default function About() {
    return (
        <>
            <Helmet>
                <title>About Us | Hekimika – Wise Nation</title>
                <meta name="description" content="Learn about Hekimika (Wise Nation), the vision of Pastor Kevin & Lilian Mulati, and the three arms of the ministry." />
            </Helmet>

            {/* Hero */}
            <section
                className="pt-36 pb-24 px-4 md:px-8 lg:px-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}
            >
                <div className="container-xl text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: 'var(--gold)' }}
                    >
                        About Hekimika
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Wise Nation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-white/70 text-xl max-w-2xl mx-auto"
                    >
                        Raising the Generation of the Wise all over the World
                    </motion.p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-pad bg-white">
                <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl border-l-4"
                        style={{ borderColor: 'var(--gold)', background: 'rgba(212,175,55,0.04)' }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Our Vision</p>
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                            A World Shaped by Wisdom
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg italic">
                            "To raise the generation of the Wise all over the World."
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl border-l-4"
                        style={{ borderColor: 'var(--navy)', background: 'rgba(0,31,63,0.04)' }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--navy)' }}>Our Mission</p>
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                            Equipping Through Transformation
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg italic">
                            "To be a place of impartation of the Wisdom of God in every area of life."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Belief Statement */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <SectionTitle
                        overline="What We Believe"
                        title="Our Core Beliefs"
                        subtitle="The convictions that shape everything we do at Hekimika."
                    />
                    <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                        <p className="text-gray-600 leading-relaxed text-lg mb-5 text-center">
                            We believe that Wisdom is important in this life and God gives liberally to all. God did not create man to figure out life on his own but has provided man with an opportunity to seek Him and get godly Wisdom early in every area of life. We believe that from a young age people can access the Wisdom of God and live above the immaturity of this world.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg mb-5 text-center font-medium italic" style={{ color: 'var(--navy)' }}>
                            Luke 2:52 says, "And Jesus increased in wisdom and in stature and in favor with God and man".
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg text-center">
                            This was true for The LORD and it can also be true for every one. Those who seek find and those who ask will always receive from Our Loving Father. As THE WISE NATION, we choose to stand in the gap for this generation and become conduits of godly wisdom.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="What Drives Us"
                        title="Our Core Values"
                        subtitle="The pillars that guide everything we do at Hekimika."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: 'Truth', desc: 'We believe that a life centered on God\'s Word is a life that is lived wisely and will live above the systems of this world. What we do is centered on God\'s unfailing Word.' },
                            { title: 'Wisdom', desc: 'Wisdom is the principle thing and an encounter with Wisdom elevates us to operate with joy, power, accuracy and cutting-edge insight.' },
                            { title: 'Progress', desc: 'At Hekimika we value consistent development and growth into a life that is significant, relevant, and dominant in Christ Jesus.' },
                            { title: 'Character', desc: 'The solidity of a person\'s character determines what they can handle effectively and produce results consistently. We believe that through openness and genuine exposure of one\'s heart to God no level of development can be too high.' },
                            { title: 'Willingness', desc: 'It takes a willing heart to advance in the Wisdom of God. We value hearts that are willing to go on a journey of perfection.' },
                            { title: 'Diligence', desc: 'While time and chance happens to all men, only the diligent take hold of opportunities like this and turn them to their advantage.' },
                        ].map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.15)' }}>
                                    <span className="text-lg font-bold" style={{ color: 'var(--gold)' }}>{value.title[0]}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="section-pad bg-white">
                <div className="container-xl">
                    <SectionTitle
                        overline="Leadership"
                        title="Meet the Founders"
                    />
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="card overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <img src={FoundersImg} alt="Pastor Kevin and Lilian Mulati" className="w-full h-[400px] object-cover object-top" />
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Visionaries</p>
                                    <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>Pastor Kevin & Lilian Mulati</h3>
                                    <p className="text-gray-500 leading-relaxed mb-4">
                                        Pastor Kevin and Lilian Mulati are visionaries of the Wise Nation which is a global outreach program that aims to impart all with the Wisdom of God to live a life of significance, relevance, and dominion while pursuing purpose.
                                    </p>
                                    <p className="text-gray-500 leading-relaxed mb-4">
                                        They are passionate about the Wisdom, love and power of God finding expression in men.
                                    </p>
                                    <p className="text-gray-500 leading-relaxed mb-4">
                                        They have dedicated their lives to help many arise to a place of dominion through cutting-edge mentorships, life coaching, and powerful teachings. Through his books, Pastor Kevin has impacted many to win in love and relationships and build wisely on a firm foundation.
                                    </p>
                                    <p className="text-gray-500 leading-relaxed">
                                        Their zeal and love for Jesus has influenced many to walk with God and develop in their walk with God.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Arms of Wise Nation */}
            <section className="section-pad" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <SectionTitle
                        overline="Our Structure"
                        title="Arms of Wise Nation"
                        subtitle="Three distinct arms working together as one — to raise the wise in every sphere of life."
                        light
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ARMS.map(({ icon: Icon, title, description, to }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="p-8 rounded-2xl border border-white/10 hover:border-gold transition-all group"
                                style={{ background: 'rgba(255,255,255,0.04)' }}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(212,175,55,0.15)' }}>
                                    <Icon size={26} style={{ color: 'var(--gold)' }} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                                <p className="text-white/60 leading-relaxed mb-5">{description}</p>
                                <Link to={to} className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: 'var(--gold)' }}>
                                    Explore <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
