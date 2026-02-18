import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, Sparkles, Wand2, Terminal, MessageSquare, Key } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import { processAIRequest } from '../utils/ai-service';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    type?: 'text' | 'action';
}

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [apiKey, setApiKey] = useState(() => {
        return localStorage.getItem('clown_ai_key') || '';
    });
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am your CLOWN AI Assistant. GPT-5.2-Codex is now ENABLED for all clients. How can I help you build today?', type: 'text' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { addElement, setElements, elements, updateElement, clearCanvas } = useStore();

    const suggestions = useMemo(() => [
        "Build a minimalist portfolio",
        "Create a SaaS landing page",
        "Design a crypto dashboard",
        "Clear canvas and start fresh"
    ], []);

    const generateId = useCallback(() => {
        return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-ai-assistant', handleOpen);
        return () => window.removeEventListener('open-ai-assistant', handleOpen);
    }, []);

    const saveApiKey = (key: string) => {
        if (!key.trim()) {
            setApiKey('');
            localStorage.removeItem('clown_ai_key');
        } else {
            setApiKey(key);
            localStorage.setItem('clown_ai_key', key);
        }
        setShowKeyInput(false);
        setMessages(prev => [...prev, { role: 'assistant', content: "API Settings updated! How can I help you build today?" }]);
    };

    const handleSendMessage = useCallback(async (msgOverride?: string) => {
        const messageToSend = msgOverride || input;
        if (!messageToSend.trim() || isLoading) return;

        if (!apiKey && !messageToSend.startsWith('sk-') && !messageToSend.startsWith('AI')) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Please provide a valid API key first." }]);
            setShowKeyInput(true);
            return;
        }

        const userMessage = messageToSend.trim();
        setInput(''); // Clear immediately
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await processAIRequest(userMessage, apiKey, elements, 'bytez');

            if (response.text) {
                setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
            } else if (response.actions && response.actions.length > 0) {
                setMessages(prev => [...prev, { role: 'assistant', content: "I've updated the site structure based on your request." }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I processed your request but didn't get a clear response. Try asking in a different way." }]);
            }

            // Process actions
            if (response.actions) {
                response.actions.forEach(action => {
                    if (action.type === 'ADD_ELEMENT') {
                        addElement({
                            id: generateId(),
                            ...action.payload
                        });
                    } else if (action.type === 'SET_ELEMENTS') {
                        setElements(action.payload.map((el: any) => ({
                            ...el,
                            id: el.id || generateId(),
                            style: el.style || {}
                        })));
                    } else if (action.type === 'UPDATE_ELEMENT') {
                        updateElement(action.payload.id, action.payload.updates);
                    } else if (action.type === 'CLEAR_CANVAS') {
                        clearCanvas();
                    }
                });
            }
        } catch (error) {
            const errorMsg = (error as Error).message;

            if (errorMsg.includes("API key")) {
                setMessages(prev => [...prev, { role: 'assistant', content: "🚨 API KEY ERROR: Your configuration seems to be incorrect. Please check the project setup." }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ ENGINE ERROR: " + errorMsg + ". Try using a different prompt." }]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, apiKey, elements, addElement, setElements, updateElement, generateId]);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-indigo-500/20"
            >
                <Bot size={28} className={isOpen ? 'hidden' : 'block'} />
                <Sparkles size={28} className={isOpen ? 'block' : 'hidden'} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">CLOWN AI Builder</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={cn(
                                        "flex flex-col max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user'
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 shadow-sm"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {msg.role === 'assistant' ? 'CLOWN AI' : 'You'}
                                    </span>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl w-fit">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        <div className="px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-slate-100 dark:border-slate-800/50">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSendMessage(s)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all uppercase tracking-wider"
                                >
                                    ✨ {s}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type your command..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="w-full pl-4 pr-12 py-4 bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 rounded-2xl outline-none transition-all dark:text-white text-sm shadow-inner"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <div className="flex items-center gap-1.5"><Terminal size={12} /> Console</div>
                                <div className="flex items-center gap-1.5"><Wand2 size={12} /> AI Gen</div>
                                <div className="flex items-center gap-1.5"><MessageSquare size={12} /> chat</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}