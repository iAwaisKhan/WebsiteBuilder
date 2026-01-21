import React, { useState, useRef, useEffect } from 'react';
import { Bot, ChevronDown, Send } from 'lucide-react';
import { cn } from '../utils/cn';

export const CopilotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleStartTask = () => {
    console.log('Starting task with Copilot:', task);
    setIsOpen(false);
    setTask('');
    // Logic for AI integration would go here
  };

  return (
    <div className="relative flex items-center" ref={popoverRef}>
      {/* Button Group Wrapper */}
      <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-r border-slate-200 dark:border-slate-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bot size={18} />
          <span className="hidden sm:inline">Copilot</span>
        </button>
        
        <button
          className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Copilot menu"
        >
          <ChevronDown size={16} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Popover Content */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-white">Start a new task with Copilot</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Describe your task in natural language.
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="task-input" className="sr-only">Task Description</label>
              <textarea
                id="task-input"
                autoFocus
                placeholder="I need to..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full h-24 p-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none dark:text-white transition-all"
              />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                Copilot will analyze your request and suggest changes.
              </p>
            </div>
            
            <button
              onClick={handleStartTask}
              disabled={!task.trim()}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-indigo-100 dark:shadow-none"
            >
              <Send size={14} />
              Run Copilot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotButton;
