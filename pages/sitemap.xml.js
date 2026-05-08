import blogPostsIT from "../public/locales/it/blogPosts.json";
import blogPostsEN from "../public/locales/en/blogPosts.json";
import dintorniPagesIT from "../public/locales/it/dintorniPages.json";
import dintorniPagesEN from "../public/locales/en/dintorniPages.json";

const SITE_URL = "https://www.agriturismosegarelli.it";
const LASTMOD = "2026-05-08";

const staticRoutes = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "appartamenti", priority: "0.9", changefreq: "weekly" },
  { path: "appartamenti/acacia", priority: "0.8", changefreq: "weekly" },
  { path: "appartamenti/edera", priority: "0.8", changefreq: "weekly" },
  { path: "appartamenti/gelsomino", priority: "0.8", changefreq: "weekly" },
  { path: "mangiare-in-agriturismo", priority: "0.8", changefreq: "monthly" },
  { path: "relax-e-natura-da-segarelli", priority: "0.8", changefreq: "monthly" },
  { path: "scopri-i-dintorni", priority: "0.8", changefreq: "monthly" },
  { path: "chi-siamo", priority: "0.7", changefreq: "monthly" },
  { path: "contatti", priority: "0.7", changefreq: "monthly" },
  { path: "blog", priority: "0.7", changefreq: "weekly" },
  { path: "privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "cookie-policy", priority: "0.3", changefreq: "yearly" },
];

const alternateRoutes = [
  { path: "en", priority: "0.9", changefreq: "weekly" },
  { path: "en/appartamenti", priority: "0.8", changefreq: "weekly" },
  { path: "en/appartamenti/acacia", priority: "0.7", changefreq: "weekly" },
  { path: "en/appartamenti/edera", priority: "0.7", changefreq: "weekly" },
  { path: "en/appartamenti/gelsomino", priority: "0.7", changefreq: "weekly" },
  { path: "en/mangiare-in-agriturismo", priority: "0.7", changefreq: "monthly" },
  { path: "en/relax-e-natura-da-segarelli", priority: "0.7", changefreq: "monthly" },
  { path: "en/scopri-i-dintorni", priority: "0.7", changefreq: "monthly" },
  { path: "en/chi-siamo", priority: "0.6", changefreq: "monthly" },
  { path: "en/contatti", priority: "0.6", changefreq: "monthly" },
  { path: "en/blog", priority: "0.6", changefreq: "weekly" },
  { path: "en/privacy-policy", priority: "0.2", changefreq: "yearly" },
  { path: "en/cookie-policy", priority: "0.2", changefreq: "yearly" },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urlFor = (path) => `${SITE_URL}${path ? `/${path}` : "/"}`;

const buildUrl = ({ path, lastmod = LASTMOD, changefreq, priority }) => `
  <url>
    <loc>${escapeXml(urlFor(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const buildSitemap = () => {
  const dintorniRoutes = [
    ...dintorniPagesIT.pages.map((page) => ({
      path: `dintorni/${page.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...dintorniPagesEN.pages.map((page) => ({
      path: `en/dintorni/${page.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
  ];

  const blogRoutes = [
    ...blogPostsIT.posts.map((post) => ({
      path: `blog/${post.slug}`,
      lastmod: post.date || LASTMOD,
      priority: post.date?.startsWith("2026") ? "0.6" : "0.5",
      changefreq: post.date?.startsWith("2026") ? "monthly" : "yearly",
    })),
    ...blogPostsEN.posts.map((post) => ({
      path: `en/blog/${post.slug}`,
      lastmod: post.date || LASTMOD,
      priority: post.date?.startsWith("2026") ? "0.5" : "0.4",
      changefreq: post.date?.startsWith("2026") ? "monthly" : "yearly",
    })),
  ];

  const routes = [
    ...staticRoutes,
    ...dintorniRoutes.filter((route) => !route.path.startsWith("en/")),
    ...blogRoutes.filter((route) => !route.path.startsWith("en/")),
    ...alternateRoutes,
    ...dintorniRoutes.filter((route) => route.path.startsWith("en/")),
    ...blogRoutes.filter((route) => route.path.startsWith("en/")),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .map(buildUrl)
    .join("")}
</urlset>`;
};

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemap());
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
