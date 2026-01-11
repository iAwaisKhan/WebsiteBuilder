import { state } from './state.js';
import { initKeyboardShortcuts } from './core/events.js';
import { showToast } from './utils/helpers.js';
import { createComponent } from './core/components.js';
import { saveProject, exportProjectAsJSON, importProjectFromJSON } from './core/storage.js';

// Initialize the application
function init() {
    console.log('WebBuilder Modular System Initialized ⚡');
    initKeyboardShortcuts();
    
    // Bind essential functions to window for HTML onclick compatibility
    window.saveProject = () => saveProject(document.getElementById('canvas'));
    window.exportProjectJSON = () => exportProjectAsJSON(document.getElementById('canvas'));
    window.importProjectJSON = (event) => importProjectFromJSON(document.getElementById('canvas'), event.target.files[0]);
    
    // Override createComponent with the structured system
    window.createComponent = (type) => {
        const canvas = document.getElementById('canvas');
        const element = createComponent(type);
        if (element) {
            canvas.appendChild(element);
            if (window.saveState) window.saveState();
            showToast(`Added ${type}! ✨`);
        }
    };
}

document.addEventListener('DOMContentLoaded', init);
