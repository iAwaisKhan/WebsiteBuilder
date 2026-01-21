import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Mail, Lock, Chrome, Settings, LogOut, X, UserCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { useMediaQuery } from '../hooks/use-media-query';

interface ProfileFormProps {
  className?: string;
  email?: string;
  username?: string;
  onSave: (data: { email: string; username: string }) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ className, email: initialEmail, username: initialUsername, onSave }) => {
  const [email, setEmail] = useState(initialEmail || 'shadcn@example.com');
  const [username, setUsername] = useState(initialUsername || '@shadcn');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ email, username });
  };

  return (
    <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <label htmlFor="edit-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input 
          type="email" 
          id="edit-email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
        />
      </div>
      <div className="grid gap-3">
        <label htmlFor="username" className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
        <input 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
        />
      </div>
      <button 
        type="submit" 
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md active:scale-[0.98]"
      >
        Save changes
      </button>
    </form>
  );
};

export const ProfileSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState({ email: 'shadcn@example.com', username: '@shadcn' });
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSaveProfile = (data: { email: string; username: string }) => {
    setUserData(data);
    setShowEditModal(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
        aria-label="User profile"
      >
        {isLoggedIn ? (
          <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {userData.username.substring(1, 3).toUpperCase()}
          </div>
        ) : (
          <User size={20} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-[350px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {!isLoggedIn ? (
            /* Login View */
            <>
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Login</h3>
                  <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                    Sign Up
                  </button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Enter your email below to login to your account and start building.
                </p>
              </div>

              <div className="px-6 py-4">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-4">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:text-white text-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                </form>
              </div>

              <div className="px-6 pb-6 pt-2 space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">Or continue with</span>
                  </div>
                </div>

                <button className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                  <Chrome size={18} />
                  Login with Google
                </button>
              </div>
            </>
          ) : (
            /* Logged In View */
            <div className="p-1">
              <div className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                  {userData.username.substring(1, 3).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{userData.username}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{userData.email}</p>
                </div>
              </div>
              
              <div className="mt-1 pb-2">
                <button 
                  onClick={() => {
                    setShowEditModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings size={16} />
                  <span>Edit Profile</span>
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Logic (Modal / Drawer) */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowEditModal(false)}
          />
          
          {/* Modal/Drawer Container */}
          <div className={cn(
            "relative w-full bg-white dark:bg-slate-900 shadow-2xl z-[101] overflow-hidden",
            isDesktop 
              ? "max-w-[425px] rounded-2xl animate-in zoom-in-95 fade-in duration-200" 
              : "rounded-t-2xl animate-in slide-in-from-bottom duration-300"
          )}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold dark:text-white">Edit profile</h3>
                {isDesktop && (
                  <button onClick={() => setShowEditModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 text-slate-500">
                    <X size={20} />
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Make changes to your profile here. Click save when you&apos;re done.
              </p>
              
              <ProfileForm 
                email={userData.email} 
                username={userData.username} 
                onSave={handleSaveProfile} 
                className={!isDesktop ? "pb-4" : ""}
              />

              {!isDesktop && (
                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="w-full py-2.5 px-4 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
