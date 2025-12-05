import { MetadataRoute } from 'next';
import { FLOWERS } from '@/data/flowers';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sadec-flower-hunt.vercel.app'; // Replace with actual domain

    // Static routes
    const routes = [
        '',
        '/scan',
        '/leaderboard',
        '/partner',
        '/partner/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic flower routes
    const flowerRoutes = FLOWERS.map((flower) => ({
        url: `${baseUrl}/flower/${flower.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...routes, ...flowerRoutes];
}
