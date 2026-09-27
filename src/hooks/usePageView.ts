import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const VISITOR_KEY = 'upcurv_visitor_id';
const SESSION_KEY = 'upcurv_session_id';
const SESSION_TTL = 30 * 60 * 1000; // 30 min

function getOrCreateId(key: string, storage: Storage, ttl?: number): string {
  try {
    const raw = storage.getItem(key);
    if (raw) {
      if (ttl) {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.ts < ttl) return parsed.id;
      } else {
        return raw;
      }
    }
  } catch {}
  const id = crypto.randomUUID();
  if (ttl) {
    storage.setItem(key, JSON.stringify({ id, ts: Date.now() }));
  } else {
    storage.setItem(key, id);
  }
  return id;
}

export function usePageView(pageTitle?: string) {
  const location = useLocation();

  useEffect(() => {
    const visitorId = getOrCreateId(VISITOR_KEY, localStorage);
    const sessionId = getOrCreateId(SESSION_KEY, sessionStorage, SESSION_TTL);

    supabase.from('page_views').insert({
      page_path: location.pathname,
      page_title: pageTitle || document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      language: navigator.language,
      session_id: sessionId,
      visitor_id: visitorId,
    } as any).then(() => {});
  }, [location.pathname]);
}
