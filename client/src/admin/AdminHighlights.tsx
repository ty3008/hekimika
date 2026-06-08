import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';

const getDriveThumbnail = (url: string) => {
    if (!url) return '';
    if (url.includes('/file/d/')) {
        const parts = url.split('/file/d/');
        if (parts[1]) {
            const fileId = parts[1].split('/')[0];
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        }
    }
    if (url.includes('?id=') || url.includes('&id=')) {
        const match = url.match(/[?&]id=([^&]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
    }
    return url;
};

interface Highlight {
    id: number;
    title: string;
    photoUrl: string;
    youtubeUrl: string;
    sortOrder: number;
}

export default function AdminHighlights() {
    const { data: highlights, loading, refetch } = useApi<Highlight[]>('/highlights');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        photoUrl: '',
        youtubeUrl: '',
        sortOrder: 0,
    });

    const resetForm = () => {
        setFormData({ title: '', photoUrl: '', youtubeUrl: '', sortOrder: 0 });
        setEditingId(null);
    };

    const openForm = (highlight?: Highlight) => {
        if (highlight) {
            setEditingId(highlight.id);
            setFormData({
                title: highlight.title,
                photoUrl: highlight.photoUrl,
                youtubeUrl: highlight.youtubeUrl,
                sortOrder: highlight.sortOrder || 0,
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/highlights/${editingId}`, formData);
                toast.success('Highlight updated');
            } else {
                await api.post('/highlights', formData);
                toast.success('Highlight created');
            }
            setIsModalOpen(false);
            resetForm();
            refetch();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this highlight?')) {
            try {
                await api.delete(`/highlights/${id}`);
                toast.success('Highlight deleted');
                refetch();
            } catch {
                toast.error('Failed to delete');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet><title>Manage Highlights | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Program Highlights</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage photos and YouTube videos displayed on the homepage.</p>
                </div>
                <button onClick={() => openForm()} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Add Highlight
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Photo</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">YouTube</th>
                            <th className="px-6 py-4">Order</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highlights?.map((h) => (
                            <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="px-6 py-3">
                                    <img src={getDriveThumbnail(h.photoUrl) || h.photoUrl} alt={h.title} className="w-16 h-12 object-cover rounded-lg" />
                                </td>
                                <td className="px-6 py-3 font-medium text-navy">{h.title}</td>
                                <td className="px-6 py-3">
                                    <a href={h.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">
                                        <ExternalLink size={14} /> View
                                    </a>
                                </td>
                                <td className="px-6 py-3 text-gray-500">{h.sortOrder}</td>
                                <td className="px-6 py-3 text-right">
                                    <button onClick={() => openForm(h)} className="text-gray-400 hover:text-navy mr-3"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(h.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {highlights?.length === 0 && (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No highlights added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{editingId ? 'Edit Highlight' : 'New Highlight'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg"
                                    placeholder="e.g. Preparing for Love Cohort 3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Photo URL</label>
                                <input
                                    required
                                    value={formData.photoUrl}
                                    onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg"
                                    placeholder="https://example.com/photo.webp"
                                />
                                {formData.photoUrl && (
                                    <img src={getDriveThumbnail(formData.photoUrl) || formData.photoUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg border" />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
                                <input
                                    required
                                    value={formData.youtubeUrl}
                                    onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                    className="w-full p-2.5 border rounded-lg"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sortOrder}
                                    onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                                    className="w-full p-2.5 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 border rounded-lg">Cancel</button>
                                <button type="submit" className="btn-primary">Save Highlight</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
