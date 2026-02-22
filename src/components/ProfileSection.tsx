import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Mail, Lock, Settings, LogOut, X, CreditCard, Bell, ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

// --- Types ---
interface UserData {
  email: string;
  username: string;
  avatar?: string;
}

// --- Icons ---
// Minimal geometric logo for logged out state or fallback
const GeometricUserIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("text-current", className)}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ProfileSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: 'dev@web-builder.so',
    username: 'Vercel User'
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans text-sm" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 pl-1 pr-1 py-1 rounded-full transition-all duration-200 outline-none border",
          isOpen
            ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
        )}
      >
        {/* Avatar / Icon */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border transition-colors",
          isLoggedIn
            ? "bg-indigo-500 border-indigo-500 text-white"
            : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        )}>
          {isLoggedIn ? (
            <span className="font-bold text-xs">{userData.username.charAt(0)}</span>
          ) : (
            <GeometricUserIcon className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 origin-top-right bg-white dark:bg-[#0A0A0A] border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-200/20 dark:shadow-none bg-clip-padding z-50 overflow-hidden"
          >
            {/* Content */}
            {!isLoggedIn ? (
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock size={16} className="text-slate-400" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-medium mb-1">Access Account</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to sync your projects.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full h-9 px-3 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full h-9 rounded-md bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </form>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400">Protected by 256-bit encryption</span>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-medium text-slate-900 dark:text-white truncate">{userData.username}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userData.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-1">
                  {[
                    { icon: Settings, label: 'Settings', shortcut: '⌘S' },
                    { icon: CreditCard, label: 'Billing' },
                    { icon: Bell, label: 'Notifications', badge: 2 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon size={14} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                      {item.shortcut && (
                        <span className="text-[10px] text-slate-400 font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-xs font-medium"
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
