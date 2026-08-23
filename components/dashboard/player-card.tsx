import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardCard } from '@/components/dashboard/card';
import { Coins, Star, Zap } from 'lucide-react';

const PLACEHOLDER = {
  level: 1,
  title: 'Money Beginner',
  currentXp: 120,
  maxXp: 500,
  coins: 0,
};

export function PlayerCard() {
  const xpPct = Math.round((PLACEHOLDER.currentXp / PLACEHOLDER.maxXp) * 100);

  return (
    <DashboardCard className="relative overflow-hidden border-primary/20">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary ring-1 ring-primary/30">
              <span className="text-2xl font-black text-primary">1</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
                Level
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Player
              </p>
              <h2 className="text-lg font-bold leading-tight text-foreground">
                Student Hero
              </h2>
              <Badge
                variant="outline"
                className="gap-1 border-accent/40 bg-accent/10 text-accent"
              >
                <Star className="h-3 w-3" />
                {PLACEHOLDER.title}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 rounded-lg bg-secondary/60 px-3 py-2 ring-1 ring-coin/20">
            <div className="flex items-center gap-1.5 text-coin">
              <Coins className="h-4 w-4" />
              <span className="text-lg font-bold tabular-nums">
                {PLACEHOLDER.coins}
              </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Coins
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-xp" />
              XP Progress
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {PLACEHOLDER.currentXp} / {PLACEHOLDER.maxXp}
            </span>
          </div>
          <Progress
            value={xpPct}
            className="h-2.5 bg-secondary [&>span]:bg-xp"
          />
          <p className="text-right text-[11px] text-muted-foreground">
            {PLACEHOLDER.maxXp - PLACEHOLDER.currentXp} XP to Level {PLACEHOLDER.level + 1}
          </p>
        </div>
    </DashboardCard>
  );
}
