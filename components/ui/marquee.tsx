import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee", className)}
      data-pause-on-hover={pauseOnHover || undefined}
      style={{ ...style, "--duration": `${Number.isFinite(speed) && speed > 0 ? speed : 30}s` } as CSSProperties}
      {...props}
    >
      <div className="marquee-track" style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true" inert>{children}</div>
      </div>
    </div>
  );
}
