import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, ExternalLink, FileText, BookOpen, Layers } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import api from '../utils/api';

export default function AdminFreeResources() {
    const { data: resources, loading, refetch } = useApi<any[]>('/free-resources');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '', shortDescription: '', type: 'Magazine', googleDriveLink: ''
    });

    const openForm = (resource?: any) => {
        if (resource) {
            setEditingId(resource._id);
            setFormData({
                title: resource.title,
                shortDescription: resource.shortDescription,
                type: resource.type,
                googleDriveLink: resource.googleDriveLink
            });
        } else {
            setEditingId(null);
            setFormData({ title: '', shortDescription: '', type: 'Magazine', googleDriveLink: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/free-resources/${editingId}`, formData);
                toast.success('Resource updated');
            } else {
                await api.post('/free-resources', formData);
                toast.success('Resource added');
            }
            setIsModalOpen(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this resource?')) {
            try {
                await api.delete(`/free-resources/${id}`);
                toast.success('Resource deleted');
                refetch();
            } catch {
                toast.error('Delete failed');
            }
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Magazine': return <Layers size={16} />;
            case 'Devotional': return <FileText size={16} />;
            case 'FreeBook': return <BookOpen size={16} />;
            default: return <FileText size={16} />;
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading resources...</div>;

    return (
        <>
            <Helmet><title>Manage Free Resources | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Free Resources</h1>
                    <p className="text-gray-500 text-sm">Magazines, Devotionals, and Free Books</p>
                </div>
                <button onClick={() => openForm()} className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2">
                    <Plus size={18} /> Add Resource
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Title & Description</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Link</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {resources?.map((r) => (
                            <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-navy text-base">{r.title}</p>
                                    <p className="text-gray-500 line-clamp-1 text-xs">{r.shortDescription}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        {getTypeIcon(r.type)}
                                        {r.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={r.googleDriveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gold hover:underline flex items-center gap-1 font-medium"
                                    >
                                        Drive <ExternalLink size={12} />
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openForm(r)}
                                            className="p-2 text-gray-400 hover:text-navy hover:bg-white rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {resources?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                    No resources found. Click "Add Resource" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-navy">{editingId ? 'Edit Resource' : 'Add New Resource'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-navy">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                    placeholder="e.g. Wisdom Edition 1"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white"
                                    >
                                        <option value="Magazine">Magazine</option>
                                        <option value="Devotional">Devotional</option>
                                        <option value="FreeBook">Free Book</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Google Drive Link</label>
                                    <input
                                        required
                                        value={formData.googleDriveLink}
                                        onChange={e => setFormData({ ...formData, googleDriveLink: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                                        placeholder="https://drive.google.com/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={formData.shortDescription}
                                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                                    placeholder="Briefly describe what this resource covers..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary px-8 py-2.5"
                                >
                                    {editingId ? 'Update Resource' : 'Create Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// Inline X icon for the modal close button
function X({ size, className = "" }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}
