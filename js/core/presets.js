export const StylePresets = {
    modern: {
        name: 'Modern Clean',
        colors: {
            primary: '#6366f1',
            secondary: '#4f46e5',
            background: '#ffffff',
            surface: '#f8fafc',
            text: '#1e293b',
            textSecondary: '#64748b',
            border: '#e2e8f0'
        },
        fonts: {
            heading: "'Inter', sans-serif",
            body: "'Inter', sans-serif"
        }
    },
    midnight: {
        name: 'Midnight Dark',
        colors: {
            primary: '#8b5cf6',
            secondary: '#7c3aed',
            background: '#0f172a',
            surface: '#1e293b',
            text: '#f8fafc',
            textSecondary: '#94a3b8',
            border: '#334155'
        },
        fonts: {
            heading: "'Space Grotesk', sans-serif",
            body: "'Inter', sans-serif"
        }
    },
    playful: {
        name: 'Playful Bright',
        colors: {
            primary: '#ec4899',
            secondary: '#db2777',
            background: '#fffafb',
            surface: '#fff1f2',
            text: '#881337',
            textSecondary: '#be185d',
            border: '#fecdd3'
        },
        fonts: {
            heading: "'DM Sans', sans-serif",
            body: "'DM Sans', sans-serif"
        }
    },
    professional: {
        name: 'Business Pro',
        colors: {
            primary: '#0f172a',
            secondary: '#334155',
            background: '#ffffff',
            surface: '#f1f5f9',
            text: '#0f172a',
            textSecondary: '#475569',
            border: '#cbd5e1'
        },
        fonts: {
            heading: "'Inter', sans-serif",
            body: "'Inter', sans-serif"
        }
    }
};

export function applyPreset(presetId) {
    const preset = StylePresets[presetId];
    if (!preset) return;

    const root = document.documentElement;
    
    // Apply colors to CSS variables
    Object.entries(preset.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });

    // Apply fonts
    root.style.setProperty('--font-heading', preset.fonts.heading);
    root.style.setProperty('--font-body', preset.fonts.body);

    // Update state or trigger refresh if needed
    if (window.showToast) window.showToast(`Applied ${preset.name} preset! ✨`);
}
