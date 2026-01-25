import { Link } from 'react-router-dom';
import { Sparkles, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import NavigationHeader from '../components/NavigationHeader';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <NavigationHeader />

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Sparkles className="w-12 h-12 text-indigo-400" />
                        <h1 className="text-6xl font-black text-white tracking-tight">
                            Web<span className="text-indigo-400">Builder</span>
                        </h1>
                    </div>

                    <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                        Create stunning websites with our powerful visual editor.
                        <br />
                        No coding required.
                    </p>

                    <Link
                        to="/builder"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-95"
                    >
                        <Rocket size={20} />
                        Launch Builder
                    </Link>
                </motion.div>

                {/* Simplified Feature Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-20 max-w-4xl"
                >
                    <div className="bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-12">
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            Everything You Need to Build Amazing Websites
                        </h2>
                        <p className="text-slate-300 text-center">
                            Drag-and-drop components, manage your projects, explore templates, and track analytics—all in one place.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="py-6 px-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-400">
                    <p>© 2026 WebBuilder. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">About</a>
                        <a href="#" className="hover:text-white transition-colors">Docs</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
