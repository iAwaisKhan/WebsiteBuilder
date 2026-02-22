import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Code, Palette, Zap, Moon, Sun, Home, Sparkles, Library, Settings, User } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../hooks/useTheme';
import { ProfileSection } from './ProfileSection';

const NavigationHeader: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Code, label: 'Projects', path: '/projects' },
        { icon: Palette, label: 'Library', path: '/templates' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <header className="fixed top-6 left-0 right-0 px-8 flex items-center justify-between z-50 pointer-events-none">
            <Link to="/" className="flex items-center pointer-events-auto">
                <span className="font-medium text-3xl text-slate-900 dark:text-white tracking-[0.2em] hover:opacity-70 transition-opacity cursor-pointer" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    WEB BUILDER
                </span>
            </Link>

            {/* Navigation Pill */}
            <nav className="flex items-center gap-1 p-1.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/40 dark:border-slate-800/40 rounded-full shadow-2xl shadow-indigo-500/5 pointer-events-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;



                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium",
                                isActive
                                    ? "bg-white/80 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon size={16} />
                            <span className="hidden lg:inline">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center gap-3 pointer-events-auto">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-full border border-white/40 dark:border-slate-800/40 transition-all"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <ProfileSection />
            </div>
        </header >
    );
};

export default NavigationHeader;
