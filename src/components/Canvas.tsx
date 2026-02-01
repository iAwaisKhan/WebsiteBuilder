import React from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { cn } from '../utils/cn';

interface CanvasProps {
  isPreview: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ isPreview }) => {
  const { elements, selectedElementId, selectElement, viewport } = useStore();

  const viewportWidths = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-5xl'
  };

  const renderElement = (el: CanvasElement) => {
    const Tag = el.tag as any;
    const isSelected = selectedElementId === el.id;

    return (
      <div
        key={el.id}
        onClick={(e) => {
          if (isPreview) return;
          e.stopPropagation();
          selectElement(el.id);
        }}
        className={cn(
          "canvas-element relative transition-all duration-300 group cursor-default",
          !isPreview && isSelected && " ring-4 ring-indigo-500/20 rounded-xl z-10",
          !isPreview && !isSelected && "hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-700/50 rounded-lg"
        )}
        style={{
          ...el.style,
          position: el.style.position || 'relative',
        }}
        {...(el.attributes as any)}
      >
        {el.innerHTML ? (
          <div dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
        ) : (
          <Tag className="w-full focus:outline-none">{el.content}</Tag>
        )}
        
        {!isPreview && isSelected && (
          <>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 animate-in zoom-in-75 duration-300 z-50 border-2 border-white dark:border-slate-900">
              <span className="font-bold text-xs">✓</span>
            </div>
            <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl pointer-events-none animate-in fade-in duration-500"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div 
      id="canvas"
      className={cn(
        "w-full bg-white dark:bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] min-h-[calc(100vh-120px)] transition-all duration-500 rounded-[2rem] p-0 overflow-hidden relative border mx-auto",
        !isPreview && "border-slate-200/50 dark:border-slate-800/50",
        !isPreview && viewportWidths[viewport],
        isPreview && "max-w-none border-0 rounded-none shadow-none mt-[-32px]"
      )}
      onClick={() => !isPreview && selectElement(null)}
    >
      {elements.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 gap-6 p-8">
          <div className="w-24 h-24 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center animate-float border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-indigo-400 dark:border-indigo-600 flex items-center justify-center">
              <span className="text-2xl text-indigo-500">+</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-slate-900 dark:text-white font-bold text-lg">Canvas is empty</h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs leading-relaxed">Select components from the sidebar to start designing your masterpiece.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-px">
          {elements.map(renderElement)}
        </div>
      )}
    </div>
  );
};

export default Canvas;
