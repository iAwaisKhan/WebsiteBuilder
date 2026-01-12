import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';
import { copyElement, pasteElement, deleteSelectedElement } from './actions.js';

export function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Prevent shortcuts when typing in inputs/textareas
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || 
                         document.activeElement.isContentEditable;

        if (isTyping) {
            if (e.key === 'Escape') document.activeElement.blur();
            return;
        }

        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    if (window.saveProject) window.saveProject();
                    break;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        if (window.redoAction) window.redoAction();
                    } else {
                        if (window.undoAction) window.undoAction();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    if (window.redoAction) window.redoAction();
                    break;
                case 'c':
                    e.preventDefault();
                    copyElement();
                    break;
                case 'v':
                    e.preventDefault();
                    pasteElement();
                    break;
                case 'd':
                    e.preventDefault();
                    copyElement();
                    pasteElement();
                    showToast('Element duplicated! 👥');
                    break;
            }
        } else {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelectedElement();
            } else if (e.key === 'Enter' || e.key === ' ') {
                // Focus based selection for accessibility
                if (document.activeElement.classList.contains('canvas-element')) {
                    if (window.selectElement) window.selectElement(document.activeElement);
                }
            }
        }
    });
}
