const AI_RESPONSES = {
    headline: [
        "Revolutionize Your Digital Strategy",
        "Design the Future of Your Brand",
        "Empower Your Team with AI Tools",
        "Build Faster, Dream Bigger",
        "The Next Generation of Web Design"
    ],
    bio: [
        "Passionate creator at the intersection of tech and art.",
        "Engineering scalable solutions for global brands.",
        "Designer focused on creating human-centric digital experiences.",
        "Building beautiful products that solve real problems.",
        "Art directing the most innovative startups in the valley."
    ],
    cta: [
        "Join 10,000+ happy customers today!",
        "Start your free 14-day trial",
        "Experience the magic for yourself",
        "Get started in under 5 minutes",
        "Claim your spot on the waitlist"
    ]
};

export async function generateContent(type) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const options = AI_RESPONSES[type] || AI_RESPONSES.headline;
    return options[Math.floor(Math.random() * options.length)];
}

export function applyAIContent(element, type) {
    if (!element) return;
    
    if (window.showToast) window.showToast('AI is thinking... 🧠');
    
    generateContent(type).then(content => {
        const textNode = element.querySelector('h1, h2, h3, p, span, button') || element;
        textNode.textContent = content;
        
        if (window.showToast) window.showToast('Content generated! ✨');
        if (window.saveState) window.saveState();
        if (window.livePreview) window.livePreview();
    });
}
