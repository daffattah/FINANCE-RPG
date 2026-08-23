import { Progress } from '@/components/ui/progress';
import { DashboardCard } from '@/components/dashboard/card';
import { ScrollText } from 'lucide-react';

const PLACEHOLDER = {
  description: "Record today's expenses",
  completed: 0,
  total: 1,
};

export function DailyQuest() {
  const pct = Math.round((PLACEHOLDER.completed / PLACEHOLDER.total) * 100);
  const isDone = PLACEHOLDER.completed >= PLACEHOLDER.total;

  return (
    <DashboardCard className="border-accent/20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-accent/30">
            <ScrollText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Daily Quest
            </p>
            <h3 className="text-sm font-semibold text-foreground sm:text-base">
              {PLACEHOLDER.description}
            </h3>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            isDone
              ? 'bg-accent/20 text-accent'
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          {isDone ? 'Complete' : 'In Progress'}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Progress</span>
          <span className="font-semibold tabular-nums text-foreground">
            {PLACEHOLDER.completed} / {PLACEHOLDER.total}
          </span>
        </div>
        <Progress value={pct} className="h-2 bg-secondary [&>span]:bg-accent" />
        <p className="text-[11px] text-muted-foreground">
          {isDone
            ? 'Quest complete — claim your reward!'
            : 'Log at least one expense today to finish this quest.'}
        </p>
      </div>
    </DashboardCard>
  );
}
