import React, { useState } from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MousePointer2, 
  Layers, 
  Box, 
  Square,
  Hash,
  User
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('elements');
  const { addElement, saveState } = useStore();

  const componentLibrary = [
    { type: 'heading', name: 'Heading', icon: <Type size={18} />, tag: 'h2', content: 'New Heading', style: { fontSize: '32px', fontWeight: 'bold' } },
    { type: 'paragraph', name: 'Paragraph', icon: <Box size={18} />, tag: 'p', content: 'Start typing your content here...', style: { color: '#64748b' } },
    { type: 'button', name: 'Button', icon: <MousePointer2 size={18} />, tag: 'button', content: 'Click Me', style: { padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px' } },
    { type: 'image', name: 'Image', icon: <ImageIcon size={18} />, tag: 'img', attributes: { src: 'https://via.placeholder.com/400x200' }, style: { width: '100%', borderRadius: '8px' } },
    { type: 'container', name: 'Section', icon: <Layout size={18} />, tag: 'div', style: { padding: '40px', backgroundColor: '#f8fafc', width: '100%', minHeight: '100px' } },
    { type: 'avatar', name: 'Avatar', icon: <User size={18} />, tag: 'div', classes: ['avatar'], innerHTML: '<img src="https://github.com/shadcn.png" class="avatar-image" />', style: { width: '44px', height: '44px' } },
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
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 overflow-hidden">
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('elements')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'elements' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Elements
        </button>
        <button 
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'layers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Layers
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 content-scrollbar">
        {activeTab === 'elements' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core Components</h3>
              <div className="grid grid-cols-2 gap-3">
                {componentLibrary.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => handleAddComponent(comp)}
                    className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="text-slate-500 group-hover:text-indigo-600 transition-colors">
                      {comp.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600">{comp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
            <Layers size={32} opacity={0.2} />
            <p className="text-sm">No layers yet</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
