import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Code, Palette, Zap, Moon, Sun, Home } from 'lucide-react';
import { cn } from '../utils/cn';

const NavigationHeader: React.FC = () => {
    const [isDark, setIsDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Layout, label: 'Builder', path: '/builder' },
        { icon: Code, label: 'Projects', path: '/projects' },
        { icon: Palette, label: 'Templates', path: '/templates' },
        { icon: Zap, label: 'Analytics', path: '/analytics' },
    ];

    return (
        <header className={cn(
            "h-16 px-6 flex items-center justify-between z-30 transition-all duration-300 border-b",
            scrolled
                ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-slate-200/50 dark:border-slate-800/50 shadow-sm"
                : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-transparent"
        )}>
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <span className="font-display font-semibold text-xl text-slate-900 dark:text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                    web<span className="text-indigo-600 dark:text-indigo-400">builder</span>
                </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon size={16} />
                            <span className="hidden md:inline">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 text-slate-500 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:rotate-12"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default NavigationHeader;
