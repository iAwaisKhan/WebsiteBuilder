import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import { useStore } from '../store/useStore';
import { useProjectStore } from '../store/useProjectStore';
import { cn } from '../utils/cn';
import { Save, AlertCircle, Trash2, RotateCcw, RotateCw } from 'lucide-react';

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
            "min-h-screen flex flex-col transition-colors duration-300",
            isPreview && "preview-mode"
        )}>
            {!isPreview && <NavigationHeader />}

            {/* Project Info Bar */}
            {!isPreview && currentProject && (
                <div className="h-10 px-6 flex items-center justify-between bg-white/5 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white">{currentProject.name}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <button
                            onClick={handleManualSave}
                            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            <Save size={14} />
                            {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Save'}
                        </button>
                        <span className="text-xs text-slate-600 px-2">|</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={undo}
                                disabled={undoStack.length === 0}
                                className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                title="Undo"
                            >
                                <RotateCcw size={14} />
                            </button>
                            <button
                                onClick={redo}
                                disabled={redoStack.length === 0}
                                className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                title="Redo"
                            >
                                <RotateCw size={14} />
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to clear the entire canvas? This action is undoable.')) {
                                        clearCanvas();
                                    }
                                }}
                                className="flex items-center gap-2 text-xs text-rose-400/80 hover:text-rose-400 transition-colors"
                                title="Clear Canvas"
                            >
                                <Trash2 size={14} />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* No Project Warning */}
            {!currentProject && (
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 max-w-md text-center">
                        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No Project Selected</h2>
                        <p className="text-slate-300 mb-6">Please select or create a project to start building.</p>
                        <button
                            onClick={() => navigate('/projects')}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Go to Projects
                        </button>
                    </div>
                </div>
            )}

            {currentProject && (
                <div className="flex-1 flex overflow-hidden">
                    {!isPreview && <Sidebar />}

                    <main className={cn(
                        "flex-1 relative overflow-auto flex justify-center transition-all",
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
