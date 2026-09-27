import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const BASE_URL = 'https://solo-chief-suite.lovable.app';
const DEFAULT_IMAGE = 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/974e7914-b48f-4453-8339-226a137afda6/id-preview-56034bc1--acf904b0-014c-4af6-b747-a2918c6b7d4a.lovable.app-1771346529459.png';

export const SEOHead = ({ title, description, path = '/', image }: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = `${title} | Upcurv Technologies`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', `${BASE_URL}${path}`, true);
    setMeta('og:image', image || DEFAULT_IMAGE, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image || DEFAULT_IMAGE);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;
  }, [title, description, path, image]);

  return null;
};
