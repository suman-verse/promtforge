import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/data/categories';
import { PROMPT_TEMPLATES } from '@/data/templates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://promptforge.vercel.app';
  const buildDate = new Date();

  const coreRoutes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/generate`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/explore`, priority: 0.95, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/improve`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.4, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/cookies`, priority: 0.4, changeFrequency: 'yearly' as const },
  ];

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    priority: 0.85,
    changeFrequency: 'weekly' as const,
  }));

  const promptRoutes = PROMPT_TEMPLATES.map((tmpl) => ({
    url: `${baseUrl}/prompts/${tmpl.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const allRoutes = [...coreRoutes, ...categoryRoutes, ...promptRoutes];

  return allRoutes.map((route) => ({
    url: route.url,
    lastModified: buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

