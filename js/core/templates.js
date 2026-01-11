import { getThemeColors } from '../state.js';
import { showToast } from '../utils/helpers.js';

export const templates = {
    portfolio: (colors) => `
        <div class="canvas-element animate-in" style="text-align: center; padding: 64px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px;">
            <h1 style="font-size: 56px; margin-bottom: 16px;">John Doe</h1>
            <p style="font-size: 24px; opacity: 0.9;">Full Stack Developer & Designer</p>
        </div>
        <div class="canvas-element animate-in" style="padding: 48px 24px;">
            <h2 style="font-size: 32px; margin-bottom: 24px; color: \${colors.text};">About Me</h2>
            <p style="font-size: 18px; line-height: 1.8; color: \${colors.textSecondary};">I'm a passionate developer with 5+ years of experience creating beautiful and functional web applications. I specialize in modern web technologies and love bringing ideas to life.</p>
        </div>
        <div class="canvas-element animate-in" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 24px;">
            <div style="padding: 24px; background: \${colors.surface}; border-radius: 12px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">💻</div>
                <h3 style="color: \${colors.text}; margin-bottom: 8px;">Web Development</h3>
                <p style="color: \${colors.textSecondary};">Building responsive websites</p>
            </div>
            <div style="padding: 24px; background: \${colors.surface}; border-radius: 12px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">🎨</div>
                <h3 style="color: \${colors.text}; margin-bottom: 8px;">UI/UX Design</h3>
                <p style="color: \${colors.textSecondary};">Creating beautiful interfaces</p>
            </div>
            <div style="padding: 24px; background: \${colors.surface}; border-radius: 12px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                <h3 style="color: \${colors.text}; margin-bottom: 8px;">Mobile Apps</h3>
                <p style="color: \${colors.textSecondary};">Developing mobile solutions</p>
            </div>
        </div>
    `,
    resume: (colors) => `
        <div class="resume-template" style="color: \${colors.text};">
            <div class="resume-header">
                <h1 class="resume-name" style="color: \${colors.text};">Jane Smith</h1>
                <div class="resume-contact" style="color: \${colors.textSecondary};">jane.smith@email.com | (555) 123-4567 | LinkedIn: /in/janesmith</div>
            </div>
            <div class="resume-section">
                <h2 class="resume-section-title" style="color: \${colors.text};">Professional Summary</h2>
                <p style="color: \${colors.textSecondary};">Results-driven professional with 8+ years of experience in software development and project management. Proven track record of delivering high-quality solutions and leading cross-functional teams.</p>
            </div>
            <div class="resume-section">
                <h2 class="resume-section-title" style="color: \${colors.text};">Experience</h2>
                <div class="resume-item">
                    <div class="resume-item-title" style="color: \${colors.text};">Senior Software Engineer | Tech Company Inc.</div>
                    <div class="resume-item-subtitle" style="color: \${colors.textSecondary};">January 2020 - Present</div>
                    <ul style="margin-top: 8px; color: \${colors.textSecondary};">
                        <li>Led development of scalable web applications serving 1M+ users</li>
                        <li>Mentored junior developers and conducted code reviews</li>
                        <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    // ... Simplified for space but will include key ones
    landing: (colors) => `
        <div class="canvas-element animate-in" style="padding: 80px 24px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); text-align: center; color: white; border-radius: 16px;">
            <h1 style="font-size: 56px; margin-bottom: 24px;">Launch Your Product</h1>
            <p style="font-size: 24px; margin-bottom: 32px; opacity: 0.95;">The all-in-one platform for modern businesses</p>
            <div style="display: flex; gap: 16px; justify-content: center;">
                <button style="padding: 16px 40px; background: white; color: #0891b2; border: none; border-radius: 8px; font-size: 18px; font-weight: 600; cursor: pointer;">Get Started Free</button>
            </div>
        </div>
    `
};

export function loadTemplate(type) {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    canvas.innerHTML = '';
    const colors = getThemeColors();
    
    if (templates[type]) {
        canvas.innerHTML = templates[type](colors);
        if (window.addControlsToElements) window.addControlsToElements();
        if (window.saveState) window.saveState();
        showToast(\`✨ \${type.charAt(0).toUpperCase() + type.slice(1)} template ready!\`);
    }
}
