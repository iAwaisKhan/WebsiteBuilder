export const state = {
    selectedElement: null,
    undoStack: [],
    redoStack: []
};

export function getThemeColors() {
    const isLight = document.body.classList.contains('light-mode');
    return {
        text: isLight ? '#1e293b' : '#f1f5f9',
        textSecondary: isLight ? '#64748b' : '#94a3b8',
        background: isLight ? '#ffffff' : '#334155',
        border: isLight ? '#e2e8f0' : '#475569',
        surface: isLight ? '#f8fafc' : '#1e293b'
    };
}
