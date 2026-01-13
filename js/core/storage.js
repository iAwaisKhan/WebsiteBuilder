import { showToast } from '../utils/helpers.js';

export function saveProject(canvas) {
    const data = canvas.innerHTML;
    localStorage.setItem('webbuilder_project', data);
    showToast('Project saved to local storage! 💾');
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
