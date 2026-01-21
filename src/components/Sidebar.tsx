import React, { useState } from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MousePointer2, 
  Layers, 
  Box, 
  User
} from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('elements');
  const { addElement, saveState } = useStore();

  const componentLibrary = [
    { type: 'heading', name: 'Heading', icon: <Type size={18} />, tag: 'h2', content: 'New Heading', style: { fontSize: '32px', fontWeight: 'bold' } },
    { type: 'paragraph', name: 'Paragraph', icon: <Box size={18} />, tag: 'p', content: 'Start typing your content here...', style: { color: '#64748b' } },
    { type: 'button', name: 'Button', icon: <MousePointer2 size={18} />, tag: 'button', content: 'Click Me', style: { padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px' } },
    { type: 'image', name: 'Image', icon: <ImageIcon size={18} />, tag: 'img', attributes: { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80' }, style: { width: '100%', borderRadius: '8px' } },
    { type: 'container', name: 'Section', icon: <Layout size={18} />, tag: 'div', style: { padding: '40px', backgroundColor: '#f8fafc', width: '100%', minHeight: '100px' } },
    { type: 'avatar', name: 'Avatar', icon: <User size={18} />, tag: 'div', classes: ['avatar'], innerHTML: '<img src="https://github.com/shadcn.png" class="avatar-image w-11 h-11 rounded-full" />', style: { width: '44px', height: '44px' } },
  ];

  const handleAddComponent = (comp: any) => {
    saveState();
    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      ...comp
    };
    addElement(newElement);
  };

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 overflow-hidden transition-colors">
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('elements')}
          className={cn(
            "flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all",
            activeTab === 'elements' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
          )}
        >
          Elements
        </button>
        <button 
          onClick={() => setActiveTab('layers')}
          className={cn(
            "flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all",
            activeTab === 'layers' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 dark:text-slate-500 hover:text-slate-600"
          )}
        >
          Layers
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 content-scrollbar bg-white dark:bg-slate-900">
        {activeTab === 'elements' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4 px-2">Core Components</h3>
              <div className="grid grid-cols-2 gap-3">
                {componentLibrary.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => handleAddComponent(comp)}
                    className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                  >
                    <div className="text-slate-500 group-hover:text-indigo-600 transition-colors">
                      {comp.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{comp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-700 gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
            <Layers size={32} opacity={0.2} />
            <p className="text-sm">No layers yet</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
