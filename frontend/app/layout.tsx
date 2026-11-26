import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import Script from "next/script";
import Header from "./components/layout/Header";
import PreviewBanner from "@/components/cms/PreviewBanner";
import { getCollection, getMediaAlts, getNavigation, getSettings, type NavItem } from "@/lib/cms";
import MediaAlts from "@/components/cms/MediaAlts";
import Footer from "./components/layout/Footer";
import "./globals.css";

/**
 * Site fonts, loaded once here (self-hosted by next/font, font-display: swap):
 *  - Plus Jakarta Sans: every heading (h1–h6, .font-heading)
 *  - Inter: body text (.font-body)
 *  - Caveat: the few hand-written accents (.font-caveat)
 * Sizes and line-heights live in app/globals.css (type scale + text-h1 … text-caption utilities).
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Site-wide defaults from CMS Settings → Default SEO; each page overrides title/description. */
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const name = s?.siteName || "ProManage IT Solution";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s?.defaultSeo?.title || name, template: s?.defaultSeo?.titleTemplate?.includes("%s") ? s.defaultSeo.titleTemplate : "%s" },
    description: s?.defaultSeo?.description || "Website development, SEO and digital marketing that help businesses grow.",
    applicationName: name,
    icons: s?.favicon ? { icon: s.favicon } : undefined,
  };
}

const GA = /^G-[A-Z0-9]{4,12}$/;
const GTM = /^GTM-[A-Z0-9]{4,10}$/;
const PIXEL = /^[0-9]{6,20}$/;

type ServiceDoc = { name: string; pagePath?: string; shortDescription?: string; icon?: string; badge?: string };

/**
 * The services mega menu: Navigation → "services" decides groups and order; each item's name,
 * short description, icon and badge come from the matching service (same page URL) in Content → Services.
 */
function withServiceDetails(items: NavItem[] | undefined, services: ServiceDoc[]): NavItem[] | null {
  if (!items) return null;
  const byPath = new Map(services.filter((s) => s.pagePath).map((s) => [s.pagePath!, s]));
  const apply = (it: NavItem): NavItem => {
    const s = it.href ? byPath.get(it.href) : undefined;
    return {
      ...it,
      ...(s ? { label: s.name || it.label, description: s.shortDescription || it.description, icon: s.icon || it.icon, badge: s.badge || it.badge } : {}),
      children: (it.children ?? []).map(apply),
    };
  };
  return items.map(apply);
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [headerNav, servicesNav, settings, services, portfolio, mediaAlts] = await Promise.all([
    getNavigation("header"),
    getNavigation("services"),
    getSettings(),
    getCollection<ServiceDoc>("services"),
    getCollection("portfolio", { limit: 1 }),
    getMediaAlts(),
  ]);
  // The Portfolio link appears once at least one project is published (Admin → Portfolio); until then /portfolio is a 404.
  const noProjects = portfolio !== null && !portfolio.items.length;
  const headerItems = headerNav?.items ? headerNav.items.filter((i) => !(noProjects && i.href === "/portfolio")) : null;
  const a = settings?.analytics ?? {};
  // IDs are validated so CMS values can never inject script code.
  const ga = a.googleAnalyticsId && GA.test(a.googleAnalyticsId) ? a.googleAnalyticsId : null;
  const gtm = a.googleTagManagerId && GTM.test(a.googleTagManagerId) ? a.googleTagManagerId : null;
  const pixel = a.metaPixelId && PIXEL.test(a.metaPixelId) ? a.metaPixelId : null;
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header
          cms={{
            header: headerItems,
            services: withServiceDetails(servicesNav?.items, services?.items ?? []),
            topBar: settings?.topBar ?? null,
            cta: settings?.headerCta ?? null,
            logo: settings?.logo ?? null,
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <PreviewBanner />
        {mediaAlts && Object.keys(mediaAlts).length > 0 && <MediaAlts alts={mediaAlts} />}
        {gtm && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        )}
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
        {pixel && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
