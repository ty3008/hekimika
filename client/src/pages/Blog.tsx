import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import SectionTitle from '../components/SectionTitle';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
    const { data: posts, loading } = useApi<any[]>('/blog-posts');

    return (
        <>
            <Helmet>
                <title>Blog | Hekimika Wisdom</title>
                <meta name="description" content="Insights, stories, and teachings from the Wise Nation." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16" style={{ background: 'var(--navy)' }}>
                <div className="container-xl text-center">
                    <SectionTitle
                        overline="Wisdom in Writing"
                        title="Our Blog"
                        subtitle="Dive deeper into godly wisdom through articles written by our leadership and community."
                        light
                        centered
                    />
                </div>
            </section>

            <section className="section-pad bg-gray-50 min-h-screen">
                <div className="container-xl">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-gold rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts?.map((post, i) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img src={post.image || '/assets/home-carousel/carousel 1.jpg'} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.createdAt || post.date).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-navy mb-3 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{post.title}</h2>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                            {post.summary || post.content?.substring(0, 150) + '...'}
                                        </p>
                                        <div className="mt-auto">
                                            <Link to={`/blog/${post.slug || post.id}`} className="text-sm font-bold text-navy hover:text-gold flex items-center gap-2 transition-colors">
                                                Read More <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                            {posts?.length === 0 && (
                                <p className="col-span-full text-center text-gray-400 py-20">No blog posts found yet. Check back soon!</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
