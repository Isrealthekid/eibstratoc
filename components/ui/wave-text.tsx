"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  text?: string;
  className?: string;
  /** Let the entire parent link trigger the wave, including its padding. */
  inheritHover?: boolean;
}

function Text_03({ text = "Hover me", className = "", inheritHover = false }: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      className={cn("inline-block w-full cursor-pointer whitespace-pre text-center text-3xl", className)}
      whileHover={inheritHover ? undefined : "hover"}
      initial={inheritHover ? undefined : "initial"}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              initial: { y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
              hover: {
                y: reducedMotion ? 0 : -4,
                scale: reducedMotion ? 1 : 1.2,
                transition: { type: "spring", stiffness: 300, damping: 15, delay: reducedMotion ? 0 : index * 0.03 },
              },
            }}
          >{char}</motion.span>
        ))}
      </span>
    </motion.span>
  );
}

export { Text_03 };
