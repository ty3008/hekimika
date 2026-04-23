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
            <div className="pt-8 pb-6 px-4 md:px-8 lg:px-16">
                <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                                <span className="text-navy font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>H</span>
                            </div>
                            <div>
                                <p className="text-white font-bold max-leading" style={{ fontFamily: 'Poppins, sans-serif' }}>Hekimika</p>
                                <p className="text-[10px]" style={{ color: 'var(--gold)' }}>Wise Nation</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-white/10" />
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
                                    className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-gold hover:border-gold transition-colors"
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact - horizontal */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
                        <span className="flex items-center gap-2"><Mail size={14} style={{ color: 'var(--gold)' }} /> info@hekimika.org</span>
                        <span className="flex items-center gap-2"><Phone size={14} style={{ color: 'var(--gold)' }} /> +254 700 000 000</span>
                        <span className="flex items-center gap-2"><MapPin size={14} style={{ color: 'var(--gold)' }} /> Nairobi, Kenya</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-4 px-4 md:px-8 lg:px-16 text-xs text-white/40">
                <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p>© {new Date().getFullYear()} Hekimika – Wise Nation. All rights reserved.</p>
                    <p style={{ color: 'var(--gold)' }}>SIGNIFICANCE | RELEVANCE | DOMINION</p>
                    <Link to="/admin" className="hover:text-gold transition-colors">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
}
