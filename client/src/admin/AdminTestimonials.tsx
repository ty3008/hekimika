import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';

export default function AdminTestimonials() {
    const { data: testimonials, loading, refetch } = useApi<any[]>('/testimonials');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '', program: '', text: '', photo: ''
    });

    const openForm = (t?: any) => {
        if (t) {
            setEditingId(t._id);
            setFormData({
                name: t.name, program: t.program, text: t.text, photo: t.photo || ''
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', program: '', text: '', photo: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/testimonials/${editingId}`, formData);
                toast.success('Testimonial updated');
            } else {
                await api.post('/testimonials', formData);
                toast.success('Testimonial added');
            }
            setIsModalOpen(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this testimonial?')) {
            try {
                await api.delete(`/testimonials/${id}`);
                toast.success('Testimonial deleted');
                refetch();
            } catch {
                toast.error('Delete failed');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet><title>Manage Testimonials | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Testimonials</h1>
                <button onClick={() => openForm()} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Add Testimonial
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">User & Program</th>
                            <th className="px-6 py-4">Testimonial</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials?.map((t) => (
                            <tr key={t._id} className="border-b border-gray-50">
                                <td className="px-6 py-3 flex items-center gap-3">
                                    {t.photo ? (
                                        <img src={t.photo} className="w-10 h-10 object-cover rounded-full shadow-sm" alt="photo" />
                                    ) : <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>}
                                    <div>
                                        <p className="font-medium text-navy">{t.name}</p>
                                        <p className="text-xs text-gray-400">{t.program}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-3">
                                    <p className="text-gray-500 line-clamp-2 max-w-sm">{t.text}</p>
                                </td>
                                <td className="px-6 py-3 text-right shrink-0">
                                    <button onClick={() => openForm(t)} className="text-gray-400 hover:text-navy mr-3"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(t._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {testimonials?.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                                    No testimonials found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Name</label>
                                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Program</label>
                                    <input required value={formData.program} onChange={e => setFormData({ ...formData, program: e.target.value })} className="w-full p-2 border rounded" placeholder="e.g. Single & Built" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Photo URL (Optional)</label>
                                <input value={formData.photo} onChange={e => setFormData({ ...formData, photo: e.target.value })} className="w-full p-2 border rounded" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Testimonial Text</label>
                                <textarea rows={4} required value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} className="w-full p-2 border rounded"></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                                <button type="submit" className="btn-primary">Save Testimonial</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
