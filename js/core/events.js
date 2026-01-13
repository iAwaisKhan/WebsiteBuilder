import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';
import { 
    copyElement, 
    pasteElement, 
    deleteSelectedElement, 
    undoAction, 
    redoAction 
} from './actions.js';

export function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        // Prevent shortcuts when typing in inputs/textareas
        const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || 
                         document.activeElement.isContentEditable;

        if (isTyping) {
            if (e.key === 'Escape') document.activeElement.blur();
            return;
        }

        const key = e.key.toLowerCase();

        if (e.ctrlKey || e.metaKey) {
            switch (key) {
                case 's':
                    e.preventDefault();
                    if (window.saveProject) window.saveProject();
                    break;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        redoAction();
                    } else {
                        undoAction();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    redoAction();
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
                    break;
            }
        } else {
            if (e.key === 'Escape') {
                if (document.body.classList.contains('preview-mode')) {
                    if (window.togglePreviewMode) window.togglePreviewMode();
                }
            }
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
