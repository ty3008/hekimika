import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, MessageCircle, Send, ArrowRight } from 'lucide-react';
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
const OG_FALLBACK = 'https://hekimika.org/hekimika_logo.png';

/* ── Telegram SVG icon (not in lucide) ─── */
const TelegramIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.504-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
);

/* ── WhatsApp icon ─── */
const WhatsAppIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
);

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState({ name: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        setRelatedPosts([]);
        Promise.all([
            api.get(`/blog/${slug}`),
            api.get(`/blog/${slug}/comments`),
        ])
            .then(([postRes, commentsRes]) => {
                const p: Post = postRes.data;
                setPost(p);
                setComments(commentsRes.data);
                // Fetch related posts in same category
                if (p.category) {
                    api.get(`/blog?category=${encodeURIComponent(p.category)}`)
                        .then(r => {
                            const others = (r.data as Post[]).filter(rp => rp.slug !== p.slug).slice(0, 3);
                            setRelatedPosts(others);
                        })
                        .catch(() => { });
                }
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
            const res = await api.post(`/blog/${slug}/comments`, {
                name: form.name,
                message: form.message,
            });
            // Add comment to list immediately
            if (res.data?.comment) {
                setComments(prev => [...prev, res.data.comment]);
            }
            setForm({ name: '', message: '' });
            toast.success('Comment posted!');
        } catch {
            toast.error('Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Share helpers ─────────────────────────────────────── */
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/blog/${slug}`;
    const shareText = `Check out this article from Hekimika: "${post?.title}"`;

    const shareOnWhatsApp = () =>
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} — ${shareUrl}`)}`, '_blank');

    const shareOnTelegram = () =>
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');

    const shareOnFacebook = () =>
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');

    const shareOnTwitter = () =>
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');

    const shareNative = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: post?.title, text: post?.excerpt, url: shareUrl });
            } catch { /* user cancelled */ }
        }
    };
    const canShareNative = typeof navigator !== 'undefined' && !!navigator.share;

    /* ── Loading skeleton ─────────────────────────────────── */
    if (loading) {
        return (
            <div className="min-h-screen">
                {/* Hero skeleton */}
                <div className="pt-36 pb-12 px-4 md:px-8" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}>
                    <div className="max-w-3xl mx-auto animate-pulse space-y-4">
                        <div className="h-4 bg-white/20 rounded w-24" />
                        <div className="h-8 bg-white/20 rounded w-3/4" />
                        <div className="h-8 bg-white/20 rounded w-1/2" />
                        <div className="h-4 bg-white/10 rounded w-48" />
                    </div>
                </div>
                {/* Body skeleton */}
                <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto animate-pulse space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
                    ))}
                </div>
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

    const coverImage = post.cover_image || FALLBACK_IMG;
    const ogImage = post.cover_image || OG_FALLBACK;

    return (
        <>
            <Helmet>
                <title>{post.title} | Hekimika – Biblical Wisdom &amp; Teaching</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={ogImage} />
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:author" content={post.author} />
                <meta property="article:section" content={post.category} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={ogImage} />
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
            <div className="w-full max-w-3xl mx-auto px-4 md:px-8 mt-2 md:-mt-8 relative z-10">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <img
                        src={coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

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

                    {/* ── Share Section ── */}
                    <div className="mt-10 pt-8 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
                            <Share2 size={16} /> Share this article
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {/* WhatsApp */}
                            <button onClick={shareOnWhatsApp}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow"
                                style={{ background: '#25D366' }}>
                                <WhatsAppIcon /> WhatsApp
                            </button>
                            {/* Telegram */}
                            <button onClick={shareOnTelegram}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow"
                                style={{ background: '#0088cc' }}>
                                <TelegramIcon /> Telegram
                            </button>
                            {/* Facebook */}
                            <button onClick={shareOnFacebook}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow"
                                style={{ background: '#1877F2' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.35L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
                                Facebook
                            </button>
                            {/* Twitter/X */}
                            <button onClick={shareOnTwitter}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow"
                                style={{ background: '#000' }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                X / Twitter
                            </button>
                            {/* Native share (mobile) */}
                            {canShareNative && (
                                <button onClick={shareNative}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow border-2"
                                    style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
                                    <Share2 size={15} /> More…
                                </button>
                            )}
                        </div>
                    </div>

                    {/* E-E-A-T Author Bio Card */}
                    <AuthorBio authorName={post.author} />
                </div>
            </article>

            {/* ── Related Posts ──────────────────────────────────────── */}
            {relatedPosts.length > 0 && (
                <section className="py-12 px-4 md:px-8 bg-gray-50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"
                            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                            <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'var(--gold)' }} />
                            More in {post.category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {relatedPosts.map((rp, i) => (
                                <motion.div
                                    key={rp.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all"
                                >
                                    <Link to={`/blog/${rp.slug}`} className="block aspect-video overflow-hidden relative">
                                        <img
                                            src={rp.cover_image || FALLBACK_IMG}
                                            alt={rp.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </Link>
                                    <div className="p-4">
                                        <p className="text-[10px] font-bold mb-1" style={{ color: 'var(--gold)' }}>{rp.category}</p>
                                        <Link to={`/blog/${rp.slug}`}>
                                            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-gold transition-colors mb-2"
                                                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                {rp.title}
                                            </h4>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={10} />{rp.read_time} min</span>
                                            <Link to={`/blog/${rp.slug}`}
                                                className="text-[11px] font-bold flex items-center gap-1 hover:gap-1.5 transition-all"
                                                style={{ color: 'var(--navy)' }}>
                                                Read <ArrowRight size={11} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <Link to="/blog" className="btn-primary px-6 py-3 inline-flex items-center gap-2 text-sm">
                                View All Articles <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Comments Section ──────────────────────────────────── */}
            <section className="py-12 px-4 md:px-8 bg-white">
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
                                    className="bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100">
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
                    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-navy mb-4 text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Leave a Comment
                        </h3>
                        <form onSubmit={handleComment} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                    Name *
                                </label>
                                <input
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="Your name"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 bg-white"
                                />
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
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none bg-white"
                                />
                            </div>
                            <button type="submit" disabled={submitting}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                                style={{ background: 'var(--navy)' }}>
                                {submitting ? 'Posting…' : <><Send size={15} /> Post Comment</>}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
