import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.error || 'Invalid credentials');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Helmet>
                <title>Admin Login | Hekimika</title>
            </Helmet>

            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--navy)' }}>
                        <span className="text-gold font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>H</span>
                    </div>
                    <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Admin Login</h1>
                    <p className="text-sm text-gray-400 mt-1">Sign in to manage Hekimika</p>
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                            placeholder="admin@hekimika.org"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary py-3 flex justify-center items-center h-12"
                    >
                        {submitting ? (
                            <div className="w-5 h-5 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
