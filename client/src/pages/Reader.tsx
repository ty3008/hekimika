import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Download, Share2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Reader() {
    const { id } = useParams<{ id: string }>();
    const { data: resource, loading } = useApi<any>(`/free-resources/${id}`);
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        if (resource?.googleDriveLink) {
            // Convert sharing link to preview link for embedding
            let url = resource.googleDriveLink;
            if (url.includes('view?usp=sharing')) {
                url = url.replace('view?usp=sharing', 'preview');
            } else if (!url.includes('preview')) {
                // Try to handle general sharing links if possible
                // This is a basic transformation, might need refinement for different patterns
                if (url.includes('/file/d/')) {
                    const parts = url.split('/file/d/');
                    const fileId = parts[1].split('/')[0];
                    url = `https://drive.google.com/file/d/${fileId}/preview`;
                }
            }
            setIframeUrl(url);
        }
    }, [resource]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gold rounded-full animate-spin" style={{ borderTopColor: 'var(--gold)' }} />
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <h1 className="text-4xl font-bold text-navy mb-4">Resource Not Found</h1>
                <p className="text-gray-500 mb-8">This resource might have been moved or deleted.</p>
                <Link to="/resources" className="btn-primary">Back to Resources</Link>
            </div>
        );
    }

    const shareResource = () => {
        if (navigator.share) {
            navigator.share({
                title: resource.title,
                text: resource.shortDescription,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 overflow-hidden">
            <Helmet>
                <title>Reading: {resource.title} | Hekimika</title>
                <meta name="description" content={resource.shortDescription} />
            </Helmet>

            {/* Top Bar */}
            <div className="h-16 bg-navy text-white px-4 md:px-8 flex items-center justify-between border-b border-white/5 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        to="/resources"
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-gold text-xs font-bold"
                    >
                        <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Resources</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <div>
                        <h1 className="font-bold text-sm md:text-base truncate max-w-[150px] md:max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {resource.title}
                        </h1>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold font-bold">{resource.type}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={shareResource}
                        className="p-2.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-gold transition-all"
                        title="Share"
                    >
                        <Share2 size={18} />
                    </button>
                    <a
                        href={resource.googleDriveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 p-2.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-gold transition-all"
                        title="Download / External View"
                    >
                        <Download size={18} />
                    </a>
                </div>
            </div>

            {/* Viewer */}
            <div className="flex-1 relative bg-[#323639]">
                {iframeUrl ? (
                    <iframe
                        src={iframeUrl}
                        className="w-full h-full border-none"
                        allow="autoplay"
                        title={resource.title}
                    ></iframe>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/40 flex-col gap-4">
                        <ExternalLink size={48} />
                        <p>Unable to load preview directly.</p>
                        <a
                            href={resource.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Open in Google Drive
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
