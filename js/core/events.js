import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';

export function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Ctrl + S: Save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const saveBtn = document.querySelector('button[onclick="saveProject()"]');
            if (saveBtn) saveBtn.click();
            else showToast('Save triggered (Ctrl+S)');
        }

        // Ctrl + Z: Undo
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            if (typeof window.undoAction === 'function') window.undoAction();
        }

        // Ctrl + Y / Ctrl + Shift + Z: Redo
        if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
            e.preventDefault();
            if (typeof window.redoAction === 'function') window.redoAction();
        }

        // Delete: Delete selected element
        if (e.key === 'Delete' || e.key === 'Backspace') {
            // Only if not typing in an input
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                if (state.selectedElement) {
                    if (typeof window.deleteSelectedElement === 'function') window.deleteSelectedElement();
                }
            }
        }
    });
}
