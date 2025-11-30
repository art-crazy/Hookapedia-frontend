'use client';

import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object;
}

export const SeoHead: React.FC<SeoProps> = ({
  title,
  description,
  image = '/images/collections/hookah-session-summer.jpg',
  type = 'website',
  schema
}) => {

  useEffect(() => {
    // Basic Meta
    document.title = title;
    updateMeta('description', description);

    // Open Graph
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:type', type);
    updateMeta('og:site_name', 'Хукапедия');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

  }, [title, description, image, type]);

  // Schema Injection
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
};

// Helper to update or create meta tags
function updateMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:')) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}
