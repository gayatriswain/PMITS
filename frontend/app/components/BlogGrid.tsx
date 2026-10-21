"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, Search, Sparkles, ShoppingCart, MapPin, Monitor, 
  TrendingUp, Filter, Calendar, Clock, ChevronDown, ChevronLeft, ChevronRight 
} from 'lucide-react';

// --- Dummy Data ---
const CATEGORIES = [
  { id: 'All', label: 'All', icon: Grid },
  { id: 'SEO', label: 'SEO', icon: Search },
  { id: 'AI & GEO', label: 'AI & GEO', icon: Sparkles },
  { id: 'Ecommerce', label: 'Ecommerce', icon: ShoppingCart },
  { id: 'Local SEO', label: 'Local SEO', icon: MapPin },
  { id: 'Web & UX', label: 'Web & UX', icon: Monitor },
  { id: 'Digital Growth', label: 'Digital Growth', icon: TrendingUp },
];

const AUTHORS = {
  sudarshan: { name: 'Sudarshan', role: 'SEO Strategist', avatar: 'https://i.pravatar.cc/150?img=11' },
  akash: { name: 'Akash', role: 'Growth Marketer', avatar: 'https://i.pravatar.cc/150?img=12' },
  kabir: { name: 'Kabir', role: 'Product Designer', avatar: 'https://i.pravatar.cc/150?img=13' },
};

const ALL_ARTICLES = [
  {
    id: 1,
    category: 'AI & GEO',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-20',
    readTime: '6 min read',
    title: 'AI Overviews & Organic Traffic: What the Data Really Shows',
    author: AUTHORS.sudarshan
  },
  {
    id: 2,
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-18',
    readTime: '7 min read',
    title: 'Ecommerce SEO in 2026: 10 Strategies That Actually Work',
    author: AUTHORS.akash
  },
  {
    id: 3,
    category: 'Ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-16',
    readTime: '5 min read',
    title: 'Product Page SEO: The Complete Optimization Checklist',
    author: AUTHORS.kabir
  },
  {
    id: 4,
    category: 'Local SEO',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-14',
    readTime: '6 min read',
    title: 'Local SEO for Ecommerce Brands: Rank Locally, Sell Globally',
    author: AUTHORS.sudarshan
  },
  {
    id: 5,
    category: 'Web & UX',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-12',
    readTime: '8 min read',
    title: 'Core Web Vitals & SEO: The Real Impact on Rankings',
    author: AUTHORS.akash
  },
  {
    id: 6,
    category: 'Digital Growth',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-10',
    readTime: '8 min read',
    title: 'From Traffic to Revenue: Building a Growth System That Scales',
    author: AUTHORS.kabir
  },
  {
    id: 7,
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-08',
    readTime: '7 min read',
    title: 'Google\'s March 2026 Core Update: Key Takeaways for Websites',
    author: AUTHORS.sudarshan
  },
  {
    id: 8,
    category: 'AI & GEO',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-06',
    readTime: '6 min read',
    title: 'GEO vs Traditional SEO: What\'s Different and Why It Matters',
    author: AUTHORS.akash
  },
  // Add a few more to test pagination
  {
    id: 9,
    category: 'Digital Growth',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-04',
    readTime: '5 min read',
    title: 'Scaling Content Production Without Losing Quality',
    author: AUTHORS.kabir
  },
  {
    id: 10,
    category: 'Local SEO',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    date: '2026-05-02',
    readTime: '4 min read',
    title: 'Optimizing Google Business Profiles in 2026',
    author: AUTHORS.sudarshan
  },
  {
    id: 11,
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    date: '2026-04-30',
    readTime: '9 min read',
    title: 'Technical SEO Audit Guide for Enterprise Sites',
    author: AUTHORS.akash
  },
  {
    id: 12,
    category: 'Web & UX',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop',
    date: '2026-04-28',
    readTime: '6 min read',
    title: 'Designing for Conversion: UX Principles That Work',
    author: AUTHORS.kabir
  }
];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest First');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Formatting Date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Filter and Sort Logic
  const filteredArticles = useMemo(() => {
    let result = [...ALL_ARTICLES];
    
    if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }

    if (sortBy === 'Latest First') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return result;
  }, [activeCategory, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1); // reset to page 1 on filter
  };

  return (
    <section className="py-12 lg:py-16 bg-white relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent to-[#14b8a6]/40 w-16"></div>
          <span className="text-[#0f766e] text-[10px] font-extrabold uppercase tracking-widest">
            EXPLORE INSIGHTS BY TOPIC
          </span>
          <div className="h-px bg-gradient-to-l from-transparent to-[#14b8a6]/40 w-16"></div>
        </div>

        {/* Categories & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    isActive 
                    ? 'bg-[#0f2923] text-white border-[#0f2923] shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#14b8a6] hover:text-[#0f766e]'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#14b8a6]' : 'text-slate-400'} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-white text-slate-600 border border-slate-200 hover:border-[#14b8a6] hover:text-[#0f766e] transition-all ml-auto lg:ml-0">
            <Filter size={16} className="text-slate-400" />
            Filter <ChevronDown size={14} className="ml-1" />
          </button>
        </div>

        {/* Title & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-[32px] font-extrabold text-[#0f2923] mb-4">
              {activeCategory === 'All' ? 'All Insights' : `${activeCategory} Insights`}
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              In-depth articles, expert opinions, and practical guides to help your business grow with SEO, AI, and digital strategies.
            </p>
          </div>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-bold py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#14b8a6] cursor-pointer"
              >
                <option value="Latest First">Latest First</option>
                <option value="Oldest First">Oldest First</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence mode="wait">
            {currentArticles.map((article) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                key={article.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_8px_30px_rgba(15,118,110,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Area */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-extrabold text-[#0f766e] uppercase tracking-wider shadow-sm">
                    {article.category}
                  </div>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {article.readTime}
                    </div>
                  </div>

                  <h4 className="text-[15px] font-bold text-[#0f2923] leading-[1.4] mb-6 line-clamp-2 group-hover:text-[#0f766e] transition-colors">
                    {article.title}
                  </h4>

                  {/* Author */}
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-50">
                    <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-[12px] font-extrabold text-slate-700 leading-tight">{article.author.name}</p>
                      <p className="text-[10px] text-slate-500">{article.author.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 text-slate-500 hover:border-[#14b8a6] hover:text-[#0f766e] disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                        isActive 
                        ? 'bg-[#0f766e] text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 text-slate-500 hover:border-[#14b8a6] hover:text-[#0f766e] disabled:opacity-50 disabled:pointer-events-none transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)} of {filteredArticles.length} articles
            </p>
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No articles found for this category.
          </div>
        )}

      </div>
    </section>
  );
}
