import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';

export default function AdminBooks() {
    const { data: books, loading, refetch } = useApi<any[]>('/books');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '', author: 'Pastor Kevin Mulati', description: '', price: '', coverImage: '', selarUrl: ''
    });

    const openForm = (book?: any) => {
        if (book) {
            setEditingId(book._id);
            setFormData({
                title: book.title, author: book.author, description: book.description,
                price: book.price, coverImage: book.coverImage || '', selarUrl: book.selarUrl
            });
        } else {
            setEditingId(null);
            setFormData({ title: '', author: 'Pastor Kevin Mulati', description: '', price: '', coverImage: '', selarUrl: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/books/${editingId}`, formData);
                toast.success('Book updated');
            } else {
                await api.post('/books', formData);
                toast.success('Book added');
            }
            setIsModalOpen(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this book?')) {
            try {
                await api.delete(`/books/${id}`);
                toast.success('Book deleted');
                refetch();
            } catch {
                toast.error('Delete failed');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet><title>Manage Books | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Books Library</h1>
                <button onClick={() => openForm()} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Add Book
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Cover & Title</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Selar Link</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((b) => (
                            <tr key={b._id} className="border-b border-gray-50">
                                <td className="px-6 py-3 flex items-center gap-3">
                                    {b.coverImage ? (
                                        <img src={b.coverImage} className="w-10 h-14 object-cover rounded shadow-sm" alt="cover" />
                                    ) : <div className="w-10 h-14 bg-gray-200 rounded shrink-0"></div>}
                                    <div>
                                        <p className="font-medium text-navy">{b.title}</p>
                                        <p className="text-xs text-gray-400">{b.author}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-3 font-medium text-gray-600">{b.price}</td>
                                <td className="px-6 py-3">
                                    <a href={b.selarUrl} target="_blank" className="text-blue-500 hover:text-blue-700"><ExternalLink size={16} /></a>
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button onClick={() => openForm(b)} className="text-gray-400 hover:text-navy mr-3"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(b._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Book' : 'New Book'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Title</label>
                                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Price</label>
                                    <input required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. KES 1,500" className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Selar URL</label>
                                    <input required value={formData.selarUrl} onChange={e => setFormData({ ...formData, selarUrl: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Cover Image URL</label>
                                <input value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Description</label>
                                <textarea rows={3} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded"></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                                <button type="submit" className="btn-primary">Save Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
