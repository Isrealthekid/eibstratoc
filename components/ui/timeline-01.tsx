import Timeline from "@/components/ui/timeline-01-utils/timeline";

const stages = [
  { label: "Stage 01", title: "Collect", description: "Bring together information from UAV surveillance, satellite imagery, video systems, field reports, intelligence sources and sensor networks.", image: "/assets/services/surveillance-command.jpg", imageAlt: "Drone collecting aerial imagery" },
  { label: "Stage 02", title: "Validate & Analyse", description: "Correlate information, identify anomalies and assess threats, risks and operational conditions within the Intelligence Fusion Centre.", image: "/assets/services/operational-support.jpg", imageAlt: "Team reviewing information together" },
  { label: "Stage 03", title: "Build Situational Awareness", description: "Present intelligence through GIS mapping, live dashboards and a shared command environment so teams can understand the operating picture.", image: "/assets/services/intelligence-fusion.jpg", imageAlt: "Satellite view of cities and infrastructure at night" },
  { label: "Stage 04", title: "Inform & Coordinate", description: "Deliver intelligence reports and operational updates, share alerts and support coordination between decision makers and personnel in the field.", image: "/assets/services/cybersecurity-data-security.jpg", imageAlt: "Network infrastructure supporting information sharing" },
];

export default function TimelineBlock01() {
  return <Timeline items={stages} />;
}
