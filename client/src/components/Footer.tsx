import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const FacebookIcon = ({ size = 24, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.35L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </svg>
);

const InstagramIcon = ({ size = 24, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const YoutubeIcon = ({ size = 24, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.1 0 12 0 12s0 3.9.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.9 24 12 24 12s0-3.9-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const TikTokIcon = ({ size = 24, ...props }: any) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.4c-.01 1.96-.81 3.82-2.15 5.24-1.39 1.4-3.32 2.22-5.32 2.22-4.11-.02-7.46-3.35-7.48-7.45-.02-4.11 3.32-7.45 7.42-7.46 1.15.01 2.28.27 3.3.77.29.13.56.29.83.47v4.26c-.66-.39-1.41-.6-2.18-.61-1.89-.02-3.44 1.5-3.46 3.39-.02 1.89 1.5 3.44 3.39 3.46 1.89.02 3.44-1.5 3.46-3.39V0z" />
    </svg>
);

const QUICK_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Programs', path: '/perfected-in-wisdom' },
    { label: 'Video Teachings', path: '/video-teachings' },
    { label: 'Library', path: '/library' },
    { label: 'Resources', path: '/resources' },
    { label: 'Wisdom Moments', path: '/wisdom-moments' },
    { label: 'Teens Corner', path: '/young-and-wise' },
    { label: 'Partnerships', path: '/partnerships' },
    { label: 'Contact', path: '/contact' },
];

export default function Footer() {
    return (
        <footer style={{ background: 'var(--navy)', color: '#fff' }}>
            {/* CTA Banner */}
            <div className="py-6 px-4 md:px-8 lg:px-16" style={{ background: 'linear-gradient(135deg, var(--navy-light) 0%, #003366 100%)' }}>
                <div className="container-xl text-center flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-white/70 text-sm max-w-xl">
                            Join thousands who have found wisdom, healing, and purpose through Hekimika programs.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/perfected-in-wisdom" className="btn-primary px-6 py-2.5 text-sm">
                            Explore Programs
                        </Link>
                        <Link to="/contact" className="btn-outline px-6 py-2.5 text-sm">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="pt-12 pb-8 px-4 md:px-8 lg:px-16">
                <div className="container-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                        {/* ── Brand column ── */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src="/hekimika_logo.png"
                                    alt="Hekimika Logo"
                                    className="w-10 h-10 object-contain"
                                />
                                <div>
                                    <p className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Hekimika</p>
                                    <p className="text-[10px]" style={{ color: 'var(--gold)' }}>Wise Nation</p>
                                </div>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed mb-5">
                                A global ministry raising the generation of the wise — equipping singles, couples, and leaders with biblical wisdom for relationships, masculinity, leadership, and purpose.
                            </p>
                            {/* Social icons */}
                            <div className="flex gap-3">
                                {[
                                    { Icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?id=61552354056302', label: 'Facebook' },
                                    { Icon: InstagramIcon, href: 'https://www.instagram.com/hekimika2?igsh=aWx5YnY1N2x1aW5z', label: 'Instagram' },
                                    { Icon: YoutubeIcon, href: 'https://www.youtube.com/@Hekimika001', label: 'YouTube' },
                                    { Icon: TikTokIcon, href: 'https://www.tiktok.com/@hekimika5?_r=1&_t=ZS-95YHLB2yd3U', label: 'TikTok' },
                                ].map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-gold hover:border-gold transition-colors"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* ── Quick Links column ── */}
                        <div>
                            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {QUICK_LINKS.map(link => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-white/50 hover:text-gold text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Contact column ── */}
                        <div>
                            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Get in Touch
                            </h3>
                            <div className="space-y-4 text-sm text-white/60">
                                <a href="mailto:hekimika001@gmail.com" className="flex items-center gap-3 hover:text-gold transition-colors">
                                    <Mail size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                                    hekimika001@gmail.com
                                </a>
                                <a href="tel:+254702338163" className="flex items-center gap-3 hover:text-gold transition-colors">
                                    <Phone size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                                    +254 702 338 163
                                </a>
                                <span className="flex items-center gap-3">
                                    <MapPin size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                                    Nairobi, Kenya
                                </span>
                            </div>

                            {/* WhatsApp community CTA */}
                            <a
                                href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                                style={{ background: '#25D366' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                </svg>
                                Join Community
                            </a>
                        </div>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
                        <p>© {new Date().getFullYear()} Hekimika – Wise Nation. All rights reserved.</p>
                        <p style={{ color: 'var(--gold)' }}>SIGNIFICANCE | RELEVANCE | DOMINION</p>
                        <p>
                            Dev by{' '}
                            <a
                                href="https://github.com/newtonty"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gold transition-colors font-medium text-white/60"
                            >
                                Newton Ty
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
