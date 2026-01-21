import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Undo2, Redo2, Eye, Save, Download, FileJson, Moon, Sun } from 'lucide-react';
import { exportToHTML } from '../utils/export';
import { cn } from '../utils/cn';
import CopilotButton from './CopilotButton';

interface HeaderProps {
  onPreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPreview }) => {
  const { undo, redo, undoStack, redoStack, elements } = useStore();
  const [isDark, setIsDark] = useState(false);

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
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between z-30 shadow-sm transition-colors">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg">W</div>
        <span className="font-bold text-slate-800 dark:text-white tracking-tight">WebBuilder</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        <button 
          onClick={undo}
          disabled={undoStack.length === 0}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all disabled:opacity-30 dark:text-slate-300"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button 
          onClick={redo}
          disabled={redoStack.length === 0}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all disabled:opacity-30 dark:text-slate-300"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <button 
          onClick={onPreview}
          className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all dark:text-slate-300"
          title="Preview (Eye)"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
        >
          {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>
        
        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
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
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all border border-slate-200 dark:border-slate-700"
        >
          <FileJson size={16} />
          JSON
        </button>

        <CopilotButton />

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-md shadow-indigo-100"
        >
          <Download size={16} />
          <span>Export Site</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
