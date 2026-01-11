const GRID_SIZE = 20;

export function snapToGrid(value) {
    const useGrid = !document.getElementById('canvas').classList.contains('no-grid');
    if (!useGrid) return value;
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

export function addResizeHandles(element) {
    // Remove existing handles first
    removeResizeHandles(element);

    // Make element draggable if it's not already
    initDraggable(element);

    const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
    handles.forEach(type => {
        const handle = document.createElement('div');
        handle.className = `resize-handle-v handle-${type}`;
        handle.onmousedown = (e) => startResize(e, element, type);
        element.appendChild(handle);
    });
}

function initDraggable(element) {
    // Use a flag to avoid multiple listeners
    if (element.dataset.draggableInit) return;
    element.dataset.draggableInit = 'true';

    element.addEventListener('mousedown', (e) => {
        if (e.target.closest('.resize-handle-v') || e.target.closest('.element-controls')) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        if (window.selectElement) window.selectElement(element);

        const startX = e.clientX;
        const startY = e.clientY;
        const startTop = element.offsetTop;
        const startLeft = element.offsetLeft;

        function onMouseMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            element.style.left = snapToGrid(startLeft + dx) + 'px';
            element.style.top = snapToGrid(startTop + dy) + 'px';
            element.style.position = 'absolute';
            
            if (window.saveState) window.saveState();
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

export function removeResizeHandles(element) {
    if (!element) return;
    const handles = element.querySelectorAll('.resize-handle-v');
    handles.forEach(h => h.remove());
}

function startResize(e, element, type) {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.offsetWidth;
    const startHeight = element.offsetHeight;
    const startTop = element.offsetTop;
    const startLeft = element.offsetLeft;

    function onMouseMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (type.includes('e')) {
            element.style.width = snapToGrid(startWidth + dx) + 'px';
        }
        if (type.includes('w')) {
            const newWidth = snapToGrid(startWidth - dx);
            element.style.width = newWidth + 'px';
            element.style.left = snapToGrid(startLeft + (startWidth - newWidth)) + 'px';
        }
        if (type.includes('s')) {
            element.style.height = snapToGrid(startHeight + dy) + 'px';
        }
        if (type.includes('n')) {
            const newHeight = snapToGrid(startHeight - dy);
            element.style.height = newHeight + 'px';
            element.style.top = snapToGrid(startTop + (startHeight - newHeight)) + 'px';
        }
        
        if (window.saveState) window.saveState();
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}
