import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://promptforge.vercel.app';

  const routes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/generate`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/explore`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/improve`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/categories/coding`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/categories/studying`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/categories/writing`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/categories/research`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/categories/image-generation`, priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
