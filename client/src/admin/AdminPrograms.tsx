import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';

export default function AdminPrograms() {
    const { data: programs, loading, refetch } = useApi<any[]>('/programs');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '', category: 'Single & Built', description: '', fullDescription: '',
        model: '8-week', image: '', selarUrl: '', curriculum: ''
    });

    const resetForm = () => {
        setFormData({ title: '', category: 'Single & Built', description: '', fullDescription: '', model: '8-week', image: '', selarUrl: '', curriculum: '' });
        setEditingId(null);
    };

    const openForm = (program?: any) => {
        if (program) {
            setEditingId(program._id);
            setFormData({
                title: program.title, category: program.category, description: program.description,
                fullDescription: program.fullDescription || '', model: program.model, image: program.image || '',
                selarUrl: program.selarUrl, curriculum: program.curriculum.join('\n')
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...formData, curriculum: formData.curriculum.split('\n').filter(s => s.trim()) };
        try {
            if (editingId) {
                await api.put(`/programs/${editingId}`, payload);
                toast.success('Program updated');
            } else {
                await api.post('/programs', payload);
                toast.success('Program created');
            }
            setIsModalOpen(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this program?')) {
            try {
                await api.delete(`/programs/${id}`);
                toast.success('Program deleted');
                refetch();
            } catch {
                toast.error('Failed to delete');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet><title>Manage Programs | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Programs</h1>
                <button onClick={() => openForm()} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                    <Plus size={16} /> Add Program
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Model</th>
                            <th className="px-6 py-4">Selar URL</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs?.map((p) => (
                            <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="px-6 py-3 font-medium text-navy">{p.title}</td>
                                <td className="px-6 py-3 text-gray-500">{p.category}</td>
                                <td className="px-6 py-3 text-gray-500">{p.model}</td>
                                <td className="px-6 py-3"><a href={p.selarUrl} target="_blank" className="text-blue-500 hover:underline">Link</a></td>
                                <td className="px-6 py-3 text-right">
                                    <button onClick={() => openForm(p)} className="text-gray-400 hover:text-navy mr-3"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(p._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {programs?.length === 0 && (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No programs added yet. Add one via the API or top button.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Modal (Simplified purely functional modal for time constraint reasons) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Program' : 'New Program'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Title</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border rounded">
                                        <option>Single & Built</option><option>Couples</option><option>Schools</option><option>Leadership</option><option>Discovery</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Model</label>
                                    <select value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} className="w-full p-2 border rounded">
                                        <option>8-week</option><option>workshop</option><option>ongoing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Selar URL</label>
                                    <input required value={formData.selarUrl} onChange={e => setFormData({ ...formData, selarUrl: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm mb-1">Image URL</label>
                                    <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm mb-1">Short Description</label>
                                    <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded"></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm mb-1">Curriculum (One per line)</label>
                                    <textarea rows={5} value={formData.curriculum} onChange={e => setFormData({ ...formData, curriculum: e.target.value })} className="w-full p-2 border rounded"></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                                <button type="submit" className="btn-primary">Save Program</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
