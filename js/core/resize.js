export function addResizeHandles(element) {
    // Remove existing handles first
    removeResizeHandles(element);

    const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
    handles.forEach(type => {
        const handle = document.createElement('div');
        handle.className = `resize-handle-v handle-${type}`;
        handle.onmousedown = (e) => startResize(e, element, type);
        element.appendChild(handle);
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

        if (type.includes('e')) element.style.width = startWidth + dx + 'px';
        if (type.includes('w')) {
            element.style.width = startWidth - dx + 'px';
            element.style.left = startLeft + dx + 'px';
        }
        if (type.includes('s')) element.style.height = startHeight + dy + 'px';
        if (type.includes('n')) {
            element.style.height = startHeight - dy + 'px';
            element.style.top = startTop + dy + 'px';
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
