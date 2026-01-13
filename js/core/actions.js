import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';
import { refreshLayers } from '../ui/layers.js';

export function saveState() {
    const canvas = document.getElementById('canvas');
    
    // Create a clone to clean up before saving
    const tempCanvas = canvas.cloneNode(true);
    tempCanvas.querySelectorAll('.element-controls, .resize-handle-v').forEach(el => el.remove());
    tempCanvas.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    
    state.undoStack.push(tempCanvas.innerHTML);
    state.redoStack = [];
    if (state.undoStack.length > 50) state.undoStack.shift();
}


export function undoAction() {
    if (state.undoStack.length > 1) {
        state.redoStack.push(state.undoStack.pop());
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = state.undoStack[state.undoStack.length - 1];
        addControlsToElements();
        refreshLayers();
        showToast('↩️ Undone!');
    }
}

export function redoAction() {
    if (state.redoStack.length > 0) {
        const nextState = state.redoStack.pop();
        state.undoStack.push(nextState);
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = nextState;
        addControlsToElements();
        refreshLayers();
        showToast('↪️ Redone!');
    }
}

export function addControlsToElements() {
    const elements = document.querySelectorAll('.canvas-element');
    elements.forEach(element => {
        if (!element.querySelector('.element-controls')) {
            const controls = document.createElement('div');
            controls.className = 'element-controls';
            controls.innerHTML = `
                <button class="control-btn" onclick="editElement(this)" title="Edit">E</button>
                <button class="control-btn delete" onclick="deleteElement(this)" title="Delete">×</button>
            `;
            element.appendChild(controls);
            element.onclick = (e) => {
                e.stopPropagation();
                if (window.selectElement) window.selectElement(element);
            };
        }
    });
}

export function deleteSelectedElement() {
    if (!state.selectedElement) {
        showToast('Select something first 👆');
        return;
    }
    
    const element = state.selectedElement;
    element.style.animation = 'fadeOut 0.2s ease forwards';
    setTimeout(() => {
        element.remove();
        state.selectedElement = null;
        if (window.updatePropertiesHint) window.updatePropertiesHint();
        saveState();
        refreshLayers();
        showToast('Gone! 👋');
    }, 200);
}

export function copyElement() {
    if (state.selectedElement) {
        state.copiedElement = state.selectedElement.cloneNode(true);
        showToast('📋 Copied! Ctrl+V to paste');
    }
}

export function pasteElement() {
    if (state.copiedElement) {
        const canvas = document.getElementById('canvas');
        const newElement = state.copiedElement.cloneNode(true);
        
        // Ensure it's not "selected" when pasted
        newElement.classList.remove('selected');
        
        // Remove existing handles if any
        newElement.querySelectorAll('.resize-handle-v').forEach(h => h.remove());

        canvas.appendChild(newElement);
        addControlsToElements();
        saveState();
        refreshLayers();
        showToast('📋 Pasted! ✨');
    }
}

export function moveElementUp() {
    if (!state.selectedElement) return;
    const el = state.selectedElement;
    const prev = el.previousElementSibling;
    if (prev && !prev.classList.contains('element-controls')) {
        el.parentNode.insertBefore(el, prev);
        saveState();
        refreshLayers();
        showToast('Moved up ⬆️');
    }
}

export function moveElementDown() {
    if (!state.selectedElement) return;
    const el = state.selectedElement;
    const next = el.nextElementSibling;
    if (next && !next.classList.contains('element-controls')) {
        el.parentNode.insertBefore(next, el);
        saveState();
        refreshLayers();
        showToast('Moved down ⬇️');
    }
}
