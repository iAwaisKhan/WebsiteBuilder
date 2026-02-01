import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { TemplateCard } from '../components/TemplateCard';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import { templates as allTemplates, Template } from '../data/templates';

const categories = ['All', 'Portfolio', 'E-commerce', 'SaaS', 'Agency', 'Personal'];

export default function Templates() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setElements } = useStore();

    const applyTemplate = async (template: Template) => {
        setLoadingTemplateId(template.id);

        try {
            // Simulate slight delay for better UX feedback & image loading
            await new Promise(resolve => setTimeout(resolve, 600));

            const processedElements = template.elements.map((el) => ({
                ...el,
                id: el.id || crypto.randomUUID(),
                style: el.style || {}
            }));

            setElements(processedElements);

            setTimeout(() => {
                navigate('/builder');
            }, 300);
        } catch (error) {
            console.error('Error applying template:', error);
            setLoadingTemplateId(null);
        }
    };

    // Memoize filtered results for performance
    const filteredTemplates = useMemo(() => {
        return allTemplates.filter(template => {
            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
            const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505]">
            <NavigationHeader />

            <main className="flex-1 flex flex-col pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 dark:text-white mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Library
                        </motion.h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg">
                            Curated collection of premium digital templates.
                        </p>
                    </div>

                    {/* Minimal Search - Underline Style */}
                    <div className="w-full md:w-80 group">
                        <div className="relative border-b border-slate-200 dark:border-slate-800 group-focus-within:border-slate-900 dark:group-focus-within:border-white transition-colors duration-300">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-4 py-3 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Minimal Filters - Tab Style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-16 border-b border-slate-100 dark:border-slate-900 pb-1"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "text-sm pb-4 -mb-px px-1 font-medium transition-all relative",
                                selectedCategory === category
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                            )}
                        >
                            {category}
                            {selectedCategory === category && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-slate-900 dark:bg-white"
                                />
                            )}
                        </button>
                    ))}

                    <div className="ml-auto md:block hidden">
                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Filter size={14} />
                            Filters
                        </button>
                    </div>
                </motion.div>

                {/* Minimal Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                isLoading={loadingTemplateId === template.id}
                                onApply={applyTemplate}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredTemplates.length === 0 && (
                    <div className="py-32 text-center opacity-60">
                        <p className="text-xl font-serif italic text-slate-900 dark:text-white">NO ARCHIVES FOUND</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-xs font-bold uppercase tracking-widest border-b border-slate-900 dark:border-white pb-1"
                        >
                            CLEAR SEARCH
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
