"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Text_03 } from "@/components/ui/wave-text";
import { useEffect, useRef, useState } from "react";

const MotionLink = motion.create(Link);

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Services", href: "/services" },
  { label: "News", href: "/news" },
];

export default function Navigation() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => menu.current?.close();
  const openMenu = () => {
    menu.current?.showModal();
    setMenuOpen(true);
  };

  useEffect(() => {
    menu.current?.close();
    const desktop = matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) menu.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!header.current) return;
      const logo = header.current.querySelector(".nav-brand")?.getBoundingClientRect();
      const line = logo ? (logo.top + logo.bottom) / 2 : 44;
      const light = Array.from(document.querySelectorAll('.home-services, .service-detail, .welcome, .organization-section, [data-navigation-surface="light"]')).some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= line && bounds.bottom > line;
      });
      header.current.dataset.surface = light ? "light" : "dark";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return (
    <header ref={header} className="navigation" data-critical-viewport>
      <Link className="nav-brand" href="/" aria-label="Stratoc home">
        <Image src="/assets/logo-white.png" alt="Stratoc" width={460} height={225} priority unoptimized className="brand-logo" />
      </Link>
      <nav className="nav-glass nav-primary" aria-label="Main navigation">
        {pages.map(({ label, href }) => {
          const active = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
          return <MotionLink initial="initial" whileHover="hover" whileFocus="hover" className={`nav-item${active ? " is-active" : ""}`} href={href} key={href} aria-current={active ? "page" : undefined}><Text_03 text={label} className="nav-wave" inheritHover /></MotionLink>;
        })}
      </nav>
      <nav className="nav-glass nav-secondary" aria-label="Contact and projects">
        <MotionLink initial="initial" whileHover="hover" whileFocus="hover" className="nav-item" href="/projects" aria-current={pathname === "/projects" ? "page" : undefined}><Text_03 text="Projects" className="nav-wave" inheritHover /></MotionLink>
        <MotionLink initial="initial" whileHover="hover" whileFocus="hover" className="nav-item nav-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
          <Text_03 text="Get in touch" className="nav-wave" inheritHover />
          <span className="nav-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1.8} /></span>
        </MotionLink>
      </nav>
      <button type="button" className="mobile-menu-toggle" onClick={openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-haspopup="dialog">
        Menu<Menu size={20} aria-hidden="true" />
      </button>
      <dialog ref={menu} id="mobile-navigation" className="mobile-menu" aria-label="Site navigation" onClose={() => setMenuOpen(false)}>
        <div className="mobile-menu-header">
          <Link href="/" onClick={closeMenu} aria-label="Stratoc home">
            <Image src="/assets/logo-white.png" alt="Stratoc" width={68} height={34} className="mobile-menu-logo" />
          </Link>
          <button type="button" className="mobile-menu-close" onClick={closeMenu} autoFocus aria-label="Close navigation menu">Close<X size={22} aria-hidden="true" /></button>
        </div>
        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {[...pages, { label: "Projects", href: "/projects" }, { label: "Get in touch", href: "/contact" }].map(({ label, href }) => (
            <Link key={href} href={href} onClick={closeMenu} aria-current={(href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)) ? "page" : undefined}>
              {label}<ArrowUpRight size={24} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-footer">Intelligence. Surveillance. Strategic Operations.</p>
      </dialog>
    </header>
  );
}
