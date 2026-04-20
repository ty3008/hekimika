import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, BookOpen } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const OBJECTIVES = [
    'To be a choice place for building and mentorship in the ways of God.',
    'To be a voice to the young generation.',
    'To raise young men and women to uphold chastity.',
    'To train young men to be solid in this generation.',
    'To raise young women to uphold dignity.',
    'To impart understanding on how to guard themselves sexually.',
    'To train them on how to keep a healthy mind.',
    'To give understanding on how to keep and develop a healthy mind and heart.'
];

export default function YoungAndWise() {
    return (
        <>
            <Helmet>
                <title>Young & Wise | Hekimika Teens Corner</title>
                <meta name="description" content="Hekimika's youth arm dedicated to mentoring teenagers through community and purposeful guidance." />
            </Helmet>

            <section className="relative h-[50vh] min-h-[500px] flex items-center justify-center pt-20">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1920" alt="Teens" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.85) 0%, rgba(0,31,63,0.9) 100%)' }} />
                </div>

                <div className="relative z-10 container-xl px-4 text-center">
                    <p className="text-sm font-bold uppercase tracking-widest mb-4 text-white">
                        Teens Corner
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Young & Wise
                    </h1>
                    <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Who are Young and Wise? These are wise-hearted people. These are people with a heart that is trained to live above the immaturity of this world. They are a force that preserves their peers. They are not afraid to be different and to stand out from the crowd.
                    </p>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                        <Target size={32} className="mb-6" style={{ color: 'var(--gold)' }} />
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>Vision</h3>
                        <ul className="space-y-4 text-gray-600 leading-relaxed text-lg italic">
                            <li>1. To be a well-spring of Wisdom to the young generation.</li>
                            <li>2. A superior breed of people that are full of the Wisdom of God.</li>
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                        <BookOpen size={32} className="mb-6" style={{ color: 'var(--gold)' }} />
                        <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>Mission</h3>
                        <p className="text-gray-600 leading-relaxed text-lg italic">
                            Elevating the young people's sight by the Word of God, igniting them to be champions in their purpose and fulfil their God-designed destiny.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-pad bg-gray-50">
                <div className="container-xl max-w-5xl mx-auto">
                    <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 mb-16">
                        <Users size={32} className="mb-6 mx-auto" style={{ color: 'var(--gold)' }} />
                        <h3 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>The Assignment</h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            There is a call to DEVELOP AND TRAIN a wise generation called YOUNG AND WISE. If there is no intentional training for these generations they will still silently encounter information and act naive in the presence of parents or older people.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <h4 className="font-bold text-xl mb-3" style={{ color: 'var(--navy)' }}>1. Mentor the young.</h4>
                                <p className="text-gray-600">Through programs the young generation will be mentored and trained to stand in the Wisdom of God. The main place will be partnering with schools and colleges to impart Wisdom.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl mb-3" style={{ color: 'var(--navy)' }}>2. Raise the young to mentor their peers.</h4>
                                <p className="text-gray-600">Through us God is raising a breed of people that will carry His influence to their peers and be bold to lead them into the light.</p>
                            </div>
                        </div>
                    </div>

                    <SectionTitle
                        overline="What We Do"
                        title="Our Objectives"
                        subtitle="The concern for young and wise is: How can we secure the young generation? How can we reach them early and save their future?"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {OBJECTIVES.map((obj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm"
                            >
                                <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                                <p className="text-gray-600 text-sm leading-relaxed">{obj}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-navy text-center">
                <div className="container-xl">
                    <SectionTitle
                        title="Partner With Us or Join"
                        subtitle="Are you a parent seeking a solid foundation for your teenager, or a teen ready to grow? Get in touch with us."
                        light
                        centered
                    />
                    <a href="/contact" className="btn-primary px-8 py-4 mt-4 inline-flex">
                        Contact the Team
                    </a>
                </div>
            </section>
        </>
    );
}
