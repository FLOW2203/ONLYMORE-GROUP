import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ONLYMORE Group, ESS infrastructure operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const isEn = params.locale === "en";
  const title = isEn ? "ONLYMORE Group" : "ONLYMORE Group";
  const doctrine = isEn
    ? "ESS infrastructure operator for territorial revitalization through sports industry."
    : "Operateur d'infrastructure ESS de revitalisation territoriale par l'industrie sportive.";
  const tagline = "Built for the many. Powered by sport.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "3px solid #C5975B",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C5975B",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            OM
          </div>
          <div
            style={{
              color: "#C5975B",
              fontSize: "24px",
              letterSpacing: "4px",
              fontWeight: 700,
            }}
          >
            ONLYMORE GROUP
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              color: "#F8F6F3",
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#F8F6F3",
              opacity: 0.8,
              fontSize: "28px",
              fontStyle: "italic",
              lineHeight: 1.35,
              maxWidth: "1000px",
            }}
          >
            {doctrine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(248,246,243,0.15)",
            paddingTop: "20px",
          }}
        >
          <div style={{ color: "#F8F6F3", opacity: 0.5, fontSize: "20px" }}>{tagline}</div>
          <div style={{ color: "#C5975B", fontSize: "20px" }}>onlymore.group</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
