import React from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { Settings, Trash2, AlignLeft, AlignCenter, AlignRight, MoveUp, MoveDown } from 'lucide-react';

const PropertiesPanel: React.FC = () => {
  const { elements, selectedElementId, updateElement, deleteElement, saveState } = useStore();
  
  const element = elements.find(el => el.id === selectedElementId);

  if (!element) {
    return (
      <aside className="w-80 bg-white border-l border-slate-200 flex flex-col items-center justify-center p-8 text-center text-slate-400 gap-4">
        <Settings size={40} opacity={0.1} />
        <p className="text-sm">Select an element to edit its properties</p>
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
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col z-20 overflow-hidden shadow-xl">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 capitalize">
          {element.tag} Settings
        </h2>
        <button 
          onClick={() => deleteElement(element.id)}
          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          title="Delete element"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 content-scrollbar">
        {/* Text Content */}
        {element.tag !== 'img' && !element.innerHTML && (
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Content</label>
            <textarea
              value={element.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Font Properties */}
        <div className="space-y-4">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Typography</label>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Size</span>
              <input 
                type="number" 
                value={parseInt(element.style.fontSize || '16')} 
                onChange={(e) => handleStyleChange('fontSize', e.target.value + 'px')}
                className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Weight</span>
              <select 
                value={element.style.fontWeight || 'normal'}
                onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                className="w-32 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
              >
                <option value="light">Light</option>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="bold">Bold</option>
                <option value="black">Black</option>
              </select>
            </div>

            <div className="flex gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
               {[
                 { id: 'left', icon: <AlignLeft size={16} /> },
                 { id: 'center', icon: <AlignCenter size={16} /> },
                 { id: 'right', icon: <AlignRight size={16} /> }
               ].map((align) => (
                 <button
                    key={align.id}
                    onClick={() => handleStyleChange('textAlign', align.id)}
                    className={`flex-1 flex justify-center py-1.5 rounded transition-all ${element.style.textAlign === align.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   {align.icon}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Visuals</label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Text Color</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">{(element.style.color || '#000000').toUpperCase()}</span>
                <input 
                  type="color" 
                  value={element.style.color || '#000000'} 
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-8 h-8 rounded-lg overflow-hidden border-0 p-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Background</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">{(element.style.backgroundColor || '#ffffff').toUpperCase()}</span>
                <input 
                  type="color" 
                  value={element.style.backgroundColor || '#ffffff'} 
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded-lg overflow-hidden border-0 p-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Border Radius</span>
                <span className="text-xs font-bold text-indigo-600">{element.style.borderRadius || '0px'}</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={parseInt(element.style.borderRadius || '0')}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value + 'px')}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;
