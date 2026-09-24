import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IntelligenceIntro from "./intelligence-intro";
import OrganizationMarquee from "@/components/organization-marquee";
import MetricsMarquee from "@/components/metrics-marquee";
import HomeServices from "@/components/home-services";
import ProjectsImpact from "@/components/projects-impact";

export default function Home() {
  return (
    <div className="homepage" data-critical-viewport>
      <main className="hero">
        <div className="orbital" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content">
          <h1>Where intelligence meets action</h1>
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
      <section id="welcome" className="welcome"><p className="eyebrow">OUR ORGANIZATION</p><h2>Welcome to Stratoc.</h2></section>
    </div>
  );
}
