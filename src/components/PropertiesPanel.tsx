import React from 'react';
import { useStore } from '../store/useStore';
import { Box, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { cn } from '../utils/cn';

const PropertiesPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement, deleteElement, saveState } = useStore();

  const element = elements.find(el => el.id === selectedElementId);

  if (!element) {
    return (
      <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200/50 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 gap-6 transition-colors">
        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
          <Box size={32} strokeWidth={1} />
        </div>
        <p className="text-[13px] font-medium leading-relaxed max-w-[160px]">Select an element on the canvas to edit its properties</p>
      </aside>
    );
  }

  const handleStyleChange = (key: string, value: any) => {
    saveState();
    updateElement(element.id, {
      style: {
        ...element.style,
        [key]: value
      }
    });
  };

  const handleContentChange = (content: string) => {
    saveState();
    updateElement(element.id, { content });
  };

  const handleAttributeChange = (key: string, value: string) => {
    saveState();
    updateElement(element.id, {
      attributes: {
        ...element.attributes,
        [key]: value
      }
    });
  };

  const handleInnerHTMLChange = (html: string) => {
    saveState();
    updateElement(element.id, { innerHTML: html });
  };

  return (
    <aside className="w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200/60 dark:border-slate-800 flex flex-col z-20 overflow-hidden transition-colors">
      {/* Panel Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
            <Box size={18} />
          </div>
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-100 uppercase tracking-[0.1em]">
            {element.name || element.tag}
          </h2>
        </div>
        <button
          onClick={() => deleteElement(element.id)}
          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all active:scale-95"
          title="Delete element"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 content-scrollbar">
        {/* Type Specific Content */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] block">Content</label>
          
          {/* Support for normal text content */}
          {element.tag !== 'img' && !element.innerHTML && (
            <textarea
              value={element.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[13px] font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none dark:text-slate-200 shadow-sm"
              rows={4}
            />
          )}

          {/* Support for Image Sources */}
          {element.tag === 'img' && (
            <div className="space-y-4">
               <div>
                <span className="text-[11px] text-slate-400 mb-2 block font-medium">Image Source URL</span>
                <input
                  type="text"
                  value={element.attributes?.src || ''}
                  onChange={(e) => handleAttributeChange('src', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[13px] focus:border-indigo-500 outline-none transition-all dark:text-slate-200 shadow-sm"
                  placeholder="https://..."
                />
               </div>
            </div>
          )}

          {/* Support for Elements with innerHTML (like Avatars) */}
          {element.innerHTML && (
             <div className="space-y-2">
                <span className="text-[11px] text-slate-400 mb-2 block font-medium">Element HTML Code</span>
                <textarea
                  value={element.innerHTML}
                  onChange={(e) => handleInnerHTMLChange(e.target.value)}
                  className="w-full px-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[12px] font-mono leading-relaxed focus:border-indigo-500 transition-all outline-none resize-none dark:text-slate-200 shadow-sm"
                  rows={6}
                />
             </div>
          )}
        </div>

        {/* Font Properties */}
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] block">Typography</label>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Size</span>
              <input
                type="number"
                value={parseInt(element.style.fontSize || '16')}
                onChange={(e) => handleStyleChange('fontSize', e.target.value + 'px')}
                className="w-20 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-center outline-none dark:text-slate-200 shadow-sm focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Weight</span>
              <div className="relative">
                <select
                  value={element.style.fontWeight || 'normal'}
                  onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                  className="w-40 appearance-none px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium outline-none dark:text-slate-200 shadow-sm cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <option value="300">Light</option>
                  <option value="400">Normal</option>
                  <option value="500">Medium</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              {[
                { id: 'left', icon: <AlignLeft size={16} /> },
                { id: 'center', icon: <AlignCenter size={16} /> },
                { id: 'right', icon: <AlignRight size={16} /> }
              ].map((align) => (
                <button
                  key={align.id}
                  onClick={() => handleStyleChange('textAlign', align.id)}
                  className={cn(
                    "flex-1 flex justify-center py-2 rounded-lg transition-all",
                    element.style.textAlign === align.id 
                      ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shadow-inner" 
                      : "text-slate-300 dark:text-slate-600 hover:text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {align.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colors & Effects */}
        <div className="space-y-6">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] block">Visuals</label>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Text Color</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-300 dark:text-slate-600 font-mono tracking-wider">{(element.style.color || '#000000').toUpperCase()}</span>
                <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 group">
                    <input
                      type="color"
                      value={element.style.color || '#000000'}
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -translate-x-[15%] -translate-y-[15%] cursor-pointer"
                    />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Background</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-300 dark:text-slate-600 font-mono tracking-wider">{(element.style.backgroundColor || '#FFFFFF').toUpperCase()}</span>
                <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 group">
                    <input
                      type="color"
                      value={element.style.backgroundColor || '#ffffff'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -translate-x-[15%] -translate-y-[15%] cursor-pointer"
                    />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-end">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Border Radius</span>
                <span className="text-sm font-bold text-indigo-500 tracking-tighter">{element.style.borderRadius || '0px'}</span>
              </div>
              <input
                type="range" min="0" max="100"
                value={parseInt(element.style.borderRadius || '0')}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value + 'px')}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
