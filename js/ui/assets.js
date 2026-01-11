export const AssetCategories = {
    images: [
        { name: 'Modern Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
        { name: 'Abstract Art', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80' },
        { name: 'Minimal Desk', url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=400&q=80' },
        { name: 'Tech Startup', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' },
        { name: 'Nature Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' }
    ],
    icons: [
        { name: 'Rocket', icon: '🚀' },
        { name: 'Heart', icon: '❤️' },
        { name: 'Star', icon: '⭐' },
        { name: 'Flash', icon: '⚡' },
        { name: 'Check', icon: '✅' },
        { name: 'Sparkles', icon: '✨' }
    ]
};

export function searchAssets(query, category = 'all') {
    const q = query.toLowerCase();
    let results = [];
    
    if (category === 'all' || category === 'images') {
        results = results.concat(AssetCategories.images.filter(img => img.name.toLowerCase().includes(q)));
    }
    if (category === 'all' || category === 'icons') {
        results = results.concat(AssetCategories.icons.filter(ico => ico.name.toLowerCase().includes(q)));
    }
    
    return results;
}

export function useAsset(asset, targetElement) {
    if (!targetElement) return;
    
    if (asset.url) {
        const img = targetElement.querySelector('img') || targetElement;
        if (img.tagName === 'IMG') {
            img.src = asset.url;
            if (window.showToast) window.showToast('Updated image! 🖼️');
        }
    } else if (asset.icon) {
        const textElement = targetElement.querySelector('span') || targetElement;
        textElement.textContent = asset.icon;
        if (window.showToast) window.showToast('Updated icon! ✨');
    }
    
    if (window.saveState) window.saveState();
}
