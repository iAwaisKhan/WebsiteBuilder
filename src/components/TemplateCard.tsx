import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { Template } from '../data/templates';

interface TemplateCardProps {
    template: Template;
    isLoading: boolean;
    onApply: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isLoading, onApply }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "group relative flex flex-col gap-5 cursor-pointer",
                "col-span-1" // Force single column in grid
            )}
            onClick={() => onApply(template)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[3/2] w-full grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700">
                <img
                    src={template.image}
                    alt={template.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Minimal Overlay - Only darkens slightly */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Floating Action Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center text-black dark:text-white shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <ArrowUpRight size={18} />
                    )}
                </div>

                {/* Category Tag - Bottom Left */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-black dark:text-white">
                        {template.category}
                    </span>
                </div>
            </div>

            {/* Minimal Content */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white leading-tight">
                        {template.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">
                        {template.designer}
                    </span>
                </div>
                {/* Description shows on plain text below */}
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0">
                    {template.description}
                </p>
                {/* Line separator for structure */}
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </motion.div>
    );
};
