import React from 'react';
import { useStore, CanvasElement } from '../store/useStore';
import { clsx } from 'clsx';

interface CanvasProps {
  isPreview: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ isPreview }) => {
  const { elements, selectedElementId, selectElement } = useStore();

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
        className={clsx(
          'canvas-element relative transition-all group cursor-default',
          !isPreview && isSelected && 'ring-2 ring-indigo-500 rounded-sm z-10',
          !isPreview && !isSelected && 'hover:ring-1 hover:ring-slate-300'
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
          <Tag>{el.content}</Tag>
        )}
        
        {!isPreview && isSelected && (
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg animate-in zoom-in-50 duration-200">
            <span className="font-bold">✓</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      id="canvas"
      className={clsx(
        "w-full max-w-5xl bg-white shadow-2xl min-h-[calc(100vh-120px)] transition-all duration-300 rounded-2xl p-0 overflow-hidden relative",
        !isPreview && "ring-1 ring-slate-200 border-8 border-slate-100",
        isPreview && "max-w-none border-0 rounded-none shadow-none mt-[-32px]"
      )}
      onClick={() => !isPreview && selectElement(null)}
    >
      {elements.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
            <span className="text-2xl">+</span>
          </div>
          <p className="text-sm font-medium">Drag or click elements to start building</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {elements.map(renderElement)}
        </div>
      )}
    </div>
  );
};

export default Canvas;
