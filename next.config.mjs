/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDevelopment = process.env.NODE_ENV === "development";
const CSP = [
  "default-src 'self'",
  // App Router needs inline scripts; eval is allowed only for React dev diagnostics.
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  // Styles : inline styles utilisés par Framer Motion / GSAP / Tailwind
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts
  "font-src 'self' https://fonts.gstatic.com",
  // Images : domaines utilisés + data URIs pour les placeholders SVG
  "img-src 'self' data: blob: https://images.unsplash.com https://cdn.midjourney.com https://maps.googleapis.com https://maps.gstatic.com https://d2ol7oe51mr4n9.cloudfront.net",
  // Connexions fetch/XHR : API routes + Google Maps API
  "connect-src 'self' https://maps.googleapis.com",
  // Frames : Google Maps embed uniquement
  "frame-src https://www.google.com https://maps.google.com",
  // Médias : CDN SEWT temporaire autorisé exclusivement pour le Hero Preview (Higgsfield).
  "media-src 'self' https://d2ol7oe51mr4n9.cloudfront.net",
  // Workers (Lenis / GSAP n'en utilisent pas)
  "worker-src 'none'",
  // Formulaires
  "form-action 'self'",
  // Objets (Flash, etc.)
  "object-src 'none'",
  // Base URI
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  // Anti-clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Empêche le MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Référent limité aux same-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS — 1 an, includeSubDomains
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Permissions : désactive micro, caméra, géoloc, paiement par défaut
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // CSP
  { key: "Content-Security-Policy", value: CSP },
  // Supprime la signature serveur (déjà fait via poweredByHeader: false)
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.midjourney.com", pathname: "/**" },
    ],
  },
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
  },
  async headers() {
    return [
      // Security headers sur toutes les routes HTML
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache long sur les assets statiques
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|woff2)",
        locale: false,
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
