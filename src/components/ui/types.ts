export interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  actions?: {
    label: string;
    href: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  }[];
  customActions?: React.ReactNode;
  blur?: boolean;
  gradient?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
}
