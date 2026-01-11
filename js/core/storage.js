import { showToast } from '../utils/helpers.js';

export function saveProject(canvas) {
    const data = canvas.innerHTML;
    localStorage.setItem('webbuilder_project', data);
    showToast('Project saved to local storage! 💾');
}

export function exportProjectAsJSON(canvas) {
    const data = {
        html: canvas.innerHTML,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webbuilder_project_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Project exported as JSON! 🚀');
}

export function importProjectFromJSON(canvas, file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.html) {
                canvas.innerHTML = data.html;
                showToast('Project imported successfully! ✨');
            }
        } catch (err) {
            showToast('Error importing project. Invalid file format. ❌');
        }
    };
    reader.readAsText(file);
}
