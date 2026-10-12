import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Users } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { whatsappLink } from '../utils/siteContent';

interface ContactReason {
    label: string;
    subject: string;
    paragraphs: string[];
    whatsappMessage: string;
    links?: { label: string; to: string }[];
}

// "Additional Text" shown on the Contact page for each "Where are you at now?" journey
const CONTACT_REASONS: Record<string, ContactReason> = {
    coaching: {
        label: 'Personal Coaching',
        subject: 'Personal Coaching',
        paragraphs: [
            'That is a good sign of someone who is going somewhere in life. It shows your heart is yearning for more and you are in the right place.',
            'When some people get where you are, they do their best to mute that inner voice and decide to settle for less. Some choose sexual relationships, drugs and other things to distract them from the demand to grow.',
            'You have done well to seek personal coaching.',
            'Please feel free to contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I have many questions and I think I need personal coaching.',
    },
    couples: {
        label: 'Building a Lasting Relationship',
        subject: 'Couples Guidance',
        paragraphs: [
            'Your desire is commendable. It takes wisdom to build a long-term relationship and you are in the right place. We wish you a great love story for many years and are here to help you build that story.',
            'Please reach out to us.',
        ],
        whatsappMessage: 'Hello Hekimika, we are a young couple and we really desire our relationship to work. How can we build a healthy and long-term relationship?',
        links: [{ label: 'Explore Couples Programs', to: '/perfected-in-wisdom' }],
    },
    confused: {
        label: 'Feeling Confused',
        subject: 'Relationship Guidance',
        paragraphs: [
            'Sometimes confusion can happen in relationships which is a product of many things. Someone continuing in such a state is like someone that has a stomach upset and refuses to do anything about it.',
            'We are here for you. Please contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I am in a relationship but I am kind of confused. What should I do?',
    },
    heartbreak: {
        label: 'Healing After Heartbreak',
        subject: 'Healing After Heartbreak',
        paragraphs: [
            'I am really sorry for what you have gone through. End of relationships are not normally easy. May God help you recover quickly from that pain and be whole to keep enjoying the beauty of life. We are here for you and have plenty of materials to help you in this journey.',
            'Feel free to contact us.',
        ],
        whatsappMessage: 'Hello Hekimika, I am going through a heartbreak and I would like help to recover.',
        links: [
            { label: 'Healing Resources', to: '/resources' },
            { label: 'School of Healing', to: '/programs/school-of-healing' },
        ],
    },
};

const getReason = (key: string): ContactReason | undefined =>
    Object.prototype.hasOwnProperty.call(CONTACT_REASONS, key) ? CONTACT_REASONS[key] : undefined;

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

    return (
        <>
            <Helmet>
                <title>Contact Us | Hekimika</title>
                <meta name="description" content="Get in touch with the Wise Nation team for program inquiries, speaking engagements, or prayer requests." />
            </Helmet>

            <section className="pt-36 pb-20 px-4 md:px-8 lg:px-16 bg-navy text-center">
                <div className="container-xl">
                    <SectionTitle
                        overline="Get In Touch"
                        title="We'd Love to Hear From You"
                        subtitle="Whether you have a question about a program or need prayer, our team is here for you."
                        light
                    />
                </div>
            </section>

            <section className="section-pad bg-white">
                {reason && (
                    <motion.div
                        key={reasonKey}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="container-xl max-w-3xl mb-14"
                    >
                        <div
                            className="relative rounded-3xl p-8 md:p-10 border overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)', borderColor: 'rgba(212,175,55,0.35)' }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: 'var(--gold)' }} />
                            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3 opacity-70" style={{ color: 'var(--gold)' }}>
                                {reason.label}
                            </p>
                            <p className="text-2xl font-bold text-navy mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Hello,
                            </p>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
                                {reason.paragraphs.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3 mt-8">
                                <a
                                    href={whatsappLink(reason.whatsappMessage)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold text-sm hover:opacity-90 transition-opacity"
                                    style={{ background: '#25D366' }}
                                >
                                    <MessageSquare size={16} /> Chat with us on WhatsApp
                                </a>
                                {reason.links?.map((l) => (
                                    <Link key={l.to} to={l.to} className="btn-outline px-6 py-3 text-sm" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                <div className="container-xl mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <a 
                            href="https://wa.me/254702338163?text=Hello%20Hekimika,%20I%20would%20like%20to%20know%20more%20about%20your%20programs%20and%20ministry." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl text-center"
                        >
                            <MessageSquare size={32} />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Speak to Us on WhatsApp</span>
                        </a>
                        <a 
                            href="https://wa.me/254702338163?text=Hello%20Hekimika,%20I%20have%20a%20prayer%20request." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl text-center"
                        >
                            <MessageSquare size={32} />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Send Prayer Request</span>
                        </a>
                        <a 
                            href="https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl text-center"
                        >
                            <Users size={32} />
                            <span className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Join WhatsApp Community</span>
                        </a>
                    </div>
                </div>
                <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold mb-6 text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Information</h2>
                        <p className="text-gray-500 mb-10 leading-relaxed">
                            Reach out to via any of the channels below. We typically respond within 24-48 hours during business days.
                        </p>

                        <ul className="space-y-8">
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/10">
                                    <Mail size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Email Details</p>
                                    <p className="text-gray-500 text-sm">hekimika001@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/10">
                                    <Phone size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Call or WhatsApp</p>
                                    <p className="text-gray-500 text-sm">+254 702 338 163</p>
                                    <p className="text-xs text-gray-400 mt-1">Available Mon-Fri, 9am - 5pm EAT</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gold/10">
                                    <MapPin size={20} className="text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-navy mb-1">Location</p>
                                    <p className="text-gray-500 text-sm">Nairobi, Kenya</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare size={24} className="text-gold" />
                            <h3 className="text-2xl font-bold text-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>Send a Message</h3>
                        </div>
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white" placeholder="john@example.com" />
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
                                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 text-base">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
