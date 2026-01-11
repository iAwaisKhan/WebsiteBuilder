import { state } from '../state.js';
import { refreshLayers } from './layers.js';
import { showToast } from '../utils/helpers.js';

export function initContextMenu() {
    const menu = document.getElementById('contextMenu');
    const canvas = document.getElementById('canvas');

    canvas.addEventListener('contextmenu', (e) => {
        const element = e.target.closest('.canvas-element');
        if (element) {
            e.preventDefault();
            showMenu(e.clientX, e.clientY, element);
        } else {
            hideMenu();
        }
    });

    document.addEventListener('click', () => hideMenu());

    // Menu Actions
    document.getElementById('ctx-delete').onclick = () => {
        if (state.selectedElement && window.deleteElement) {
            window.deleteElement(state.selectedElement.querySelector('.delete-btn') || state.selectedElement);
            hideMenu();
        }
    };

    document.getElementById('ctx-duplicate').onclick = () => {
        if (state.selectedElement) {
            const clone = state.selectedElement.cloneNode(true);
            // Offset the clone slightly
            const top = parseInt(clone.style.top || 0) + 20;
            const left = parseInt(clone.style.left || 0) + 20;
            clone.style.top = top + 'px';
            clone.style.left = left + 'px';
            
            // Re-bind click event to clone
            clone.onclick = (e) => {
                e.stopPropagation();
                if (window.selectElement) window.selectElement(clone);
            };

            canvas.appendChild(clone);
            if (window.selectElement) window.selectElement(clone);
            if (window.saveState) window.saveState();
            refreshLayers();
            showToast('Element duplicated! 📋');
            hideMenu();
        }
    };

    document.getElementById('ctx-bring-front').onclick = () => {
        if (state.selectedElement) {
            const elements = Array.from(canvas.querySelectorAll('.canvas-element'));
            const maxZ = Math.max(...elements.map(el => parseInt(getComputedStyle(el).zIndex) || 0));
            state.selectedElement.style.zIndex = maxZ + 1;
            hideMenu();
        }
    };

    document.getElementById('ctx-send-back').onclick = () => {
        if (state.selectedElement) {
            const elements = Array.from(canvas.querySelectorAll('.canvas-element'));
            const minZ = Math.min(...elements.map(el => parseInt(getComputedStyle(el).zIndex) || 0));
            state.selectedElement.style.zIndex = Math.max(0, minZ - 1);
            hideMenu();
        }
    };
}

function showMenu(x, y, element) {
    const menu = document.getElementById('contextMenu');
    if (window.selectElement) window.selectElement(element);
    
    // Position menu
    menu.style.display = 'block';
    
    // Adjust position if it goes off screen
    const menuWidth = menu.offsetWidth;
    const menuHeight = menu.offsetHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    let finalX = x + scrollX;
    let finalY = y + scrollY;
    
    if (x + menuWidth > window.innerWidth) finalX = x - menuWidth + scrollX;
    if (y + menuHeight > window.innerHeight) finalY = y - menuHeight + scrollY;
    
    menu.style.left = finalX + 'px';
    menu.style.top = finalY + 'px';
}

function hideMenu() {
    const menu = document.getElementById('contextMenu');
    if (menu) menu.style.display = 'none';
}
