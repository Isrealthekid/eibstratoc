import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const organizations = [
  { name: "NNPC Limited", image: "nnpc.png", kind: "nnpc" },
  { name: "Office of the National Security Adviser", image: "onsa.jpg", kind: "onsa" },
  { name: "Nigeria Police Force", image: "police-transparent.png", kind: "police" },
  { name: "Nigeria Customs Service", image: "customs.png", kind: "customs" },
  { name: "Nigeria Customs Service", image: "customs.png", kind: "customs" },
];

export default function OrganizationMarquee() {
  return (
    <section className="organization-section" aria-labelledby="organizations-heading">
      <div className="organization-heading">
        <h2 id="organizations-heading">Strategic partnerships &amp; distinguished delegations</h2>
        <p>Trusted by Nigeria&apos;s defence, security, and diplomatic community.</p>
      </div>
      <Marquee pauseOnHover speed={35} aria-label="Organization logos" tabIndex={0}>
        {organizations.map((organization, index) => (
          <div className="organization-logo" key={`${organization.kind}-${index}`}>
            <div className={`organization-image organization-image-${organization.kind}`}>
              <Image
                src={`/assets/logos/${organization.image}`}
                alt={organization.name}
                fill
                loading="eager"
                sizes="(max-width: 600px) 110px, 140px"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
