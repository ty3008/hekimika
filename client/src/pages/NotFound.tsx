import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
            <h1 className="text-9xl font-bold text-gold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--gold)' }}>404</h1>
            <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn-primary">
                Return Home
            </Link>
        </div>
    );
}
