import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import details from "@/lib/service-details.json";
import styles from "../detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const copy = details[service.slug as keyof typeof details];
  return { title: `${service.title} | EIB STRATOC`, description: copy.introduction };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const copy = details[service.slug as keyof typeof details];
  const nextService = services[(services.indexOf(service) + 1) % services.length];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <Link className={styles.back} href="/services"><ArrowLeft size={16} aria-hidden="true" />All services</Link>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <div className={styles.introduction}>
          <p>{copy.introduction}</p>
          <Link className={styles.button} href="/contact">{copy.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </header>
      <div className={styles.visual}>
        <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" />
      </div>
      <div className={styles.content} data-navigation-surface="light">
        {copy.sections.map((section, index) => (
          <section className={styles.section} key={`${section.title}-${index}`}>
            <div className={styles.sectionHeading}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title || "Location. Activity. Context."}</h2>
            </div>
            <div className={styles.sectionCopy}>
              {section.kind === "Application" && <p className={styles.eyebrow}>In the field</p>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items.length > 0 && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>
          </section>
        ))}
      </div>
      <section data-navigation-surface="light" className={styles.closing}>
        <p className={styles.eyebrow}>Put intelligence to work</p>
        <h2>Connect this service<br />to your mission.</h2>
        <Link className={styles.button} href="/contact">{copy.cta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        <Link className={styles.next} href={`/services/${nextService.slug}`}><span>Explore next</span>{nextService.title}<ArrowUpRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
