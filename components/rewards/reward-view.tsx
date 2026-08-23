'use client';

import { Gift, Coins, Lock } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  type Reward,
  type RewardAvailability,
  rewards,
  availabilityStyles,
  PLACEHOLDER_COINS,
} from '@/lib/rewards';

function AvailabilityBadge({ availability }: { availability: RewardAvailability }) {
  const s = availabilityStyles[availability];
  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide', s.badge)}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {availability}
    </Badge>
  );
}

function RewardCard({ reward }: { reward: Reward }) {
  const Icon = reward.icon;
  const isAvailable = reward.availability === 'Available';
  const canAfford = PLACEHOLDER_COINS >= reward.cost;
  const isLocked = reward.availability === 'Locked';
  const isSoldOut = reward.availability === 'Sold Out';

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg ring-1 p-4 bg-secondary/30 transition-colors',
        isAvailable ? 'ring-primary/20' : 'ring-border/60',
        !isAvailable && 'opacity-70'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1',
              isAvailable
                ? 'bg-primary/10 text-primary ring-primary/20'
                : 'bg-secondary text-muted-foreground ring-border'
            )}
          >
            {isLocked ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">{reward.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{reward.description}</p>
          </div>
        </div>
        <AvailabilityBadge availability={reward.availability} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-sm font-bold tabular-nums text-coin">
          <Coins className="h-4 w-4" />
          {reward.cost}
        </span>
        <Button
          size="sm"
          disabled={!isAvailable || !canAfford}
          variant={isAvailable && canAfford ? 'default' : 'secondary'}
          className="text-xs"
        >
          {isSoldOut
            ? 'Sold Out'
            : isLocked
              ? 'Locked'
              : canAfford
                ? 'Redeem'
                : 'Not enough coins'}
        </Button>
      </div>
    </div>
  );
}

export function RewardView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Reward Shop</h2>
            <p className="text-xs text-muted-foreground">
              Spend coins earned from quests on in-app rewards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-coin/10 px-3 py-2 ring-1 ring-coin/20">
          <Coins className="h-4 w-4 text-coin" />
          <span className="text-sm font-bold tabular-nums text-coin">
            {PLACEHOLDER_COINS}
          </span>
        </div>
      </div>

      <DashboardCard contentClassName="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Available Rewards
          </h3>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {rewards.length} items
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {rewards.map((r) => (
            <RewardCard key={r.id} reward={r} />
          ))}
        </div>
      </DashboardCard>

      <footer className="pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">
          Placeholder data — coin balance and rewards are examples only.
        </p>
      </footer>
    </div>
  );
}
