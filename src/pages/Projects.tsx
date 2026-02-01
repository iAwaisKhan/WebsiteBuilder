import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { useProjectStore } from '../store/useProjectStore';
import { Plus, Folder, Trash2, Edit2, ExternalLink, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
    const navigate = useNavigate();
    const { projects, createProject, deleteProject, updateProject, setCurrentProject } = useProjectStore();
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleCreate = () => {
        if (formData.name.trim()) {
            const projectId = createProject(formData.name, formData.description);
            setFormData({ name: '', description: '' });
            setIsCreating(false);
            // Navigate to builder with new project
            setCurrentProject(projectId);
            navigate('/builder');
        }
    };

    const handleUpdate = (id: string) => {
        if (formData.name.trim()) {
            updateProject(id, { name: formData.name, description: formData.description });
            setEditingId(null);
            setFormData({ name: '', description: '' });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const handleOpenProject = (id: string) => {
        setCurrentProject(id);
        navigate('/builder');
    };

    const startEdit = (project: any) => {
        setEditingId(project.id);
        setFormData({ name: project.name, description: project.description });
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
            <NavigationHeader />

            <div className="flex-1 p-8 pt-40">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Projects</h1>
                        </div>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
                        >
                            <Plus size={20} />
                            New Project
                        </button>
                    </div>

                    {/* Create/Edit Modal */}
                    <AnimatePresence>
                        {(isCreating || editingId) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-slate-900/20 dark:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingId(null);
                                    setFormData({ name: '', description: '' });
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                                >
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                        {editingId ? 'Edit Project' : 'Create New Project'}
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Project Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="My Awesome Website"
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                                autoFocus
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="A brief description of your project..."
                                                rows={3}
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => {
                                                setIsCreating(false);
                                                setEditingId(null);
                                                setFormData({ name: '', description: '' });
                                            }}
                                            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}
                                            className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg active:scale-95"
                                        >
                                            {editingId ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Projects Grid */}
                    {projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-500 dark:text-indigo-400">
                                <Folder size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No projects yet</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Create your first project to get started</p>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25"
                            >
                                <Plus size={20} />
                                Create Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 dark:hover:border-indigo-400/50 hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300"
                                >
                                    {/* Project Icon */}
                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                                        <Folder size={24} />
                                    </div>

                                    {/* Project Info */}
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                                        {project.description || 'No description'}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-6 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {formatDate(project.updatedAt)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FileText size={14} />
                                            {project.elements.length} elements
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenProject(project.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-bold rounded-xl transition-all"
                                        >
                                            <ExternalLink size={16} />
                                            Open
                                        </button>
                                        <button
                                            onClick={() => startEdit(project)}
                                            className="p-2.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-2.5 bg-slate-50 dark:bg-white/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 rounded-xl transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
