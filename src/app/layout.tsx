import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipShelf - Your Digital Cinema",
  description: "Discover, organize, and enjoy your personal collection of cinematic masterpieces with ClipShelf, the modern video library management system.",
  keywords: ["video library", "cinema", "movies", "streaming", "collection", "management"],
  authors: [{ name: "ClipShelf Team" }],
  creator: "ClipShelf",
  publisher: "ClipShelf",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clipshelf.com"),
  openGraph: {
    title: "ClipShelf - Your Digital Cinema",
    description: "Discover, organize, and enjoy your personal collection of cinematic masterpieces.",
    url: "https://clipshelf.com",
    siteName: "ClipShelf",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClipShelf - Your Digital Cinema",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipShelf - Your Digital Cinema",
    description: "Discover, organize, and enjoy your personal collection of cinematic masterpieces.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="relative min-h-screen bg-background-primary text-foreground-primary">
          {/* Background Pattern */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="relative z-10 mt-20 border-t border-white/10 bg-background-elevated/30 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold gradient-text">ClipShelf</span>
                  </div>
                  <p className="text-sm text-foreground-secondary">
                    Your personal digital cinema for organizing and enjoying your video collection.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground-primary mb-4">Features</h3>
                  <ul className="space-y-2 text-sm text-foreground-secondary">
                    <li>Video Library Management</li>
                    <li>Smart Collections</li>
                    <li>Advanced Search</li>
                    <li>Multiple View Modes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground-primary mb-4">Support</h3>
                  <ul className="space-y-2 text-sm text-foreground-secondary">
                    <li>Documentation</li>
                    <li>Help Center</li>
                    <li>Contact Us</li>
                    <li>Community</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground-primary mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm text-foreground-secondary">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Cookie Policy</li>
                    <li>GDPR</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-foreground-secondary">
                  © 2024 ClipShelf. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                  <span>Made with ❤️ for movie lovers</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
