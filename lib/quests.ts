import type { LucideIcon } from 'lucide-react';
import {
  Receipt,
  Wallet,
  ClipboardCheck,
  Timer,
} from 'lucide-react';

export type QuestStatus = 'Locked' | 'Available' | 'In Progress' | 'Completed';

export type QuestType = 'Daily' | 'Weekly';

export type Reward = {
  xp: number;
  coins: number;
};

export type Quest = {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  target: number;
  reward: Reward;
  status: QuestStatus;
};

export const dailyQuests: Quest[] = [
  {
    id: 'daily-record',
    type: 'Daily',
    title: "Record today's expenses",
    description: 'Log every purchase you make today, no matter how small.',
    icon: Receipt,
    progress: 1,
    target: 3,
    reward: { xp: 50, coins: 10 },
    status: 'In Progress',
  },
  {
    id: 'daily-budget',
    type: 'Daily',
    title: "Stay within today's budget",
    description: 'Keep your total spending at or below your daily limit.',
    icon: Wallet,
    progress: 0,
    target: 1,
    reward: { xp: 80, coins: 15 },
    status: 'Available',
  },
];

export const weeklyQuests: Quest[] = [
  {
    id: 'weekly-review',
    type: 'Weekly',
    title: 'Complete weekly financial review',
    description: 'Review your spending summary for the past week and note one insight.',
    icon: ClipboardCheck,
    progress: 0,
    target: 1,
    reward: { xp: 150, coins: 30 },
    status: 'Available',
  },
  {
    id: 'weekly-impulse',
    type: 'Weekly',
    title: 'Use the 10-minute impulse rule',
    description: 'Before any non-essential purchase, wait 10 minutes. Do this 3 times this week.',
    icon: Timer,
    progress: 1,
    target: 3,
    reward: { xp: 120, coins: 25 },
    status: 'In Progress',
  },
  {
    id: 'weekly-no-spend',
    type: 'Weekly',
    title: 'One no-spend day',
    description: 'Pick a day this week and commit to zero discretionary spending.',
    icon: Wallet,
    progress: 0,
    target: 1,
    reward: { xp: 100, coins: 20 },
    status: 'Locked',
  },
];

export const statusStyles: Record<
  QuestStatus,
  { badge: string; ring: string; dot: string; overlay: string }
> = {
  Locked: {
    badge: 'border-border bg-secondary text-muted-foreground',
    ring: 'ring-border/60',
    dot: 'bg-muted-foreground',
    overlay: 'opacity-60',
  },
  Available: {
    badge: 'border-primary/30 bg-primary/10 text-primary',
    ring: 'ring-primary/20',
    dot: 'bg-primary',
    overlay: '',
  },
  'In Progress': {
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500/20',
    dot: 'bg-amber-500',
    overlay: '',
  },
  Completed: {
    badge: 'border-accent/30 bg-accent/10 text-accent',
    ring: 'ring-accent/20',
    dot: 'bg-accent',
    overlay: '',
  },
};

export function questProgressPct(q: Quest): number {
  if (q.target <= 0) return 0;
  return Math.min(100, Math.round((q.progress / q.target) * 100));
}
