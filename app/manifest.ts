import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ONLYMORE Group",
    short_name: "ONLYMORE",
    description:
      "Holding fintech mutualist. Inclusion financiere par le sport.",
    start_url: "/fr",
    display: "standalone",
    theme_color: "#00B4D8",
    background_color: "#0A0A0A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
