import { usePageView } from '@/hooks/usePageView';

export const PageViewTracker = ({ title }: { title?: string }) => {
  usePageView(title);
  return null;
};
