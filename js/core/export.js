import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';

/**
 * Exports the current canvas content as a production-ready HTML file.
 * This includes the cleaned HTML and necessary CSS.
 */
export function exportProductionHTML() {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        showToast('Canvas not found! 🚩');
        return;
    }

    // 1. Clone the canvas to preserve original editor state
    const clone = canvas.cloneNode(true);

    // 2. Clean up editor-specific elements and classes
    const cleanCanvas = (root) => {
        // Remove controls and handles (including building-specific variations)
        const noise = root.querySelectorAll('.element-controls, .resize-handle, .resize-handle-v, .selection-indicator, [class*="handle-"]');
        noise.forEach(el => el.remove());

        // Remove editor-specific classes
        const allElements = root.querySelectorAll('*');
        allElements.forEach(el => {
            el.classList.remove('selected');
            el.classList.remove('drag-over');
            el.classList.remove('animate-in');
            el.classList.remove('canvas-element-active');
            
            // If they have inline styles for editing, we keep them as they are essential for positioning
            // But we clean up data attributes if they are only for the builder
            delete el.dataset.id;
            delete el.dataset.draggableInit;
        });

        // Clean up the canvas wrapper itself
        root.classList.remove('canvas');
        root.classList.remove('no-grid');
        root.style.minHeight = '100vh';
        root.style.cursor = 'default';
        root.style.overflowY = 'auto';
        root.style.position = 'relative';
        root.style.backgroundColor = window.getComputedStyle(canvas).backgroundColor;
    };

    cleanCanvas(clone);

    // 3. Construct the full HTML document
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My WebBuilder Export</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Base Reset & Styles */
        :root {
            --color-primary: #000000;
            --color-accent: #6366f1;
            --color-background: #ffffff;
            --color-text: #111111;
            --font-main: 'Inter', sans-serif;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-main);
            background: var(--color-background);
            color: var(--color-text);
            line-height: 1.6;
        }

        /* Essential Canvas Element Styles for Production */
        .canvas-element {
            position: relative;
            transition: all 0.3s ease;
        }

        /* Navbar production styles */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        /* Ensure images are responsive */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }

        /* User-added CSS from styles.css (Simplified to essentials) */
        ${Array.from(document.styleSheets)
            .filter(sheet => sheet.href && sheet.href.includes('styles.css'))
            .map(sheet => {
                try {
                    return Array.from(sheet.cssRules)
                        .filter(rule => {
                            // Filter out editor-only rules if possible, but keeping it simple for now
                            const cssText = rule.cssText;
                            return !cssText.includes('.sidebar') && 
                                   !cssText.includes('.header') && 
                                   !cssText.includes('.panel') &&
                                   !cssText.includes('.preloader') &&
                                   !cssText.includes('.control-btn') &&
                                   !cssText.includes('.tab-btn');
                        })
                        .map(r => r.cssText)
                        .join('\\n');
                } catch (e) {
                    console.warn('Could not read styles, using fallback', e);
                    return '';
                }
            }).join('\\n')}
    </style>
</head>
<body>
    <main id="webbuilder-production-root">
        ${clone.innerHTML}
    </main>

    <!-- Production Scripts (Animations, etc.) -->
    <script>
        document.querySelectorAll('.canvas-element').forEach(el => {
            if (el.dataset.animation) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            observer.unobserve(el);
                        }
                    });
                });
                observer.observe(el);
            }
        });
    </script>
</body>
</html>`;

    // 4. Trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`webbuilder_site_\${new Date().getTime()}.html\`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Code exported successfully! 🚀✨');
}

/**
 * Exports the current project as a JSON file for later import.
 */
export function exportProjectAsJSON(canvas) {
    if (!canvas) canvas = document.getElementById('canvas');
    
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
    showToast('Project JSON exported! 🚀');
}
