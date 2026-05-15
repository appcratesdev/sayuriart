interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "outline" | "savings";
}

export const Badge = ({ children, variant = "primary" }: BadgeProps) => (
  <span className={`badge badge-${variant}`}>{children}</span>
);
