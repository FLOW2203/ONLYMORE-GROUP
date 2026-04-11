import type { Metadata } from "next";
import { defaultLocale, Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale as Locale) || defaultLocale;
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: "Contact — ONLYMORE Group",
    description:
      "Contactez ONLYMORE Group. Siege : Rodilhan, Occitanie, France. Email : onlymore2024@gmail.com.",
  });
}

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale || defaultLocale;
  return (
    <main>
      <Header />
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Contact
          </h1>
          <div className="space-y-4 text-lg text-neutral-gray mb-8">
            <p>
              <strong className="text-warm-white">Siege social :</strong>{" "}
              Rodilhan, 30230, Occitanie, France
            </p>
            <p>
              <strong className="text-warm-white">Email :</strong>{" "}
              <a
                href="mailto:onlymore2024@gmail.com"
                className="text-teal hover:underline"
              >
                onlymore2024@gmail.com
              </a>
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href={`/${locale}`} className="text-teal hover:underline">
              &larr; Accueil
            </Link>
            <Link href={`/${locale}/filiales`} className="text-neutral-gray hover:underline">
              Nos filiales &rarr;
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
