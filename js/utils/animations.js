export const Animations = {
    fadeIn: { name: 'Fade In', class: 'anim-fade-in' },
    slideUp: { name: 'Slide Up', class: 'anim-slide-up' },
    slideInRight: { name: 'Slide In Right', class: 'anim-slide-in-right' },
    zoomIn: { name: 'Zoom In', class: 'anim-zoom-in' },
    bounce: { name: 'Bounce', class: 'anim-bounce' },
    pulse: { name: 'Pulse', class: 'anim-pulse' }
};

export function applyAnimation(element, animKey) {
    if (!element) return;
    const animation = Animations[animKey];
    
    // Remove all existing animation classes
    Object.values(Animations).forEach(a => element.classList.remove(a.class));
    
    if (animation) {
        element.classList.add(animation.class);
        // Store animation in data attribute for persistence
        element.dataset.animation = animKey;
        
        // Trigger reflow to restart animation
        element.style.animation = 'none';
        element.offsetHeight; // force reflow
        element.style.animation = null;
        
        if (window.showToast) window.showToast(`Applied ${animation.name}! ✦`);
    } else {
        delete element.dataset.animation;
    }
}

export function playAnimation(element) {
    const animKey = element?.dataset?.animation;
    if (animKey) {
        applyAnimation(element, animKey);
    }
}
