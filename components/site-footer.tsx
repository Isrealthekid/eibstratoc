import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-columns">
        <div className="site-footer-column">
          <h2>Connect</h2>
          <a href="mailto:info@eibstratoc.com">info@eibstratoc.com</a>
          <a href="#site-content">Back to top ↗</a>
        </div>
        <nav className="site-footer-column" aria-label="Footer company navigation">
          <h2>Company</h2>
          <Link href="/">Home</Link>
          <Link href="/about">About EIB STRATOC</Link>
          <Link href="/capabilities">Our capabilities</Link>
        </nav>
        <nav className="site-footer-column" aria-label="Footer services navigation">
          <h2>Our services</h2>
          <Link href="/services/intelligence-fusion">Intelligence fusion</Link>
          <Link href="/services/surveillance-command">Surveillance &amp; command</Link>
          <Link href="/services/geospatial-intelligence">Geospatial intelligence</Link>
          <Link href="/services/satellite-infrastructure">Satellite infrastructure</Link>
          <Link href="/services/cybersecurity-data-security">Cybersecurity &amp; data security</Link>
          <Link href="/services/operational-support">Operational support</Link>
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
