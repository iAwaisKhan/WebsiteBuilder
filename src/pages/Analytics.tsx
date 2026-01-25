import NavigationHeader from '../components/NavigationHeader';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavigationHeader />

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                    <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Analytics</h1>
                    <p className="text-slate-300">
                        Track your website performance and visitor statistics. Coming soon!
                    </p>
                </div>
            </div>
        </div>
    );
}
