import { Marquee } from "@/components/ui/marquee";

const metrics = [
  { value: "24/7", description: "Continuous intelligence operations" },
  { value: "150,000+", description: "Schools monitored through the Nigeria Safe Schools Project Fusion Center" },
  { value: "200 racks", description: "Data centre capacity" },
  { value: "Nationwide", description: "Operational coverage across Nigeria" },
];

export default function MetricsMarquee() {
  return (
    <section className="metrics-section" aria-label="Operational metrics">
      <Marquee className="metrics-marquee" pauseOnHover speed={40} tabIndex={0} aria-label="Operational metrics. Focus to pause scrolling.">
        {metrics.map(({ value, description }) => (
          <dl className="metric" key={value}>
            <dt className="metric-description">{description}</dt>
            <dd className="metric-value">{value}</dd>
          </dl>
        ))}
      </Marquee>
    </section>
  );
}
