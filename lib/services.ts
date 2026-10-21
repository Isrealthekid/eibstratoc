export const services = [
  {
    "slug": "intelligent-surveillance",
    "title": "Intelligent Surveillance",
    "description": "Next-gen CCTV & drone surveillance systems integrated with behavioral analytics for proactive threat detection.",
    "linkLabel": "Explore Intelligent Surveillance",
    "image": "/assets/services/surveillance-command.jpg",
    "imageAlt": "Aerial surveillance drone in flight"
  },
  {
    "slug": "geospatial-intelligence",
    "title": "Geospatial Intelligence",
    "description": "Advanced GIS mapping and terrain analysis providing tactical situational awareness for complex operations.",
    "linkLabel": "Explore Geospatial Intelligence",
    "image": "/assets/services/geospatial-intelligence.jpg",
    "imageAlt": "City skyline and waterfront infrastructure"
  },
  {
    "slug": "cyber-defense-grid",
    "title": "Cyber Defense Grid",
    "description": "Military-grade cybersecurity infrastructure protecting critical national assets from digital warfare and espionage.",
    "linkLabel": "Explore Cyber Defense Grid",
    "image": "/assets/services/cybersecurity-data-security.jpg",
    "imageAlt": "Server racks inside a data centre"
  },
  {
    "slug": "satellite-reconnaissance",
    "title": "Satellite Reconnaissance",
    "description": "Real-time high-resolution satellite imagery for border monitoring and asset tracking across the continent.",
    "linkLabel": "Explore Satellite Reconnaissance",
    "image": "/assets/services/satellite-infrastructure.jpg",
    "imageAlt": "Earth and its atmosphere photographed from orbit"
  },
  {
    "slug": "predictive-analytics",
    "title": "Predictive Analytics",
    "description": "AI-driven data modelling that forecasts security trends and potential breaches before they occur.",
    "linkLabel": "Explore Predictive Analytics",
    "image": "/assets/services/intelligence-fusion.jpg",
    "imageAlt": "Earth at night photographed from space"
  },
  {
    "slug": "command-control",
    "title": "Command & Control",
    "description": "Centralized fusion centers ensuring seamless communication and coordination during critical missions",
    "linkLabel": "Explore Command & Control",
    "image": "/assets/services/operational-support.jpg",
    "imageAlt": "Team collaborating in an operations workspace"
  }
];

export type Service = (typeof services)[number];
