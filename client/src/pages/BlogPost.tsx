import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import AuthorBio from '../components/AuthorBio';
import { ArticleSchema, BreadcrumbSchema, SITE_URL } from '../components/SchemaMarkup';
interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string;
    author: string;
    category: string;
    read_time: number;
    published_at: string;
}
interface Comment {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

const FALLBACK_IMG = '/assets/home-carousel/carousel 1.webp';

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        Promise.all([
            api.get(`/blog/${slug}`),
            api.get(`/blog/${slug}/comments`),
        ])
            .then(([postRes, commentsRes]) => {
                setPost(postRes.data);
                setComments(commentsRes.data);
            })
            .catch((err) => {
                if (err?.response?.status === 404) setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.message.trim()) {
            toast.error('Please enter your name and message'); return;
        }
        setSubmitting(true);
        try {
            await api.post(`/blog/${slug}/comments`, form);
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
            toast.success('Comment submitted! It will appear after moderation.');
        } catch {
            toast.error('Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const shareOnWhatsApp = () => {
        const text = `Check out this article from Hekimika: "${post?.title}" — ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gold rounded-full animate-spin" />
            </div>
        );
    }

    if (notFound || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
                <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Post not found</h1>
                <p className="text-gray-500">This post may have been removed or the link is incorrect.</p>
                <Link to="/blog" className="btn-primary px-6 py-3 flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | Hekimika – Biblical Wisdom & Teaching</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                {post.cover_image && <meta property="og:image" content={post.cover_image} />}
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:author" content={post.author} />
                <meta property="article:section" content={post.category} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                {post.cover_image && <meta name="twitter:image" content={post.cover_image} />}
            </Helmet>
            
            <ArticleSchema 
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                author={post.author}
                category={post.category}
                coverImage={post.cover_image}
                publishedAt={post.published_at}
                readTime={post.read_time}
                content={post.content}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
                { name: post.title, url: `/blog/${post.slug}` },
            ]} />

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="pt-36 pb-12 px-4 md:px-8 lg:px-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'var(--gold)', transform: 'translate(30%,-30%)' }} />
                <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'var(--gold)', transform: 'translate(-30%,30%)' }} />
                <div className="container-xl relative z-10 max-w-3xl">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm mb-8 font-medium">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                    {/* Category badge */}
                    <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                        style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                        <Tag size={11} className="inline mr-1" />{post.category}
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.title}
                    </motion.h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.published_at).toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5"><Clock size={14} />{post.read_time} min read</span>
                    </div>
                    <div className="w-16 h-1 mt-8 rounded-full" style={{ background: 'var(--gold)' }} />
                </div>
            </section>

            {/* ── Cover Image ───────────────────────────────────────── */}
            {post.cover_image && (
                <div className="w-full max-w-3xl mx-auto px-4 md:px-8 mt-2 md:-mt-8 relative z-10">
                    <div className="aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center bg-gray-50">
                        <img src={post.cover_image || FALLBACK_IMG} alt={post.title}
                            className="w-full h-full object-contain" />
                    </div>
                </div>
            )}

            {/* ── Article Body ──────────────────────────────────────── */}
            <article className="py-12 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">

                    {/* Excerpt pull-quote */}
                    {post.excerpt && (
                        <p className="text-lg text-gray-500 italic leading-relaxed mb-8 pl-4 border-l-4"
                            style={{ borderColor: 'var(--gold)' }}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Rich HTML Content */}
                    <div
                        className="blog-prose text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* ── Share ── */}
                    <div className="mt-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-gray-500">Share this post</p>
                        <button onClick={shareOnWhatsApp}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow"
                            style={{ background: '#25D366' }}>
                            <Share2 size={15} /> Share on WhatsApp
                        </button>
                    </div>

                    {/* E-E-A-T Author Bio Card */}
                    <AuthorBio authorName={post.author} />
                </div>
            </article>

            {/* ── Comments Section ──────────────────────────────────── */}
            <section className="py-12 px-4 md:px-8 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-8 flex items-center gap-2"
                        style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                        <MessageCircle size={20} style={{ color: 'var(--gold)' }} />
                        {comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? 's' : ''}` : 'Be the First to Comment'}
                    </h2>

                    {/* Existing comments */}
                    {comments.length > 0 && (
                        <div className="space-y-4 mb-10">
                            {comments.map((c, i) => (
                                <motion.div key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                            style={{ background: 'var(--navy)' }}>
                                            {c.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-navy">{c.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(c.created_at).toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed pl-12">{c.message}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Comment form */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-navy mb-4 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Leave a Comment
                        </h3>
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                                    style={{ background: 'var(--gold)' }}>
                                    <MessageCircle size={28} style={{ color: 'var(--navy)' }} />
                                </div>
                                <p className="font-semibold text-navy mb-1">Thank you!</p>
                                <p className="text-gray-500 text-sm">Your comment has been submitted and will appear after moderation.</p>
                                <button onClick={() => setSubmitted(false)}
                                    className="mt-4 text-sm font-semibold hover:underline"
                                    style={{ color: 'var(--navy)' }}>
                                    Add another comment
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleComment} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                            Name *
                                        </label>
                                        <input
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            placeholder="Your name"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                            Email <span className="text-gray-300">(optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="your@email.com"
                                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                        Comment *
                                    </label>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        placeholder="Share your thoughts, a testimony, or a question..."
                                        rows={4}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none"
                                    />
                                </div>
                                <p className="text-xs text-gray-400">All comments are reviewed before appearing publicly.</p>
                                <button type="submit" disabled={submitting}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                                    style={{ background: 'var(--navy)' }}>
                                    {submitting ? 'Submitting...' : <><Send size={15} /> Submit Comment</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Blog prose styles ─────────────────────────────────── */}
            <style>{`
                .blog-prose { font-size: 1.0625rem; }
                .blog-prose p { margin-bottom: 1.25rem; line-height: 1.8; }
                .blog-prose h2 { font-size: 1.5rem; font-weight: 700; color: var(--navy); margin: 2rem 0 0.75rem; font-family: Poppins, sans-serif; }
                .blog-prose h3 { font-size: 1.2rem; font-weight: 600; color: var(--navy); margin: 1.5rem 0 0.5rem; font-family: Poppins, sans-serif; }
                .blog-prose blockquote { border-left: 4px solid var(--gold); padding: 0.75rem 1.25rem; margin: 1.5rem 0; background: #fafaf7; font-style: italic; color: #4b5563; border-radius: 0 0.5rem 0.5rem 0; }
                .blog-prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }
                .blog-prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
                .blog-prose li { margin-bottom: 0.4rem; line-height: 1.7; }
                .blog-prose a { color: var(--navy); text-decoration: underline; font-weight: 600; }
                .blog-prose strong { font-weight: 700; color: var(--navy); }
                .blog-prose em { font-style: italic; color: #4b5563; }
                .blog-prose u { text-decoration: underline; }
            `}</style>
        </>
    );
}
