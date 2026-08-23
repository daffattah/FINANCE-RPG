import { DashboardButton } from '@/components/dashboard/button';

type QuickActionProps = {
  label: string;
  icon: React.ElementType;
  accent: string;
};

export function QuickAction({ label, icon, accent }: QuickActionProps) {
  return (
    <DashboardButton
      label={label}
      icon={icon}
      iconClassName={accent}
    />
  );
}
