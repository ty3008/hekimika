import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    Mail,
    MapPin,
    Phone,
    MessageSquare,
    Users,
    Compass,
    HeartHandshake,
    HelpCircle,
    Heart,
    Sparkles,
    ArrowRight,
    Quote,
    Shield
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { whatsappLink } from '../utils/siteContent';

interface ContactReason {
    label: string;
    subject: string;
    overline: string;
    quoteBadge: string;
    quoteText: string;
    paragraphs: string[];
    whatsappMessage: string;
    links?: { label: string; to: string }[];
    icon: typeof Compass;
}

// "Additional Text" shown on the Contact page for each "Where are you at now?" journey
const CONTACT_REASONS: Record<string, ContactReason> = {
    coaching: {
        label: 'Personal Coaching & Mentorship',
        subject: 'Personal Coaching',
        overline: 'Seeking Growth & Clarity',
        quoteBadge: 'Growth is Calling',
        quoteText: 'The demand to grow is a sacred whisper. You have done well to seek personal coaching rather than settle for less.',
        paragraphs: [
            'That is a good sign of someone who is going somewhere in life. It shows your heart is yearning for more and you are in the right place.',
            'When some people get where you are, they do their best to mute that inner voice and decide to settle for less. Some choose sexual relationships, drugs and other things to distract them from the demand to grow.',
            'You have done well to seek personal coaching.',
            'Please feel free to contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I have many questions and I think I need personal coaching.',
        links: [
            { label: 'Singles Coaching Details', to: '/programs/singles-coaching' },
            { label: 'Explore All Programs', to: '/perfected-in-wisdom' },
        ],
        icon: Compass,
    },
    couples: {
        label: 'Building a Healthy & Lasting Relationship',
        subject: 'Couples Guidance',
        overline: 'For Young Couples',
        quoteBadge: 'Wisdom for Covenant',
        quoteText: 'It takes wisdom to build a long-term relationship. Great love stories are intentionally built, not accidental.',
        paragraphs: [
            'Your desire is commendable. It takes wisdom to build a long-term relationship and you are in the right place. We wish you a great love story for many years and are here to help you build that story.',
            'Please reach out to us.',
        ],
        whatsappMessage: 'Hello Hekimika, we are a young couple and we really desire our relationship to work. How can we build a healthy and long-term relationship?',
        links: [
            { label: 'Beginning Right Program', to: '/programs/beginning-right' },
            { label: 'Couples Coaching', to: '/programs/couples-coaching' },
            { label: 'Conflict Resolution', to: '/programs/conflict-resolution' },
        ],
        icon: HeartHandshake,
    },
    confused: {
        label: 'Relationship Confusion & Guidance',
        subject: 'Relationship Guidance',
        overline: 'We Are Here to Listen',
        quoteBadge: 'Clarity is Ahead',
        quoteText: 'Continuing in confusion drains the soul. We are here to listen with compassion, wisdom, and zero judgment.',
        paragraphs: [
            'Sometimes confusion can happen in relationships which is a product of many things. Someone continuing in such a state is like someone that has a stomach upset and refuses to do anything about it.',
            'We are here for you. Please contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I am in a relationship but I am kind of confused. What should I do?',
        links: [
            { label: 'Single & Built – Choosing Well', to: '/programs/choosing-well' },
            { label: 'Book: Creating a Solid Form', to: '/resources' },
        ],
        icon: HelpCircle,
    },
    heartbreak: {
        label: 'Recovery & Wholeness After Heartbreak',
        subject: 'Healing After Heartbreak',
        overline: 'Healing & Restoration',
        quoteBadge: 'Wholeness Awaits',
        quoteText: 'End of relationships are never easy. May God help you recover quickly from that pain and be whole to keep enjoying the beauty of life.',
        paragraphs: [
            'I am really sorry for what you have gone through. End of relationships are not normally easy. May God help you recover quickly from that pain and be whole to keep enjoying the beauty of life. We are here for you and have plenty of materials to help you in this journey.',
            'Feel free to contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I am going through a heartbreak and I would like help to recover.',
        links: [
            { label: 'School of Healing Program', to: '/programs/school-of-healing' },
            { label: 'Book: Dealing with Ended Relationships', to: '/resources' },
        ],
        icon: Shield,
    },
};

const getReason = (key: string): ContactReason | undefined =>
    Object.prototype.hasOwnProperty.call(CONTACT_REASONS, key) ? CONTACT_REASONS[key] : undefined;

const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Contact() {
    const location = useLocation();
    const reasonKey = new URLSearchParams(location.search).get('reason') ?? '';
    const reason = getReason(reasonKey);
    // The subject follows the journey card the visitor came from, unless they pick another one
    const [subjectChoice, setSubjectChoice] = useState<{ key: string; value: string } | null>(null);
    const subject =
        subjectChoice && subjectChoice.key === reasonKey
            ? subjectChoice.value
            : reason?.subject ?? 'Program Inquiry';
    const setSubject = (value: string) => setSubjectChoice({ key: reasonKey, value });

    const ReasonIcon = reason?.icon ?? MessageSquare;

    return (
        <>
            <Helmet>
                <title>Contact Us | Hekimika – Wise Nation</title>
                <meta
                    name="description"
                    content="Get in touch with the Wise Nation team for program inquiries, personal coaching, relationship guidance, or prayer requests."
                />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16 bg-navy text-center relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{ width: '600px', height: '600px', border: '1px solid rgba(212,175,55,0.08)' }}
                />
                <div className="container-xl relative z-10">
                    <SectionTitle
                        overline="Get In Touch"
                        title="We'd Love to Hear From You"
                        subtitle="Whether you need personal coaching, relationship counsel, program inquiries, or prayer, our team is here for you."
                        light
                    />
                </div>
            </section>

            <section className="section-pad bg-white">
                {/* ── Contextual Pastoral Welcome Card ──────────────── */}
                {reason && (
                    <motion.div
                        key={reasonKey}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container-xl max-w-4xl mb-16"
                    >
                        <div
                            className="relative rounded-3xl p-8 md:p-12 shadow-2xl border overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,248,242,1) 100%)',
                                borderColor: 'rgba(212,175,55,0.4)',
                            }}
                        >
                            {/* Left gold decorative pillar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-2.5"
                                style={{
                                    background: 'linear-gradient(180deg, var(--gold) 0%, var(--navy) 100%)',
                                }}
                            />

                            {/* Watermark Quote */}
                            <Quote size={110} className="absolute -bottom-6 -right-6 pointer-events-none text-gold/10" />

                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                    style={{ background: 'var(--navy)', color: 'var(--gold)' }}
                                >
                                    <ReasonIcon size={20} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold block">
                                        {reason.overline}
                                    </span>
                                    <h2 className="text-xl md:text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {reason.label}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-2xl font-bold text-navy mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Hello,
                            </p>

                            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                                {reason.paragraphs.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                            </div>

                            {/* Empathetic quote callout */}
                            <div
                                className="mt-8 p-5 rounded-2xl flex items-start gap-4"
                                style={{
                                    background: 'rgba(212,175,55,0.08)',
                                    border: '1px solid rgba(212,175,55,0.25)',
                                }}
                            >
                                <Sparkles size={22} className="text-gold shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                        {reason.quoteBadge}
                                    </p>
                                    <p className="text-sm md:text-base text-navy italic font-medium">
                                        "{reason.quoteText}"
                                    </p>
                                </div>
                            </div>

                            {/* Direct Action Triage Buttons */}
                            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                                <a
                                    href={whatsappLink(reason.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-90 transition-all hover:scale-[1.02]"
                                    style={{ background: '#25D366' }}
                                >
                                    <WhatsAppIcon /> Chat Directly on WhatsApp
                                </a>

                                {reason.links?.map((l) => (
                                    <Link
                                        key={l.to}
                                        to={l.to}
                                        className="btn-outline px-6 py-3.5 text-sm inline-flex items-center gap-2"
                                        style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
                                    >
                                        {l.label} <ArrowRight size={14} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── Quick WhatsApp Connect Channels ─────────────────── */}
                <div className="container-xl mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <a
                            href="https://wa.me/254702338163?text=Hello%20Hekimika,%20I%20would%20like%20to%20know%20more%20about%20your%20programs%20and%20ministry."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
                        >
                            <MessageSquare size={32} className="group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Speak to Us on WhatsApp
                            </span>
                            <span className="text-white/80 text-xs">Direct chat with our team</span>
                        </a>
                        <a
                            href="https://wa.me/254702338163?text=Hello%20Hekimika,%20I%20have%20a%20prayer%20request."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
                        >
                            <Heart size={32} className="group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Send Prayer Request
                            </span>
                            <span className="text-white/80 text-xs">We stand with you in faith</span>
                        </a>
                        <a
                            href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
                        >
                            <Users size={32} className="group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Join WhatsApp Community
                            </span>
                            <span className="text-white/80 text-xs">Wisdom Moments family</span>
                        </a>
                    </div>
                </div>

                {/* ── Contact Details & Message Form ─────────────────── */}
                <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-2 block">
                            Direct Channels
                        </span>
                        <h2 className="text-3xl font-bold mb-6 text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Contact Information
                        </h2>
                        <p className="text-gray-600 mb-10 leading-relaxed text-base">
                            Reach out to us via any of the channels below. We typically respond within 24–48 hours during business days.
                        </p>

                        <ul className="space-y-8">
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/15">
                                    <Mail size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Email Details</p>
                                    <a
                                        href="mailto:hekimika001@gmail.com"
                                        className="text-gray-600 text-sm hover:text-gold transition-colors"
                                    >
                                        hekimika001@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/15">
                                    <Phone size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Call or WhatsApp</p>
                                    <a
                                        href="tel:+254702338163"
                                        className="text-gray-600 text-sm hover:text-gold transition-colors"
                                    >
                                        +254 702 338 163
                                    </a>
                                    <p className="text-xs text-gray-400 mt-1">Available Mon–Fri, 9am – 5pm EAT</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/15">
                                    <MapPin size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Location</p>
                                    <p className="text-gray-600 text-sm">Nairobi, Kenya (Serving Global Believers)</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare size={24} className="text-gold" />
                            <h3 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Send a Message
                            </h3>
                        </div>
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white text-gray-700"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option>Program Inquiry</option>
                                    <option>Personal Coaching</option>
                                    <option>Couples Guidance</option>
                                    <option>Relationship Guidance</option>
                                    <option>Healing After Heartbreak</option>
                                    <option>Speaking Engagement</option>
                                    <option>Prayer Request</option>
                                    <option>Store / Book Support</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 text-base shadow-md">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
