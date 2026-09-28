import { useEffect, useState } from 'react';
import { CustomSaasForm } from '@/components/landing/CustomSaasForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DISMISSED_KEY = 'upcurv_custom_saas_popup_dismissed';

export const CustomSaasPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 20_000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) sessionStorage.setItem(DISMISSED_KEY, 'true');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90svh] max-w-2xl overflow-y-auto p-5 sm:p-8">
        <DialogHeader className="pr-8">
          <p className="text-xs font-bold uppercase text-primary">Custom SaaS discussion</p>
          <DialogTitle className="font-display text-2xl sm:text-3xl">Tell us what you’re improving</DialogTitle>
          <DialogDescription>Share a few practical details so our team can prepare a useful first conversation.</DialogDescription>
        </DialogHeader>
        <CustomSaasForm />
      </DialogContent>
    </Dialog>
  );
};