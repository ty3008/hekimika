import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    LayoutDashboard, BookOpen, Video, FileText, LogOut, Menu, X, ChevronRight, Layers
} from 'lucide-react';

const ADMIN_NAV = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Programs', path: '/admin/programs', icon: Video },
    { label: 'Books', path: '/admin/books', icon: BookOpen },
    { label: 'Free Resources', path: '/admin/free-resources', icon: Layers },
    { label: 'Blog & Devotionals', path: '/admin/blog', icon: FileText },
];

interface Props { children: React.ReactNode; }

export default function AdminLayout({ children }: Props) {
    const { admin, logout } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => { logout(); navigate('/admin'); };

    return (
        <div className="min-h-screen flex" style={{ background: '#f0f4f8' }}>
            {/* Sidebar */}
            <aside
                className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}
                style={{ background: 'var(--navy)', minHeight: '100vh' }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                        <span className="text-navy font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>H</span>
                    </div>
                    {sidebarOpen && (
                        <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Admin Panel</span>
                    )}
                    <button onClick={() => setSidebarOpen((v) => !v)} className="ml-auto text-white/50 hover:text-white">
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-2 space-y-1">
                    {ADMIN_NAV.map(({ label, path, icon: Icon }) => {
                        const active = pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                title={label}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${active ? 'text-navy' : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                                style={{ background: active ? 'var(--gold)' : undefined, color: active ? 'var(--navy)' : undefined }}
                            >
                                <Icon size={18} className="flex-shrink-0" />
                                {sidebarOpen && <span>{label}</span>}
                                {sidebarOpen && active && <ChevronRight size={14} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="border-t border-white/10 p-4">
                    {sidebarOpen && (
                        <div className="mb-3">
                            <p className="text-white text-sm font-medium">{admin?.name}</p>
                            <p className="text-white/50 text-xs">{admin?.email}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-white/60 hover:text-red-400 text-sm transition-colors w-full"
                    >
                        <LogOut size={16} />
                        {sidebarOpen && 'Logout'}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
