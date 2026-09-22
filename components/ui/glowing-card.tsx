import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children?: ReactNode;
  className?: string;
}

export function GlowingCard({ children, className }: GlowingCardProps) {
  return (
    <div className={cn("glowing-card", className)}>
      <span className="glowing-card-ray" aria-hidden="true" />
      <span className="glowing-card-dot" aria-hidden="true" />
      <span className="glowing-card-line glowing-card-top" aria-hidden="true" />
      <span className="glowing-card-line glowing-card-left" aria-hidden="true" />
      <span className="glowing-card-line glowing-card-bottom" aria-hidden="true" />
      <span className="glowing-card-line glowing-card-right" aria-hidden="true" />
      {children ?? <div className="glowing-card-demo"><strong>750k</strong><span>Views</span></div>}
    </div>
  );
}

export const Component = GlowingCard;
