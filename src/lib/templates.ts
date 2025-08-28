import { TemplateData, TemplateCategory, N8nTemplate } from '@/types/template';
import automationData from '@/data/templates/automation.json';
import marketingData from '@/data/templates/marketing.json';
import dataProcessingData from '@/data/templates/data-processing.json';

// Import all template data with proper typing
const templateFiles = [
  automationData as { category: any; templates: N8nTemplate[] },
  marketingData as { category: any; templates: N8nTemplate[] },
  dataProcessingData as { category: any; templates: N8nTemplate[] },
];

// Aggregate all templates and categories
export function getAllTemplateData(): TemplateData {
  const categories: TemplateCategory[] = [];
  const allTemplates: N8nTemplate[] = [];
  const editorPicks: N8nTemplate[] = [];

  templateFiles.forEach((file) => {
    const category: TemplateCategory = {
      ...file.category,
      templates: file.templates,
    };
    
    categories.push(category);
    allTemplates.push(...file.templates);
    
    // Collect editor picks
    const picks = file.templates.filter((template) => template.isEditorPick);
    editorPicks.push(...picks);
  });

  return {
    categories,
    editorPicks,
    totalTemplates: allTemplates.length,
    lastUpdated: new Date().toISOString(),
  };
}

// Get templates by category
export function getTemplatesByCategory(categoryId: string): N8nTemplate[] {
  const data = getAllTemplateData();
  const category = data.categories.find(cat => cat.id === categoryId);
  return category?.templates || [];
}

// Get single template by ID
export function getTemplateById(templateId: string): N8nTemplate | null {
  const data = getAllTemplateData();
  for (const category of data.categories) {
    const template = category.templates.find(t => t.id === templateId);
    if (template) return template;
  }
  return null;
}

// Search templates
export function searchTemplates(query: string): N8nTemplate[] {
  const data = getAllTemplateData();
  const searchTerm = query.toLowerCase();
  const results: N8nTemplate[] = [];

  data.categories.forEach(category => {
    category.templates.forEach(template => {
      const matchesTitle = template.title.toLowerCase().includes(searchTerm);
      const matchesDescription = template.description.toLowerCase().includes(searchTerm);
      const matchesTags = template.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      const matchesDepartment = template.department.toLowerCase().includes(searchTerm);

      if (matchesTitle || matchesDescription || matchesTags || matchesDepartment) {
        results.push(template);
      }
    });
  });

  return results;
}

// Get popular templates (sorted by download count)
export function getPopularTemplates(limit: number = 6): N8nTemplate[] {
  const data = getAllTemplateData();
  const allTemplates: N8nTemplate[] = [];
  
  data.categories.forEach(category => {
    allTemplates.push(...category.templates);
  });

  return allTemplates
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, limit);
}