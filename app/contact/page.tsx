import type { Metadata } from "next";
import { ContactPage } from "@/components/ui/contact-page";

export const metadata: Metadata = {
  title: "Contact EIB STRATOC",
  description: "Discuss intelligence, surveillance and operational support requirements with EIB STRATOC.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
