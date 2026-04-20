import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--navy)' }}>
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-gold animate-spin mx-auto mb-4" style={{ borderTopColor: 'var(--gold)' }} />
                    <p className="text-white/60">Loading…</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
}
