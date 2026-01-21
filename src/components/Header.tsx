import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Undo2, Redo2, Eye, Save, Download, FileJson, Moon, Sun } from 'lucide-react';
import { exportToHTML } from '../utils/export';
import { cn } from '../utils/cn';
import CopilotButton from './CopilotButton';
import ProfileSection from './ProfileSection';

interface HeaderProps {
  onPreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPreview }) => {
  const { undo, redo, undoStack, redoStack, elements } = useStore();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleExport = () => {
    exportToHTML(elements);
  };

  return (
    <header className={cn(
      "h-16 px-6 flex items-center justify-between z-30 transition-all duration-300 border-b",
      scrolled 
        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm"
        : "bg-white dark:bg-slate-900 border-transparent"
    )}>
      <div className="flex items-center">
        <span className="font-display font-semibold text-xl text-slate-900 dark:text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">
          web<span className="text-indigo-600 dark:text-indigo-400">builder</span>
        </span>
      </div>

      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        <button 
          onClick={undo}
          disabled={undoStack.length === 0}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md rounded-xl transition-all disabled:opacity-30 disabled:scale-100 dark:text-slate-300 active:scale-90"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button 
          onClick={redo}
          disabled={redoStack.length === 0}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md rounded-xl transition-all disabled:opacity-30 disabled:scale-100 dark:text-slate-300 active:scale-90"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <button 
          onClick={onPreview}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md rounded-xl transition-all dark:text-slate-300 active:scale-90"
          title="Preview (Eye)"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 text-slate-500 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:rotate-12"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="hidden md:flex items-center gap-2 pr-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95">
            <Save size={16} />
            Save
          </button>
          <button 
            onClick={() => {
              const data = JSON.stringify({ elements }, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'project.json';
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            <FileJson size={16} />
            JSON
          </button>
        </div>

        <CopilotButton />

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <ProfileSection />

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 rounded-xl transition-all active:scale-95 ml-2"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
