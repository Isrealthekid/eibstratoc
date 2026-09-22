import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function Card({ service, index, basePath = "/services" }: { service: Service; index: number; basePath?: string }) {
  return (
    <div className="stacking-card-stage">
      <article className={`stacking-card${index % 2 ? " stacking-card-reversed" : ""}`} aria-labelledby={`service-${service.slug}`}>
        <div className="stacking-card-copy">
          <h3 id={`service-${service.slug}`}>{service.title}</h3>
          <div className="stacking-card-summary">
            <p>{service.description}</p>
            <Link className="stacking-card-link" href={`${basePath}/${service.slug}`}>
              <span>{service.linkLabel}</span><ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="stacking-card-art">
          <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
      </article>
    </div>
  );
}

export default function StackingCards({ services, basePath = "/services" }: { services: Service[]; basePath?: string }) {
  return (
    <div className="stacking-cards">
      {services.map((service, index) => (
        <Card key={service.slug} service={service} index={index} basePath={basePath} />
      ))}
    </div>
  );
}
