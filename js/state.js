export const state = {
    selectedElement: null,
    undoStack: [],
    redoStack: []
};

export function getThemeColors() {
    return {
        text: '#1a1b1e',
        textSecondary: '#4a4d55',
        background: '#fdfdfd',
        border: '#e9ecef',
        surface: '#ffffff'
    };
}
