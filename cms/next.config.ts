import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["mongoose", "bcryptjs", "sanitize-html", "nodemailer"],
  experimental: {
    // Media uploads go through route handlers; keep request bodies bounded.
    serverActions: { bodySizeLimit: "2mb" },
    // The website's draft-mode cookie is not ours: never clear it. Cookies ignore the port, so on
    // localhost (site :3000, admin :4000) every admin request carries it, and Next would otherwise
    // delete it - switching the visual editor's preview out of draft mode after each save.
    multiZoneDraftMode: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/admin/:path*", headers: [{ key: "Cache-Control", value: "no-store" }, { key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
