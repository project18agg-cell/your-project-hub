import { useState } from 'react';
import { AlertTriangle, CalendarCheck, Check, IndianRupee, ClipboardCheck, MessageSquareWarning } from 'lucide-react';

const beforeItems = [
  [MessageSquareWarning, 'Enquiries get buried', 'Calls and WhatsApp messages stay with different people.'],
  [AlertTriangle, 'Dates can collide', 'Paper diaries and separate calendars show different availability.'],
  [IndianRupee, 'Payments need chasing', 'Advance, balance and receipt notes are stored separately.'],
];

const afterItems = [
  [CalendarCheck, 'One live booking calendar', 'Tentative and confirmed dates stay visible to the whole team.'],
  [ClipboardCheck, 'Every enquiry has a next step', 'Owner, status and follow-up date are clear.'],
  [Check, 'Payments and events stay connected', 'Booking details, dues and preparation move together.'],
];

export const BeforeAfterWorkflow = () => {
  const [position, setPosition] = useState(50);

  return (
    <section className="border-y border-border bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-primary">Before and after</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">A marriage hall workflow, made easier to run.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Move the divider to compare scattered manual work with one connected Custom SaaS workflow.</p>
        </div>

        <div className="relative mt-10 min-h-[500px] overflow-hidden border border-border bg-card shadow-lg sm:min-h-[430px]">
          <div className="absolute inset-0 grid content-start bg-card p-5 sm:p-8 lg:p-10">
            <div className="ml-auto w-full pl-10 sm:w-1/2 sm:pl-12">
              <p className="text-xs font-bold uppercase text-success">After · With Upcurv Custom SaaS</p>
              <h3 className="mt-2 font-display text-2xl font-bold">Every booking has a clear path.</h3>
              <div className="mt-7 space-y-4">
                {afterItems.map(([Icon, title, copy]) => {
                  const ItemIcon = Icon as typeof Check;
                  return <div key={title as string} className="flex gap-3 border-b border-border pb-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-success/10 text-success"><ItemIcon className="h-4 w-4" /></span><div><p className="text-sm font-bold">{title as string}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy as string}</p></div></div>;
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden bg-accent" style={{ width: `${position}%` }} aria-hidden="true">
            <div className="grid h-full min-w-[calc(100vw-2rem)] content-start p-5 sm:min-w-[calc(100vw-3rem)] sm:p-8 lg:min-w-[calc(min(80rem,100vw)-4rem)] lg:p-10">
              <div className="w-[calc(50%-2.5rem)] min-w-[220px] pr-5 sm:pr-8">
                <p className="text-xs font-bold uppercase text-primary">Before · Manual management</p>
                <h3 className="mt-2 font-display text-2xl font-bold">The day depends on memory and messages.</h3>
                <div className="mt-7 space-y-4">
                  {beforeItems.map(([Icon, title, copy]) => {
                    const ItemIcon = Icon as typeof AlertTriangle;
                    return <div key={title as string} className="flex gap-3 border-b border-primary/15 pb-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary"><ItemIcon className="h-4 w-4" /></span><div><p className="text-sm font-bold">{title as string}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy as string}</p></div></div>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-primary" style={{ left: `${position}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground shadow-lg">↔</span>
          </div>
          <input
            type="range"
            min="25"
            max="75"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Compare manual and Upcurv Custom SaaS workflows"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <div className="mt-3 flex justify-between text-xs font-bold uppercase text-muted-foreground"><span>Manual workflow</span><span>Connected workflow</span></div>
      </div>
    </section>
  );
};