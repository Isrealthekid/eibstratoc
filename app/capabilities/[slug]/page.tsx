import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return { title: `${service.title} | Stratoc`, description: service.description };
}

export default async function CapabilityDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="service-detail">
      <Link className="service-detail-back" href="/capabilities"><ArrowLeft size={16} aria-hidden="true" />All capabilities</Link>
      <div className="service-detail-grid">
        <div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <Link className="stacking-card-link" href="/contact">Discuss your requirements<ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
        <Image className="service-detail-image" src={service.image} alt={service.imageAlt} width={768} height={768} sizes="(max-width: 767px) 100vw, 50vw" />
      </div>
    </main>
  );
}
