import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import { useStore } from './store/useStore'
import { cn } from './utils/cn'

function App() {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300",
      isPreview && "preview-mode"
    )}>
      {!isPreview && <Header onPreview={() => setIsPreview(true)} />}
      
      <div className="flex-1 flex overflow-hidden">
        {!isPreview && <Sidebar />}
        
        <main className={cn(
          "flex-1 relative overflow-auto flex justify-center transition-all",
          isPreview ? "p-0" : "p-8 scrollbar-hide"
        )}>
          <Canvas isPreview={isPreview} />
          {isPreview && (
            <button 
              onClick={() => setIsPreview(false)}
              className="fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all z-50 flex items-center gap-2 font-semibold active:scale-95"
            >
              <span>Exit Preview</span>
            </button>
          )}
        </main>

        {!isPreview && <PropertiesPanel />}
      </div>
    </div>
  )
}

export default App
