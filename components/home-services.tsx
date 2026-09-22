import StackingCards from "@/components/ui/stacking-card";
import { services } from "@/lib/services";

export default function HomeServices() {
  return (
    <section className="home-services" id="services" aria-labelledby="home-services-heading">
      <div className="home-services-heading">
        <p className="home-services-label">Our services</p>
        <h2 id="home-services-heading">Connected capabilities. One operational picture.</h2>
        <p className="home-services-introduction">Bring intelligence, surveillance and response coordination together with capabilities designed for complex security and operational environments.</p>
      </div>
      <StackingCards services={services} />
    </section>
  );
}
