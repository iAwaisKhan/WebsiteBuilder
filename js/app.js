import { state } from './state.js';
import { initKeyboardShortcuts } from './core/events.js';
import { showToast } from './utils/helpers.js';
import { createComponent } from './core/components.js';
import { saveProject, exportProjectAsJSON, importProjectFromJSON } from './core/storage.js';
import { refreshLayers } from './ui/layers.js';
import { addResizeHandles, removeResizeHandles } from './core/resize.js';
import { loadTemplate as loadTemplateModule } from './core/templates.js';
import { initContextMenu } from './ui/contextMenu.js';

// Initialize the application
function init() {
    console.log('WebBuilder Modular System Initialized ⚡');
    initKeyboardShortcuts();
    initContextMenu();
    
    // Grid Toggle Logic
    const toggleGridBtn = document.getElementById('toggleGrid');
    const canvas = document.getElementById('canvas');
    if (toggleGridBtn) {
        toggleGridBtn.onclick = () => {
            canvas.classList.toggle('no-grid');
            toggleGridBtn.classList.toggle('active');
            showToast(canvas.classList.contains('no-grid') ? 'Grid disabled' : 'Grid enabled');
        };
    }
    
    // Bind essential functions to window for HTML onclick compatibility
    window.saveProject = () => saveProject(document.getElementById('canvas'));
    window.exportProjectJSON = () => exportProjectAsJSON(document.getElementById('canvas'));
    window.importProjectJSON = (event) => importProjectFromJSON(document.getElementById('canvas'), event.target.files[0]);
    window.refreshLayers = refreshLayers;
    window.loadTemplate = loadTemplateModule;
    
    // Override selectElement to integrate Layers and Resizing
    const originalSelectElement = window.selectElement;
    window.selectElement = (element) => {
        // Clear previous handles
        if (state.selectedElement) {
            removeResizeHandles(state.selectedElement);
        }

        // Update state
        state.selectedElement = element;

        // Call original if it exists
        if (typeof originalSelectElement === 'function') {
            originalSelectElement(element);
        }

        // Add new handles and refresh layers
        addResizeHandles(element);
        refreshLayers();
    };

    // Override createComponent with the structured system
    window.createComponent = (type) => {
        const canvas = document.getElementById('canvas');
        const element = createComponent(type);
        if (element) {
            canvas.appendChild(element);
            if (window.saveState) window.saveState();
            showToast(`Added ${type}! ✨`);
            refreshLayers();
        }
    };

    // Sync layers on state changes (Delete, Undo, Redo)
    const originalDelete = window.deleteElement;
    window.deleteElement = (button) => {
        if (typeof originalDelete === 'function') originalDelete(button);
        refreshLayers();
    };

    const originalUndo = window.undoAction;
    window.undoAction = () => {
        if (typeof originalUndo === 'function') originalUndo();
        refreshLayers();
    };

    const originalRedo = window.redoAction;
    window.redoAction = () => {
        if (typeof originalRedo === 'function') originalRedo();
        refreshLayers();
    };

    // Initial layers refresh
    refreshLayers();
}

document.addEventListener('DOMContentLoaded', init);
