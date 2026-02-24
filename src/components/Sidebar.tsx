import React, { useState } from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import {
  Layout,
  Type,
  AlignLeft,
  Image as ImageIcon,
  MousePointer2,
  Layers,
  Box,
  User
} from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const { addElement, saveState } = useStore();

  const componentLibrary = [
    { type: 'heading', name: 'Heading', icon: <Type size={18} />, tag: 'h2', content: 'Design with Purpose', style: { fontSize: '40px', fontWeight: '800', textAlign: 'center', marginBottom: '16px' } },
    { type: 'paragraph', name: 'Paragraph', icon: <AlignLeft size={18} />, tag: 'p', content: 'Craft meaningful experiences with automated precision.', style: { color: '#64748b', fontSize: '16px', textAlign: 'center', lineHeight: '1.6' } },
    { type: 'button', name: 'Button', icon: <MousePointer2 size={18} />, tag: 'button', content: 'Get Started Today', style: { padding: '16px 32px', backgroundColor: '#6366f1', color: 'white', borderRadius: '12px', fontSize: '14px', fontWeight: '600', width: 'fit-content', margin: '24px auto', display: 'block' } },
    { type: 'image', name: 'Image', icon: <ImageIcon size={18} />, tag: 'img', attributes: { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' }, style: { width: '100%', borderRadius: '24px', transition: 'all 0.3s' } },
    { type: 'container', name: 'Section', icon: <Layout size={18} />, tag: 'div', style: { padding: '80px 40px', backgroundColor: '#fdfdfd', width: '100%', borderRadius: '32px', margin: '12px 0', border: '1px solid #f1f5f9' } },
    { type: 'avatar', name: 'Avatar', icon: <User size={18} />, tag: 'div', classes: ['avatar'], innerHTML: '<img src="https://github.com/shadcn.png" class="avatar-image w-20 h-20 rounded-full border-4 border-indigo-500/10" />', style: { width: '80px', height: '80px', margin: '0 auto' } },
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
    <aside className="w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 flex flex-col z-20 overflow-hidden transition-colors">
      <div className="px-6 pt-6 pb-2">
        {/* Centered Tabs Section */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-[20px] shadow-inner border border-slate-300/30 dark:border-slate-700/50">
            <button
              onClick={() => setActiveTab('components')}
              className={cn(
                "px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all rounded-[16px]",
                activeTab === 'components'
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={cn(
                "px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all rounded-[16px]",
                activeTab === 'layers'
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              Layers
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 content-scrollbar">
        {activeTab === 'components' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Library</h3>
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
