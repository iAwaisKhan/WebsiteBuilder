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
    <aside className="w-72 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col z-20 overflow-hidden transition-colors shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="flex border-b border-slate-200/50 dark:border-slate-800 p-1 bg-slate-50/50 dark:bg-slate-900/50 mx-4 mt-4 rounded-xl">
        <button
          onClick={() => setActiveTab('elements')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg",
            activeTab === 'elements'
              ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
          )}
        >
          Elements
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg",
            activeTab === 'layers'
              ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
          )}
        >
          Layers
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 content-scrollbar bg-white dark:bg-slate-900">
        {activeTab === 'elements' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Components</h3>
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 ml-4"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {componentLibrary.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => handleAddComponent(comp)}
                    className="flex flex-col items-center justify-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/20 border border-slate-100/50 dark:border-slate-800/50 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_20px_-10px_rgba(99,102,241,0.2)] dark:hover:shadow-none transition-all duration-300 group active:scale-90"
                  >
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 text-slate-500 dark:text-slate-400">
                      {comp.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 tracking-wider uppercase">{comp.name}</span>
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
