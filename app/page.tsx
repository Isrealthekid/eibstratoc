import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IntelligenceIntro from "./intelligence-intro";
import OrganizationMarquee from "@/components/organization-marquee";
import MetricsMarquee from "@/components/metrics-marquee";
import HomeServices from "@/components/home-services";
import ProjectsImpact from "@/components/projects-impact";
import HeroVideo from "@/components/hero-video";

export default function Home() {
  return (
    <div className="homepage" data-critical-viewport>
      <main className="hero">
        <HeroVideo />
        <div className="hero-content">
          <h1>Where intelligence<br />meets action</h1>
          <p className="hero-subheading">Intelligence. Surveillance. Strategic Operations.</p>
          <Link href="/contact" className="nav-item nav-contact hero-contact">
            Get in touch
            <span className="nav-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1.8} /></span>
          </Link>
        </div>
      </main>
      <MetricsMarquee />
      <IntelligenceIntro />
      <OrganizationMarquee />
      <HomeServices />
      <ProjectsImpact />
    </div>
  );
}
