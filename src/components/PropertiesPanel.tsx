import React from 'react';
import { useStore } from '../store/useStore';
import { Settings, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { cn } from '../utils/cn';

const PropertiesPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement, deleteElement, saveState } = useStore();

  const element = elements.find(el => el.id === selectedElementId);

  if (!element) {
    return (
      <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200/50 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-600 gap-6 transition-colors">
        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center border border-slate-100 dark:border-slate-800">
          <Settings size={32} strokeWidth={1} />
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

  return (
    <aside className="w-80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-800/50 flex flex-col z-20 overflow-hidden transition-colors shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Settings size={18} />
          </div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 capitalize">
            {element.tag}
          </h2>
        </div>
        <button
          onClick={() => deleteElement(element.id)}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all active:scale-90"
          title="Delete element"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 content-scrollbar bg-slate-50/20 dark:bg-slate-900/20">
        {/* Text Content */}
        {element.tag !== 'img' && !element.innerHTML && (
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Content</label>
            <textarea
              value={element.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 silver:border-transparent transition-all outline-none resize-none dark:text-slate-200"
              rows={3}
            />
          </div>
        )}

        {/* Font Properties */}
        <div className="space-y-4">
          <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Typography</label>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Size</span>
              <input
                type="number"
                value={parseInt(element.style.fontSize || '16')}
                onChange={(e) => handleStyleChange('fontSize', e.target.value + 'px')}
                className="w-20 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Weight</span>
              <select
                value={element.style.fontWeight || 'normal'}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                className="w-32 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-200"
              >
                <option value="300">Light</option>
                <option value="400">Normal</option>
                <option value="500">Medium</option>
                <option value="700">Bold</option>
                <option value="900">Black</option>
              </select>
            </div>

            <div className="flex gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-100 dark:border-slate-700">
              {[
                { id: 'left', icon: <AlignLeft size={16} /> },
                { id: 'center', icon: <AlignCenter size={16} /> },
                { id: 'right', icon: <AlignRight size={16} /> }
              ].map((align) => (
                <button
                  key={align.id}
                  onClick={() => handleStyleChange('textAlign', align.id)}
                  className={cn(
                    "flex-1 flex justify-center py-1.5 rounded transition-all",
                    element.style.textAlign === align.id ? "bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white" : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
                  )}
                >
                  {align.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Visuals</label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Text Color</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono">{(element.style.color || '#000000').toUpperCase()}</span>
                <input
                  type="color"
                  value={element.style.color || '#000000'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-8 h-8 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 p-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Background</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono">{(element.style.backgroundColor || '#ffffff').toUpperCase()}</span>
                <input
                  type="color"
                  value={element.style.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 p-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Border Radius</span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{element.style.borderRadius || '0px'}</span>
              </div>
              <input
                type="range" min="0" max="100"
                value={parseInt(element.style.borderRadius || '0')}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value + 'px')}
                className="w-full accent-indigo-600 dark:accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
