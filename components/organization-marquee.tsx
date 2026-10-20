import Image from "next/image";

const organizations = [
  { name: "NNPC Limited", image: "nnpc.png", kind: "nnpc" },
  { name: "Office of the National Security Adviser", image: "onsa.jpg", kind: "onsa" },
  { name: "Nigeria Police Force", image: "police-transparent.png", kind: "police" },
  { name: "Nigeria Customs Service", image: "customs.png", kind: "customs" },
];

export default function OrganizationMarquee() {
  return (
    <section className="organization-section" aria-labelledby="organizations-heading">
      <div className="organization-heading">
        <h2 id="organizations-heading">Trusted By Strategic Partners</h2>
        <p>Trusted by Nigeria&apos;s defence, security, and diplomatic community.</p>
      </div>
      <ul className="organization-grid" aria-label="Partner organizations">
        {organizations.map((organization) => (
          <li className="organization-logo" key={organization.kind}>
            <div className={`organization-image organization-image-${organization.kind}`}>
              <Image
                src={`/assets/logos/${organization.image}`}
                alt={organization.name}
                fill
                loading="eager"
                sizes="(max-width: 600px) 110px, (min-width: 1000px) 12.5vw, 140px"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
