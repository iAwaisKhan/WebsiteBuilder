import React from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { cn } from '../utils/cn';
import { Trash2 } from 'lucide-react';

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

    // Layout-only styles for the wrapper
    const layoutStyles = {
        position: el.style.position || 'relative',
        margin: el.style.margin,
        width: el.style.width,
        zIndex: isSelected ? 30 : 10,
    };

    // Visual styles for the actual component
    const visualStyles = {
        ...el.style,
        position: undefined,
        margin: undefined,
        width: undefined,
        zIndex: undefined,
    };

    return (
      <div
        key={el.id}
        onClick={(e) => {
          if (isPreview) return;
          e.stopPropagation();
          selectElement(el.id);
        }}
        className={cn(
            "canvas-element group transition-all duration-300",
            !isPreview && "p-1" // Add padding to prevent selection halo clipping
        )}
        style={layoutStyles as any}
      >
        <div className={cn(
            "relative w-full h-full",
            !isPreview && isSelected && "ring-2 ring-indigo-500 rounded-xl shadow-lg",
            !isPreview && !isSelected && "hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 rounded-lg"
        )}>
            {el.innerHTML ? (
              <div 
                style={visualStyles as any}
                dangerouslySetInnerHTML={{ __html: el.innerHTML }} 
                className={cn("w-full h-full focus:outline-none", el.classes)}
              />
            ) : (
              <Tag 
                style={visualStyles as any}
                className={cn("w-full h-full focus:outline-none block", el.classes)}
              >
                {el.content}
              </Tag>
            )}
            
            {!isPreview && isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  useStore.getState().deleteElement(el.id);
                }}
                className="absolute -top-3.5 -right-3.5 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl z-50 border-2 border-white dark:border-slate-900 hover:bg-rose-600 hover:scale-110 active:scale-90 transition-all cursor-pointer animate-in zoom-in-95 duration-200"
                title="Delete element"
              >
                <Trash2 size={14} />
              </button>
            )}
        </div>
      </div>
    );
  };

  return (
    <div 
      id="canvas"
      className={cn(
        "w-full bg-white dark:bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] min-h-[calc(100vh-120px)] transition-all duration-500 rounded-[2rem] p-0 relative border mx-auto",
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
