import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fadhi Ku Dirir — The Somali Debate Platform",
  description: "Watch live debates, vote for your side, and decide who wins. Fadhi Ku Dirir — Endless Ideas & Dialogue.",
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Fadhi Ku Dirir" width={40} height={40} className="rounded" />
            <span className="font-serif text-forest font-bold text-lg hidden sm:block">
              FADHI KU DIRIR
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-charcoal/70 hover:text-forest transition-colors text-sm font-medium">
              Guriga
            </Link>
            <Link href="/debate/live-1" className="text-charcoal/70 hover:text-forest transition-colors text-sm font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-live-pulse" />
              Live
            </Link>
            <Link href="/archive" className="text-charcoal/70 hover:text-forest transition-colors text-sm font-medium">
              Kaydka
            </Link>
            <Link
              href="/debate/live-1"
              className="bg-forest text-cream px-4 py-2 rounded-full text-sm font-semibold hover:bg-forest-light transition-colors hidden sm:block"
            >
              Ku Biir
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpg" alt="Fadhi Ku Dirir" width={48} height={48} className="rounded brightness-110" />
              <div>
                <h3 className="font-serif font-bold text-lg">FADHI KU DIRIR</h3>
                <p className="text-cream/60 text-xs">Debate Platform | Endless Ideas & Dialogue</p>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Madal Soomaali ah oo dood toos ah lagu daawado, lagu codeyn karo, laguna go&apos;aamiyo.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-semibold mb-4 text-gold">Xiriiriyaha</h4>
            <div className="flex gap-4">
              {[
                { name: "YouTube", icon: "▶" },
                { name: "Facebook", icon: "f" },
                { name: "TikTok", icon: "♪" },
                { name: "Twitter", icon: "𝕏" },
              ].map((social) => (
                <span
                  key={social.name}
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold/30 flex items-center justify-center cursor-pointer transition-colors text-sm"
                  title={social.name}
                >
                  {social.icon}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-serif font-semibold mb-4 text-gold">Bogagga</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-cream/70 hover:text-cream transition-colors">Guriga</Link>
              <Link href="/debate/live-1" className="block text-cream/70 hover:text-cream transition-colors">Dood Toos ah</Link>
              <Link href="/archive" className="block text-cream/70 hover:text-cream transition-colors">Kaydka Doodaha</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-8 pt-8 text-center text-cream/40 text-xs">
          © 2026 Fadhi Ku Dirir. Dhammaan xuquuqda waa la ilaaliyey.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="so">
      <body className="font-sans antialiased bg-cream text-charcoal">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
