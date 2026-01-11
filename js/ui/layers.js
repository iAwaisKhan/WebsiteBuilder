import { state } from '../state.js';

export function refreshLayers() {
    const canvas = document.getElementById('canvas');
    const layersList = document.getElementById('layersList');
    if (!canvas || !layersList) return;

    layersList.innerHTML = '';
    const elements = canvas.querySelectorAll('.canvas-element');

    if (elements.length === 0) {
        layersList.innerHTML = '<div class="empty-layers">No elements yet</div>';
        return;
    }

    elements.forEach((el, index) => {
        const item = document.createElement('div');
        item.className = 'layer-item';
        if (state.selectedElement === el) item.classList.add('active');

        const type = getElementType(el);
        item.innerHTML = `
            <span class="layer-icon">${getIconForType(type)}</span>
            <span class="layer-name">${type} ${index + 1}</span>
        `;

        item.onclick = (e) => {
            e.stopPropagation();
            if (window.selectElement) window.selectElement(el);
            refreshLayers();
        };

        layersList.appendChild(item);
    });
}

function getElementType(el) {
    const tag = el.querySelector('h1, h2, h3, p, button, img, form, nav, div')?.tagName.toLowerCase();
    const names = {
        'h1': 'Heading', 'h2': 'Heading', 'h3': 'Heading',
        'p': 'Text', 'button': 'Button', 'img': 'Image',
        'form': 'Form', 'nav': 'Navbar', 'div': 'Box'
    };
    return names[tag] || 'Element';
}

function getIconForType(type) {
    const icons = {
        'Heading': 'H', 'Text': 'T', 'Button': '▶',
        'Image': '▣', 'Box': '□', 'Form': '☰', 'Navbar': '≡'
    };
    return icons[type] || '•';
}
