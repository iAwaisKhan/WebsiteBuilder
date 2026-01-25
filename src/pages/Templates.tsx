import NavigationHeader from '../components/NavigationHeader';
import { Palette } from 'lucide-react';

export default function Templates() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavigationHeader />

            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                    <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Palette className="w-10 h-10 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Templates</h1>
                    <p className="text-slate-300">
                        Browse beautiful pre-designed templates to kickstart your project. Coming soon!
                    </p>
                </div>
            </div>
        </div>
    );
}
