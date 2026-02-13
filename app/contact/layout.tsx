import type { Metadata } from "next";
import Title from "@/components/Title";
import contactData from "@/data/contact.json";

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
    <div className="grid lg:grid-cols-2 w-full h-full">
      <div className="w-full h-screen overflow-y-auto">
        {/* title */}
        <Title title={contactData.headline} />

        {/* subheadline */}
        <div className="p-1 border-t border-brand-border">
          <p className="text-sm text-black/75 dark:text-white leading-relaxed">
            {contactData.subheadline}
          </p>
        </div>

        {/* contact methods */}
        <div className="border-t border-brand-border p-1">
          <h2 className="text-base font-bold text-black dark:text-brand-secondary mb-1">
            Contact Methods
          </h2>
          <div className="space-y-1">
            {contactData.methods.map((method: any, index: number) => (
              <div
                key={index}
                className="text-[13px] text-black/75 dark:text-brand-secondary/75"
              >
                <div className="font-semibold">{method.label}</div>
                {method.type === "email" ? (
                  <a
                    href={`mailto:${method.value}`}
                    className="text-brand-blue underline break-all"
                  >
                    {method.value}
                  </a>
                ) : (
                  <a
                    href={method.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue underline break-all"
                  >
                    {method.value}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* content / right side ASCII placeholder */}
      <div className="hidden lg:block flex-1 h-full overflow-y-auto border-l border-brand-border">
        {children}
      </div>
    </div>
  );
}


