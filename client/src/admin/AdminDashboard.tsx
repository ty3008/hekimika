import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { Video, BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const { admin } = useAuth();

    return (
        <>
            <Helmet>
                <title>Dashboard | Hekimika Admin</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Welcome back, {admin?.name.split(' ')[0]}
                </h1>
                <p className="text-gray-500 mt-2">Manage your programs, books, and website content here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/admin/programs" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-navy/5 text-navy group-hover:bg-navy group-hover:text-gold transition-colors">
                        <Video size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-navy mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Programs</h3>
                    <p className="text-sm text-gray-500">Manage 8-week programs, workshops, and link them to Selar.</p>
                </Link>

                <Link to="/admin/books" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-navy mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Books & Store</h3>
                    <p className="text-sm text-gray-500">Update available books and pricing on the Resources page.</p>
                </Link>

                <Link to="/admin/blog" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gray-100 text-gray-500 group-hover:bg-gray-200 transition-colors">
                        <FileText size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-navy mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Blog & Devotionals</h3>
                    <p className="text-sm text-gray-500">Create, edit, and publish new devotionals or blog content.</p>
                </Link>
            </div>
        </>
    );
}
