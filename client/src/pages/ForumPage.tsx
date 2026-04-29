import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Shield, Zap, BookOpen, Quote, ArrowRight, ArrowLeft, Heart } from 'lucide-react';

const FORUM_CONTENT: Record<string, any> = {
    'singles': {
        title: 'Singles Forum',
        icon: Heart,
        description: 'Guidance and clarity for the season of singleness. A safe space to grow in identity and preparation.',
        points: ['Character Development', 'Emotional Wholeness', 'Practical Preparation', 'Godly Standards']
    },
    'couples': {
        title: 'Couples Forum',
        icon: Users,
        description: 'Building strong, God-centered foundations for marriage and long-term commitment.',
        points: ['Communication Tools', 'Conflict Resolution', 'Spiritual Oneness', 'Intimacy & Trust']
    },
    'leaders': {
        title: 'Leaders Forum',
        icon: Shield,
        description: 'Impartation for leadership in every sphere of life — family, business, and ministry.',
        points: ['Servant Leadership', 'Vision Casting', 'Ethical Influence', 'Strategic Character']
    },
    'called-to-serve': {
        title: 'Called to Serve',
        icon: Zap,
        description: 'Equipping those called to ministry with sound wisdom, doctrine, and practical excellence.',
        points: ['Ministry Ethics', 'Biblical Foundations', 'Pastoral Wisdom', 'Service Excellence']
    },
    'solid-man': {
        title: 'Solid Man',
        icon: BookOpen,
        description: 'Raising strong men as supreme models of love, character, and leadership in the home and society.',
        points: ['Manhood Identity', 'Responsibility & Strength', 'Protective Leadership', 'Spiritual Headship']
    },
    'magazine': {
        title: 'Wisdom Edition Magazine',
        icon: MessageSquare,
        description: 'Access regular digital editions of our ministry magazines with deep insights and stories.',
        points: ['Exclusive Articles', 'Community Testimonies', 'Wisdom Pillars', 'Practical Blueprints']
    },
    'qa': {
        title: 'Q&A (Divine Wisdom)',
        icon: MessageSquare,
        description: 'Finding answers to life\'s most pressing questions through divine wisdom and scripture.',
        points: ['Live Sessions', 'Archived Answers', 'Personal Guidance', 'Biblical Perspectives']
    }
};



export default function ForumPage() {
    const { slug } = useParams<{ slug: string }>();
    const content = FORUM_CONTENT[slug || ''] || {
        title: 'Community Forum',
        icon: Users,
        description: 'Join our growing community and grow in wisdom together.',
        points: ['Community Support', 'Regular Meetings', 'Resource Sharing', 'Group Mentorship']
    };

    const Icon = content.icon;

    return (
        <>
            <Helmet>
                <title>{content.title} | Hekimika Forums</title>
                <meta name="description" content={content.description} />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl">
                    <Link to="/wisdom-moments" className="inline-flex items-center gap-2 text-white/60 hover:text-gold mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Wisdom Moments
                    </Link>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(212,175,55,0.1)' }}
                        >
                            <Icon size={48} className="text-gold" />
                        </motion.div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {content.title}
                            </h1>
                            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                                {content.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-pad bg-white">
                <div className="container-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl font-bold text-navy mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>What we focus on</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {content.points.map((point: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                                        <Quote size={18} className="text-gold flex-shrink-0" />
                                        <span className="font-bold text-navy text-sm">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="bg-navy p-10 rounded-[3rem] text-center"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Join the Conversation</h3>
                            <p className="text-white/60 mb-8">
                                Connect with like-minded individuals and access exclusive sessions hosted by Pastor Kevin & Lilian Mulati.
                            </p>
                            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-10 py-4">
                                Inquire to Join <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
