export const services = [
  {
    "slug": "intelligent-surveillance",
    "title": "Intelligent Surveillance",
    "description": "Next-gen CCTV & drone surveillance systems integrated with behavioral analytics for proactive threat detection.",
    "linkLabel": "Explore Intelligent Surveillance",
    "image": "/assets/services/intelligent-surveillance.webp",
    "imageAlt": "Surveillance control room with monitoring screens and workstations"
  },
  {
    "slug": "geospatial-intelligence",
    "title": "Geospatial Intelligence",
    "description": "Advanced GIS mapping and terrain analysis providing tactical situational awareness for complex operations.",
    "linkLabel": "Explore Geospatial Intelligence",
    "image": "/assets/services/geospatial.webp",
    "imageAlt": "Intelligence operations room with large mapping displays"
  },
  {
    "slug": "cyber-defense-grid",
    "title": "Cyber Defense Grid",
    "description": "Military-grade cybersecurity infrastructure protecting critical national assets from digital warfare and espionage.",
    "linkLabel": "Explore Cyber Defense Grid",
    "image": "/assets/services/cyber-defense.webp",
    "imageAlt": "Cyber operations workstations and monitoring displays"
  },
  {
    "slug": "satellite-reconnaissance",
    "title": "Satellite Reconnaissance",
    "description": "Real-time high-resolution satellite imagery for border monitoring and asset tracking across the continent.",
    "linkLabel": "Explore Satellite Reconnaissance",
    "image": "/assets/services/satellite.webp",
    "imageAlt": "Satellite dishes at a communications facility"
  },
  {
    "slug": "predictive-analytics",
    "title": "Predictive Analytics",
    "description": "AI-driven data modelling that forecasts security trends and potential breaches before they occur.",
    "linkLabel": "Explore Predictive Analytics",
    "image": "/assets/services/predictive-analytics.webp",
    "imageAlt": "Data specialist working beside server racks"
  },
  {
    "slug": "command-control",
    "title": "Command & Control",
    "description": "Centralized fusion centers ensuring seamless communication and coordination during critical missions",
    "linkLabel": "Explore Command & Control",
    "image": "/assets/services/command-control.webp",
    "imageAlt": "Operators coordinating work at monitoring consoles"
  }
];

export type Service = (typeof services)[number];
