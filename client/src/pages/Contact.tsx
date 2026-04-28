import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
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
                                    <p className="text-gray-500 text-sm">+254708084350</p>
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
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white text-gray-600">
                                    <option>Program Inquiry</option>
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
