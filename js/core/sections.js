export const SectionTemplates = {
    hero: {
        name: 'Modern Hero',
        icon: '🏠',
        render: (colors) => `
            <div class="canvas-element" style="padding: 80px 48px; text-align: center; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%); color: white; border-radius: 20px; position: relative;">
                <h1 style="font-size: 48px; font-weight: 800; margin-bottom: 20px;">Transform Your Digital Presence</h1>
                <p style="font-size: 20px; opacity: 0.9; max-width: 600px; margin: 0 auto 32px;">Build stunning websites in minutes with our intuitive drag-and-drop builder.</p>
                <div style="display: flex; gap: 16px; justify-content: center;">
                    <button style="padding: 14px 32px; background: white; color: ${colors.primary}; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Get Started</button>
                    <button style="padding: 14px 32px; background: transparent; color: white; border: 2px solid white; border-radius: 12px; font-weight: 600; cursor: pointer;">Learn More</button>
                </div>
            </div>
        `
    },
    features: {
        name: 'Feature Grid',
        icon: '⚡',
        render: (colors) => `
            <div class="canvas-element" style="padding: 64px 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                <div style="padding: 32px; background: ${colors.surface}; border-radius: 16px; text-align: center; border: 1px solid ${colors.border};">
                    <div style="font-size: 40px; margin-bottom: 16px;">🚀</div>
                    <h3 style="color: ${colors.text}; margin-bottom: 12px;">Fast Performance</h3>
                    <p style="color: ${colors.textSecondary};">Optimized for maximum speed and SEO efficiency.</p>
                </div>
                <div style="padding: 32px; background: ${colors.surface}; border-radius: 16px; text-align: center; border: 1px solid ${colors.border};">
                    <div style="font-size: 40px; margin-bottom: 16px;">🎨</div>
                    <h3 style="color: ${colors.text}; margin-bottom: 12px;">Intuitive Design</h3>
                    <p style="color: ${colors.textSecondary};">Beautifully crafted blocks ready for your content.</p>
                </div>
                <div style="padding: 32px; background: ${colors.surface}; border-radius: 16px; text-align: center; border: 1px solid ${colors.border};">
                    <div style="font-size: 40px; margin-bottom: 16px;">📱</div>
                    <h3 style="color: ${colors.text}; margin-bottom: 12px;">Fully Responsive</h3>
                    <p style="color: ${colors.textSecondary};">Looks perfect on every device, from mobile to desktop.</p>
                </div>
            </div>
        `
    },
    testimonials: {
        name: 'Testimonials',
        icon: '💬',
        render: (colors) => `
            <div class="canvas-element" style="padding: 64px 24px; background: ${colors.surface}; border-radius: 20px;">
                <h2 style="text-align: center; margin-bottom: 48px; color: ${colors.text};">What our clients say</h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
                    <div style="padding: 24px; background: ${colors.background}; border-radius: 12px; border: 1px solid ${colors.border};">
                        <p style="font-style: italic; color: ${colors.textSecondary}; margin-bottom: 20px;">"The best website builder I've ever used. Simple, powerful, and fun to use!"</p>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 48px; height: 48px; background: #cbd5e1; border-radius: 50%;"></div>
                            <div>
                                <div style="font-weight: 600; color: ${colors.text};">Sarah Johnson</div>
                                <div style="font-size: 14px; color: ${colors.textSecondary};">Product Designer</div>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 24px; background: ${colors.background}; border-radius: 12px; border: 1px solid ${colors.border};">
                        <p style="font-style: italic; color: ${colors.textSecondary}; margin-bottom: 20px;">"Customer support is top-notch and the quality of components is incredible."</p>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 48px; height: 48px; background: #cbd5e1; border-radius: 50%;"></div>
                            <div>
                                <div style="font-weight: 600; color: ${colors.text};">Michael Chen</div>
                                <div style="font-size: 14px; color: ${colors.textSecondary};">Startup Founder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    footer: {
        name: 'Clean Footer',
        icon: '🔚',
        render: (colors) => `
            <div class="canvas-element" style="padding: 48px 24px; background: ${colors.text}; color: white; border-radius: 16px 16px 0 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                    <div>
                        <div style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">WebBuilder</div>
                        <p style="opacity: 0.6; max-width: 300px;">Helping creators build the future of the web, one block at a time.</p>
                    </div>
                    <div style="display: flex; gap: 48px;">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 16px;">Product</div>
                            <div style="opacity: 0.6; line-height: 2;">Features<br>Templates<br>Pricing</div>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 16px;">Connect</div>
                            <div style="opacity: 0.6; line-height: 2;">Twitter<br>LinkedIn<br>Dribbble</div>
                        </div>
                    </div>
                </div>
                <div style="padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); opacity: 0.4; font-size: 14px; text-align: center;">
                    © 2024 WebBuilder AI. All rights reserved.
                </div>
            </div>
        `
    }
};

export function addSection(sectionId) {
    const template = SectionTemplates[sectionId];
    if (!template) return;

    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    // Remove empty state if exists
    const emptyState = canvas.querySelector('.canvas-empty-state');
    if (emptyState) emptyState.remove();

    // Get theme colors from state or window
    const colors = typeof window.getThemeColors === 'function' ? window.getThemeColors() : {
        primary: '#6366f1',
        secondary: '#4f46e5',
        surface: '#ffffff',
        text: '#1a1b1e',
        textSecondary: '#4a4d55',
        border: '#e9ecef',
        background: '#fdfdfd'
    };

    const sectionHTML = template.render(colors);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = sectionHTML.trim();
    const element = wrapper.firstChild;

    // Apply basic selection/draggable attributes
    element.classList.add('animate-in');
    element.onclick = (e) => {
        e.stopPropagation();
        if (window.selectElement) window.selectElement(element);
    };

    canvas.appendChild(element);
    
    if (window.saveState) window.saveState();
    if (window.refreshLayers) window.refreshLayers();
    if (window.showToast) window.showToast(`Added ${template.name}! ✨`);
}
