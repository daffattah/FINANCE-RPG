import type { LucideIcon } from 'lucide-react';
import {
  Footprints,
  PiggyBank,
  ClipboardList,
  Timer,
  Flame,
  ShieldCheck,
  Zap,
  Building2,
} from 'lucide-react';

export type AchievementStatus = 'Locked' | 'Unlocked';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  target: number;
  status: AchievementStatus;
};

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'FIRST STEP',
    description: 'Record your very first transaction.',
    icon: Footprints,
    progress: 1,
    target: 1,
    status: 'Unlocked',
  },
  {
    id: 'first-saver',
    title: 'FIRST SAVER',
    description: 'End a week with money left in your budget.',
    icon: PiggyBank,
    progress: 1,
    target: 1,
    status: 'Unlocked',
  },
  {
    id: 'first-level-up',
    title: 'FIRST LEVEL UP',
    description: 'Reach Level 2 by earning enough XP.',
    icon: Zap,
    progress: 120,
    target: 500,
    status: 'Locked',
  },
  {
    id: 'budget-master',
    title: 'BUDGET MASTER',
    description: 'Stay within budget for 7 consecutive days.',
    icon: ClipboardList,
    progress: 3,
    target: 7,
    status: 'Locked',
  },
  {
    id: 'impulse-killer',
    title: 'IMPULSE KILLER',
    description: 'Use the 10-minute impulse rule 10 times.',
    icon: Timer,
    progress: 4,
    target: 10,
    status: 'Locked',
  },
  {
    id: 'one-month-streak',
    title: 'ONE MONTH STREAK',
    description: 'Log in and record expenses for 30 days straight.',
    icon: Flame,
    progress: 12,
    target: 30,
    status: 'Locked',
  },
  {
    id: 'financial-discipline',
    title: 'FINANCIAL DISCIPLINE',
    description: 'Complete all daily quests for 14 days.',
    icon: ShieldCheck,
    progress: 5,
    target: 14,
    status: 'Locked',
  },
  {
    id: 'finance-architect',
    title: 'FINANCE ARCHITECT',
    description: 'Create budgets for every spending category.',
    icon: Building2,
    progress: 3,
    target: 6,
    status: 'Locked',
  },
];

export function achievementPct(a: Achievement): number {
  if (a.target <= 0) return 0;
  return Math.min(100, Math.round((a.progress / a.target) * 100));
}
