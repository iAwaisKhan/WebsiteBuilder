import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import { useStore } from '../store/useStore';
import { useProjectStore } from '../store/useProjectStore';
import { cn } from '../utils/cn';
import { Save, AlertCircle, Trash2, RotateCcw, RotateCw, Home, Code, Palette, Box, ChevronLeft } from 'lucide-react';

export default function Builder() {
    const navigate = useNavigate();
    const [isPreview, setIsPreview] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const { elements, setElements, clearCanvas, undo, redo, undoStack, redoStack } = useStore();
    const { currentProjectId, getCurrentProject, saveProjectElements, projects } = useProjectStore();

    // Load project on mount
    useEffect(() => {
        const currentProject = getCurrentProject();
        if (currentProject) {
            setElements(currentProject.elements);
        } else if (projects.length > 0) {
            // If no current project but projects exist, redirect to projects page
            navigate('/projects');
        }
    }, [currentProjectId]);

    // Auto-save every 3 seconds when elements change
    useEffect(() => {
        if (!currentProjectId) return;

        const saveTimeout = setTimeout(() => {
            saveProjectElements(currentProjectId, elements);
            setLastSaved(new Date());
        }, 3000);

        return () => clearTimeout(saveTimeout);
    }, [elements, currentProjectId]);

    const handleManualSave = () => {
        if (currentProjectId) {
            saveProjectElements(currentProjectId, elements);
            setLastSaved(new Date());
        }
    };

    const currentProject = getCurrentProject();

    return (
        <div className={cn(
            "h-screen flex flex-col bg-slate-950 transition-colors duration-300",
            isPreview && "preview-mode"
        )}>
            {/* Unified Top Navigation & Info Bar */}
            {!isPreview && (
                <header className="h-16 px-6 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 transition-colors">
                    {/* Left: Branding & Project Info */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center pr-6 border-r border-slate-200 dark:border-slate-800">
                            <button 
                                onClick={() => navigate('/projects')}
                                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                                title="Back to Projects"
                            >
                                <ChevronLeft size={22} />
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-none mb-1">Project</span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none">
                                    {currentProject?.name || 'Untitled'}
                                </span>
                            </div>
                            
                            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                            
                            <button
                                onClick={handleManualSave}
                                className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all px-3 py-1.5 rounded-lg border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50 bg-slate-50 dark:bg-slate-900"
                            >
                                <Save size={12} />
                                {lastSaved ? `Synced ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Sync now'}
                            </button>
                        </div>
                    </div>

                    {/* Center: Navigation Pill */}
                    <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-full border border-slate-200 dark:border-slate-800/40">
                        {[
                            { icon: Home, label: 'Dash', path: '/' },
                            { icon: Code, label: 'Projects', path: '/projects' },
                            { icon: Palette, label: 'Library', path: '/templates' },
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:bg-white dark:hover:bg-slate-800"
                            >
                                <item.icon size={13} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 pr-6 border-r border-slate-200 dark:border-slate-800">
                            <button
                                onClick={undo}
                                disabled={undoStack.length === 0}
                                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-20 rounded-xl transition-all"
                                title="Undo"
                            >
                                <RotateCcw size={15} />
                            </button>
                            <button
                                onClick={redo}
                                disabled={redoStack.length === 0}
                                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-20 rounded-xl transition-all"
                                title="Redo"
                            >
                                <RotateCw size={15} />
                            </button>
                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-2" />
                            <button
                                onClick={() => {
                                    if (window.confirm('Clear target canvas?')) clearCanvas();
                                }}
                                className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                                title="Clear Canvas"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 dark:shadow-white/5"
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* No Project Warning */}
            {!currentProject && !isPreview && (
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 max-w-lg text-center shadow-2xl shadow-indigo-500/10">
                        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <AlertCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">No Active Project</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                            It looks like you haven't selected a project or template to work on yet.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/projects')}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 uppercase tracking-widest text-xs"
                            >
                                My Projects
                            </button>
                            <button
                                onClick={() => navigate('/templates')}
                                className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest text-xs"
                            >
                                Browse Library
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentProject && (
                <div className="flex-1 flex overflow-hidden">
                    {!isPreview && <Sidebar />}

                    <main className={cn(
                        "flex-1 relative overflow-auto flex justify-center transition-all bg-slate-100 dark:bg-[#0f1117]",
                        isPreview ? "p-0" : "p-8 scrollbar-hide"
                    )}>
                        <Canvas isPreview={isPreview} />
                        {isPreview && (
                            <button
                                onClick={() => setIsPreview(false)}
                                className="fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all z-50 flex items-center gap-2 font-semibold active:scale-95"
                            >
                                <span>Exit Preview</span>
                            </button>
                        )}
                    </main>

                    {!isPreview && <PropertiesPanel />}
                </div>
            )}
        </div>
    );
}
