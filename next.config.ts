import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
  {
    "source": "/services/surveillance-command",
    "destination": "/services/intelligent-surveillance",
    "permanent": true
  },
  {
    "source": "/capabilities/surveillance-command",
    "destination": "/capabilities/intelligent-surveillance",
    "permanent": true
  },
  {
    "source": "/services/cybersecurity-data-security",
    "destination": "/services/cyber-defense-grid",
    "permanent": true
  },
  {
    "source": "/capabilities/cybersecurity-data-security",
    "destination": "/capabilities/cyber-defense-grid",
    "permanent": true
  },
  {
    "source": "/services/satellite-infrastructure",
    "destination": "/services/satellite-reconnaissance",
    "permanent": true
  },
  {
    "source": "/capabilities/satellite-infrastructure",
    "destination": "/capabilities/satellite-reconnaissance",
    "permanent": true
  },
  {
    "source": "/services/intelligence-fusion",
    "destination": "/services/predictive-analytics",
    "permanent": true
  },
  {
    "source": "/capabilities/intelligence-fusion",
    "destination": "/capabilities/predictive-analytics",
    "permanent": true
  },
  {
    "source": "/services/operational-support",
    "destination": "/services/command-control",
    "permanent": true
  },
  {
    "source": "/capabilities/operational-support",
    "destination": "/capabilities/command-control",
    "permanent": true
  }
];
  },
};

export default nextConfig;
