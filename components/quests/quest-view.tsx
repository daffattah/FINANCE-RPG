'use client';

import { ScrollText, CalendarDays, Lock, Check, Zap, Coins } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  type Quest,
  type QuestStatus,
  type QuestType,
  dailyQuests,
  weeklyQuests,
  statusStyles,
  questProgressPct,
} from '@/lib/quests';

function StatusBadge({ status }: { status: QuestStatus }) {
  const s = statusStyles[status];
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide', s.badge)}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {status}
    </Badge>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  const pct = questProgressPct(quest);
  const s = statusStyles[quest.status];
  const Icon = quest.icon;
  const isLocked = quest.status === 'Locked';
  const isCompleted = quest.status === 'Completed';

  return (
    <div
      className={cn(
        'relative rounded-lg ring-1 p-4 bg-secondary/30 transition-colors',
        s.ring,
        isLocked && 'opacity-60'
      )}
    >
      {/* Icon + title */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1',
              isCompleted
                ? 'bg-accent/10 text-accent ring-accent/20'
                : isLocked
                  ? 'bg-secondary text-muted-foreground ring-border'
                  : 'bg-primary/10 text-primary ring-primary/20'
            )}
          >
            {isLocked ? (
              <Lock className="h-5 w-5" />
            ) : isCompleted ? (
              <Check className="h-5 w-5" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{quest.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{quest.description}</p>
          </div>
        </div>
        <StatusBadge status={quest.status} />
      </div>

      {/* Progress */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Progress</span>
          <span className="font-semibold tabular-nums text-foreground">
            {quest.progress} / {quest.target}
          </span>
        </div>
        <Progress
          value={pct}
          className={cn(
            'h-2',
            isCompleted
              ? '[&>span]:bg-accent'
              : isLocked
                ? '[&>span]:bg-muted-foreground'
                : '[&>span]:bg-primary'
          )}
        />
      </div>

      {/* Reward */}
      <div className="mt-3 flex items-center gap-3 text-xs">
        <span className="font-medium text-muted-foreground">Reward</span>
        <span className="flex items-center gap-1 font-semibold text-xp">
          <Zap className="h-3.5 w-3.5" />
          +{quest.reward.xp} XP
        </span>
        <span className="flex items-center gap-1 font-semibold text-coin">
          <Coins className="h-3.5 w-3.5" />
          +{quest.reward.coins}
        </span>
      </div>
    </div>
  );
}

function QuestSection({
  title,
  icon: Icon,
  quests,
}: {
  title: string;
  icon: typeof ScrollText;
  quests: Quest[];
}) {
  return (
    <DashboardCard contentClassName="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {quests.length} quests
        </Badge>
      </div>

      <div className="space-y-3">
        {quests.map((q) => (
          <QuestCard key={q.id} quest={q} />
        ))}
      </div>
    </DashboardCard>
  );
}

export function QuestView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <ScrollText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Quests</h2>
          <p className="text-xs text-muted-foreground">
            Complete challenges to earn XP and coins.
          </p>
        </div>
      </div>

      <QuestSection title="Daily Quests" icon={ScrollText} quests={dailyQuests} />
      <QuestSection title="Weekly Quests" icon={CalendarDays} quests={weeklyQuests} />

      <footer className="pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          Placeholder data — quest progress and rewards are examples only.
        </p>
      </footer>
    </div>
  );
}
