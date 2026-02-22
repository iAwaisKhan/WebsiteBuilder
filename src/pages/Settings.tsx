import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, User, Globe, Palette, Save } from 'lucide-react';
import NavigationHeader from '../components/NavigationHeader';

export default function Settings() {
    const sections = [
        { icon: User, label: 'Account', description: 'Manage your profile and personal information' },
        { icon: Bell, label: 'Notifications', description: 'Configure how you receive updates and alerts' },
        { icon: Shield, label: 'Security', description: 'Password, 2FA, and session management' },
        { icon: Globe, label: 'Domain', description: 'Connect custom domains and SEO settings' },
        { icon: Palette, label: 'Appearance', description: 'Customize your editor theme and workspace' }
    ];

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50/50 dark:bg-[#020617]">
            <NavigationHeader />

            <main className="flex-1 flex flex-col pt-40 pb-20 px-8 md:px-16 z-10 w-full max-w-5xl mx-auto">
                <div className="mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-serif text-slate-900 dark:text-white tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                    >
                        Settings
                    </motion.h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">Manage your workspace preferences and account settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="space-y-2">
                        {sections.map((section, idx) => (
                            <button
                                key={section.label}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-left ${
                                    idx === 0 
                                    ? 'bg-white dark:bg-slate-800 shadow-xl shadow-indigo-500/5 text-indigo-600 dark:text-white border border-indigo-100 dark:border-slate-700' 
                                    : 'text-slate-500 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                <section.icon size={20} />
                                <span className="font-bold">{section.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-2 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800/40 rounded-[2.5rem] p-10 shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Profile Settings</h2>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white" defaultValue="Alex" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white" defaultValue="Everett" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all dark:text-white" defaultValue="alex@web-builder.com" />
                                </div>

                                <div className="pt-6">
                                    <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}