import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { PROGRAMS } from '../utils/constants';

interface Program {
    title: string;
    slug: string;
    category: string;
    description: string;
    fullDescription?: string;
    model: string;
    image: string;
    selarUrl: string;
    curriculum: string[];
}

export default function ProgramDetail() {
    const { slug } = useParams<{ slug: string }>();

    const staticDbProgram = PROGRAMS.find((p) => p.slug === slug);
    const { data: program, loading } = useApi<Program>(`/programs/${slug}`, staticDbProgram);

    if (loading && !program) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gold rounded-full animate-spin" style={{ borderTopColor: 'var(--gold)' }} />
            </div>
        );
    }

    if (!program) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-navy mb-4">Program Not Found</h1>
                <p className="text-gray-500 mb-8">The program you're looking for doesn't exist or has been removed.</p>
                <Link to="/perfected-in-wisdom" className="btn-primary">View All Programs</Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{program.title} | Hekimika Programs</title>
                <meta name="description" content={program.description} />
            </Helmet>

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20">
                <div className="absolute inset-0">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 gradient-overlay" />
                </div>

                <div className="relative z-10 container-xl px-4 text-center">
                    <Link to="/perfected-in-wisdom" className="inline-flex items-center gap-2 text-white/80 hover:text-gold mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Programs
                    </Link>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
                        {program.category}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {program.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {program.description}
                    </p>
                    <a
                        href={program.selarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-8 py-4 text-base font-bold shadow-2xl"
                    >
                        Join This Program <ExternalLink size={18} />
                    </a>
                </div>
            </section>

            {/* Content */}
            <section className="section-pad bg-white">
                <div className="container-xl grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            About the Program
                        </h2>
                        <div className="prose prose-lg prose-blue max-w-none text-gray-600 mb-12">
                            <p>{program.fullDescription || program.description}</p>
                        </div>

                        <h3 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Curriculum Map
                        </h3>
                        <div className="space-y-4 mb-10">
                            {program.curriculum.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm bg-white border shadow-sm" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        {item.includes(':') ? (
                                            <>
                                                <h4 className="font-bold text-navy mb-1">{item.split(':')[0]}</h4>
                                                <p className="text-gray-600 text-sm">{item.split(':')[1].trim()}</p>
                                            </>
                                        ) : (
                                            <h4 className="font-bold text-navy mb-1">{item}</h4>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-8 rounded-3xl border border-gray-100 shadow-xl bg-white">
                            <h4 className="font-bold text-xl text-navy mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Program Details</h4>

                            <ul className="space-y-6 mb-8">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 size={24} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                                    <div>
                                        <p className="font-bold text-navy text-sm">Delivery Model</p>
                                        <p className="text-gray-500 text-sm capitalize">{program.model}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 size={24} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                                    <div>
                                        <p className="font-bold text-navy text-sm">Target Audience</p>
                                        <p className="text-gray-500 text-sm">{program.category}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 size={24} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                                    <div>
                                        <p className="font-bold text-navy text-sm">Community</p>
                                        <p className="text-gray-500 text-sm">Access to exclusive WhatsApp cohort upon registration.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-4 text-center">
                                    Registration is handled securely via Selar.
                                </p>
                                <a
                                    href={program.selarUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full text-center"
                                >
                                    Join Program
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-pad bg-gray-50">
                <div className="container-xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Hear from our Alumni
                        </h2>
                    </div>
                    <TestimonialCarousel />
                </div>
            </section>
        </>
    );
}
