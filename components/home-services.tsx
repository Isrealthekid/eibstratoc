import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import styles from "./home-services.module.css";
import ServiceIllustration from "./service-illustration";

export default function HomeServices() {
  return (
    <section className="home-services" id="services" aria-labelledby="home-services-heading">
      <div className={styles.heading}>
        <div>
        <p className="home-services-label">Our services</p>
        <h2 id="home-services-heading">Connected capabilities. One operational picture.</h2>
        </div>
        <p className={styles.introduction}>Bring intelligence, surveillance and response coordination together with capabilities designed for complex security and operational environments.</p>
      </div>
      <div className={styles.grid}>
        {services.map((service) => (
          <Link className={styles.card} href={`/services/${service.slug}`} key={service.slug} aria-labelledby={`home-service-${service.slug}`}>
            <div className={styles.top} aria-hidden="true">
              <div className={styles.illustration}><ServiceIllustration slug={service.slug} /></div>
              <ArrowUpRight className={styles.arrow} />
            </div>
            <div className={styles.copy}>
              <h3 id={`home-service-${service.slug}`}>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
