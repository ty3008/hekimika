import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, BookOpen, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import { BlogCollectionSchema, BreadcrumbSchema } from '../components/SchemaMarkup';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    author: string;
    category: string;
    read_time: number;
    published_at: string;
}
interface Category {
    id: number;
    name: string;
    slug: string;
}

const FALLBACK_IMG = '/assets/home-carousel/carousel 1.webp';
const PAGE_SIZE = 9;

/* ── Skeleton card shown while loading ─────────────────────────── */
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-5 flex flex-col gap-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
            </div>
        </div>
    );
}

function SkeletonFeatured() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 mb-12 animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-8 lg:p-10 flex flex-col justify-center gap-4">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
        </div>
    );
}

export default function Blog() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.get('/blog/categories/all').then(r => setCategories(r.data)).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setCurrentPage(1);
        const params = activeCategory !== 'all' ? `?category=${encodeURIComponent(activeCategory)}` : '';
        api.get(`/blog${params}`)
            .then(r => setAllPosts(r.data))
            .catch(() => { setAllPosts([]); setError(true); })
            .finally(() => setLoading(false));
    }, [activeCategory]);

    // Client-side search filter
    const filtered = allPosts.filter(post => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(q) ||
            post.excerpt?.toLowerCase().includes(q) ||
            post.author?.toLowerCase().includes(q) ||
            post.category?.toLowerCase().includes(q)
        );
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const pagePosts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const featured = currentPage === 1 && !searchQuery ? pagePosts[0] ?? null : null;
    const rest = featured ? pagePosts.slice(1) : pagePosts;

    const handleSearch = useCallback((val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    }, []);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>Blog | Hekimika – Biblical Wisdom on Relationships, Masculinity &amp; Purpose</title>
                <meta name="description" content="Read articles and teachings on biblical masculinity, godly relationships, Christian leadership, purity, purpose, and wisdom by Pastor Kevin Mulati and the Hekimika (Wise Nation) community." />
                <link rel="canonical" href="https://hekimika.org/blog" />
            </Helmet>
            <BlogCollectionSchema />
            <BreadcrumbSchema items={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
            ]} />

            {/* ── Hero Header ─────────────────────────────────────────── */}
            <section className="pt-36 pb-16 px-4 md:px-8 lg:px-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003366 100%)' }}>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                    style={{ background: 'var(--gold)', transform: 'translate(30%,-30%)' }} />
                <div className="container-xl text-center relative z-10">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                        Wisdom in Writing
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Our Blog
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/70 max-w-xl mx-auto text-lg mb-8">
                        Dive deeper into godly wisdom through articles written by our leadership and community.
                    </motion.p>

                    {/* ── Search Bar ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-lg mx-auto relative"
                    >
                        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Search articles, topics, authors…"
                            className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:bg-white/15 backdrop-blur-sm"
                            style={{ '--tw-ring-color': 'var(--gold)' } as React.CSSProperties}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => handleSearch('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </motion.div>

                    <div className="w-16 h-1 mx-auto mt-8 rounded-full" style={{ background: 'var(--gold)' }} />
                </div>
            </section>

            {/* ── Category Filter Tabs ─────────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="container-xl px-4 md:px-8 lg:px-16">
                    <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'all'
                                    ? 'text-white'
                                    : 'text-gray-500 hover:text-navy bg-gray-100 hover:bg-gray-200'
                                }`}
                            style={activeCategory === 'all' ? { background: 'var(--navy)' } : {}}>
                            All Posts
                        </button>
                        {categories.map(cat => (
                            <button key={cat.id}
                                onClick={() => handleCategoryChange(cat.name)}
                                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat.name
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-navy bg-gray-100 hover:bg-gray-200'
                                    }`}
                                style={activeCategory === cat.name ? { background: 'var(--navy)' } : {}}>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Content Area ─────────────────────────────────────────── */}
            <section className="section-pad bg-gray-50 min-h-screen">
                <div className="container-xl">

                    {/* Search results indicator */}
                    {searchQuery && !loading && (
                        <p className="text-sm text-gray-500 mb-6">
                            {filtered.length === 0
                                ? `No results for "${searchQuery}"`
                                : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`
                            }
                        </p>
                    )}

                    {loading ? (
                        /* ── Skeleton Loading State (never blank on cold start) ── */
                        <div>
                            <SkeletonFeatured />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        </div>
                    ) : error ? (
                        /* ── Error / Cold-start State ── */
                        <div className="text-center py-24">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ background: '#fff3cd' }}>
                                <BookOpen size={28} style={{ color: 'var(--gold)' }} />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                Articles are loading…
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                                Our server may be waking up. Please wait a moment and try again.
                            </p>
                            <button
                                onClick={() => { setError(false); setLoading(true); const params = activeCategory !== 'all' ? `?category=${encodeURIComponent(activeCategory)}` : ''; api.get(`/blog${params}`).then(r => setAllPosts(r.data)).catch(() => setError(true)).finally(() => setLoading(false)); }}
                                className="px-6 py-3 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
                                style={{ background: 'var(--navy)' }}
                            >
                                Retry
                            </button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-24">
                            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {searchQuery ? `No posts matching "${searchQuery}"` : 'No posts in this category yet'}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {searchQuery ? 'Try a different search term.' : 'Check back soon — wisdom is on the way!'}
                            </p>
                            <button onClick={() => { handleSearch(''); handleCategoryChange('all'); }}
                                className="mt-6 px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all hover:text-white"
                                style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--navy)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                View All Posts
                            </button>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div key={`${activeCategory}-${currentPage}-${searchQuery}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

                                {/* ── Featured Post (page 1, no search only) ── */}
                                {featured && (
                                    <Link to={`/blog/${featured.slug}`} className="group block mb-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                            <div className="relative aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-gray-50">
                                                <img
                                                    src={featured.cover_image || FALLBACK_IMG}
                                                    alt={featured.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="eager"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-navy/30 to-transparent" />
                                                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow"
                                                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                                                    {featured.category}
                                                </span>
                                            </div>
                                            <div className="p-8 lg:p-10 flex flex-col justify-center">
                                                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                                                    Featured Post
                                                </p>
                                                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-gold transition-colors"
                                                    style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                    {featured.title}
                                                </h2>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {featured.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                                                    <span className="flex items-center gap-1"><User size={13} /> {featured.author}</span>
                                                    <span className="flex items-center gap-1"><Calendar size={13} /> {new Date(featured.published_at).toLocaleDateString('en-KE', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    <span className="flex items-center gap-1"><Clock size={13} /> {featured.read_time} min read</span>
                                                </div>
                                                <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all"
                                                    style={{ color: 'var(--navy)' }}>
                                                    Read Article <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* ── Rest of Posts Grid ── */}
                                {rest.length > 0 && (
                                    <>
                                        {featured && (
                                            <h2 className="text-lg font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                More Posts
                                            </h2>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {rest.map((post, i) => (
                                                <motion.article key={post.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.07 }}
                                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col group">
                                                    <Link to={`/blog/${post.slug}`} className="block aspect-video sm:h-48 overflow-hidden relative flex items-center justify-center bg-gray-50">
                                                        <img
                                                            src={post.cover_image || FALLBACK_IMG}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                        <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow"
                                                            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                                                            {post.category}
                                                        </span>
                                                    </Link>
                                                    <div className="p-5 flex flex-col flex-grow">
                                                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                                            <span className="flex items-center gap-1"><Calendar size={12} />{new Date(post.published_at).toLocaleDateString()}</span>
                                                            <span className="flex items-center gap-1"><Clock size={12} />{post.read_time} min</span>
                                                        </div>
                                                        <Link to={`/blog/${post.slug}`}>
                                                            <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-gold transition-colors"
                                                                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--navy)' }}>
                                                                {post.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="mt-auto flex items-center justify-between">
                                                            <span className="text-xs text-gray-400 flex items-center gap-1"><User size={11} />{post.author}</span>
                                                            <Link to={`/blog/${post.slug}`}
                                                                className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                                                                style={{ color: 'var(--navy)' }}>
                                                                Read <ArrowRight size={12} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.article>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* ── Pagination ── */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-navy hover:text-navy"
                                            style={{ borderColor: currentPage === 1 ? '#e5e7eb' : 'var(--navy)' }}
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        {Array.from({ length: totalPages }).map((_, idx) => {
                                            const page = idx + 1;
                                            const isActive = page === currentPage;
                                            // Show first, last, current, and pages near current
                                            if (
                                                page === 1 || page === totalPages ||
                                                Math.abs(page - currentPage) <= 1
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => goToPage(page)}
                                                        className="w-10 h-10 rounded-full text-sm font-semibold transition-all"
                                                        style={{
                                                            background: isActive ? 'var(--navy)' : 'transparent',
                                                            color: isActive ? '#fff' : 'var(--navy)',
                                                            border: `2px solid ${isActive ? 'var(--navy)' : '#e5e7eb'}`,
                                                        }}
                                                        aria-label={`Page ${page}`}
                                                        aria-current={isActive ? 'page' : undefined}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            }
                                            // Ellipsis
                                            if (Math.abs(page - currentPage) === 2) {
                                                return <span key={page} className="text-gray-400 px-1">…</span>;
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-navy hover:text-navy"
                                            style={{ borderColor: currentPage === totalPages ? '#e5e7eb' : 'var(--navy)' }}
                                            aria-label="Next page"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}

                                {/* Post count indicator */}
                                {totalPages > 1 && (
                                    <p className="text-center text-xs text-gray-400 mt-4">
                                        Page {currentPage} of {totalPages} · {filtered.length} articles
                                    </p>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>
        </>
    );
}
