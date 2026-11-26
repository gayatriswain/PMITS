import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Service pages live under their mega-menu column (web-software, design-innovation,
  // marketing-growth, hire-developer). Old URLs keep working through permanent redirects.
  async redirects() {
    return [
      // "Who We Are" is the About page
      { source: "/about", destination: "/who-we-are", permanent: true },
      { source: "/services/website-development", destination: "/web-software/website-development", permanent: true },
      { source: "/website-development", destination: "/web-software/website-development", permanent: true },
      { source: "/services/app-development", destination: "/web-software/app-development", permanent: true },
      { source: "/app-development", destination: "/web-software/app-development", permanent: true },
      { source: "/services/custom-development", destination: "/web-software/custom-development", permanent: true },
      { source: "/custom-development", destination: "/web-software/custom-development", permanent: true },
      { source: "/services/custom-crm-solution", destination: "/web-software/custom-crm-solution", permanent: true },
      { source: "/custom-crm-solution", destination: "/web-software/custom-crm-solution", permanent: true },
      { source: "/services/shopify-web-design", destination: "/web-software/shopify-web-design", permanent: true },
      { source: "/shopify-web-design", destination: "/web-software/shopify-web-design", permanent: true },
      { source: "/services/web-hosting", destination: "/web-software/web-hosting", permanent: true },
      { source: "/web-hosting", destination: "/web-software/web-hosting", permanent: true },
      // the old standalone hosting page is the same service as Web Hosting
      { source: "/hosting", destination: "/web-software/web-hosting", permanent: true },
      { source: "/services/ui-ux-design", destination: "/design-innovation/ui-ux-design", permanent: true },
      { source: "/ui-ux-design", destination: "/design-innovation/ui-ux-design", permanent: true },
      { source: "/ui-ux", destination: "/design-innovation/ui-ux-design", permanent: true },
      { source: "/services/animation-and-graphic-design", destination: "/design-innovation/animation-and-graphic-design", permanent: true },
      { source: "/animation-and-graphic-design", destination: "/design-innovation/animation-and-graphic-design", permanent: true },
      { source: "/services/custom-ar-vr-solution", destination: "/design-innovation/custom-ar-vr-solution", permanent: true },
      { source: "/custom-ar-vr-solution", destination: "/design-innovation/custom-ar-vr-solution", permanent: true },
      { source: "/services/custom-agentic-ai-solution", destination: "/design-innovation/custom-agentic-ai-solution", permanent: true },
      { source: "/custom-agentic-ai-solution", destination: "/design-innovation/custom-agentic-ai-solution", permanent: true },
      { source: "/services/digital-marketing", destination: "/marketing-growth/digital-marketing", permanent: true },
      { source: "/digital-marketing", destination: "/marketing-growth/digital-marketing", permanent: true },
      { source: "/services/social-media-marketing", destination: "/marketing-growth/social-media-marketing", permanent: true },
      { source: "/social-media-marketing", destination: "/marketing-growth/social-media-marketing", permanent: true },
      { source: "/services/google-ads", destination: "/marketing-growth/google-ads", permanent: true },
      { source: "/google-ads", destination: "/marketing-growth/google-ads", permanent: true },
      { source: "/services/ai-seo", destination: "/marketing-growth/ai-seo", permanent: true },
      { source: "/ai-seo", destination: "/marketing-growth/ai-seo", permanent: true },
      { source: "/services/ecommerce-seo", destination: "/marketing-growth/ecommerce-seo", permanent: true },
      { source: "/ecommerce-seo", destination: "/marketing-growth/ecommerce-seo", permanent: true },
      { source: "/services/local-seo", destination: "/marketing-growth/local-seo", permanent: true },
      { source: "/local-seo", destination: "/marketing-growth/local-seo", permanent: true },
      { source: "/services/hire-woocommerce-developers", destination: "/hire-developer/hire-woocommerce-developers", permanent: true },
      { source: "/hire-woocommerce-developers", destination: "/hire-developer/hire-woocommerce-developers", permanent: true },
      { source: "/services/hire-core-php-developers", destination: "/hire-developer/hire-core-php-developers", permanent: true },
      { source: "/hire-core-php-developers", destination: "/hire-developer/hire-core-php-developers", permanent: true },
      { source: "/services/hire-cakephp-developers", destination: "/hire-developer/hire-cakephp-developers", permanent: true },
      { source: "/hire-cakephp-developers", destination: "/hire-developer/hire-cakephp-developers", permanent: true },
      { source: "/services/hire-aspnet-developers", destination: "/hire-developer/hire-aspnet-developers", permanent: true },
      { source: "/hire-aspnet-developers", destination: "/hire-developer/hire-aspnet-developers", permanent: true },
      { source: "/services/hire-shopify-developers", destination: "/hire-developer/hire-shopify-developers", permanent: true },
      { source: "/hire-shopify-developers", destination: "/hire-developer/hire-shopify-developers", permanent: true },
      { source: "/services/hire-magento-developers", destination: "/hire-developer/hire-magento-developers", permanent: true },
      { source: "/hire-magento-developers", destination: "/hire-developer/hire-magento-developers", permanent: true },
      { source: "/services/hire-bigcommerce-developers", destination: "/hire-developer/hire-bigcommerce-developers", permanent: true },
      { source: "/hire-bigcommerce-developers", destination: "/hire-developer/hire-bigcommerce-developers", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Images uploaded through the CMS media library.
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost", port: "4000" },
      ...(process.env.CMS_URL && process.env.CMS_URL.startsWith("https://")
        ? [{ protocol: "https" as const, hostname: new URL(process.env.CMS_URL).hostname }]
        : []),
    ],
  },
};

export default nextConfig;
