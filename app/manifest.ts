import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shri Govardhannath Haveli",
    short_name: "Govardhannath",

    description: "Live Darshan, Seva, Prasadam, Events and Bhakti services.",

    start_url: "/",

    display: "standalone",

    background_color: "#fff8e7",

    theme_color: "#8f0d13",

    orientation: "portrait",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
