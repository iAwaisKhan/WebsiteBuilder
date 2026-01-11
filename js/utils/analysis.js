export function runSEOCheck(canvas) {
    const issues = [];
    const elements = canvas.querySelectorAll('.canvas-element');
    
    // Check H1
    const h1s = canvas.querySelectorAll('h1');
    if (h1s.length === 0) {
        issues.push({ type: 'error', message: 'Missing H1 heading. Every page should have exactly one H1.', impact: 'High' });
    } else if (h1s.length > 1) {
        issues.push({ type: 'warning', message: `Found ${h1s.length} H1 headings. It is recommended to have only one per page.`, impact: 'Medium' });
    }

    // Check Images
    const images = canvas.querySelectorAll('img');
    let missingAlt = 0;
    images.forEach(img => {
        if (!img.getAttribute('alt')) missingAlt++;
    });
    if (missingAlt > 0) {
        issues.push({ type: 'error', message: `${missingAlt} images are missing "alt" text descriptions.`, impact: 'High' });
    }

    // Check Links
    const links = canvas.querySelectorAll('a');
    links.forEach(link => {
        if (link.textContent.trim().toLowerCase() === 'click here') {
            issues.push({ type: 'warning', message: 'Avoid generic link text like "click here". Use descriptive anchor text.', impact: 'Low' });
        }
    });

    // Content length
    const text = canvas.innerText.trim();
    if (text.length < 300) {
        issues.push({ type: 'warning', message: 'Low content volume. Aim for at least 300 words for better ranking.', impact: 'Medium' });
    }

    return issues;
}

export function runAccessibilityCheck(canvas) {
    const issues = [];
    
    // Alt text (redundant with SEO but crucial for contrast/ARIAL)
    const images = canvas.querySelectorAll('img');
    images.forEach(img => {
        if (!img.getAttribute('alt')) {
            issues.push({ type: 'error', message: `Image missing alternative text: ${img.src.substring(0, 30)}...`, impact: 'Critical' });
        }
    });

    // Heading hierarchy
    const headings = Array.from(canvas.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;
    headings.forEach(h => {
        const level = parseInt(h.tagName[1]);
        if (level > lastLevel + 1 && lastLevel !== 0) {
            issues.push({ type: 'warning', message: `Skipped heading level: ${h.tagName} follows H${lastLevel}`, impact: 'Medium' });
        }
        lastLevel = level;
    });

    // Buttons/Links without text
    const interactive = canvas.querySelectorAll('button, a');
    interactive.forEach(el => {
        if (!el.innerText.trim() && !el.getAttribute('aria-label')) {
            issues.push({ type: 'error', message: `Interactive element (${el.tagName}) has no accessible name.`, impact: 'Critical' });
        }
    });

    // Color contrast (Simulated/Basic check for inline styles)
    const coloredElements = canvas.querySelectorAll('[style*="color"]');
    coloredElements.forEach(el => {
        const style = el.getAttribute('style');
        if (style.includes('color: #fff') || style.includes('color: white')) {
            const bg = el.closest('[style*="background"]');
            if (bg && (bg.style.background === '#fff' || bg.style.background === 'white')) {
                issues.push({ type: 'warning', message: 'Potential low contrast issue detected (Light on Light).', impact: 'High' });
            }
        }
    });

    return issues;
}

export function showAnalysisReport(type, issues) {
    const modal = document.getElementById('analysisModal');
    const title = document.getElementById('analysisTitle');
    const list = document.getElementById('analysisList');
    const scoreEl = document.getElementById('analysisScore');

    if (!modal || !list) return;

    title.innerText = type === 'seo' ? 'SEO Audit Report' : 'Accessibility Audit';
    list.innerHTML = '';
    
    if (issues.length === 0) {
        list.innerHTML = '<div class="analysis-success">✨ No issues found! Your site is perfectly optimized.</div>';
        scoreEl.innerText = '100';
    } else {
        issues.forEach(issue => {
            const item = document.createElement('div');
            item.className = `analysis-item ${issue.type}`;
            item.innerHTML = `
                <div class="analysis-impact ${issue.impact.toLowerCase()}">${issue.impact}</div>
                <div class="analysis-message">${issue.message}</div>
            `;
            list.appendChild(item);
        });
        
        const score = Math.max(0, 100 - (issues.length * 15));
        scoreEl.innerText = score;
    }

    modal.style.display = 'flex';
}
