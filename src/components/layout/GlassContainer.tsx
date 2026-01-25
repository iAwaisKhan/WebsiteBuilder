
import { cn } from '../../utils/cn';
import { ReactNode } from 'react';

interface GlassContainerProps {
    children: ReactNode;
    className?: string;
}

export default function GlassContainer({ children, className }: GlassContainerProps) {
    return (
        <div className={cn(
            "bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 shadow-xl rounded-xl",
            className
        )}>
            {children}
        </div>
    );
}
