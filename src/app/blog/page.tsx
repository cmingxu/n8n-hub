'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Sample blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Getting Started with n8n Hub Resources',
    excerpt: 'Learn how to use and customize n8n workflows, templates, and tools to automate your processes efficiently.',
    content: 'Full blog post content would go here...',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    tags: ['beginner', 'automation', 'workflow'],
    featured: true,
    image: '/api/placeholder/600/300'
  },
  {
    id: '2',
    title: 'Top 10 Marketing Automation Resources',
    excerpt: 'Discover the most popular marketing automation workflows and tools that can transform your campaigns.',
    content: 'Full blog post content would go here...',
    author: 'Mike Chen',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    category: 'Marketing',
    tags: ['marketing', 'templates', 'productivity'],
    featured: false,
    image: '/api/placeholder/600/300'
  },
  {
    id: '3',
    title: 'Advanced Data Processing with n8n: Best Practices',
    excerpt: 'Master advanced data processing techniques in n8n. Learn how to handle complex data transformations and integrations efficiently.',
    content: 'Full blog post content would go here...',
    author: 'Alex Rodriguez',
    publishedAt: '2024-01-10',
    readTime: '12 min read',
    category: 'Advanced',
    tags: ['data-processing', 'advanced', 'best-practices'],
    featured: true,
    image: '/api/placeholder/600/300'
  },
  {
    id: '4',
    title: 'Building Custom n8n Nodes: A Developer\'s Guide',
    excerpt: 'Learn how to create custom nodes for n8n to extend its functionality and integrate with any service or API.',
    content: 'Full blog post content would go here...',
    author: 'Emma Wilson',
    publishedAt: '2024-01-08',
    readTime: '15 min read',
    category: 'Development',
    tags: ['development', 'custom-nodes', 'api'],
    featured: false,
    image: '/api/placeholder/600/300'
  },
  {
    id: '5',
    title: 'n8n vs Zapier: Which Automation Tool is Right for You?',
    excerpt: 'A comprehensive comparison between n8n and Zapier, helping you choose the best automation platform for your needs.',
    content: 'Full blog post content would go here...',
    author: 'David Kim',
    publishedAt: '2024-01-05',
    readTime: '10 min read',
    category: 'Comparison',
    tags: ['comparison', 'zapier', 'automation-tools'],
    featured: false,
    image: '/api/placeholder/600/300'
  },
  {
    id: '6',
    title: 'Scaling n8n: Performance Tips for Large Workflows',
    excerpt: 'Optimize your n8n workflows for better performance and scalability. Learn advanced techniques for handling large-scale automations.',
    content: 'Full blog post content would go here...',
    author: 'Lisa Zhang',
    publishedAt: '2024-01-03',
    readTime: '9 min read',
    category: 'Performance',
    tags: ['performance', 'scaling', 'optimization'],
    featured: false,
    image: '/api/placeholder/600/300'
  }
];

const categories = ['All', 'Tutorial', 'Marketing', 'Advanced', 'Development', 'Comparison', 'Performance'];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              n8n Hub
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Insights, tutorials, and best practices for n8n workflows, templates, and automation tools
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'All' && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-r from-gray-400 to-gray-600 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}