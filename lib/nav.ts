import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Receipt,
  ClipboardList,
  ScrollText,
  Trophy,
  Gift,
  BarChart3,
  Settings,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Budget', href: '/budget', icon: ClipboardList },
  { label: 'Quests', href: '/quests', icon: ScrollText },
  { label: 'Achievements', href: '/achievements', icon: Trophy },
  { label: 'Rewards', href: '/rewards', icon: Gift },
  { label: 'Statistics', href: '/statistics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];
