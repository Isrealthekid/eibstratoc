export const services = [
  {
    slug: "intelligence-fusion",
    title: "Intelligence Fusion",
    description: "Combine satellite imagery, UAV feeds, human reporting, open-source intelligence and sensor data in a secure analytical environment. Identify emerging threats and turn multiple information streams into actionable insight.",
    linkLabel: "Explore Intelligence Fusion",
    image: "/assets/services/intelligence-fusion.jpg",
    imageAlt: "Earth at night photographed from space",
  },
  {
    slug: "surveillance-command",
    title: "Surveillance & Command",
    description: "Connect aerial surveillance, intelligent video, perimeter protection and command systems to support continuous monitoring and coordinated response.",
    linkLabel: "Explore Surveillance & Command",
    image: "/assets/services/surveillance-command.jpg",
    imageAlt: "Aerial surveillance drone in flight",
  },
  {
    slug: "geospatial-intelligence",
    title: "Geospatial Intelligence",
    description: "Understand incidents, terrain and resource deployment through interactive Story Maps, live GIS dashboards and detailed topographic mapping.",
    linkLabel: "Explore Geospatial Intelligence",
    image: "/assets/services/geospatial-intelligence.jpg",
    imageAlt: "City skyline and waterfront infrastructure",
  },
  {
    slug: "satellite-infrastructure",
    title: "Satellite Infrastructure",
    description: "Support real-time data distribution and satellite image acquisition through our satellite teleport in Idu, Abuja, and our Strategic Operations Center.",
    linkLabel: "Explore Satellite Infrastructure",
    image: "/assets/services/satellite-infrastructure.jpg",
    imageAlt: "Earth and its atmosphere photographed from orbit",
  },
  {
    slug: "cybersecurity-data-security",
    title: "Cybersecurity & Data Security",
    description: "Protect sensitive intelligence through a 200-rack Tier III data centre with integrated cybersecurity systems and digital forensics capabilities.",
    linkLabel: "Explore Cybersecurity & Data Security",
    image: "/assets/services/cybersecurity-data-security.jpg",
    imageAlt: "Server racks inside a data centre",
  },
  {
    slug: "operational-support",
    title: "Operational Support",
    description: "Support defence, law enforcement and critical infrastructure operations with persistent surveillance, threat analysis, intelligence reporting and mission coordination.",
    linkLabel: "Explore Operational Support",
    image: "/assets/services/operational-support.jpg",
    imageAlt: "Team collaborating in an operations workspace",
  },
];

export type Service = (typeof services)[number];
