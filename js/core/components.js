import { getThemeColors } from '../state.js';

export const ComponentRegistry = {
    heading: {
        create: (colors) => ({
            tag: 'h2',
            style: { color: colors.text, margin: '0' },
            content: 'New Heading'
        })
    },
    paragraph: {
        create: (colors) => ({
            tag: 'p',
            style: { color: colors.textSecondary, margin: '0' },
            content: 'This is a new paragraph. Click to edit the text and customize its appearance.'
        })
    },
    button: {
        create: () => ({
            tag: 'button',
            style: { padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
            content: 'Click Me'
        })
    },
    image: {
        create: () => ({
            tag: 'img',
            style: { width: '100%', borderRadius: '8px' },
            attributes: { src: 'https://via.placeholder.com/400x200?text=Image+Placeholder', alt: 'Placeholder' }
        })
    },
    container: {
        create: (colors) => ({
            tag: 'div',
            style: { padding: '48px 24px', background: colors.surface, border: `2px dashed ${colors.border}`, borderRadius: '12px', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
            content: 'Container - Drop elements here'
        })
    },
    form: {
        create: (colors) => {
            const form = document.createElement('form');
            form.style.padding = '20px';
            form.innerHTML = `
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: ${colors.text};">Email Address</label>
                    <input type="email" placeholder="hello@example.com" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid ${colors.border}; background: ${colors.background}; color: ${colors.text};">
                </div>
                <button type="button" style="width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">Subscribe</button>
            `;
            return { tag: 'div', element: form };
        }
    },
    card: {
        create: (colors) => ({
            tag: 'div',
            style: { padding: '24px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: '16px', boxShadow: 'var(--shadow-md)' },
            innerHTML: `
                <h3 style="margin: 0 0 12px 0; color: ${colors.text};">Card Title</h3>
                <p style="margin: 0; color: ${colors.textSecondary}; font-size: 14px; line-height: 1.6;">This is a premium card component. You can add images, text, or buttons inside it.</p>
            `
        })
    },
    navbar: {
        create: (colors) => ({
            tag: 'nav',
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: colors.surface, borderBottom: `1px solid ${colors.border}`, borderRadius: '8px' },
            innerHTML: `
                <div style="font-weight: 700; color: ${colors.text}; font-size: 20px;">LOGO</div>
                <div style="display: flex; gap: 24px; color: ${colors.textSecondary}; font-size: 14px; font-weight: 500;">
                    <span style="cursor: pointer;">Home</span>
                    <span style="cursor: pointer;">Features</span>
                    <span style="cursor: pointer;">Pricing</span>
                    <span style="cursor: pointer;">Contact</span>
                </div>
            `
        })
    }
};

export function createComponent(type) {
    const colors = getThemeColors();
    const config = ComponentRegistry[type];
    if (!config) return null;

    const data = config.create(colors);
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-element animate-in';
    
    let inner;
    if (data.element) {
        inner = data.element;
    } else {
        inner = document.createElement(data.tag);
        if (data.content) inner.textContent = data.content;
        if (data.innerHTML) inner.innerHTML = data.innerHTML;
        if (data.style) Object.assign(inner.style, data.style);
        if (data.attributes) {
            for (const [key, value] of Object.entries(data.attributes)) {
                inner.setAttribute(key, value);
            }
        }
    }

    wrapper.appendChild(inner);

    const controls = document.createElement('div');
    controls.className = 'element-controls';
    controls.innerHTML = `
        <button class="edit-btn" title="Edit">E</button>
        <button class="delete-btn" title="Delete">×</button>
    `;
    wrapper.appendChild(controls);

    // Event listeners for controls
    wrapper.querySelector('.edit-btn').onclick = (e) => {
        e.stopPropagation();
        if (window.selectElement) window.selectElement(wrapper);
    };
    
    wrapper.querySelector('.delete-btn').onclick = (e) => {
        e.stopPropagation();
        if (window.deleteElement) window.deleteElement(wrapper.querySelector('.delete-btn'));
    };

    wrapper.onclick = (e) => {
        e.stopPropagation();
        if (window.selectElement) window.selectElement(wrapper);
    };

    return wrapper;
}
