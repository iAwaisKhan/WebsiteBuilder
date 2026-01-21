import { getThemeColors, state } from '../state.js';

export const ComponentRegistry = {
    // Layout Elements
    row: {
        category: 'layout',
        name: 'Row',
        create: (colors) => ({
            tag: 'div',
            classes: ['flex-row'],
            style: { 
                display: 'flex', 
                gap: '20px', 
                padding: '24px', 
                minHeight: '100px', 
                backgroundColor: 'transparent',
                width: '100%'
            },
            content: ''
        })
    },
    column: {
        category: 'layout',
        name: 'Column',
        create: (colors) => ({
            tag: 'div',
            classes: ['flex-col'],
            style: { 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                flex: '1',
                padding: '12px',
                border: `1px dashed ${colors.border}`,
                minHeight: '80px',
                borderRadius: '8px'
            }
        })
    },
    grid: {
        category: 'layout',
        name: 'Grid (3-Col)',
        create: (colors) => ({
            tag: 'div',
            style: { 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px', 
                padding: '24px',
                width: '100%'
            },
            innerHTML: `
                <div style="min-height: 100px; border: 1px dashed ${colors.border}; border-radius: 8px;"></div>
                <div style="min-height: 100px; border: 1px dashed ${colors.border}; border-radius: 8px;"></div>
                <div style="min-height: 100px; border: 1px dashed ${colors.border}; border-radius: 8px;"></div>
            `
        })
    },
    // Content Elements
    heading: {
        category: 'content',
        name: 'Heading',
        create: (colors) => ({
            tag: 'h2',
            style: { color: colors.text, margin: '0', fontSize: '32px', fontWeight: '700' },
            content: 'Elevate Your Vision'
        })
    },
    paragraph: {
        category: 'content',
        name: 'Paragraph',
        create: (colors) => ({
            tag: 'p',
            style: { color: colors.textSecondary, margin: '0', lineHeight: '1.6', fontSize: '16px' },
            content: 'Craft stunning websites with our intuitive builder. Start with a template or build from scratch.'
        })
    },
    button: {
        category: 'content',
        name: 'Button',
        create: () => ({
            tag: 'button',
            style: { 
                padding: '14px 28px', 
                background: '#6366f1', 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '16px', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            },
            content: 'Get Started'
        })
    },
    image: {
        category: 'content',
        name: 'Image',
        create: () => ({
            tag: 'img',
            style: { width: '100%', borderRadius: '12px', objectFit: 'cover' },
            attributes: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', alt: 'Showcase' }
        })
    },
    avatar: {
        category: 'content',
        name: 'Avatar',
        create: (colors) => ({
            tag: 'div',
            classes: ['avatar'],
            innerHTML: `
                <img src="https://github.com/shadcn.png" alt="Avatar" class="avatar-image">
                <div class="avatar-badge" style="background: #10b981;"></div>
            `
        })
    },
    'avatar-group': {
        category: 'content',
        name: 'Avatar Group',
        create: (colors) => ({
            tag: 'div',
            classes: ['avatar-group'],
            innerHTML: `
                <div class="avatar"><img src="https://github.com/shadcn.png" class="avatar-image"></div>
                <div class="avatar"><img src="https://github.com/evilrabbit.png" class="avatar-image"></div>
                <div class="avatar"><img src="https://github.com/maxleiter.png" class="avatar-image"></div>
                <span class="avatar-group-count">+3</span>
            `
        })
    },
    // Interactive Elements
    card: {
        category: 'interactive',
        name: 'Feature Card',
        create: (colors) => ({
            tag: 'div',
            style: { 
                padding: '32px', 
                background: colors.surface, 
                border: `1px solid ${colors.border}`, 
                borderRadius: '24px', 
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            },
            innerHTML: `
                <div style="width: 48px; height: 48px; background: rgba(99, 102, 241, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6366f1; font-size: 24px;">✨</div>
                <h3 style="margin: 0; color: ${colors.text}; font-size: 20px;">Innovative Feature</h3>
                <p style="margin: 0; color: ${colors.textSecondary}; font-size: 14px; line-height: 1.6;">Build faster and smarter with our powerful suite of design tools and AI-driven insights.</p>
            `
        })
    },
    navbar: {
        category: 'sections',
        name: 'Classic Navigation',
        create: (colors) => ({
            tag: 'nav',
            style: { 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 40px', 
                background: colors.surface, 
                borderBottom: `1px solid ${colors.border}`, 
                borderRadius: '8px',
                width: '100%',
                position: 'sticky',
                top: '0',
                zIndex: '50'
            },
            innerHTML: `
                <div style="font-weight: 800; color: #6366f1; font-size: 22px; letter-spacing: -1px;">DESIGNER.</div>
                <div style="display: flex; gap: 32px; color: ${colors.textSecondary}; font-size: 15px; font-weight: 500;">
                    <span style="cursor: pointer; &:hover { color: #6366f1; }">Home</span>
                    <span style="cursor: pointer;">Solutions</span>
                    <span style="cursor: pointer;">Enterprise</span>
                    <span style="cursor: pointer;">Company</span>
                </div>
                <div>
                   <button style="padding: 10px 20px; border-radius: 8px; border: 1px solid ${colors.border}; background: transparent; color: ${colors.text}; font-weight: 600; cursor: pointer;">Sign In</button>
                </div>
            `
        })
    },
    hero: {
        category: 'sections',
        name: 'Impact Hero',
        create: (colors) => ({
            tag: 'section',
            style: {
                padding: '100px 40px',
                textAlign: 'center',
                backgroundColor: colors.surface,
                borderRadius: '20px',
                margin: '20px 0'
            },
            innerHTML: `
                <h1 style="font-size: 64px; font-weight: 800; color: ${colors.text}; margin-bottom: 24px; line-height: 1.1;">Create Amazing <br><span style="color: #6366f1;">Digital Experiences</span></h1>
                <p style="font-size: 20px; color: ${colors.textSecondary}; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">The all-in-one platform to design, build, and launch incredible websites that convert.</p>
                <div style="display: flex; gap: 16px; justify-content: center;">
                    <button style="padding: 16px 32px; background: #6366f1; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Start Free Trial</button>
                    <button style="padding: 16px 32px; background: transparent; border: 1px solid ${colors.border}; color: ${colors.text}; border-radius: 12px; font-weight: 600; cursor: pointer;">View Demo</button>
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
    const element = document.createElement(data.tag);
    
    // Set type identifier
    element.dataset.type = type;
    element.className = 'canvas-element animate-in';
    
    if (data.classes) {
        data.classes.forEach(cls => element.classList.add(cls));
    }
    
    if (data.content) element.textContent = data.content;
    if (data.innerHTML) element.innerHTML = data.innerHTML;
    if (data.style) Object.assign(element.style, data.style);
    
    if (data.attributes) {
        for (const [key, value] of Object.entries(data.attributes)) {
            element.setAttribute(key, value);
        }
    }

    // Accessibility Enhancements
    element.setAttribute('role', data.tag === 'button' ? 'button' : 'region');
    element.setAttribute('aria-label', data.name || type);
    element.tabIndex = 0; // Make focusable for keyboard users

    // Make content editable for text elements
    if (['H1', 'H2', 'H3', 'P', 'SPAN', 'BUTTON'].includes(data.tag)) {
        element.contentEditable = 'true';
        element.setAttribute('aria-multiline', 'true');
    }

    return element;
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
