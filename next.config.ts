import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Team & news photos are uploaded through admin server actions (4MB cap
    // in src/lib/uploads.ts, plus room for the form fields).
    serverActions: { bodySizeLimit: "5mb" },
  },
  images: {
    // Team & news photos uploaded to Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  // Old WordPress addresses, so existing Google results and links keep
  // working. (/about-us and /services keep their old paths.)
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/recruitment", destination: "/careers", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/wp-content/uploads/2020/02/JeffJen_Application-Form-1.pdf",
        destination: "/downloads/jeff-jen-care-plus-application-form.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
