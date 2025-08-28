'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Code, Workflow } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  totalTemplates: number;
  editorPicksCount: number;
}

export function HeroSection({ totalTemplates, editorPicksCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-lg mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>Curated Workflows & Tools Hub</span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="text-gray-800">n8n</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Hub
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover powerful workflows, templates, and tools to streamline your automation.
            From simple integrations to complex business processes and productivity tools.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Workflow className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{totalTemplates}+</div>
                  <div className="text-sm text-gray-600">Resources</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{editorPicksCount}</div>
                  <div className="text-sm text-gray-600">Featured</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Free</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#templates"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Browse Resources</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/start-building"
              className="group bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Workflow className="w-5 h-5" />
              <span>Start Building</span>
            </Link>

            <Link
              href="/blog"
              className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <Code className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center"
        >
          <Workflow className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl shadow-lg flex items-center justify-center"
        >
          <Zap className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </section>
  );
}