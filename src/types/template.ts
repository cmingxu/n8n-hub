export interface N8nTemplate {
  id: string;
  title: string;
  description: string;
  department: string;
  link: string;
  category: string;
  editorsPick?: boolean;
  featured?: boolean;
  tags?: string[];
  difficulty?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  downloadCount?: number;
  rating?: number;
  thumbnail?: string;
  workflow?: unknown; // n8n workflow configuration (optional)
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  templates: N8nTemplate[];
}

export interface TemplateData {
  categories: TemplateCategory[];
  editorPicks: N8nTemplate[];
  totalTemplates: number;
  lastUpdated: string;
}