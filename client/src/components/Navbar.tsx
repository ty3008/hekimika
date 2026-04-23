import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../utils/constants';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    const isHome = pathname === '/';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome
                    ? 'bg-navy shadow-lg backdrop-blur-sm'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container-xl flex items-center justify-between h-20 px-4 md:px-8 lg:px-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                        <span className="text-navy font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>H</span>
                    </div>
                    <div>
                        <span className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Hekimika
                        </span>
                        <p className="text-xs" style={{ color: 'var(--gold)', lineHeight: 1 }}>Wise Nation</p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-gold ${pathname === link.path ? 'text-gold' : 'text-white/90'
                                    }`}
                                style={{ color: pathname === link.path ? 'var(--gold)' : undefined }}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA + Hamburger */}
                <div className="flex items-center gap-4">
                    <Link to="/perfected-in-wisdom" className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5">
                        Join a Program
                    </Link>
                    <button
                        className="lg:hidden text-white p-3 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden"
                        style={{ background: 'var(--navy-light)' }}
                    >
                        <ul className="flex flex-col px-6 py-4 gap-1">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`block text-base font-medium py-3 px-2 border-b border-white/10 min-h-[44px] ${pathname === link.path ? 'text-gold' : 'text-white'
                                            }`}
                                        style={{ color: pathname === link.path ? 'var(--gold)' : undefined }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to="/perfected-in-wisdom" className="btn-primary w-full text-center mt-2">
                                    Join a Program
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
