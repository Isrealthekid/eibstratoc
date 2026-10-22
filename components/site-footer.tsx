import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import Topography from "@/components/Topography";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-background" aria-hidden="true">
        <Topography
          color="#3b82f6"
          lineCount={35}
          lineWidth={0.8}
          elevation={0.9}
          foreground={0.34}
          tilt={38}
          speed={0.25}
          direction="forward"
          glow={0.15}
          depthOfField={0.25}
          fog={0.35}
          hoverEffect="lift"
          clickEffect="pulse"
          scale={0.85}
          detail={0.96}
          morph={0.18}
          brightness={0.2}
          mouseStrength={0.45}
          trail={0.21}
          dpr={1.5}
        />
      </div>
      <div className="site-footer-columns">
        <div className="site-footer-column">
          <h2>Connect</h2>
          <a href="mailto:info@eibstratoc.com">info@eibstratoc.com</a>
          <a href="#site-content" className="text-icon-link">Back to top <ArrowUpRight className="inline-arrow" aria-hidden="true" /></a>
        </div>
        <nav className="site-footer-column" aria-label="Footer company navigation">
          <h2>Company</h2>
          <Link href="/">Home</Link>
          <Link href="/about">About EIB STRATOC</Link>
          <Link href="/capabilities">Our capabilities</Link>
        </nav>
        <nav className="site-footer-column" aria-label="Footer services navigation">
          <h2>Our services</h2>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>
          ))}
        </nav>
        <div className="site-footer-column">
          <h2>EIB STRATOC</h2>
          <p>Idu, Abuja<br />Nigeria</p>
          <p>Intelligence. Surveillance.<br />Strategic Operations.</p>
        </div>
      </div>
      <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} EIB STRATOC</p>
          <p>All rights reserved.</p>
      </div>
      <div className="site-footer-wordmark" aria-hidden="true">EIB STRATOC</div>
    </footer>
  );
}
