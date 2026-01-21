import React from 'react';
import { useStore } from '../store/useStore';
import { Undo2, Redo2, Eye, Save, Download, FileJson } from 'lucide-react';
import { exportToHTML } from '../utils/export';

interface HeaderProps {
  onPreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPreview }) => {
  const { undo, redo, undoStack, redoStack, elements } = useStore();

  const handleExport = () => {
    exportToHTML(elements);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
        <span className="font-bold text-slate-800 tracking-tight">WebBuilder</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
        <button 
          onClick={undo}
          disabled={undoStack.length === 0}
          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={18} />
        </button>
        <button 
          onClick={redo}
          disabled={redoStack.length === 0}
          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-30"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={18} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button 
          onClick={onPreview}
          className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
          title="Preview (Eye)"
        >
          <Eye size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
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
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-all border border-slate-200"
        >
          <FileJson size={16} />
          JSON
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-sm"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </header>
  );
};

export default Header;
