import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FrameworksSection } from "@/components/landing/FrameworksSection";
import { CTASection } from "@/components/landing/CTASection";
import { Wordmark } from "@/components/Wordmark";

const footerCols = [
  {
    title: "Product",
    links: ["Features", "Frameworks", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Developers",
    links: ["Documentation", "API Reference", "CLI", "Self-hosting", "GitHub"],
  },
  {
    title: "Community",
    links: ["Discord", "Contributors", "Discussions", "Security", "Blog"],
  },
];

export default function HomePage() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FrameworksSection />
      <CTASection />

      <footer className="border-t border-gray-100 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="col-span-2">
              <Wordmark size={28} fontSize={17} variant="dark" />
              <p className="text-sm text-gray-500 mt-4 max-w-xs leading-relaxed">
                Open-source compliance intelligence. Read your codebase, find the
                gaps, ship the fixes.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <a
                  href="#"
                  aria-label="View on GitHub"
                  className="inline-flex items-center justify-center w-9 h-9 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {footerCols.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-14 pt-6 border-t border-gray-200 text-sm text-gray-400">
            <span className="font-mono-accent text-xs">© {new Date().getFullYear()} Project June · MIT License</span>
            <span className="flex items-center gap-1.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
