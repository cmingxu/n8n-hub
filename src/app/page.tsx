'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TemplateGrid } from '@/components/TemplateGrid';
import { getTemplateData, searchTemplates } from '@/lib/templates';
import { TemplateData, TemplateCategory, N8nTemplate } from '@/types/template';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData | null>(null);
  
  useEffect(() => {
    getTemplateData().then(setTemplateData);
  }, []);
  
  if (!templateData) {
    return <div>Loading...</div>;
  }
  
  // Get all templates from all categories
  const allTemplates = templateData.categories.flatMap((cat: TemplateCategory) => cat.templates);
  
  // Filter templates based on search and category
  let filteredResources = allTemplates;
  if (searchQuery.trim()) {
    filteredResources = searchTemplates(filteredResources, searchQuery);
  }
  if (selectedCategory) {
    filteredResources = filteredResources.filter((template: N8nTemplate) => template.category === selectedCategory);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection 
        totalTemplates={templateData.totalTemplates}
        editorPicksCount={templateData.editorPicks.length}
      />

      {/* Editor's Picks Section */}
      {templateData.editorPicks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TemplateGrid
              templates={templateData.editorPicks}
              title="Editor's Picks"
              subtitle="Hand-selected templates that showcase the best of n8n automation"
              showCategory={true}
            />
          </div>
        </section>
      )}

      {/* Main Templates Section */}
      <section id="templates" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore All Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find the perfect workflows, templates, and tools for your automation needs
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
              onSearch={setSearchQuery}
            />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <CategoryFilter
              categories={templateData.categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Results */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {searchQuery ? (
                  <>Search Results for &quot;{searchQuery}&quot;</>
                ) : selectedCategory ? (
                  <>Resources in {templateData.categories.find((cat: TemplateCategory) => cat.id === selectedCategory)?.name}</>
                ) : (
                  <>All Resources</>
                )}
              </h3>
              <span className="text-gray-600">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {/* Template Grid */}
          <TemplateGrid
            templates={filteredResources}
            showCategory={!selectedCategory}
          />
        </div>
      </section>
    </div>
  );
}
