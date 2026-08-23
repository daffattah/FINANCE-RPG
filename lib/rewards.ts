import type { LucideIcon } from 'lucide-react';
import {
  Palette,
  Crown,
  RefreshCw,
  Star,
  Music,
  Image,
  Sparkles,
  Lock,
} from 'lucide-react';

export type RewardAvailability = 'Available' | 'Locked' | 'Sold Out';

export type Reward = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  cost: number;
  availability: RewardAvailability;
};

export const PLACEHOLDER_COINS = 250;

export const rewards: Reward[] = [
  {
    id: 'theme-ocean',
    name: 'Ocean Theme',
    description: 'Unlock a cool blue color scheme for the app.',
    icon: Palette,
    cost: 100,
    availability: 'Available',
  },
  {
    id: 'title-saver',
    name: 'Saver Title',
    description: 'Display the "Saver" title on your player card.',
    icon: Crown,
    cost: 150,
    availability: 'Available',
  },
  {
    id: 'redo-daily',
    name: 'Quest Reset Token',
    description: 'Reset one incomplete daily quest to try again.',
    icon: RefreshCw,
    cost: 80,
    availability: 'Available',
  },
  {
    id: 'badge-star',
    name: 'Star Badge',
    description: 'Show a star badge next to your profile name.',
    icon: Star,
    cost: 200,
    availability: 'Available',
  },
  {
    id: 'sound-pack',
    name: 'Chime Sound Pack',
    description: 'Replace the default notification sound with a soft chime.',
    icon: Music,
    cost: 120,
    availability: 'Sold Out',
  },
  {
    id: 'avatar-frame',
    name: 'Golden Avatar Frame',
    description: 'Equip a golden frame around your avatar.',
    icon: Image,
    cost: 500,
    availability: 'Locked',
  },
  {
    id: 'sparkle-effect',
    name: 'Sparkle Effect',
    description: 'Add a subtle sparkle animation to your player card.',
    icon: Sparkles,
    cost: 300,
    availability: 'Available',
  },
];

export const availabilityStyles: Record<
  RewardAvailability,
  { badge: string; dot: string }
> = {
  Available: {
    badge: 'border-accent/30 bg-accent/10 text-accent',
    dot: 'bg-accent',
  },
  Locked: {
    badge: 'border-border bg-secondary text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
  'Sold Out': {
    badge: 'border-destructive/30 bg-destructive/10 text-destructive',
    dot: 'bg-destructive',
  },
};
