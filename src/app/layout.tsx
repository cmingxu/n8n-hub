import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import Link from "next/link";
import { Github, Workflow, BookOpen } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "n8n Hub - Workflows, Templates & Tools",
  description: "Discover and explore a curated collection of powerful n8n workflows, automation templates, and productivity tools. From simple integrations to complex business processes, find the perfect resources for your automation needs.",
  keywords: "n8n, automation, workflows, templates, tools, integration, no-code, low-code, resources",
  authors: [{ name: "n8n Community" }],
  openGraph: {
    title: "n8n Hub - Workflows & Tools",
    description: "Curated collection of n8n workflows, templates, and automation tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Awesome n8n Hub
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Browse
                </Link>
                <Link 
                  href="/blog" 
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Link>
                <a 
                  href="https://github.com/n8n-io/n8n" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-700 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl">n8n Hub</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  A curated collection of powerful n8n workflows, templates, and tools to streamline your automation and boost productivity.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/n8n-io/n8n" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">All Templates</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">n8n.io</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="hover:text-white transition-colors cursor-pointer">Automation</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">Marketing</span></li>
                  <li><span className="hover:text-white transition-colors cursor-pointer">Data Processing</span></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Awesome n8n Templates. Built with ❤️ for the n8n community.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
