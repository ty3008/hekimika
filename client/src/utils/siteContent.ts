// Shared content for the Home "Where are you at now?" journeys and the
// Wisdom for Singles / Purity landing pages.

import PureManImg from '../assets/The Pure Man.webp';
import SolidFormImg from '../assets/book- creating a solid form.webp';
import SolidCoreImg from '../assets/ESTABLISHING A SOLID CORE.webp';
import DealingWithEndedImg from '../assets/book- dealing with ended relationships.webp';
import PreparingForLoveImg from '../assets/Preparing for Love(1).webp';
import ChoosingWellImg from '../assets/book- choosing well.webp';
import KeepersImg from '../assets/Keepers.webp';
import PassionImg from '../assets/book- passion.webp';

// ── Contact ────────────────────────────────────────────────
export const WHATSAPP_NUMBER = '254702338163';
export const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/Gp9LwRFOHxe95VELronPvt';

export const whatsappLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// ── Social channels ────────────────────────────────────────
export const SOCIAL_LINKS = [
    { label: 'Spotify', href: 'https://open.spotify.com/show/3bSNy9W1so6Z9IjHyFb1IP?si=fcb149a88a274a17', color: '#1DB954' },
    { label: 'Instagram', href: 'https://www.instagram.com/hekimika2?igsh=aWx5YnY1N2x1aW5z', color: '#E1306C' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61552354056302', color: '#1877F2' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Hekimika001', color: '#FF0000' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@hekimika5?_r=1&_t=ZS-95YHLB2yd3U', color: '#111111' },
];

// ── Books ──────────────────────────────────────────────────
export interface CatalogBook {
    key: string;
    title: string;
    series?: string;
    desc: string;
    image?: string;
    /** Selar product page. Leave empty if the book is not on Selar yet. */
    selarUrl?: string;
    isNew?: boolean;
}

// Every selarUrl below has been checked against the live Selar product page.
export const CATALOG_BOOKS: Record<string, CatalogBook> = {
    solidForm: {
        key: 'solidForm',
        title: 'Cultured in Love – Creating a Solid Form',
        series: 'Cultured in Love',
        desc: 'Your internal reality determines how you experience love. Build the right inner framework.',
        image: SolidFormImg,
        selarUrl: 'https://selar.com/66d7414624',
    },
    solidCore: {
        key: 'solidCore',
        title: 'Cultured in Love – Establishing a Solid Core',
        series: 'Cultured in Love',
        desc: 'Building the non-negotiables of relationships and marriage — character, values and convictions.',
        image: SolidCoreImg,
        selarUrl: 'https://selar.com/551w577717',
    },
    endedRelationships: {
        key: 'endedRelationships',
        title: 'Cultured in Love – Dealing with Ended Relationships',
        series: 'Cultured in Love',
        desc: 'Practical and spiritual guidance for healing well and moving forward with clarity.',
        image: DealingWithEndedImg,
        selarUrl: 'https://selar.com/477717r206',
    },
    mistakes: {
        key: 'mistakes',
        title: 'Single and Built – Mistakes Singles Can Avoid',
        series: 'Single and Built',
        desc: 'Practical wisdom on the common pitfalls of singlehood — and how to avoid them.',
        // TODO: add `image` (the new poster) and `selarUrl` once the book is live on Selar.
        isNew: true,
    },
    preparing: {
        key: 'preparing',
        title: 'Single and Built – Preparing for Love',
        series: 'Single and Built',
        desc: 'Tools and insights to get whole, healthy and ready — before you enter a relationship.',
        image: PreparingForLoveImg,
        selarUrl: 'https://selar.com/1v6669vh7e',
    },
    choosing: {
        key: 'choosing',
        title: 'Single and Built – Choosing Well',
        series: 'Single and Built',
        desc: 'Discerning the right partner for a God-centred covenant.',
        image: ChoosingWellImg,
        selarUrl: 'https://selar.com/7770f17ty0',
    },
    keepers: {
        key: 'keepers',
        title: 'Keepers of Love',
        series: 'Single and Built',
        desc: 'Be equipped to build and keep a relationship that lasts and leads to marriage.',
        // The Keepers poster is shared by the program and the book.
        // TODO: add `selarUrl` once the book is live on Selar.
        image: KeepersImg,
        isNew: true,
    },
    passion: {
        key: 'passion',
        title: 'Passion',
        series: 'Cultured in Love',
        desc: 'Passion is a beautiful thing God has given every person. Learn how to steward it wisely.',
        image: PassionImg,
        selarUrl: 'https://selar.com/7hb2n47455',
    },
    pureMan: {
        key: 'pureMan',
        title: 'The Pure Man',
        desc: 'A bold call to godly masculinity and purity in a generation that has lost its standard.',
        image: PureManImg,
        selarUrl: 'https://selar.com/7467y6kq97',
    },
};
