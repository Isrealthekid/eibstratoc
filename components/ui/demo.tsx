import { Text_03 } from "@/components/ui/wave-text";
import { NotFoundPage } from "@/components/ui/not-found-page";
import { GlowingCard } from "@/components/ui/glowing-card";

export function GlowingCardDemo() {
  return <GlowingCard />;
}

function TextDemo() {
  return <Text_03 text="Wave" />;
}

export { TextDemo };

export default function NotFoundDemo() {
  return (
    <div className="flex min-h-[60svh] w-full items-center justify-center">
      <NotFoundPage />
    </div>
  );
}
