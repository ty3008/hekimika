import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import {
    Plus, Pencil, Trash2, CheckCircle, XCircle, Eye, EyeOff,
    Bold, Italic, Underline, List, ListOrdered, Quote, Heading1, Heading2,
    MessageSquare, Tag, FileText, X, Link,
} from 'lucide-react';
import api from '../utils/api';

// ── Types ──────────────────────────────────────────────────────────────
interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    author: string;
    category: string;
    status: 'draft' | 'published';
    read_time: number;
    published_at: string;
    created_at: string;
}
interface Comment {
    id: number;
    name: string;
    email: string;
    message: string;
    approved: boolean;
    created_at: string;
    post_title: string;
    post_slug: string;
}
interface Category {
    id: number;
    name: string;
    slug: string;
}

const EMPTY_FORM = {
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: 'Pastor Kevin Mulati',
    category: 'General',
    status: 'published' as 'draft' | 'published',
};

// ── Rich Text Toolbar ─────────────────────────────────────────────────
function RichToolbar({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) {
    const exec = (cmd: string, value?: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, value);
    };
    const tools = [
        { icon: Bold, cmd: 'bold', title: 'Bold (Ctrl+B)' },
        { icon: Italic, cmd: 'italic', title: 'Italic (Ctrl+I)' },
        { icon: Underline, cmd: 'underline', title: 'Underline (Ctrl+U)' },
    ];
    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            {tools.map(({ icon: Icon, cmd, title }) => (
                <button
                    key={cmd} type="button" title={title}
                    onMouseDown={(e) => { e.preventDefault(); exec(cmd); }}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors"
                >
                    <Icon size={16} />
                </button>
            ))}
            <div className="w-px h-6 bg-gray-300 self-center mx-1" />
            <button type="button" title="Heading 1" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', '<h2>'); }}
                className="h-8 px-2 flex items-center gap-1 rounded hover:bg-gray-200 text-gray-600 text-xs font-bold transition-colors">
                <Heading1 size={14} /> H1
            </button>
            <button type="button" title="Heading 2" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', '<h3>'); }}
                className="h-8 px-2 flex items-center gap-1 rounded hover:bg-gray-200 text-gray-600 text-xs font-bold transition-colors">
                <Heading2 size={14} /> H2
            </button>
            <div className="w-px h-6 bg-gray-300 self-center mx-1" />
            <button type="button" title="Ordered List" onMouseDown={(e) => { e.preventDefault(); exec('insertOrderedList'); }}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors">
                <ListOrdered size={16} />
            </button>
            <button type="button" title="Unordered List" onMouseDown={(e) => { e.preventDefault(); exec('insertUnorderedList'); }}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors">
                <List size={16} />
            </button>
            <button type="button" title="Blockquote (for scripture)" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', '<blockquote>'); }}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors">
                <Quote size={16} />
            </button>
            <div className="w-px h-6 bg-gray-300 self-center mx-1" />
            <button type="button" title="Insert Link" onMouseDown={(e) => {
                e.preventDefault();
                const url = prompt('Enter URL:');
                if (url) exec('createLink', url);
            }} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors">
                <Link size={16} />
            </button>
            <button type="button" title="Remove Formatting" onMouseDown={(e) => { e.preventDefault(); exec('removeFormat'); }}
                className="h-8 px-2 text-xs text-gray-500 rounded hover:bg-gray-200 transition-colors">
                Clear
            </button>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────
export default function AdminBlog() {
    const [tab, setTab] = useState<'posts' | 'comments' | 'categories'>('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [saving, setSaving] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [addingCat, setAddingCat] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [postsRes, commentsRes, catsRes] = await Promise.all([
                api.get('/blog/admin/posts'),
                api.get('/blog/admin/comments'),
                api.get('/blog/categories/all'),
            ]);
            setPosts(postsRes.data);
            setComments(commentsRes.data);
            setCategories(catsRes.data);
        } catch {
            toast.error('Failed to load blog data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // ── Modal helpers ──────────────────────────────────────────────────
    const openCreate = () => {
        setEditPost(null);
        setForm({ ...EMPTY_FORM });
        setShowModal(true);
        setTimeout(() => {
            if (editorRef.current) editorRef.current.innerHTML = '';
        }, 50);
    };

    const openEdit = async (post: Post) => {
        setEditPost(post);
        // fetch full post for content
        const res = await api.get(`/blog/${post.slug}`);
        const full = res.data;
        setForm({
            title: full.title,
            content: full.content,
            excerpt: full.excerpt || '',
            coverImage: full.cover_image || '',
            author: full.author || 'Pastor Kevin Mulati',
            category: full.category || 'General',
            status: full.status || 'published',
        });
        setShowModal(true);
        setTimeout(() => {
            if (editorRef.current) editorRef.current.innerHTML = full.content || '';
        }, 50);
    };

    const closeModal = () => { setShowModal(false); setEditPost(null); };

    const handleSave = async () => {
        const content = editorRef.current?.innerHTML || '';
        if (!form.title.trim() || !content.trim()) {
            toast.error('Title and content are required'); return;
        }
        setSaving(true);
        try {
            const payload = { ...form, content };
            if (editPost) {
                await api.put(`/blog/${editPost.id}`, payload);
                toast.success('Post updated!');
            } else {
                await api.post('/blog', payload);
                toast.success('Post published!');
            }
            closeModal();
            fetchAll();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to save post');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await api.delete(`/blog/${id}`);
            toast.success('Post deleted');
            fetchAll();
        } catch {
            toast.error('Failed to delete post');
        }
    };

    // ── Comment actions ────────────────────────────────────────────────
    const handleApprove = async (id: number) => {
        try {
            await api.patch(`/blog/comments/${id}/approve`);
            toast.success('Comment approved');
            fetchAll();
        } catch { toast.error('Failed to approve'); }
    };

    const handleDeleteComment = async (id: number) => {
        if (!confirm('Delete this comment?')) return;
        try {
            await api.delete(`/blog/comments/${id}`);
            toast.success('Comment deleted');
            fetchAll();
        } catch { toast.error('Failed to delete comment'); }
    };

    // ── Category actions ───────────────────────────────────────────────
    const handleAddCategory = async () => {
        if (!newCatName.trim()) return;
        setAddingCat(true);
        try {
            await api.post('/blog/categories', { name: newCatName.trim() });
            toast.success(`Category "${newCatName}" created`);
            setNewCatName('');
            fetchAll();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Failed to create category');
        } finally {
            setAddingCat(false);
        }
    };

    const handleDeleteCategory = async (id: number, name: string) => {
        if (!confirm(`Delete category "${name}"?`)) return;
        try {
            await api.delete(`/blog/categories/${id}`);
            toast.success('Category deleted');
            fetchAll();
        } catch { toast.error('Failed to delete category'); }
    };

    const pendingCount = comments.filter(c => !c.approved).length;

    return (
        <>
            <Helmet><title>Blogs | Admin</title></Helmet>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Blogs</h1>
                    <p className="text-sm text-gray-500 mt-1">Write, edit, publish, and manage blog posts and community comments.</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 transition-colors">
                    <Plus size={16} /> New Post
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                {([
                    { key: 'posts', icon: FileText, label: 'Posts' },
                    { key: 'comments', icon: MessageSquare, label: `Comments${pendingCount ? ` (${pendingCount} pending)` : ''}` },
                    { key: 'categories', icon: Tag, label: 'Categories' },
                ] as const).map(({ key, icon: Icon, label }) => (
                    <button key={key} onClick={() => setTab(key)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === key ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
                        <Icon size={15} /> {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-gray-200 border-t-gold rounded-full animate-spin" /></div>
            ) : (
                <>
                    {/* ── POSTS TAB ─────────────────────────────────────── */}
                    {tab === 'posts' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {posts.length === 0 ? (
                                <div className="p-16 text-center text-gray-400">
                                    <FileText size={40} className="mx-auto mb-3 opacity-30" />
                                    <p>No posts yet. Click "New Post" to get started.</p>
                                </div>
                            ) : (
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 tracking-wide">
                                        <tr>
                                            <th className="text-left px-4 py-3">Title</th>
                                            <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                                            <th className="text-left px-4 py-3 hidden sm:table-cell">Status</th>
                                            <th className="text-left px-4 py-3 hidden lg:table-cell">Date</th>
                                            <th className="text-right px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {posts.map(post => (
                                            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold text-navy line-clamp-1">{post.title}</p>
                                                    <p className="text-xs text-gray-400">{post.read_time} min read</p>
                                                </td>
                                                <td className="px-4 py-3 hidden md:table-cell">
                                                    <span className="px-2 py-0.5 bg-navy/10 text-navy text-xs rounded-full font-medium">{post.category}</span>
                                                </td>
                                                <td className="px-4 py-3 hidden sm:table-cell">
                                                    {post.status === 'published'
                                                        ? <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><Eye size={12} /> Published</span>
                                                        : <span className="flex items-center gap-1 text-gray-400 text-xs font-medium"><EyeOff size={12} /> Draft</span>}
                                                </td>
                                                <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => openEdit(post)}
                                                            className="p-1.5 text-gray-400 hover:text-navy hover:bg-navy/5 rounded transition-colors">
                                                            <Pencil size={15} />
                                                        </button>
                                                        <button onClick={() => handleDelete(post.id, post.title)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* ── COMMENTS TAB ──────────────────────────────────── */}
                    {tab === 'comments' && (
                        <div className="space-y-3">
                            {comments.length === 0 ? (
                                <div className="bg-white rounded-xl p-16 text-center text-gray-400 border border-gray-100">
                                    <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                                    <p>No comments yet.</p>
                                </div>
                            ) : (
                                comments.map(c => (
                                    <div key={c.id} className={`bg-white rounded-xl p-4 border shadow-sm flex flex-col sm:flex-row sm:items-start gap-3 ${!c.approved ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="font-semibold text-navy text-sm">{c.name}</span>
                                                {c.email && <span className="text-xs text-gray-400">{c.email}</span>}
                                                {!c.approved && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pending</span>}
                                                {c.approved && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Approved</span>}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-1">{c.message}</p>
                                            <p className="text-xs text-gray-400">
                                                On: <span className="font-medium text-navy">{c.post_title}</span> · {new Date(c.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            {!c.approved && (
                                                <button onClick={() => handleApprove(c.id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors">
                                                    <CheckCircle size={13} /> Approve
                                                </button>
                                            )}
                                            <button onClick={() => handleDeleteComment(c.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                                                <XCircle size={13} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ── CATEGORIES TAB ────────────────────────────────── */}
                    {tab === 'categories' && (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Manage Categories</h3>

                            {/* Add new */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={newCatName}
                                    onChange={e => setNewCatName(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                                    placeholder="New category name (e.g. Grace)"
                                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                                />
                                <button onClick={handleAddCategory} disabled={addingCat || !newCatName.trim()}
                                    className="flex items-center gap-1.5 bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 disabled:opacity-50 transition-colors">
                                    <Plus size={15} /> Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <div key={cat.id} className="flex items-center gap-1.5 bg-gray-100 rounded-full px-4 py-1.5 group">
                                        <span className="text-sm font-medium text-navy">{cat.name}</span>
                                        <button onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                            className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ── POST EDITOR MODAL ──────────────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {editPost ? 'Edit Post' : 'New Blog Post'}
                            </h2>
                            <button onClick={closeModal} className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Title *</label>
                                <input
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="Post title..."
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-navy/30"
                                />
                            </div>

                            {/* Rich Text Editor */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Content *</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-navy/30">
                                    <RichToolbar editorRef={editorRef} />
                                    <div
                                        ref={editorRef}
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="min-h-[280px] p-4 text-gray-700 text-sm leading-relaxed focus:outline-none prose-editor"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        data-placeholder="Start writing your post here..."
                                        onInput={() => {
                                            const text = editorRef.current?.innerText || '';
                                            setForm(f => ({ ...f, content: text }));
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Use Blockquote for scripture verses. Bold/Italic for emphasis.</p>
                            </div>

                            {/* Row: Category + Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Category</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30">
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Status</label>
                                    <div className="flex gap-2">
                                        {(['published', 'draft'] as const).map(s => (
                                            <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))}
                                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border text-sm font-semibold transition-all ${form.status === s ? (s === 'published' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-500 text-white border-gray-500') : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                                                {s === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Excerpt / Summary</label>
                                <textarea
                                    value={form.excerpt}
                                    onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                    placeholder="A short summary shown on the blog listing page..."
                                    rows={3}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 resize-none"
                                />
                            </div>

                            {/* Row: Cover Image + Author */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Cover Image URL</label>
                                    <input
                                        value={form.coverImage}
                                        onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Author</label>
                                    <input
                                        value={form.author}
                                        onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
                            <button onClick={closeModal} className="px-5 py-2.5 text-gray-500 hover:text-navy text-sm font-medium transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving}
                                className="flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy/90 disabled:opacity-60 transition-colors">
                                {saving ? 'Saving...' : editPost ? 'Save Changes' : 'Publish Post'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for editor placeholder and prose styles */}
            <style>{`
                .prose-editor:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }
                .prose-editor h2 { font-size: 1.25rem; font-weight: 700; color: #001F3F; margin: 1rem 0 0.5rem; }
                .prose-editor h3 { font-size: 1.1rem; font-weight: 600; color: #001F3F; margin: 0.75rem 0 0.4rem; }
                .prose-editor blockquote { border-left: 4px solid #D4AF37; padding: 0.5rem 1rem; margin: 0.75rem 0; background: #fafaf7; font-style: italic; color: #4b5563; }
                .prose-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
                .prose-editor ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
                .prose-editor a { color: #001F3F; text-decoration: underline; }
            `}</style>
        </>
    );
}
