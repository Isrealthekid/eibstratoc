"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy, Mail, MapPin, ArrowUpRight, Layers, type LucideIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const APP_EMAIL = "info@eibstratoc.com";

export function ContactPage() {
  return (
    <main
      className="dark relative isolate min-h-screen w-full overflow-hidden bg-[var(--brand-blue)] text-white [color-scheme:dark]"
      data-critical-viewport
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-96 -left-36 h-[80rem] w-[35rem] -rotate-45 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09),transparent_65%)]" />
        <div className="absolute -top-96 left-40 h-[80rem] w-60 -rotate-45 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,210,255,0.08),transparent_65%)]" />
      </div>

      <div className="mx-auto min-h-screen max-w-6xl border-white/20 lg:border-x">
        <header className="px-6 pt-40 pb-16 md:px-8 md:pt-48 md:pb-20">
          <p className="mb-7 text-[11px] leading-normal tracking-[0.16em] text-blue-100">CONTACT EIB STRATOC</p>
          <h1 className="text-[clamp(40px,5.5vw,80px)] font-normal leading-[0.98] tracking-[-0.055em]">Contact us</h1>
          <p className="mt-7 max-w-[54ch] text-[clamp(14px,1.3vw,18px)] leading-[1.7] text-blue-100">
            Tell us what you need to protect. Let’s discuss your intelligence,
            surveillance and operational support requirements.
          </p>
        </header>

        <BorderSeparator />
        <div className="grid md:grid-cols-3">
          <Box icon={Mail} title="Email" description="For general enquiries and partnerships.">
            <a href={`mailto:${APP_EMAIL}`} className="min-w-0 break-all text-[clamp(14px,1.2vw,17px)] leading-[1.8] hover:underline">
              {APP_EMAIL}
            </a>
            <CopyButton text={APP_EMAIL} />
          </Box>
          <Box icon={MapPin} title="Location" description="Home to our satellite teleport facility.">
            <p className="text-[clamp(14px,1.2vw,17px)] leading-[1.8]">Idu, Abuja<br />Nigeria</p>
          </Box>
          <Box icon={Star} title="Social media" description="Connect with us on Instagram." className="border-b-0 md:border-r-0">
            <a href="https://www.instagram.com/eibstractorsac/" target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 text-[clamp(14px,1.2vw,17px)] leading-[1.8] hover:underline">
              <span className="break-all">eibstractorsac</span>
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </Box>
        </div>
        <BorderSeparator />

        <section aria-labelledby="connect-heading" className="relative flex min-h-80 items-center justify-center px-6 py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="relative space-y-6 text-center">
            <h2 id="connect-heading" className="text-[clamp(28px,3.2vw,46px)] font-normal leading-[1.1] tracking-[-0.045em]">Let’s connect</h2>
            <p className="text-[clamp(14px,1.2vw,17px)] leading-[1.8] text-blue-100">Start a conversation. Explore what we do.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${APP_EMAIL}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-xs leading-[1.2] transition-colors hover:bg-white/15">
                <Mail className="size-4" aria-hidden="true" />Email our team
              </a>
              <Link href="/services" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-xs leading-[1.2] transition-colors hover:bg-white/15">
                <Layers className="size-4" aria-hidden="true" />Our services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function BorderSeparator() {
  return <div aria-hidden="true" className="relative h-px before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:bg-white/20" />;
}

type ContactBox = React.ComponentProps<"section"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Box({ icon: Icon, title, description, className, children, ...props }: ContactBox) {
  return (
    <section className={cn("flex min-w-0 flex-col justify-between border-b border-white/20 md:border-r md:border-b-0", className)} {...props}>
      <div className="flex items-center gap-3 border-b border-white/20 bg-white/5 p-5">
        <Icon className="size-5 text-blue-100" strokeWidth={1} aria-hidden="true" />
        <h2 className="text-base font-normal tracking-[-0.025em]">{title}</h2>
      </div>
      <div className="flex min-h-40 flex-1 items-center gap-1 px-5 py-10">{children}</div>
      <div className="border-t border-white/20 p-5">
        <p className="text-[13px] leading-[1.6] text-blue-100">{description}</p>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  async function handleCopy() {
    if (timeout.current) clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timeout.current = setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="relative shrink-0">
      <Button type="button" variant="ghost" size="icon" className="size-11 disabled:opacity-100" onClick={handleCopy} aria-label={status === "copied" ? "Email copied" : "Copy email address"} disabled={status === "copied"}>
        {status === "copied" ? <Check className="size-4 text-emerald-200" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      </Button>
      <span role="status" className={status === "error" ? "absolute right-0 top-full z-10 w-52 rounded border border-white/30 bg-[var(--brand-blue)] p-2 text-xs" : "sr-only"}>
        {status === "copied" ? "Email address copied to clipboard." : status === "error" ? "Unable to copy. Select and copy the email address manually." : ""}
      </span>
    </div>
  );
}
