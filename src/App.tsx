import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import { useStore } from './store/useStore'

function App() {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${isPreview ? 'preview-mode' : ''}`}>
      {!isPreview && <Header onPreview={() => setIsPreview(true)} />}
      
      <div className="flex-1 flex overflow-hidden">
        {!isPreview && <Sidebar />}
        
        <main className="flex-1 relative overflow-auto p-8 flex justify-center">
          <Canvas isPreview={isPreview} />
          {isPreview && (
            <button 
              onClick={() => setIsPreview(false)}
              className="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 flex items-center gap-2"
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
