import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';

export default function AdminBlog() {
    return (
        <>
            <Helmet><title>Blog & Devotionals | Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Blog & Devotionals</h1>
                <button disabled className="bg-gray-200 text-gray-500 py-2 px-4 text-sm rounded cursor-not-allowed">
                    Coming Soon
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Content Manager Coming Soon</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    The blog and devotional management feature is currently in development and will be available in the next iteration.
                </p>
            </div>
        </>
    );
}
