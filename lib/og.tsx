import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type SectionOgProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function renderSectionOg({ locale, eyebrow, title, subtitle }: SectionOgProps) {
  const doctrine =
    locale === "en"
      ? "ESS infrastructure operator. Built for the many. Powered by sport."
      : "Operateur d'infrastructure ESS. Built for the many. Powered by sport.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              border: "2px solid #C5975B",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C5975B",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            OM
          </div>
          <div
            style={{
              color: "#C5975B",
              fontSize: "20px",
              letterSpacing: "4px",
              fontWeight: 700,
            }}
          >
            ONLYMORE GROUP
          </div>
        </div>

        <div
          style={{
            color: "#C5975B",
            fontSize: "18px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginTop: "80px",
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: "#F8F6F3",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "1000px",
            marginTop: "18px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#F8F6F3",
            opacity: 0.75,
            fontSize: "26px",
            fontStyle: "italic",
            lineHeight: 1.35,
            maxWidth: "1000px",
            marginTop: "24px",
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(248,246,243,0.15)",
            paddingTop: "20px",
            marginTop: "auto",
          }}
        >
          <div style={{ color: "#F8F6F3", opacity: 0.5, fontSize: "18px" }}>{doctrine}</div>
          <div style={{ color: "#C5975B", fontSize: "18px" }}>onlymore.group</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
