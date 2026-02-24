import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Loader, Terminal, Box } from 'lucide-react';
import NavigationHeader from '../components/NavigationHeader';
import { useStore } from '../store/useStore';
import { useProjectStore } from '../store/useProjectStore';
import { templates } from '../data/templates';
import { cn } from '../utils/cn';

export default function Dashboard() {
    const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setElements } = useStore();
    const { createProject, saveProjectElements } = useProjectStore();

    const applyTemplate = async (template: any) => {
        setLoadingTemplateId(template.id);
        try {
            // Premium internal feel
            await new Promise(resolve => setTimeout(resolve, 800));

            // Create project structure
            const projectId = createProject(
                `${template.title} Draft`, 
                `New project initialized from ${template.title}`
            );

            const processedElements = template.elements.map((el: any) => ({
                id: crypto.randomUUID(),
                type: el.type,
                name: el.type.charAt(0).toUpperCase() + el.type.slice(1),
                tag: el.tag,
                innerHTML: el.innerHTML,
                style: el.style || {},
                content: (el as any).content || ""
            }));

            // Sync stores
            saveProjectElements(projectId, processedElements as any);
            setElements(processedElements as any);

            // Smooth transition
            setTimeout(() => navigate('/builder'), 200);
        } catch (error) {
            console.error('Template application failed:', error);
            setLoadingTemplateId(null);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
            <NavigationHeader />

            <main className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-20">

                {/* Minimal Hero */}
                <div className="mb-24 md:mb-32 max-w-4xl">


                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-8"
                    >
                        Build the <br />
                        <span className="text-slate-400 dark:text-slate-600">Impossible.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-md leading-relaxed"
                    >
                        A curated collection of modern interfaces.
                        <br />
                        Production-ready. pixel-perfect.
                    </motion.p>
                </div>

                {/* Minimal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {templates.map((template, idx) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => applyTemplate(template)}
                        >
                            {/* Card Image - "Window" Style */}
                            <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 mb-6 overflow-hidden border border-slate-200 dark:border-slate-800 group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-colors duration-300">
                                {/* Browser Dots Minimal */}
                                <div className="absolute top-4 left-4 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 rounded-full bg-slate-400/50" />
                                    <div className="w-2 h-2 rounded-full bg-slate-400/50" />
                                    <div className="w-2 h-2 rounded-full bg-slate-400/50" />
                                </div>

                                <div className="w-full h-full relative">
                                    <img
                                        src={template.image}
                                        alt={template.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.22, 1, 0.36, 1] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Hover Button */}
                                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        {loadingTemplateId === template.id ? 'Loading...' : 'Select'}
                                        <ArrowUpRight size={12} />
                                    </div>
                                </div>
                            </div>

                            {/* Minimal Metadata */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-medium mb-1 group-hover:underline underline-offset-4 decoration-1 decoration-slate-300 dark:decoration-slate-700">
                                        {template.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 font-mono">
                                        <span>{template.category}</span>
                                        <span className="opacity-30">/</span>
                                        <span>v1.0</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                                        {template.designer}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Code Block */}
                <div className="mt-32 pt-8 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                        <Terminal size={12} />
                        <span>READY TO DEPLOY</span>
                    </div>
                    <div>
                        {(new Date()).getFullYear()} © INC.
                    </div>
                </div>

            </main>
        </div>
    );
}
