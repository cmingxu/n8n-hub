import { TemplateData, TemplateCategory, N8nTemplate } from '@/types/template';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

interface TemplateFileData {
  category: CategoryData;
  templates: N8nTemplate[];
}

export async function getTemplateData(): Promise<TemplateData> {
  const automationData: { default: TemplateFileData } = await import('@/data/templates/automation.json');
  const marketingData: { default: TemplateFileData } = await import('@/data/templates/marketing.json');
  const dataProcessingData: { default: TemplateFileData } = await import('@/data/templates/data-processing.json');

  // Import all template data with proper typing
  const templateFiles = [
    automationData.default,
    marketingData.default,
    dataProcessingData.default,
  ];

  // Aggregate all templates and categories
  const categories: TemplateCategory[] = [];
  const allTemplates: N8nTemplate[] = [];
  const editorPicks: N8nTemplate[] = [];

  templateFiles.forEach(file => {
    const { category, templates } = file;
    
    // Create category with templates
    const categoryWithTemplates: TemplateCategory = {
      ...category,
      templates: templates
    };
    
    categories.push(categoryWithTemplates);
    allTemplates.push(...templates);
    
    // Filter editor picks
    const picks = templates.filter(template => template.editorsPick);
    editorPicks.push(...picks);
  });

  return {
    categories,
    editorPicks,
    totalTemplates: allTemplates.length,
    lastUpdated: new Date().toISOString()
  };
}

export function searchTemplates(templates: N8nTemplate[], query: string): N8nTemplate[] {
  if (!query.trim()) return templates;
  
  const searchTerm = query.toLowerCase();
  return templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm) ||
    template.description.toLowerCase().includes(searchTerm) ||
    template.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    template.category.toLowerCase().includes(searchTerm)
  );
}

export function filterTemplatesByCategory(templates: N8nTemplate[], categoryId: string): N8nTemplate[] {
  return templates.filter(template => template.category === categoryId);
}