import type { Metadata } from "next";
import contactData from "@/data/contact.json";
import { ContactLayoutClient } from "@/components/contact/ContactLayoutClient";

export const metadata: Metadata = {
  title: "Contact - Peter Meng | AI Product Management Leader",
  description:
    "Contact Peter Meng for AI-first product management leadership, consulting, or collaborations. Email and links to connect are available on this page.",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContactLayoutClient data={contactData as any}>
      {children}
    </ContactLayoutClient>
  );
}


