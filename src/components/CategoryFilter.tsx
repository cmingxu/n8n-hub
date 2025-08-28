'use client';

import { TemplateCategory } from '@/types/template';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Grid, Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: TemplateCategory[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className 
}: CategoryFilterProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <Filter className="w-5 h-5" />
        <span>Categories</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(null)}
          className={cn(
            "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2",
            selectedCategory === null
              ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
          )}
        >
          <Grid className="w-4 h-4" />
          All Resources
        </motion.button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 relative overflow-hidden",
                isSelected
                  ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
              )}
            >
              {/* Category Icon */}
              <span className="text-base">{category.icon}</span>
              
              {/* Category Name */}
              <span>{category.name}</span>
              
              {/* Template Count */}
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold",
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-600"
              )}>
                {category.templates.length}
              </span>
              
              {/* Animated background for selected state */}
              {isSelected && (
                <motion.div
                  layoutId="categoryBackground"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 -z-10"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Selected Category Description */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-orange-100"
        >
          {(() => {
            const category = categories.find(cat => cat.id === selectedCategory);
            return category ? (
              <div className="flex items-start gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
            ) : null;
          })()
          }
        </motion.div>
      )}
    </div>
  );
}