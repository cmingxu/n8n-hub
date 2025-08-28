export interface N8nTemplate {
  id: string;
  title: string;
  description: string;
  department: string;
  link: string;
  category: string;
  isEditorPick?: boolean;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  downloadCount?: number;
  rating?: number;
  thumbnail?: string;
  workflow: any; // n8n workflow configuration
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