import { Link } from 'react-router-dom';
import { MessageCircle, Video, Camera, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: 'var(--navy)', color: '#fff' }}>
            {/* CTA Banner */}
            <div className="py-16 px-4 md:px-8 lg:px-16" style={{ background: 'linear-gradient(135deg, var(--navy-light) 0%, #003366 100%)' }}>
                <div className="container-xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                        Join thousands who have found wisdom, healing, and purpose through Hekimika programs.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/perfected-in-wisdom" className="btn-primary px-8 py-4 text-base">
                            Explore Programs
                        </Link>
                        <Link to="/contact" className="btn-outline px-8 py-4 text-base">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="section-pad pt-16 pb-12">
                <div className="container-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                                <span className="text-navy font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>H</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Hekimika</p>
                                <p className="text-xs" style={{ color: 'var(--gold)' }}>Wise Nation</p>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            "Raising the Generation of the Wise all over the World." A global outreach ministry led by Pastor Kevin & Lilian Mulati.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: MessageCircle, href: 'https://facebook.com/hekimika', label: 'Facebook' },
                                { Icon: Video, href: 'https://youtube.com/@hekimika', label: 'YouTube' },
                                { Icon: Camera, href: 'https://instagram.com/hekimika', label: 'Instagram' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-gold hover:border-gold transition-colors"
                                    style={{ color: undefined }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'About Us', to: '/about' },
                                { label: 'Programs', to: '/perfected-in-wisdom' },
                                { label: 'Wisdom Moments', to: '/wisdom-moments' },
                                { label: 'Young & Wise', to: '/young-and-wise' },
                                { label: 'Resources', to: '/resources' },
                            ].map(({ label, to }) => (
                                <li key={to}>
                                    <Link to={to} className="text-white/60 hover:text-gold text-sm transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Programs</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Single & Built', to: '/perfected-in-wisdom?category=Single+%26+Built' },
                                { label: 'For Couples', to: '/perfected-in-wisdom?category=Couples' },
                                { label: 'School of Purity', to: '/programs/school-of-purity' },
                                { label: 'School of Healing', to: '/programs/school-of-healing' },
                                { label: 'Built to Lead', to: '/programs/built-to-lead' },
                                { label: 'Discovery Class', to: '/programs/discovery-class' },
                            ].map(({ label, to }) => (
                                <li key={to}>
                                    <Link to={to} className="text-white/60 hover:text-gold text-sm transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <Mail size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                                <span>info@hekimika.org</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <Phone size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                                <span>+254 700 000 000</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                                <span>Nairobi, Kenya</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6 px-4 md:px-8 lg:px-16">
                <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
                    <div>
                        <p className="mb-1" style={{ color: 'var(--gold)' }}>Significance | Relevance | Dominion</p>
                        <p>© {new Date().getFullYear()} Hekimika – Wise Nation. All rights reserved.</p>
                    </div>
                    <p>
                        Built with ❤️ for the Generation of the Wise |{' '}
                        <Link to="/admin" className="hover:text-gold transition-colors">Admin</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
