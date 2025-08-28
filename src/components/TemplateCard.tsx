'use client';

import { N8nTemplate } from '@/types/template';
import { cn, formatNumber, getDifficultyColor, getRatingStars } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Star, Tag, User, Calendar } from 'lucide-react';
import Link from 'next/link';

interface TemplateCardProps {
  template: N8nTemplate;
  className?: string;
  showCategory?: boolean;
}

export function TemplateCard({ template, className, showCategory = false }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100",
        className
      )}
    >
      {/* Editor's Pick Badge */}
      {template.editorsPick && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Editor&apos;s Pick
          </div>
        </div>
      )}

      {/* Header with gradient background */}
      <div className="h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-yellow-200 transition-colors">
            {template.title}
          </h3>
        </div>
        
        {/* Floating shapes for visual appeal */}
        <div className="absolute top-2 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-8 right-2 w-8 h-8 bg-white/20 rounded-full" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and Difficulty */}
        <div className="flex items-center justify-between mb-3">
          {showCategory && (
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {template.category}
            </span>
          )}
          {template.difficulty && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getDifficultyColor(template.difficulty)
            )}>
              {template.difficulty}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {template.description}
        </p>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{template.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {template.downloadCount && (
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{formatNumber(template.downloadCount)}</span>
              </div>
            )}
            {template.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">{getRatingStars(template.rating)}</span>
                <span>({template.rating})</span>
              </div>
            )}
          </div>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          {template.author && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{template.author}</span>
            </div>
          )}
          {template.createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(template.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Department */}
        <div className="text-sm text-gray-600 mb-4 font-medium">
          {template.department}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={template.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View Template
          </Link>
          <Link
            href={`/templates/${template.id}`}
            className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-50"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}