'use client';

import { Trophy, Lock, Check } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  type Achievement,
  type AchievementStatus,
  achievements,
  achievementPct,
} from '@/lib/achievements';

function StatusBadge({ status }: { status: AchievementStatus }) {
  const unlocked = status === 'Unlocked';
  return (
    <Badge
      variant="outline"
      className={cn(
        'gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide',
        unlocked
          ? 'border-accent/30 bg-accent/10 text-accent'
          : 'border-border bg-secondary text-muted-foreground'
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          unlocked ? 'bg-accent' : 'bg-muted-foreground'
        )}
      />
      {unlocked ? 'Unlocked' : 'Locked'}
    </Badge>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const pct = achievementPct(achievement);
  const Icon = achievement.icon;
  const unlocked = achievement.status === 'Unlocked';

  return (
    <div
      className={cn(
        'relative rounded-lg ring-1 p-4 bg-secondary/30 transition-colors',
        unlocked ? 'ring-accent/20' : 'ring-border/60'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1',
              unlocked
                ? 'bg-accent/10 text-accent ring-accent/20'
                : 'bg-secondary text-muted-foreground ring-border'
            )}
          >
            {unlocked ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-wide text-foreground">
              {achievement.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        </div>
        <StatusBadge status={achievement.status} />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Progress</span>
          <span className="font-semibold tabular-nums text-foreground">
            {achievement.progress} / {achievement.target}
          </span>
        </div>
        <Progress
          value={pct}
          className={cn(
            'h-2',
            unlocked ? '[&>span]:bg-accent' : '[&>span]:bg-muted-foreground'
          )}
        />
      </div>
    </div>
  );
}

export function AchievementView() {
  const unlockedCount = achievements.filter((a) => a.status === 'Unlocked').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Achievements</h2>
          <p className="text-xs text-muted-foreground">
            Unlock milestones by building consistent money habits.
          </p>
        </div>
      </div>

      <DashboardCard contentClassName="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            All Achievements
          </h3>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {unlockedCount} / {achievements.length} unlocked
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </DashboardCard>

      <footer className="pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          Placeholder data — achievement progress is examples only.
        </p>
      </footer>
    </div>
  );
}
