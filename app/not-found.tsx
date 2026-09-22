import type { Metadata } from "next";
import { NotFoundPage } from "@/components/ui/not-found-page";

export const metadata: Metadata = {
  title: "404 — Page not found | Stratoc",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <NotFoundPage />
    </main>
  );
}
