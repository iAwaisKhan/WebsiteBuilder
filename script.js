// Global State
let selectedElement = null;
let undoStack = [];
let redoStack = [];
let currentDevice = 'desktop';
let isDarkMode = true;

// User Profile State
let currentUser = null;
let userStats = {
    projects: 0,
    saves: 0,
    daysActive: 0,
    joinDate: null
};

// Template filtering
function filterTemplates(category) {
    // Update active tab
    document.querySelectorAll('.template-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    // Filter template items
    document.querySelectorAll('.template-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeSlideIn 0.3s ease forwards';
        } else {
            item.classList.add('hidden');
        }
    });
}

// Theme Management
function initTheme() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        isDarkMode = false;
        updateThemeIcon();
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update icon
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle .theme-icon');
    if (icon) {
        icon.textContent = isDarkMode ? '◐' : '◑';
    }
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', initTheme);

// Helper function to get current theme colors
function getThemeColors() {
    const isLight = document.body.classList.contains('light-mode');
    return {
        text: isLight ? '#1e293b' : '#f1f5f9',
        textSecondary: isLight ? '#64748b' : '#94a3b8',
        background: isLight ? '#ffffff' : '#334155',
        border: isLight ? '#e2e8f0' : '#475569',
        surface: isLight ? '#f8fafc' : '#1e293b'
    };
}

// Drag and Drop
function drag(event) {
    event.dataTransfer.setData('componentType', event.target.getAttribute('data-type'));
}

function allowDrop(event) {
    event.preventDefault();
    if (event.target.classList.contains('canvas') || event.target.classList.contains('canvas-element')) {
        event.target.classList.add('drag-over');
    }
}

function drop(event) {
    event.preventDefault();
    const componentType = event.dataTransfer.getData('componentType');
    
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    
    if (componentType) {
        createComponent(componentType);
    }
}

// Component Creation
function createComponent(type) {
    const canvas = document.getElementById('canvas');
    const element = document.createElement('div');
    element.className = 'canvas-element animate-in';
    element.onclick = (e) => {
        e.stopPropagation();
        selectElement(element);
    };

    const controls = document.createElement('div');
    controls.className = 'element-controls';
    controls.innerHTML = `
        <button class="control-btn" onclick="editElement(this)" title="Edit">E</button>
        <button class="control-btn delete" onclick="deleteElement(this)" title="Delete">×</button>
    `;
    element.appendChild(controls);

    const colors = getThemeColors();

    switch(type) {
        case 'heading':
            element.innerHTML += `<h2 style="color: ${colors.text}; margin: 0;">New Heading</h2>` + element.innerHTML;
            break;
        case 'paragraph':
            element.innerHTML += `<p style="color: ${colors.textSecondary}; margin: 0;">This is a new paragraph. Click to edit the text and customize its appearance.</p>` + element.innerHTML;
            break;
        case 'button':
            element.innerHTML += '<button style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;">Click Me</button>' + element.innerHTML;
            break;
        case 'image':
            element.innerHTML += '<img src="https://via.placeholder.com/400x200?text=Image+Placeholder" style="width: 100%; border-radius: 8px;" alt="Placeholder">' + element.innerHTML;
            break;
        case 'container':
            element.innerHTML += `<div style="padding: 24px; background: ${colors.surface}; border: 2px dashed ${colors.border}; border-radius: 8px; color: ${colors.textSecondary}; text-align: center;">Container - Drop elements here</div>` + element.innerHTML;
            break;
        case 'form':
            element.innerHTML += `
                <form style="color: ${colors.text};">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Name</label>
                        <input type="text" style="width: 100%; padding: 8px 12px; border: 1px solid ${colors.border}; border-radius: 6px; background: ${colors.background}; color: ${colors.text};">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                        <input type="email" style="width: 100%; padding: 8px 12px; border: 1px solid ${colors.border}; border-radius: 6px; background: ${colors.background}; color: ${colors.text};">
                    </div>
                    <button type="submit" style="padding: 10px 24px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">Submit</button>
                </form>
            ` + element.innerHTML;
            break;
        case 'card':
            element.innerHTML += `
                <div style="padding: 24px; background: ${colors.background}; border: 1px solid ${colors.border}; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h3 style="color: ${colors.text}; margin: 0 0 12px 0;">Card Title</h3>
                    <p style="color: ${colors.textSecondary}; margin: 0;">This is a card component with a title and description.</p>
                </div>
            ` + element.innerHTML;
            break;
        case 'navbar':
            element.innerHTML += `
                <nav style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: #1e293b; border-radius: 8px;">
                    <div style="color: white; font-weight: 600; font-size: 18px;">Brand</div>
                    <div style="display: flex; gap: 24px;">
                        <a href="#" style="color: white; text-decoration: none;">Home</a>
                        <a href="#" style="color: white; text-decoration: none;">About</a>
                        <a href="#" style="color: white; text-decoration: none;">Contact</a>
                    </div>
                </nav>
            ` + element.innerHTML;
            break;
    }

    canvas.appendChild(element);
    saveState();
    showToast('Component added successfully!');
}

// Element Selection
function selectElement(element) {
    // Remove selection from previous element
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    selectedElement = element;
    element.classList.add('selected');
    
    // Subtle pulse animation on selection
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'pulse 0.3s ease';
    
    // Load element properties into the panel
    loadElementProperties(element);
}

function deleteElement(button) {
    const element = button.closest('.canvas-element');
    element.style.transform = 'scale(0.95)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.25s ease';
    setTimeout(() => {
        element.remove();
        saveState();
        showToast('Element deleted');
    }, 250);
}

function editElement(button) {
    const element = button.closest('.canvas-element');
    selectElement(element);
    showToast('Element selected. Edit properties in the right panel.');
}

// Apply Properties
function applyProperties() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }

    const text = document.getElementById('elementText').value;
    const fontSize = document.getElementById('fontSize').value;
    const fontWeight = document.getElementById('fontWeight')?.value || '400';
    const textColor = document.getElementById('textColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const borderRadius = document.getElementById('borderRadius').value;
    const opacity = document.getElementById('opacity')?.value || 100;
    
    // Get individual padding values
    const paddingTop = document.getElementById('paddingTop')?.value || 16;
    const paddingRight = document.getElementById('paddingRight')?.value || 16;
    const paddingBottom = document.getElementById('paddingBottom')?.value || 16;
    const paddingLeft = document.getElementById('paddingLeft')?.value || 16;
    
    // Get individual margin values
    const marginTop = document.getElementById('marginTop')?.value || 0;
    const marginBottom = document.getElementById('marginBottom')?.value || 0;

    if (text) {
        const textElement = selectedElement.querySelector('h1, h2, h3, p, button, a, span');
        if (textElement) textElement.textContent = text;
    }

    selectedElement.style.fontSize = fontSize + 'px';
    selectedElement.style.fontWeight = fontWeight;
    selectedElement.style.color = textColor;
    selectedElement.style.backgroundColor = bgColor;
    selectedElement.style.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
    selectedElement.style.marginTop = marginTop + 'px';
    selectedElement.style.marginBottom = marginBottom + 'px';
    selectedElement.style.borderRadius = borderRadius + 'px';
    selectedElement.style.opacity = opacity / 100;

    saveState();
    showToast('Properties applied!');
}

// ===== OPTIMIZED PROPERTIES PANEL FUNCTIONS =====

// Toggle collapsible section
function toggleSection(header) {
    const section = header.closest('.properties-section');
    section.classList.toggle('collapsed');
}

// Live preview as user types/changes
function livePreview() {
    if (!selectedElement) return;
    
    // Debounce to avoid too many updates
    clearTimeout(window.livePreviewTimeout);
    window.livePreviewTimeout = setTimeout(() => {
        applyProperties();
    }, 150);
}

// Sync color picker with hex input
function syncColorInput(id) {
    const picker = document.getElementById(id);
    const hex = document.getElementById(id + 'Hex');
    if (picker && hex) {
        hex.value = picker.value.toUpperCase();
        livePreview();
    }
}

// Sync hex input with color picker
function syncColorPicker(id) {
    const picker = document.getElementById(id);
    const hex = document.getElementById(id + 'Hex');
    if (picker && hex && /^#[0-9A-Fa-f]{6}$/.test(hex.value)) {
        picker.value = hex.value;
        livePreview();
    }
}

// Set transparent background
function setTransparentBg() {
    if (selectedElement) {
        selectedElement.style.backgroundColor = 'transparent';
        document.getElementById('bgColor').value = '#ffffff';
        document.getElementById('bgColorHex').value = 'transparent';
        showToast('Background set to transparent');
    }
}

// Sync slider with input value
function syncSliderValue(id) {
    const slider = document.getElementById(id + 'Slider');
    const input = document.getElementById(id);
    if (slider && input) {
        input.value = slider.value;
        livePreview();
    }
}

// Sync input with slider
function syncSliderFromInput(id) {
    const slider = document.getElementById(id + 'Slider');
    const input = document.getElementById(id);
    if (slider && input) {
        slider.value = input.value;
        livePreview();
    }
}

// Set text alignment
function setTextAlign(align) {
    // Update toggle buttons
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === align);
    });
    
    if (selectedElement) {
        selectedElement.style.textAlign = align;
        saveState();
    }
}

// Link spacing values (make all sides equal)
function linkSpacing(type) {
    if (type === 'padding') {
        const value = document.getElementById('paddingTop').value;
        document.getElementById('paddingRight').value = value;
        document.getElementById('paddingBottom').value = value;
        document.getElementById('paddingLeft').value = value;
    } else {
        const value = document.getElementById('marginTop').value;
        document.getElementById('marginBottom').value = value;
    }
    livePreview();
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} values linked`);
}

// Element type change handler
function onElementTypeChange() {
    // Could be used to show/hide relevant options based on element type
    const type = document.getElementById('elementType').value;
    // Future: conditionally show image URL input for image type, etc.
}

// Duplicate selected element
function duplicateElement() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const clone = selectedElement.cloneNode(true);
    clone.classList.remove('selected');
    clone.style.animation = 'fadeSlideIn 0.3s ease';
    selectedElement.parentNode.insertBefore(clone, selectedElement.nextSibling);
    
    saveState();
    showToast('Element duplicated');
}

// Move element up
function moveElementUp() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const prev = selectedElement.previousElementSibling;
    if (prev && !prev.classList.contains('element-controls')) {
        selectedElement.parentNode.insertBefore(selectedElement, prev);
        saveState();
        showToast('Element moved up');
    }
}

// Move element down
function moveElementDown() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const next = selectedElement.nextElementSibling;
    if (next && !next.classList.contains('element-controls')) {
        selectedElement.parentNode.insertBefore(next, selectedElement);
        saveState();
        showToast('Element moved down');
    }
}

// Delete selected element
function deleteSelectedElement() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    selectedElement.style.animation = 'fadeOut 0.2s ease forwards';
    setTimeout(() => {
        selectedElement.remove();
        selectedElement = null;
        updatePropertiesHint();
        saveState();
        showToast('Element deleted');
    }, 200);
}

// Update properties panel hint
function updatePropertiesHint() {
    const hint = document.getElementById('propertiesHint');
    if (hint) {
        hint.textContent = selectedElement ? 'Editing: ' + getElementTypeName() : 'Select an element to edit';
    }
}

// Get element type name
function getElementTypeName() {
    if (!selectedElement) return '';
    const tag = selectedElement.querySelector('h1, h2, h3, p, button, img, div');
    if (!tag) return 'Element';
    
    const tagName = tag.tagName.toLowerCase();
    const names = {
        'h1': 'Heading 1',
        'h2': 'Heading 2', 
        'h3': 'Heading 3',
        'p': 'Paragraph',
        'button': 'Button',
        'img': 'Image',
        'div': 'Container'
    };
    return names[tagName] || 'Element';
}

// Load element properties into panel
function loadElementProperties(element) {
    if (!element) return;
    
    const computed = window.getComputedStyle(element);
    
    // Text content
    const textEl = element.querySelector('h1, h2, h3, p, button, a, span');
    if (textEl) {
        document.getElementById('elementText').value = textEl.textContent;
    }
    
    // Font size
    const fontSize = parseInt(computed.fontSize);
    document.getElementById('fontSize').value = fontSize;
    
    // Font weight
    const fontWeight = document.getElementById('fontWeight');
    if (fontWeight) fontWeight.value = computed.fontWeight;
    
    // Colors
    const textColor = rgbToHex(computed.color);
    document.getElementById('textColor').value = textColor;
    document.getElementById('textColorHex').value = textColor.toUpperCase();
    
    const bgColor = computed.backgroundColor === 'transparent' || computed.backgroundColor === 'rgba(0, 0, 0, 0)' 
        ? '#ffffff' 
        : rgbToHex(computed.backgroundColor);
    document.getElementById('bgColor').value = bgColor;
    document.getElementById('bgColorHex').value = bgColor.toUpperCase();
    
    // Border radius
    const borderRadius = parseInt(computed.borderRadius) || 0;
    document.getElementById('borderRadius').value = borderRadius;
    if (document.getElementById('borderRadiusSlider')) {
        document.getElementById('borderRadiusSlider').value = borderRadius;
    }
    
    // Opacity
    const opacity = Math.round(parseFloat(computed.opacity) * 100);
    if (document.getElementById('opacity')) {
        document.getElementById('opacity').value = opacity;
    }
    if (document.getElementById('opacitySlider')) {
        document.getElementById('opacitySlider').value = opacity;
    }
    
    // Padding
    const paddingTop = parseInt(computed.paddingTop) || 0;
    const paddingRight = parseInt(computed.paddingRight) || 0;
    const paddingBottom = parseInt(computed.paddingBottom) || 0;
    const paddingLeft = parseInt(computed.paddingLeft) || 0;
    
    if (document.getElementById('paddingTop')) {
        document.getElementById('paddingTop').value = paddingTop;
        document.getElementById('paddingRight').value = paddingRight;
        document.getElementById('paddingBottom').value = paddingBottom;
        document.getElementById('paddingLeft').value = paddingLeft;
    }
    
    // Margin
    const marginTop = parseInt(computed.marginTop) || 0;
    const marginBottom = parseInt(computed.marginBottom) || 0;
    
    if (document.getElementById('marginTop')) {
        document.getElementById('marginTop').value = marginTop;
        document.getElementById('marginBottom').value = marginBottom;
    }
    
    // Text align buttons
    const textAlign = computed.textAlign;
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === textAlign);
    });
    
    // Update hint
    updatePropertiesHint();
}

// RGB to Hex converter
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';
    
    return '#' + result.slice(0, 3).map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Apply Animation
function applyAnimation() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }

    const animationType = document.getElementById('animationType').value;
    
    if (animationType !== 'none') {
        selectedElement.style.animation = `${animationType} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`;
        showToast(`Animation "${animationType}" applied!`);
    } else {
        selectedElement.style.animation = '';
        showToast('Animation removed');
    }
}

// Device Switching
function setDevice(device) {
    currentDevice = device;
    const canvas = document.getElementById('canvas');
    const buttons = document.querySelectorAll('.device-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    canvas.classList.remove('mobile', 'tablet');
    if (device !== 'desktop') {
        canvas.classList.add(device);
    }
    
    showToast(`Switched to ${device} view`);
}

// Zoom
function setZoom(value) {
    const canvas = document.getElementById('canvas');
    canvas.style.transform = `scale(${value / 100})`;
    canvas.style.transformOrigin = 'top center';
    document.getElementById('zoomValue').textContent = value + '%';
}

// Templates
function loadTemplate(type) {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    
    const colors = getThemeColors();

    switch(type) {
        case 'portfolio':
            canvas.innerHTML = `
                <div class="canvas-element animate-in" style="text-align: center; padding: 64px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px;">
                    <h1 style="font-size: 56px; margin-bottom: 16px;">John Doe</h1>
                    <p style="font-size: 24px; opacity: 0.9;">Full Stack Developer & Designer</p>
                </div>
                <div class="canvas-element animate-in" style="padding: 48px 24px;">
                    <h2 style="font-size: 32px; margin-bottom: 24px; color: ${colors.text};">About Me</h2>
                    <p style="font-size: 18px; line-height: 1.8; color: ${colors.textSecondary};">I'm a passionate developer with 5+ years of experience creating beautiful and functional web applications. I specialize in modern web technologies and love bringing ideas to life.</p>
                </div>
                <div class="canvas-element animate-in" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 24px;">
                    <div style="padding: 24px; background: ${colors.surface}; border-radius: 12px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">💻</div>
                        <h3 style="color: ${colors.text}; margin-bottom: 8px;">Web Development</h3>
                        <p style="color: ${colors.textSecondary};">Building responsive websites</p>
                    </div>
                    <div style="padding: 24px; background: ${colors.surface}; border-radius: 12px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🎨</div>
                        <h3 style="color: ${colors.text}; margin-bottom: 8px;">UI/UX Design</h3>
                        <p style="color: ${colors.textSecondary};">Creating beautiful interfaces</p>
                    </div>
                    <div style="padding: 24px; background: ${colors.surface}; border-radius: 12px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                        <h3 style="color: ${colors.text}; margin-bottom: 8px;">Mobile Apps</h3>
                        <p style="color: ${colors.textSecondary};">Developing mobile solutions</p>
                    </div>
                </div>
            `;
            break;

        case 'resume':
            canvas.innerHTML = `
                <div class="resume-template" style="color: ${colors.text};">
                    <div class="resume-header">
                        <h1 class="resume-name" style="color: ${colors.text};">Jane Smith</h1>
                        <div class="resume-contact" style="color: ${colors.textSecondary};">jane.smith@email.com | (555) 123-4567 | LinkedIn: /in/janesmith</div>
                    </div>
                    
                    <div class="resume-section">
                        <h2 class="resume-section-title" style="color: ${colors.text};">Professional Summary</h2>
                        <p style="color: ${colors.textSecondary};">Results-driven professional with 8+ years of experience in software development and project management. Proven track record of delivering high-quality solutions and leading cross-functional teams.</p>
                    </div>
                    
                    <div class="resume-section">
                        <h2 class="resume-section-title" style="color: ${colors.text};">Experience</h2>
                        <div class="resume-item">
                            <div class="resume-item-title" style="color: ${colors.text};">Senior Software Engineer | Tech Company Inc.</div>
                            <div class="resume-item-subtitle" style="color: ${colors.textSecondary};">January 2020 - Present</div>
                            <ul style="margin-top: 8px; color: ${colors.textSecondary};">
                                <li>Led development of scalable web applications serving 1M+ users</li>
                                <li>Mentored junior developers and conducted code reviews</li>
                                <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                            </ul>
                        </div>
                        <div class="resume-item">
                            <div class="resume-item-title" style="color: ${colors.text};">Software Developer | StartUp Co.</div>
                            <div class="resume-item-subtitle" style="color: ${colors.textSecondary};">June 2016 - December 2019</div>
                            <ul style="margin-top: 8px; color: ${colors.textSecondary};">
                                <li>Developed RESTful APIs and microservices architecture</li>
                                <li>Collaborated with design team to implement responsive UIs</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h2 class="resume-section-title" style="color: ${colors.text};">Education</h2>
                        <div class="resume-item">
                            <div class="resume-item-title" style="color: ${colors.text};">Bachelor of Science in Computer Science</div>
                            <div class="resume-item-subtitle" style="color: ${colors.textSecondary};">University Name, 2012-2016</div>
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h2 class="resume-section-title" style="color: ${colors.text};">Skills</h2>
                        <p style="color: ${colors.textSecondary};">JavaScript, React, Node.js, Python, SQL, AWS, Docker, Git, Agile/Scrum</p>
                    </div>
                </div>
            `;
            break;

        case 'resume-modern':
            canvas.innerHTML = `
                <div class="resume-template modern-resume" style="color: ${colors.text}; display: grid; grid-template-columns: 1fr 2fr; gap: 0;">
                    <!-- Left Sidebar -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 24px;">
                        <div style="text-align: center; margin-bottom: 32px;">
                            <div style="width: 120px; height: 120px; border-radius: 50%; background: white; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 48px;">👤</div>
                            <h1 style="font-size: 28px; margin-bottom: 8px;">Alex Johnson</h1>
                            <p style="opacity: 0.9; font-size: 16px;">UX/UI Designer</p>
                        </div>
                        
                        <div style="margin-bottom: 32px;">
                            <h3 style="font-size: 18px; margin-bottom: 16px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Contact</h3>
                            <div style="font-size: 14px; line-height: 2;">
                                <p>📧 alex.j@email.com</p>
                                <p>📱 (555) 234-5678</p>
                                <p>🌐 alexjohnson.design</p>
                                <p>📍 San Francisco, CA</p>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 32px;">
                            <h3 style="font-size: 18px; margin-bottom: 16px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Skills</h3>
                            <div style="font-size: 14px;">
                                <div style="margin-bottom: 12px;">
                                    <p style="margin-bottom: 4px;">Figma • Adobe XD</p>
                                    <div style="background: rgba(255,255,255,0.3); height: 6px; border-radius: 3px;"><div style="background: white; width: 95%; height: 100%; border-radius: 3px;"></div></div>
                                </div>
                                <div style="margin-bottom: 12px;">
                                    <p style="margin-bottom: 4px;">UI Design</p>
                                    <div style="background: rgba(255,255,255,0.3); height: 6px; border-radius: 3px;"><div style="background: white; width: 90%; height: 100%; border-radius: 3px;"></div></div>
                                </div>
                                <div style="margin-bottom: 12px;">
                                    <p style="margin-bottom: 4px;">Prototyping</p>
                                    <div style="background: rgba(255,255,255,0.3); height: 6px; border-radius: 3px;"><div style="background: white; width: 85%; height: 100%; border-radius: 3px;"></div></div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 18px; margin-bottom: 16px; border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 8px;">Languages</h3>
                            <div style="font-size: 14px; line-height: 2;">
                                <p>English - Native</p>
                                <p>Spanish - Fluent</p>
                                <p>French - Basic</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Content -->
                    <div style="padding: 40px;">
                        <div style="margin-bottom: 32px;">
                            <h2 style="color: #667eea; font-size: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Profile</h2>
                            <p style="color: ${colors.textSecondary}; line-height: 1.6;">Creative and detail-oriented UX/UI Designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design and creating products that delight users.</p>
                        </div>
                        
                        <div style="margin-bottom: 32px;">
                            <h2 style="color: #667eea; font-size: 20px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
                            <div style="margin-bottom: 24px;">
                                <h3 style="color: ${colors.text}; font-size: 18px; margin-bottom: 4px;">Senior UX Designer</h3>
                                <p style="color: #667eea; font-size: 14px; margin-bottom: 4px;">Tech Innovations Inc. | 2021 - Present</p>
                                <ul style="color: ${colors.textSecondary}; font-size: 14px; line-height: 1.8; margin-left: 20px;">
                                    <li>Led redesign of mobile app increasing user engagement by 45%</li>
                                    <li>Managed team of 5 designers on multiple concurrent projects</li>
                                    <li>Established design system used across 12 products</li>
                                </ul>
                            </div>
                            <div style="margin-bottom: 24px;">
                                <h3 style="color: ${colors.text}; font-size: 18px; margin-bottom: 4px;">UX Designer</h3>
                                <p style="color: #667eea; font-size: 14px; margin-bottom: 4px;">Creative Studios | 2018 - 2021</p>
                                <ul style="color: ${colors.textSecondary}; font-size: 14px; line-height: 1.8; margin-left: 20px;">
                                    <li>Designed user interfaces for 20+ client projects</li>
                                    <li>Conducted user research and usability testing</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <h2 style="color: #667eea; font-size: 20px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
                            <div>
                                <h3 style="color: ${colors.text}; font-size: 18px; margin-bottom: 4px;">Bachelor of Fine Arts in Design</h3>
                                <p style="color: ${colors.textSecondary}; font-size: 14px;">California College of the Arts | 2014 - 2018</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'resume-creative':
            canvas.innerHTML = `
                <div class="resume-template creative-resume" style="color: ${colors.text}; padding: 48px; background: ${colors.surface};">
                    <!-- Header with creative design -->
                    <div style="text-align: center; margin-bottom: 48px; position: relative;">
                        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 48px; border-radius: 24px; box-shadow: 0 20px 60px rgba(255,154,158,0.3);">
                            <h1 style="font-size: 48px; color: white; margin-bottom: 8px; font-weight: 800;">Maya Chen</h1>
                            <p style="font-size: 24px; color: white; opacity: 0.95; font-weight: 300;">Graphic Designer & Illustrator</p>
                            <div style="margin-top: 24px; display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
                                <span style="color: white; font-size: 14px;">✉️ maya.chen@creative.io</span>
                                <span style="color: white; font-size: 14px;">🔗 behance.net/mayachen</span>
                                <span style="color: white; font-size: 14px;">📍 Brooklyn, NY</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Creative About Section -->
                    <div style="margin-bottom: 40px; text-align: center;">
                        <h2 style="color: #ff9a9e; font-size: 28px; margin-bottom: 16px; font-weight: 700;">✨ About Me</h2>
                        <p style="color: ${colors.textSecondary}; font-size: 16px; line-height: 1.8; max-width: 800px; margin: 0 auto;">Award-winning designer with a passion for creating visually stunning and impactful designs. Specialized in branding, illustration, and digital art with 7+ years of experience working with global brands.</p>
                    </div>
                    
                    <!-- Experience with visual flair -->
                    <div style="margin-bottom: 40px;">
                        <h2 style="color: #ff9a9e; font-size: 28px; margin-bottom: 24px; font-weight: 700; text-align: center;">🎨 Creative Journey</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                            <div style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); padding: 24px; border-radius: 16px; color: white;">
                                <h3 style="font-size: 20px; margin-bottom: 8px;">Lead Designer</h3>
                                <p style="opacity: 0.9; font-size: 14px; margin-bottom: 12px;">Creative Agency Co. | 2020 - Present</p>
                                <ul style="font-size: 14px; line-height: 1.8; opacity: 0.95;">
                                    <li>Art directed 50+ brand campaigns</li>
                                    <li>Won 3 international design awards</li>
                                    <li>Mentored 8 junior designers</li>
                                </ul>
                            </div>
                            <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 24px; border-radius: 16px; color: white;">
                                <h3 style="font-size: 20px; margin-bottom: 8px;">Senior Designer</h3>
                                <p style="opacity: 0.9; font-size: 14px; margin-bottom: 12px;">Digital Studio | 2017 - 2020</p>
                                <ul style="font-size: 14px; line-height: 1.8; opacity: 0.95;">
                                    <li>Created brand identities for 30+ clients</li>
                                    <li>Illustration work featured in major publications</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Skills with icons -->
                    <div style="margin-bottom: 40px;">
                        <h2 style="color: #ff9a9e; font-size: 28px; margin-bottom: 24px; font-weight: 700; text-align: center;">💡 Skills & Tools</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
                            <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Adobe Illustrator</span>
                            <span style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Photoshop</span>
                            <span style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Procreate</span>
                            <span style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Brand Identity</span>
                            <span style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Typography</span>
                            <span style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); color: white; padding: 10px 20px; border-radius: 20px; font-size: 14px;">Digital Illustration</span>
                        </div>
                    </div>
                    
                    <!-- Education -->
                    <div style="text-align: center;">
                        <h2 style="color: #ff9a9e; font-size: 28px; margin-bottom: 16px; font-weight: 700;">🎓 Education</h2>
                        <div style="background: ${colors.background}; padding: 24px; border-radius: 16px; border: 2px solid #ff9a9e; display: inline-block;">
                            <h3 style="color: ${colors.text}; font-size: 20px; margin-bottom: 8px;">BFA in Graphic Design</h3>
                            <p style="color: ${colors.textSecondary}; font-size: 14px;">Rhode Island School of Design | 2013 - 2017</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'resume-executive':
            canvas.innerHTML = `
                <div class="resume-template executive-resume" style="color: ${colors.text}; max-width: 900px; margin: 0 auto;">
                    <!-- Executive Header -->
                    <div style="border-bottom: 4px solid #d97706; padding-bottom: 24px; margin-bottom: 32px;">
                        <h1 style="font-size: 42px; color: ${colors.text}; margin-bottom: 8px; font-weight: 700;">ROBERT ANDERSON</h1>
                        <p style="font-size: 22px; color: #d97706; margin-bottom: 16px; font-weight: 500;">Chief Technology Officer</p>
                        <div style="display: flex; gap: 32px; flex-wrap: wrap; color: ${colors.textSecondary}; font-size: 14px;">
                            <span>📧 r.anderson@executive.com</span>
                            <span>📱 (555) 876-5432</span>
                            <span>🔗 linkedin.com/in/robertanderson</span>
                            <span>📍 Boston, MA</span>
                        </div>
                    </div>
                    
                    <!-- Executive Summary -->
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 20px; color: ${colors.text}; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Executive Summary</h2>
                        <p style="color: ${colors.textSecondary}; line-height: 1.8; font-size: 15px;">Distinguished technology executive with 15+ years of progressive leadership experience. Proven track record of driving digital transformation, scaling engineering teams from 20 to 200+, and delivering $50M+ in revenue growth through innovative product strategies.</p>
                    </div>
                    
                    <!-- Core Competencies -->
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 20px; color: ${colors.text}; margin-bottom: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Core Competencies</h2>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Strategic Planning</div>
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Team Leadership</div>
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Digital Transformation</div>
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Product Strategy</div>
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Cloud Architecture</div>
                            <div style="background: ${colors.surface}; padding: 12px; border-left: 4px solid #d97706; font-size: 14px; color: ${colors.textSecondary};">Budget Management</div>
                        </div>
                    </div>
                    
                    <!-- Professional Experience -->
                    <div style="margin-bottom: 32px;">
                        <h2 style="font-size: 20px; color: ${colors.text}; margin-bottom: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Professional Experience</h2>
                        
                        <div style="margin-bottom: 28px; border-left: 3px solid #d97706; padding-left: 20px;">
                            <h3 style="color: ${colors.text}; font-size: 18px; font-weight: 700; margin-bottom: 4px;">Chief Technology Officer</h3>
                            <p style="color: #d97706; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Enterprise Tech Solutions | 2019 - Present</p>
                            <ul style="color: ${colors.textSecondary}; line-height: 1.8; font-size: 14px; margin-left: 20px;">
                                <li>Spearheaded company-wide digital transformation initiative, resulting in 40% operational efficiency improvement</li>
                                <li>Grew engineering team from 45 to 180 members while maintaining high performance standards</li>
                                <li>Led development of cloud-native platform serving 5M+ users with 99.99% uptime</li>
                                <li>Managed $20M technology budget with strategic vendor partnerships</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 28px; border-left: 3px solid #d97706; padding-left: 20px;">
                            <h3 style="color: ${colors.text}; font-size: 18px; font-weight: 700; margin-bottom: 4px;">Vice President of Engineering</h3>
                            <p style="color: #d97706; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Global Tech Corp | 2015 - 2019</p>
                            <ul style="color: ${colors.textSecondary}; line-height: 1.8; font-size: 14px; margin-left: 20px;">
                                <li>Directed engineering strategy for 3 product lines generating $100M+ annual revenue</li>
                                <li>Implemented DevOps culture reducing time-to-market by 60%</li>
                                <li>Established offshore development centers in 2 countries</li>
                            </ul>
                        </div>
                        
                        <div style="border-left: 3px solid #d97706; padding-left: 20px;">
                            <h3 style="color: ${colors.text}; font-size: 18px; font-weight: 700; margin-bottom: 4px;">Director of Software Development</h3>
                            <p style="color: #d97706; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Innovation Labs Inc. | 2010 - 2015</p>
                            <ul style="color: ${colors.textSecondary}; line-height: 1.8; font-size: 14px; margin-left: 20px;">
                                <li>Built and led cross-functional teams of 50+ engineers and product managers</li>
                                <li>Launched 5 successful enterprise products with 95% customer satisfaction</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Education & Certifications -->
                    <div>
                        <h2 style="font-size: 20px; color: ${colors.text}; margin-bottom: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Education & Certifications</h2>
                        <div style="margin-bottom: 12px;">
                            <h3 style="color: ${colors.text}; font-size: 16px; font-weight: 600;">Master of Business Administration (MBA)</h3>
                            <p style="color: ${colors.textSecondary}; font-size: 14px;">Harvard Business School | 2009</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <h3 style="color: ${colors.text}; font-size: 16px; font-weight: 600;">Bachelor of Science in Computer Science</h3>
                            <p style="color: ${colors.textSecondary}; font-size: 14px;">MIT | 2003</p>
                        </div>
                        <div>
                            <p style="color: ${colors.textSecondary}; font-size: 14px;"><strong>Certifications:</strong> AWS Solutions Architect Professional, PMP, Certified Scrum Master</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'resume-minimalist':
            canvas.innerHTML = `
                <div class="resume-template minimalist-resume" style="color: ${colors.text}; max-width: 800px; margin: 0 auto; padding: 48px 32px; font-family: 'Helvetica Neue', Arial, sans-serif;">
                    <!-- Minimalist Header -->
                    <div style="margin-bottom: 48px;">
                        <h1 style="font-size: 36px; color: ${colors.text}; margin-bottom: 4px; font-weight: 300; letter-spacing: -1px;">Emily Parker</h1>
                        <p style="font-size: 16px; color: ${colors.textSecondary}; margin-bottom: 16px;">Software Engineer</p>
                        <div style="font-size: 13px; color: ${colors.textSecondary}; display: flex; gap: 16px; flex-wrap: wrap;">
                            <span>emily.parker@email.com</span>
                            <span>•</span>
                            <span>+1 (555) 321-9876</span>
                            <span>•</span>
                            <span>github.com/emilyparker</span>
                        </div>
                    </div>
                    
                    <!-- Summary -->
                    <div style="margin-bottom: 40px;">
                        <p style="color: ${colors.textSecondary}; line-height: 1.7; font-size: 14px;">Full-stack software engineer with 5 years of experience building scalable web applications. Focused on clean code, performance optimization, and user experience. Passionate about open-source contribution and continuous learning.</p>
                    </div>
                    
                    <!-- Experience -->
                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 14px; color: ${colors.text}; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${colors.border}; padding-bottom: 8px;">Experience</h2>
                        
                        <div style="margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <h3 style="color: ${colors.text}; font-size: 15px; font-weight: 600;">Senior Software Engineer</h3>
                                <span style="color: ${colors.textSecondary}; font-size: 13px;">2021 - Present</span>
                            </div>
                            <p style="color: ${colors.textSecondary}; font-size: 14px; margin-bottom: 8px; font-style: italic;">Tech Company Inc., Remote</p>
                            <ul style="color: ${colors.textSecondary}; font-size: 13px; line-height: 1.8; margin-left: 20px;">
                                <li>Architected and implemented microservices infrastructure serving 2M+ users</li>
                                <li>Reduced API response time by 70% through optimization and caching strategies</li>
                                <li>Mentored 4 junior engineers and conducted technical interviews</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                <h3 style="color: ${colors.text}; font-size: 15px; font-weight: 600;">Software Engineer</h3>
                                <span style="color: ${colors.textSecondary}; font-size: 13px;">2019 - 2021</span>
                            </div>
                            <p style="color: ${colors.textSecondary}; font-size: 14px; margin-bottom: 8px; font-style: italic;">Startup Labs, San Francisco, CA</p>
                            <ul style="color: ${colors.textSecondary}; font-size: 13px; line-height: 1.8; margin-left: 20px;">
                                <li>Built RESTful APIs using Node.js and Express serving 100K+ daily requests</li>
                                <li>Implemented CI/CD pipelines with Jenkins and Docker</li>
                                <li>Collaborated with design team to create responsive React interfaces</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Skills -->
                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 14px; color: ${colors.text}; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${colors.border}; padding-bottom: 8px;">Skills</h2>
                        <div style="font-size: 13px; color: ${colors.textSecondary}; line-height: 2;">
                            <p><strong style="color: ${colors.text};">Languages:</strong> JavaScript, TypeScript, Python, Go, SQL</p>
                            <p><strong style="color: ${colors.text};">Frameworks:</strong> React, Node.js, Express, Next.js, Django</p>
                            <p><strong style="color: ${colors.text};">Tools:</strong> Git, Docker, Kubernetes, AWS, PostgreSQL, MongoDB</p>
                            <p><strong style="color: ${colors.text};">Practices:</strong> Agile, TDD, CI/CD, Code Review, System Design</p>
                        </div>
                    </div>
                    
                    <!-- Education -->
                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 14px; color: ${colors.text}; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${colors.border}; padding-bottom: 8px;">Education</h2>
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <h3 style="color: ${colors.text}; font-size: 15px; font-weight: 600; margin-bottom: 4px;">B.S. Computer Science</h3>
                                <p style="color: ${colors.textSecondary}; font-size: 13px;">Stanford University</p>
                            </div>
                            <span style="color: ${colors.textSecondary}; font-size: 13px;">2015 - 2019</span>
                        </div>
                    </div>
                    
                    <!-- Projects -->
                    <div>
                        <h2 style="font-size: 14px; color: ${colors.text}; margin-bottom: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${colors.border}; padding-bottom: 8px;">Notable Projects</h2>
                        <div style="font-size: 13px; color: ${colors.textSecondary}; line-height: 1.8;">
                            <p><strong style="color: ${colors.text};">Open Source Contributor</strong> - Contributed to React, Node.js, and various open-source projects with 500+ GitHub stars</p>
                            <p><strong style="color: ${colors.text};">DevTools Chrome Extension</strong> - Built developer tools extension with 10K+ active users</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'landing':
            canvas.innerHTML = `
                <div class="canvas-element animate-in" style="padding: 80px 24px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); text-align: center; color: white; border-radius: 16px;">
                    <h1 style="font-size: 56px; margin-bottom: 24px;">Launch Your Product</h1>
                    <p style="font-size: 24px; margin-bottom: 32px; opacity: 0.95;">The all-in-one platform for modern businesses</p>
                    <div style="display: flex; gap: 16px; justify-content: center;">
                        <button style="padding: 16px 40px; background: white; color: #0891b2; border: none; border-radius: 8px; font-size: 18px; font-weight: 600; cursor: pointer;">Get Started Free</button>
                        <button style="padding: 16px 40px; background: transparent; color: white; border: 2px solid white; border-radius: 8px; font-size: 18px; font-weight: 600; cursor: pointer;">Learn More</button>
                    </div>
                </div>
                <div class="canvas-element animate-in" style="padding: 64px 24px; text-align: center;">
                    <h2 style="font-size: 40px; margin-bottom: 48px; color: ${colors.text};">Key Features</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
                        <div style="padding: 32px; background: ${colors.surface}; border-radius: 12px;">
                            <div style="font-size: 56px; margin-bottom: 16px;">⚡</div>
                            <h3 style="color: ${colors.text}; margin-bottom: 12px;">Lightning Fast</h3>
                            <p style="color: ${colors.textSecondary};">Optimized for speed and performance</p>
                        </div>
                        <div style="padding: 32px; background: ${colors.surface}; border-radius: 12px;">
                            <div style="font-size: 56px; margin-bottom: 16px;">🔒</div>
                            <h3 style="color: ${colors.text}; margin-bottom: 12px;">Secure</h3>
                            <p style="color: ${colors.textSecondary};">Enterprise-grade security built-in</p>
                        </div>
                        <div style="padding: 32px; background: ${colors.surface}; border-radius: 12px;">
                            <div style="font-size: 56px; margin-bottom: 16px;">📊</div>
                            <h3 style="color: ${colors.text}; margin-bottom: 12px;">Analytics</h3>
                            <p style="color: ${colors.textSecondary};">Powerful insights and reporting</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'business':
            canvas.innerHTML = `
                <div class="canvas-element animate-in" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background: #1e293b; border-radius: 12px;">
                    <div style="color: white; font-size: 24px; font-weight: 700;">BusinessCo</div>
                    <div style="display: flex; gap: 32px;">
                        <a href="#" style="color: white; text-decoration: none; font-weight: 500;">Services</a>
                        <a href="#" style="color: white; text-decoration: none; font-weight: 500;">About</a>
                        <a href="#" style="color: white; text-decoration: none; font-weight: 500;">Contact</a>
                    </div>
                </div>
                <div class="canvas-element animate-in" style="padding: 80px 48px; text-align: center;">
                    <h1 style="font-size: 48px; color: ${colors.text}; margin-bottom: 24px;">Professional Business Solutions</h1>
                    <p style="font-size: 20px; color: ${colors.textSecondary}; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">We help businesses grow with innovative strategies and cutting-edge technology.</p>
                    <button style="padding: 14px 32px; background: #059669; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Schedule Consultation</button>
                </div>
                <div class="canvas-element animate-in" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; padding: 48px;">
                    <div style="padding: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px;">
                        <h3 style="font-size: 28px; margin-bottom: 16px;">Our Mission</h3>
                        <p style="font-size: 16px; line-height: 1.6; opacity: 0.95;">To empower businesses with the tools and strategies they need to succeed in the digital age.</p>
                    </div>
                    <div style="padding: 32px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 16px;">
                        <h3 style="font-size: 28px; margin-bottom: 16px;">Our Vision</h3>
                        <p style="font-size: 16px; line-height: 1.6; opacity: 0.95;">Creating a world where every business has access to world-class digital solutions.</p>
                    </div>
                </div>
            `;
            break;
    }

    addControlsToElements();
    saveState();
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} template loaded!`);
}

function addControlsToElements() {
    const elements = document.querySelectorAll('.canvas-element');
    elements.forEach(element => {
        if (!element.querySelector('.element-controls')) {
            const controls = document.createElement('div');
            controls.className = 'element-controls';
            controls.innerHTML = `
                <button class="control-btn" onclick="editElement(this)" title="Edit">E</button>
                <button class="control-btn delete" onclick="deleteElement(this)" title="Delete">×</button>
            `;
            element.appendChild(controls);
            element.onclick = (e) => {
                e.stopPropagation();
                selectElement(element);
            };
        }
    });
}

// AI Generation
function generateWithAI() {
    const prompt = document.getElementById('aiPrompt').value;
    if (!prompt) {
        showToast('Please enter a description');
        return;
    }

    showToast('AI is generating your content...');

    // Simulate AI processing with more intelligent detection
    setTimeout(() => {
        const promptLower = prompt.toLowerCase();
        const colors = getThemeColors();
        
        // Check for specific component requests
        if (promptLower.includes('button')) {
            createComponent('button');
            showToast('AI created a button!');
            return;
        }
        
        if (promptLower.includes('form') || promptLower.includes('contact')) {
            createComponent('form');
            showToast('AI created a contact form!');
            return;
        }
        
        if (promptLower.includes('card')) {
            createComponent('card');
            showToast('AI created a card!');
            return;
        }
        
        if (promptLower.includes('heading') || promptLower.includes('title')) {
            createComponent('heading');
            showToast('AI created a heading!');
            return;
        }
        
        // Template detection
        const templateKeywords = [
            { keywords: ['hero', 'landing', 'launch', 'product'], template: 'landing' },
            { keywords: ['portfolio', 'work', 'projects', 'showcase'], template: 'portfolio' },
            { keywords: ['resume', 'cv', 'curriculum', 'job'], template: 'resume' },
            { keywords: ['business', 'company', 'corporate', 'professional'], template: 'business' }
        ];

        let templateToLoad = null;
        for (let item of templateKeywords) {
            if (item.keywords.some(keyword => promptLower.includes(keyword))) {
                templateToLoad = item.template;
                break;
            }
        }

        if (templateToLoad) {
            loadTemplate(templateToLoad);
            showToast('AI generated your website!');
        } else {
            // Generate custom content based on prompt
            generateCustomContent(prompt, colors);
        }
    }, 2000);
}

// Generate custom AI content
function generateCustomContent(prompt, colors) {
    const canvas = document.getElementById('canvas');
    const element = document.createElement('div');
    element.className = 'canvas-element animate-in';
    
    // Create content based on prompt analysis
    element.innerHTML = `
        <div style="padding: 32px; background: ${colors.surface}; border-radius: 12px; border: 1px solid ${colors.border};">
            <h2 style="color: ${colors.text}; margin-bottom: 16px;">Generated Content</h2>
            <p style="color: ${colors.textSecondary}; line-height: 1.6;">${prompt}</p>
            <button style="margin-top: 16px; padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">Learn More</button>
        </div>
    `;
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'element-controls';
    controls.innerHTML = `
        <button class="control-btn" onclick="editElement(this)" title="Edit">E</button>
        <button class="control-btn delete" onclick="deleteElement(this)" title="Delete">×</button>
    `;
    element.appendChild(controls);
    
    element.onclick = (e) => {
        e.stopPropagation();
        selectElement(element);
    };
    
    canvas.appendChild(element);
    saveState();
    showToast('AI generated custom content!');
}

// Responsive Design Helper
function makeResponsive() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    
    elements.forEach(el => {
        // Add responsive styles
        el.style.maxWidth = '100%';
        el.style.wordWrap = 'break-word';
        
        // Make images responsive
        const images = el.querySelectorAll('img');
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
        
        // Make containers responsive
        const containers = el.querySelectorAll('[style*="display: grid"]');
        containers.forEach(container => {
            const style = container.getAttribute('style');
            if (!style.includes('@media')) {
                container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
            }
        });
    });
    
    saveState();
    showToast('Made elements responsive!');
}

// Export Functions
function exportCode() {
    const canvas = document.getElementById('canvas');
    const html = canvas.innerHTML;
    
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        ${html}
    </div>
</body>
</html>`;

    document.getElementById('exportCode').value = fullHTML;
    document.getElementById('exportModal').classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function copyCode() {
    const code = document.getElementById('exportCode');
    code.select();
    document.execCommand('copy');
    showToast('Code copied to clipboard!');
}

function downloadCode() {
    const code = document.getElementById('exportCode').value;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('File downloaded successfully!');
}

// Preview
function previewWebsite() {
    const canvas = document.getElementById('canvas');
    const html = canvas.innerHTML;
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Preview</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; }
            </style>
        </head>
        <body>${html}</body>
        </html>
    `);
    previewWindow.document.close();
    showToast('Opening preview...');
}

// Save/Load Project
function saveProject() {
    const canvas = document.getElementById('canvas');
    const projectData = {
        html: canvas.innerHTML,
        timestamp: new Date().toISOString()
    };
    const json = JSON.stringify(projectData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-project.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Project saved successfully!');
}

// Undo/Redo
function saveState() {
    const canvas = document.getElementById('canvas');
    undoStack.push(canvas.innerHTML);
    redoStack = [];
    if (undoStack.length > 50) undoStack.shift();
}

function undoAction() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = undoStack[undoStack.length - 1];
        addControlsToElements();
        showToast('Undo successful');
    }
}

function redoAction() {
    if (redoStack.length > 0) {
        const state = redoStack.pop();
        undoStack.push(state);
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = state;
        addControlsToElements();
        showToast('Redo successful');
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    // Clear any existing hide class
    toast.classList.remove('hide');
    toast.classList.add('show');
    
    // Auto-hide after 3 seconds
    clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.remove('show', 'hide');
        }, 300);
    }, 3000);
}

// Color Picker Sync
document.getElementById('textColor')?.addEventListener('input', (e) => {
    document.getElementById('textColorHex').value = e.target.value;
});

document.getElementById('bgColor')?.addEventListener('input', (e) => {
    document.getElementById('bgColorHex').value = e.target.value;
});

// Initialize
window.addEventListener('load', () => {
    saveState();
    addControlsToElements();
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undoAction();
        }
        if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
            e.preventDefault();
            redoAction();
        }
        if (e.key === 's') {
            e.preventDefault();
            saveProject();
        }
        if (e.key === 'c' && selectedElement) {
            e.preventDefault();
            copyElement();
        }
        if (e.key === 'v' && copiedElement) {
            e.preventDefault();
            pasteElement();
        }
        if (e.key === 'd' && selectedElement) {
            e.preventDefault();
            duplicateElement();
        }
        if (e.key === 'f') {
            e.preventDefault();
            toggleFullscreen();
        }
        if (e.key === 'g') {
            e.preventDefault();
            toggleGridLines();
        }
        if (e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }
    }
    if (e.key === 'Delete' && selectedElement) {
        e.preventDefault();
        deleteElement({ target: selectedElement });
    }
    if (e.key === 'Escape') {
        if (selectedElement) {
            deselectElement();
        }
        closeAllModals();
    }
    // Arrow keys to move elements
    if (selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        moveElementWithKeys(e.key);
    }
});

// Copy/Paste/Duplicate Functionality
let copiedElement = null;

function copyElement() {
    if (selectedElement) {
        copiedElement = selectedElement.cloneNode(true);
        showToast('Element copied! Press Ctrl+V to paste');
    }
}

function pasteElement() {
    if (copiedElement) {
        const canvas = document.getElementById('canvas');
        const newElement = copiedElement.cloneNode(true);
        
        // Add controls to the pasted element
        if (!newElement.querySelector('.element-controls')) {
            const controls = document.createElement('div');
            controls.className = 'element-controls';
            controls.innerHTML = `
                <button class="control-btn" onclick="editElement(this)" title="Edit">E</button>
                <button class="control-btn delete" onclick="deleteElement(this)" title="Delete">×</button>
            `;
            newElement.appendChild(controls);
        }
        
        // Add click handler
        newElement.onclick = (e) => {
            e.stopPropagation();
            selectElement(newElement);
        };
        
        canvas.appendChild(newElement);
        saveState();
        showToast('Element pasted successfully!');
        selectElement(newElement);
    }
}

function duplicateElement() {
    if (selectedElement) {
        copiedElement = selectedElement;
        pasteElement();
        showToast('Element duplicated!');
    }
}

// Move element with arrow keys
function moveElementWithKeys(key) {
    if (!selectedElement) return;
    
    const step = 5; // pixels
    const currentTop = parseInt(selectedElement.style.top) || 0;
    const currentLeft = parseInt(selectedElement.style.left) || 0;
    
    // Make element position absolute if not already
    if (selectedElement.style.position !== 'absolute') {
        selectedElement.style.position = 'relative';
    }
    
    switch(key) {
        case 'ArrowUp':
            selectedElement.style.top = (currentTop - step) + 'px';
            break;
        case 'ArrowDown':
            selectedElement.style.top = (currentTop + step) + 'px';
            break;
        case 'ArrowLeft':
            selectedElement.style.left = (currentLeft - step) + 'px';
            break;
        case 'ArrowRight':
            selectedElement.style.left = (currentLeft + step) + 'px';
            break;
    }
    saveState();
}

// Deselect element
function deselectElement() {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
        selectedElement = null;
    }
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Fullscreen Mode
function toggleFullscreen() {
    const canvasContainer = document.querySelector('.canvas-container');
    
    if (!document.fullscreenElement) {
        canvasContainer.requestFullscreen().catch(err => {
            showToast(`Error enabling fullscreen: ${err.message}`);
        });
        showToast('Fullscreen mode enabled');
    } else {
        document.exitFullscreen();
        showToast('Fullscreen mode disabled');
    }
}

// Grid Lines Toggle
let gridLinesEnabled = false;

function toggleGridLines() {
    gridLinesEnabled = !gridLinesEnabled;
    const canvas = document.getElementById('canvas');
    
    if (gridLinesEnabled) {
        canvas.style.backgroundImage = 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)';
        canvas.style.backgroundSize = '20px 20px';
        showToast('Grid lines enabled');
    } else {
        canvas.style.backgroundImage = 'none';
        showToast('Grid lines disabled');
    }
}

// Search Elements
function searchElements(query) {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    let found = 0;
    
    elements.forEach(el => {
        const text = el.innerText.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            el.style.outline = '3px solid #f59e0b';
            found++;
            setTimeout(() => {
                el.style.outline = '';
            }, 3000);
        }
    });
    
    showToast(found > 0 ? `Found ${found} element(s)` : 'No elements found');
}

// Auto-save functionality
let autoSaveInterval = null;

function enableAutoSave(intervalMinutes = 5) {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
    
    autoSaveInterval = setInterval(() => {
        autoSaveToLocalStorage();
    }, intervalMinutes * 60 * 1000);
    
    showToast(`Auto-save enabled (every ${intervalMinutes} min)`);
}

function disableAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
        showToast('Auto-save disabled');
    }
}

function autoSaveToLocalStorage() {
    const canvas = document.getElementById('canvas');
    const projectData = {
        html: canvas.innerHTML,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('website-builder-autosave', JSON.stringify(projectData));
    showToast('Auto-saved', 1000);
}

function loadAutoSave() {
    const saved = localStorage.getItem('website-builder-autosave');
    if (saved) {
        const projectData = JSON.parse(saved);
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = projectData.html;
        addControlsToElements();
        saveState();
        const date = new Date(projectData.timestamp).toLocaleString();
        showToast(`Loaded auto-save from ${date}`);
        return true;
    }
    return false;
}

// Keyboard Shortcuts Help
function showKeyboardShortcuts() {
    const shortcuts = `
        <div style="color: var(--color-text); line-height: 1.8;">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">⌨️ Keyboard Shortcuts</h3>
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px; font-size: 14px;">
                <div><strong>Ctrl + Z</strong></div><div>Undo</div>
                <div><strong>Ctrl + Y</strong></div><div>Redo</div>
                <div><strong>Ctrl + S</strong></div><div>Save Project</div>
                <div><strong>Ctrl + C</strong></div><div>Copy Element</div>
                <div><strong>Ctrl + V</strong></div><div>Paste Element</div>
                <div><strong>Ctrl + D</strong></div><div>Duplicate Element</div>
                <div><strong>Ctrl + F</strong></div><div>Fullscreen Mode</div>
                <div><strong>Ctrl + G</strong></div><div>Toggle Grid Lines</div>
                <div><strong>Ctrl + /</strong></div><div>Show Shortcuts</div>
                <div><strong>Delete</strong></div><div>Delete Selected</div>
                <div><strong>Escape</strong></div><div>Deselect/Close</div>
                <div><strong>Arrow Keys</strong></div><div>Move Element</div>
            </div>
        </div>
    `;
    
    // Create temporary modal for shortcuts
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${shortcuts}
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: 24px; width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Export as different formats
function exportAsHTML() {
    const canvas = document.getElementById('canvas');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: ${getComputedStyle(canvas).background};
            color: ${getComputedStyle(canvas).color};
        }
        .canvas-element {
            margin-bottom: 16px;
        }
        .element-controls {
            display: none !important;
        }
    </style>
</head>
<body>
${canvas.innerHTML.replace(/<div class="element-controls">.*?<\/div>/gs, '')}
</body>
</html>`;
    
    downloadFile(html, 'website.html', 'text/html');
    showToast('HTML file exported!');
}

function exportAsMarkdown() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    let markdown = '# My Website\n\n';
    
    elements.forEach(el => {
        const clone = el.cloneNode(true);
        const controls = clone.querySelector('.element-controls');
        if (controls) controls.remove();
        
        const text = clone.innerText.trim();
        if (text) {
            markdown += text + '\n\n';
        }
    });
    
    downloadFile(markdown, 'website.md', 'text/markdown');
    showToast('Markdown file exported!');
}

// Helper function to download files
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Element Statistics
function showStatistics() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    
    const stats = {
        total: elements.length,
        headings: canvas.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
        paragraphs: canvas.querySelectorAll('p').length,
        buttons: canvas.querySelectorAll('button').length,
        images: canvas.querySelectorAll('img').length,
        forms: canvas.querySelectorAll('form').length,
        links: canvas.querySelectorAll('a').length
    };
    
    const statsHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">📊 Project Statistics</h3>
            <div style="display: grid; gap: 12px; font-size: 14px;">
                <div>Total Elements: <strong>${stats.total}</strong></div>
                <div>Headings: <strong>${stats.headings}</strong></div>
                <div>Paragraphs: <strong>${stats.paragraphs}</strong></div>
                <div>Buttons: <strong>${stats.buttons}</strong></div>
                <div>Images: <strong>${stats.images}</strong></div>
                <div>Forms: <strong>${stats.forms}</strong></div>
                <div>Links: <strong>${stats.links}</strong></div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            ${statsHTML}
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: 24px; width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Clear Canvas with confirmation
function clearCanvas() {
    if (confirm('Are you sure you want to clear the entire canvas? This action cannot be undone.')) {
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = '';
        saveState();
        showToast('Canvas cleared');
    }
}

// Initialize auto-save on load
window.addEventListener('load', () => {
    enableAutoSave(5); // Auto-save every 5 minutes
    
    // Check if there's an auto-save available
    const hasAutoSave = localStorage.getItem('website-builder-autosave');
    if (hasAutoSave) {
        const projectData = JSON.parse(hasAutoSave);
        const date = new Date(projectData.timestamp).toLocaleString();
        
        if (confirm(`Found auto-saved work from ${date}. Would you like to restore it?`)) {
            loadAutoSave();
        }
    }
});

// Alignment Functions
function alignElement(alignment) {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    switch(alignment) {
        case 'left':
            selectedElement.style.textAlign = 'left';
            selectedElement.style.marginLeft = '0';
            selectedElement.style.marginRight = 'auto';
            break;
        case 'center':
            selectedElement.style.textAlign = 'center';
            selectedElement.style.marginLeft = 'auto';
            selectedElement.style.marginRight = 'auto';
            break;
        case 'right':
            selectedElement.style.textAlign = 'right';
            selectedElement.style.marginLeft = 'auto';
            selectedElement.style.marginRight = '0';
            break;
        case 'justify':
            selectedElement.style.textAlign = 'justify';
            break;
    }
    
    saveState();
    showToast(`Aligned ${alignment}`);
}

// Spacing Functions
function adjustSpacing(type, value) {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const pixels = `${value}px`;
    
    switch(type) {
        case 'padding':
            selectedElement.style.padding = pixels;
            break;
        case 'margin':
            selectedElement.style.margin = pixels;
            break;
        case 'paddingTop':
            selectedElement.style.paddingTop = pixels;
            break;
        case 'paddingBottom':
            selectedElement.style.paddingBottom = pixels;
            break;
        case 'marginTop':
            selectedElement.style.marginTop = pixels;
            break;
        case 'marginBottom':
            selectedElement.style.marginBottom = pixels;
            break;
    }
    
    saveState();
}

// Quick Style Presets
function applyPreset(presetName) {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const colors = getThemeColors();
    
    switch(presetName) {
        case 'card':
            selectedElement.style.padding = '24px';
            selectedElement.style.background = colors.background;
            selectedElement.style.border = `1px solid ${colors.border}`;
            selectedElement.style.borderRadius = '12px';
            selectedElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            break;
        case 'hero':
            selectedElement.style.padding = '64px 24px';
            selectedElement.style.textAlign = 'center';
            selectedElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            selectedElement.style.color = 'white';
            selectedElement.style.borderRadius = '16px';
            break;
        case 'highlight':
            selectedElement.style.padding = '16px';
            selectedElement.style.background = 'rgba(99, 102, 241, 0.1)';
            selectedElement.style.borderLeft = '4px solid #6366f1';
            selectedElement.style.borderRadius = '4px';
            break;
        case 'minimal':
            selectedElement.style.padding = '16px';
            selectedElement.style.background = 'transparent';
            selectedElement.style.border = 'none';
            selectedElement.style.boxShadow = 'none';
            break;
        case 'shadow':
            selectedElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            selectedElement.style.borderRadius = '8px';
            break;
    }
    
    saveState();
    showToast(`Applied ${presetName} preset!`);
}

// Batch Operations
function selectAllElements() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    elements.forEach(el => el.classList.add('selected'));
    showToast(`Selected ${elements.length} elements`);
}

function deselectAllElements() {
    const elements = document.querySelectorAll('.canvas-element.selected');
    elements.forEach(el => el.classList.remove('selected'));
    showToast('Deselected all elements');
}

// Element Reordering
function moveElementUp() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const previous = selectedElement.previousElementSibling;
    if (previous) {
        selectedElement.parentNode.insertBefore(selectedElement, previous);
        saveState();
        showToast('Moved element up');
    }
}

function moveElementDown() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const next = selectedElement.nextElementSibling;
    if (next) {
        selectedElement.parentNode.insertBefore(next, selectedElement);
        saveState();
        showToast('Moved element down');
    }
}

// Color Palette Generator
function generateColorPalette() {
    const palettes = [
        { name: 'Ocean', primary: '#0891b2', secondary: '#06b6d4', accent: '#22d3ee' },
        { name: 'Sunset', primary: '#f59e0b', secondary: '#f97316', accent: '#ef4444' },
        { name: 'Forest', primary: '#059669', secondary: '#10b981', accent: '#34d399' },
        { name: 'Purple', primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c084fc' },
        { name: 'Rose', primary: '#e11d48', secondary: '#f43f5e', accent: '#fb7185' }
    ];
    
    const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
    
    // Apply palette to CSS variables
    document.documentElement.style.setProperty('--color-primary', randomPalette.primary);
    document.documentElement.style.setProperty('--color-secondary', randomPalette.secondary);
    document.documentElement.style.setProperty('--color-accent', randomPalette.accent);
    
    showToast(`Applied ${randomPalette.name} color palette!`);
}

// Text Formatting
function formatText(format) {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    switch(format) {
        case 'bold':
            selectedElement.style.fontWeight = selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
            break;
        case 'italic':
            selectedElement.style.fontStyle = selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
            break;
        case 'underline':
            selectedElement.style.textDecoration = selectedElement.style.textDecoration === 'underline' ? 'none' : 'underline';
            break;
        case 'uppercase':
            selectedElement.style.textTransform = selectedElement.style.textTransform === 'uppercase' ? 'none' : 'uppercase';
            break;
        case 'lowercase':
            selectedElement.style.textTransform = selectedElement.style.textTransform === 'lowercase' ? 'none' : 'lowercase';
            break;
        case 'capitalize':
            selectedElement.style.textTransform = selectedElement.style.textTransform === 'capitalize' ? 'none' : 'capitalize';
            break;
    }
    
    saveState();
    showToast(`Applied ${format} formatting`);
}

// ============================================
// USER PROFILE MANAGEMENT
// ============================================

// Initialize User Profile
function initUserProfile() {
    const savedUser = localStorage.getItem('website-builder-user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
        loadUserStats();
    }
}

// Open User Profile Modal
function openUserProfile() {
    const modal = document.getElementById('userProfileModal');
    const authSection = document.getElementById('authSection');
    const profileSection = document.getElementById('profileSection');
    
    if (currentUser) {
        // Show profile section
        authSection.style.display = 'none';
        profileSection.style.display = 'block';
        loadProfileData();
    } else {
        // Show authentication section
        authSection.style.display = 'block';
        profileSection.style.display = 'none';
    }
    
    modal.classList.add('active');
}

// Register New User
function registerUser() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value.trim();
    
    // Validation
    if (!email || !password || !name) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Create user object
    currentUser = {
        id: generateUserId(),
        email: email,
        name: name,
        displayName: name,
        bio: '',
        website: '',
        avatar: '👤',
        joinDate: new Date().toISOString(),
        preferences: {
            autoSave: true,
            notifications: true,
            gridDefault: false
        }
    };
    
    // Initialize stats
    userStats = {
        projects: 0,
        saves: 0,
        daysActive: 1,
        joinDate: currentUser.joinDate
    };
    
    // Save to localStorage
    localStorage.setItem('website-builder-user', JSON.stringify(currentUser));
    localStorage.setItem('website-builder-stats', JSON.stringify(userStats));
    
    // Update UI
    updateUserUI();
    closeModal('userProfileModal');
    showToast(`Welcome, ${name}! Profile created successfully! 🎉`);
    
    // Clear form
    document.getElementById('authEmail').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authName').value = '';
}

// Login User
function loginUser() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    
    if (!email || !password) {
        showToast('Please enter email and password', 'error');
        return;
    }
    
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('website-builder-user');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email) {
            currentUser = user;
            updateUserUI();
            loadUserStats();
            closeModal('userProfileModal');
            showToast(`Welcome back, ${user.name}! 👋`);
            
            // Clear form
            document.getElementById('authEmail').value = '';
            document.getElementById('authPassword').value = '';
            return;
        }
    }
    
    showToast('User not found. Please register first.', 'error');
}

// Logout User
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        updateUserUI();
        closeModal('userProfileModal');
        showToast('Logged out successfully');
    }
}

// Load Profile Data into Form
function loadProfileData() {
    if (!currentUser) return;
    
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileDisplayName').value = currentUser.displayName || currentUser.name;
    document.getElementById('profileBio').value = currentUser.bio || '';
    document.getElementById('profileWebsite').value = currentUser.website || '';
    document.getElementById('profileAvatarEmoji').value = currentUser.avatar || '👤';
    document.getElementById('profileAvatar').textContent = currentUser.avatar || '👤';
    
    // Load preferences
    if (currentUser.preferences) {
        document.getElementById('prefAutoSave').checked = currentUser.preferences.autoSave !== false;
        document.getElementById('prefNotifications').checked = currentUser.preferences.notifications !== false;
        document.getElementById('prefGrid').checked = currentUser.preferences.gridDefault === true;
    }
    
    // Load and display stats
    loadUserStats();
}

// Save Profile Changes
function saveProfile() {
    if (!currentUser) return;
    
    // Update user object
    currentUser.displayName = document.getElementById('profileDisplayName').value.trim() || currentUser.name;
    currentUser.bio = document.getElementById('profileBio').value.trim();
    currentUser.website = document.getElementById('profileWebsite').value.trim();
    currentUser.avatar = document.getElementById('profileAvatarEmoji').value;
    
    // Save preferences
    currentUser.preferences = {
        autoSave: document.getElementById('prefAutoSave').checked,
        notifications: document.getElementById('prefNotifications').checked,
        gridDefault: document.getElementById('prefGrid').checked
    };
    
    // Save to localStorage
    localStorage.setItem('website-builder-user', JSON.stringify(currentUser));
    
    // Update UI
    updateUserUI();
    
    showToast('Profile updated successfully! ✅');
}

// Update User UI Elements
function updateUserUI() {
    const userAvatar = document.getElementById('userAvatar');
    const userProfileBtn = document.getElementById('userProfileBtn');
    
    if (currentUser) {
        userAvatar.textContent = currentUser.avatar || '👤';
        userProfileBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        userProfileBtn.style.borderColor = 'transparent';
    } else {
        userAvatar.textContent = '👤';
        userProfileBtn.style.background = 'transparent';
        userProfileBtn.style.borderColor = 'var(--color-border)';
    }
}

// Update Avatar Preview
function updateAvatarPreview() {
    const selectedEmoji = document.getElementById('profileAvatarEmoji').value;
    document.getElementById('profileAvatar').textContent = selectedEmoji;
}

// Load User Statistics
function loadUserStats() {
    const savedStats = localStorage.getItem('website-builder-stats');
    if (savedStats) {
        userStats = JSON.parse(savedStats);
    } else if (currentUser) {
        // Initialize stats for existing user
        userStats = {
            projects: 0,
            saves: 0,
            daysActive: 1,
            joinDate: currentUser.joinDate || new Date().toISOString()
        };
    }
    
    // Calculate days active
    if (userStats.joinDate) {
        const joinDate = new Date(userStats.joinDate);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        userStats.daysActive = diffDays;
    }
    
    // Update UI
    updateStatsDisplay();
    
    // Save updated stats
    localStorage.setItem('website-builder-stats', JSON.stringify(userStats));
}

// Update Statistics Display
function updateStatsDisplay() {
    document.getElementById('statProjects').textContent = userStats.projects || 0;
    document.getElementById('statSaves').textContent = userStats.saves || 0;
    document.getElementById('statDays').textContent = userStats.daysActive || 0;
}

// Increment Save Counter
function incrementSaveCount() {
    if (currentUser) {
        userStats.saves = (userStats.saves || 0) + 1;
        localStorage.setItem('website-builder-stats', JSON.stringify(userStats));
        updateStatsDisplay();
    }
}

// Increment Project Counter
function incrementProjectCount() {
    if (currentUser) {
        userStats.projects = (userStats.projects || 0) + 1;
        localStorage.setItem('website-builder-stats', JSON.stringify(userStats));
        updateStatsDisplay();
    }
}

// Toggle Auto-Save Preference
function toggleAutoSave() {
    const autoSaveEnabled = document.getElementById('prefAutoSave').checked;
    
    if (autoSaveEnabled) {
        enableAutoSave(5);
    } else {
        disableAutoSave();
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Enhanced Save Project with User Stats
const originalSaveProject = saveProject;
saveProject = function() {
    originalSaveProject.call(this);
    incrementSaveCount();
    incrementProjectCount();
};

// Initialize user profile on load
window.addEventListener('DOMContentLoaded', () => {
    initUserProfile();
});

// ============================================
// ADVANCED FUNCTIONALITIES
// ============================================

// Drag to Reorder Elements
let draggedElement = null;

function enableDragReorder() {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    
    elements.forEach(element => {
        element.setAttribute('draggable', 'true');
        
        element.addEventListener('dragstart', (e) => {
            draggedElement = element;
            element.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
        });
        
        element.addEventListener('dragend', (e) => {
            element.style.opacity = '1';
            draggedElement = null;
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (draggedElement && element !== draggedElement) {
                const rect = element.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                
                if (e.clientY < midpoint) {
                    element.parentNode.insertBefore(draggedElement, element);
                } else {
                    element.parentNode.insertBefore(draggedElement, element.nextSibling);
                }
            }
        });
    });
    
    showToast('Drag to reorder enabled!');
}

// History Timeline Viewer
function showHistoryTimeline() {
    const historyHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">📜 Edit History</h3>
            <div style="max-height: 400px; overflow-y: auto;">
                ${undoStack.map((state, index) => `
                    <div style="padding: 12px; margin-bottom: 8px; background: var(--color-surface-elevated); border-radius: 8px; border-left: 3px solid ${index === undoStack.length - 1 ? 'var(--color-primary)' : 'var(--color-border)'}; cursor: pointer;" onclick="restoreVersion(${index})">
                        <div style="font-weight: 600; margin-bottom: 4px;">Version ${index + 1} ${index === undoStack.length - 1 ? '(Current)' : ''}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">
                            Elements: ${state.match(/canvas-element/g)?.length || 0}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 16px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; font-size: 13px;">
                💡 Click any version to restore it
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${historyHTML}
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: 16px; width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function restoreVersion(index) {
    if (index >= 0 && index < undoStack.length) {
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = undoStack[index];
        addControlsToElements();
        document.querySelector('.modal.active')?.remove();
        showToast(`Restored to version ${index + 1}`);
    }
}

// Element Finder/Search
function showElementFinder() {
    const finderHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">🔍 Find Elements</h3>
            <input type="text" class="form-control" id="finderInput" placeholder="Search by text, tag, or class..." style="margin-bottom: 16px;" oninput="liveSearchElements(this.value)">
            <div id="finderResults" style="max-height: 300px; overflow-y: auto; margin-bottom: 16px;">
                <div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">
                    Type to search...
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'finderModal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            ${finderHTML}
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Focus on input
    setTimeout(() => document.getElementById('finderInput').focus(), 100);
}

function liveSearchElements(query) {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    const resultsDiv = document.getElementById('finderResults');
    
    if (!query.trim()) {
        resultsDiv.innerHTML = '<div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">Type to search...</div>';
        return;
    }
    
    const results = [];
    elements.forEach((el, index) => {
        const text = el.innerText.toLowerCase();
        const html = el.innerHTML.toLowerCase();
        
        if (text.includes(query.toLowerCase()) || html.includes(query.toLowerCase())) {
            results.push({ element: el, index: index, text: text.substring(0, 100) });
        }
    });
    
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div style="text-align: center; color: var(--color-text-secondary); padding: 20px;">No elements found</div>';
    } else {
        resultsDiv.innerHTML = results.map(result => `
            <div style="padding: 12px; margin-bottom: 8px; background: var(--color-surface-elevated); border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='transparent'" onclick="scrollToElement(${result.index})">
                <div style="font-weight: 600; margin-bottom: 4px;">Element ${result.index + 1}</div>
                <div style="font-size: 12px; color: var(--color-text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${result.text || 'Empty element'}
                </div>
            </div>
        `).join('');
    }
}

function scrollToElement(index) {
    const canvas = document.getElementById('canvas');
    const elements = canvas.querySelectorAll('.canvas-element');
    const element = elements[index];
    
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.outline = '3px solid var(--color-primary)';
        element.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
        
        setTimeout(() => {
            element.style.outline = '';
            element.style.boxShadow = '';
        }, 2000);
        
        document.getElementById('finderModal')?.remove();
    }
}

// Bulk Operations
function bulkEditElements() {
    const bulkHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">⚡ Bulk Operations</h3>
            
            <div class="form-group">
                <label class="form-label">Select Operation</label>
                <select class="form-control" id="bulkOperation">
                    <option value="fontSize">Change Font Size</option>
                    <option value="textColor">Change Text Color</option>
                    <option value="bgColor">Change Background</option>
                    <option value="padding">Change Padding</option>
                    <option value="margin">Change Margin</option>
                    <option value="alignment">Change Alignment</option>
                    <option value="borderRadius">Change Border Radius</option>
                    <option value="addShadow">Add Shadow</option>
                    <option value="removeShadow">Remove Shadow</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Value</label>
                <input type="text" class="form-control" id="bulkValue" placeholder="e.g., 20px, #6366f1, center">
            </div>
            
            <div class="form-group">
                <label class="form-label">Target Elements</label>
                <select class="form-control" id="bulkTarget">
                    <option value="all">All Elements</option>
                    <option value="headings">Headings Only</option>
                    <option value="paragraphs">Paragraphs Only</option>
                    <option value="buttons">Buttons Only</option>
                    <option value="images">Images Only</option>
                </select>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${bulkHTML}
            <div style="display: flex; gap: 12px; margin-top: 24px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="applyBulkOperation()">Apply</button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('.modal').remove()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function applyBulkOperation() {
    const operation = document.getElementById('bulkOperation').value;
    const value = document.getElementById('bulkValue').value;
    const target = document.getElementById('bulkTarget').value;
    
    if (!value && operation !== 'removeShadow') {
        showToast('Please enter a value');
        return;
    }
    
    const canvas = document.getElementById('canvas');
    let elements = [];
    
    switch(target) {
        case 'all':
            elements = canvas.querySelectorAll('.canvas-element');
            break;
        case 'headings':
            elements = canvas.querySelectorAll('h1, h2, h3, h4, h5, h6');
            break;
        case 'paragraphs':
            elements = canvas.querySelectorAll('p');
            break;
        case 'buttons':
            elements = canvas.querySelectorAll('button');
            break;
        case 'images':
            elements = canvas.querySelectorAll('img');
            break;
    }
    
    elements.forEach(el => {
        switch(operation) {
            case 'fontSize':
                el.style.fontSize = value;
                break;
            case 'textColor':
                el.style.color = value;
                break;
            case 'bgColor':
                el.style.background = value;
                break;
            case 'padding':
                el.style.padding = value;
                break;
            case 'margin':
                el.style.margin = value;
                break;
            case 'alignment':
                el.style.textAlign = value;
                break;
            case 'borderRadius':
                el.style.borderRadius = value;
                break;
            case 'addShadow':
                el.style.boxShadow = value || '0 4px 12px rgba(0,0,0,0.15)';
                break;
            case 'removeShadow':
                el.style.boxShadow = 'none';
                break;
        }
    });
    
    saveState();
    document.querySelector('.modal.active')?.remove();
    showToast(`✅ Applied ${operation} to ${elements.length} element(s)`);
}

// CSS Animation Builder
function openAnimationBuilder() {
    const animHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">🎬 Animation Builder</h3>
            
            <div class="form-group">
                <label class="form-label">Animation Type</label>
                <select class="form-control" id="animType">
                    <option value="fade">Fade In</option>
                    <option value="slide">Slide In</option>
                    <option value="bounce">Bounce</option>
                    <option value="rotate">Rotate</option>
                    <option value="pulse">Pulse</option>
                    <option value="shake">Shake</option>
                    <option value="flip">Flip</option>
                    <option value="zoom">Zoom In</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Duration (seconds)</label>
                <input type="number" class="form-control" id="animDuration" value="1" min="0.1" max="10" step="0.1">
            </div>
            
            <div class="form-group">
                <label class="form-label">Delay (seconds)</label>
                <input type="number" class="form-control" id="animDelay" value="0" min="0" max="5" step="0.1">
            </div>
            
            <div class="form-group">
                <label class="form-label">Repeat</label>
                <select class="form-control" id="animRepeat">
                    <option value="1">Once</option>
                    <option value="2">2 times</option>
                    <option value="3">3 times</option>
                    <option value="infinite">Infinite</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Easing</label>
                <select class="form-control" id="animEasing">
                    <option value="ease">Ease</option>
                    <option value="linear">Linear</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                </select>
            </div>
            
            <div style="text-align: center; padding: 20px; background: var(--color-surface-elevated); border-radius: 8px; margin: 16px 0;">
                <div id="animPreview" style="display: inline-block; padding: 12px 24px; background: var(--color-primary); color: white; border-radius: 8px;">
                    Preview
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${animHTML}
            <div style="display: flex; gap: 12px; margin-top: 16px;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="previewAnimation()">👁 Preview</button>
                <button class="btn btn-primary" style="flex: 1;" onclick="applyCustomAnimation()">Apply</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function previewAnimation() {
    const preview = document.getElementById('animPreview');
    const type = document.getElementById('animType').value;
    const duration = document.getElementById('animDuration').value;
    const delay = document.getElementById('animDelay').value;
    const repeat = document.getElementById('animRepeat').value;
    const easing = document.getElementById('animEasing').value;
    
    preview.style.animation = `${type} ${duration}s ${easing} ${delay}s ${repeat}`;
    
    setTimeout(() => {
        preview.style.animation = '';
    }, (parseFloat(duration) + parseFloat(delay)) * 1000 * (repeat === 'infinite' ? 1 : parseInt(repeat)));
}

function applyCustomAnimation() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const type = document.getElementById('animType').value;
    const duration = document.getElementById('animDuration').value;
    const delay = document.getElementById('animDelay').value;
    const repeat = document.getElementById('animRepeat').value;
    const easing = document.getElementById('animEasing').value;
    
    selectedElement.style.animation = `${type} ${duration}s ${easing} ${delay}s ${repeat}`;
    
    document.querySelector('.modal.active')?.remove();
    showToast('✨ Animation applied!');
    saveState();
}

// Gradient Generator
function openGradientGenerator() {
    const gradHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">🎨 Gradient Generator</h3>
            
            <div class="form-group">
                <label class="form-label">Gradient Type</label>
                <select class="form-control" id="gradType" onchange="updateGradientPreview()">
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Direction/Position</label>
                <select class="form-control" id="gradDirection" onchange="updateGradientPreview()">
                    <option value="135deg">Diagonal (↘)</option>
                    <option value="90deg">Horizontal (→)</option>
                    <option value="180deg">Vertical (↓)</option>
                    <option value="45deg">Diagonal (↗)</option>
                    <option value="circle">Circle</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Color 1</label>
                <input type="color" class="form-control" id="gradColor1" value="#6366f1" onchange="updateGradientPreview()">
            </div>
            
            <div class="form-group">
                <label class="form-label">Color 2</label>
                <input type="color" class="form-control" id="gradColor2" value="#8b5cf6" onchange="updateGradientPreview()">
            </div>
            
            <div class="form-group">
                <label class="form-label">Color 3 (Optional)</label>
                <input type="color" class="form-control" id="gradColor3" value="#ec4899" onchange="updateGradientPreview()">
            </div>
            
            <div style="height: 100px; border-radius: 12px; margin: 16px 0;" id="gradPreview"></div>
            
            <div class="form-group">
                <label class="form-label">CSS Code</label>
                <textarea class="form-control" id="gradCSS" rows="3" readonly style="font-family: monospace; font-size: 12px;"></textarea>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${gradHTML}
            <div style="display: flex; gap: 12px; margin-top: 16px;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="copyGradientCSS()">📋 Copy CSS</button>
                <button class="btn btn-primary" style="flex: 1;" onclick="applyGradient()">Apply</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    updateGradientPreview();
}

function updateGradientPreview() {
    const type = document.getElementById('gradType').value;
    const direction = document.getElementById('gradDirection').value;
    const color1 = document.getElementById('gradColor1').value;
    const color2 = document.getElementById('gradColor2').value;
    const color3 = document.getElementById('gradColor3').value;
    
    let gradient;
    if (type === 'linear') {
        gradient = `linear-gradient(${direction}, ${color1}, ${color2}, ${color3})`;
    } else {
        gradient = `radial-gradient(${direction}, ${color1}, ${color2}, ${color3})`;
    }
    
    document.getElementById('gradPreview').style.background = gradient;
    document.getElementById('gradCSS').value = `background: ${gradient};`;
}

function copyGradientCSS() {
    const css = document.getElementById('gradCSS').value;
    navigator.clipboard.writeText(css);
    showToast('📋 CSS copied to clipboard!');
}

function applyGradient() {
    if (!selectedElement) {
        showToast('Please select an element first');
        return;
    }
    
    const css = document.getElementById('gradCSS').value;
    const gradient = css.replace('background: ', '').replace(';', '');
    selectedElement.style.background = gradient;
    
    document.querySelector('.modal.active')?.remove();
    showToast('✅ Gradient applied!');
    saveState();
}

// Performance Monitor
function showPerformanceStats() {
    const canvas = document.getElementById('canvas');
    const canvasHTML = canvas.innerHTML;
    const elements = canvas.querySelectorAll('.canvas-element');
    
    const stats = {
        totalElements: elements.length,
        htmlSize: (new Blob([canvasHTML]).size / 1024).toFixed(2) + ' KB',
        images: canvas.querySelectorAll('img').length,
        scripts: canvas.querySelectorAll('script').length,
        styles: canvas.querySelectorAll('style').length,
        divs: canvas.querySelectorAll('div').length,
        buttons: canvas.querySelectorAll('button').length,
        forms: canvas.querySelectorAll('form').length
    };
    
    const perfHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">⚡ Performance Report</h3>
            
            <div style="display: grid; gap: 12px;">
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>Total Elements</span>
                    <strong>${stats.totalElements}</strong>
                </div>
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>HTML Size</span>
                    <strong>${stats.htmlSize}</strong>
                </div>
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>Images</span>
                    <strong>${stats.images}</strong>
                </div>
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>Containers (DIVs)</span>
                    <strong>${stats.divs}</strong>
                </div>
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>Buttons</span>
                    <strong>${stats.buttons}</strong>
                </div>
                <div style="padding: 12px; background: var(--color-surface-elevated); border-radius: 8px; display: flex; justify-content: space-between;">
                    <span>Forms</span>
                    <strong>${stats.forms}</strong>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 16px; background: ${stats.totalElements > 50 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'}; border-radius: 8px;">
                <strong>${stats.totalElements > 50 ? '⚠️ Warning' : '✅ Good'}</strong>
                <p style="margin: 8px 0 0; font-size: 14px; color: var(--color-text-secondary);">
                    ${stats.totalElements > 50 ? 'High element count may impact performance. Consider optimizing.' : 'Element count is optimal for good performance.'}
                </p>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            ${perfHTML}
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: 16px; width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Code Beautifier
function beautifyCode() {
    const canvas = document.getElementById('canvas');
    let html = canvas.innerHTML;
    
    // Basic beautification
    html = html.replace(/></g, '>\n<');
    html = html.replace(/\s+/g, ' ');
    
    const lines = html.split('\n');
    let indentLevel = 0;
    const beautified = lines.map(line => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const indented = '  '.repeat(indentLevel) + trimmed;
        
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
            indentLevel++;
        }
        
        return indented;
    }).join('\n');
    
    canvas.innerHTML = beautified;
    saveState();
    showToast('✨ Code beautified!');
}

// Responsive Breakpoint Tester
function testResponsiveBreakpoints() {
    const breakpoints = [
        { name: 'Mobile Small', width: 320 },
        { name: 'Mobile', width: 375 },
        { name: 'Mobile Large', width: 425 },
        { name: 'Tablet', width: 768 },
        { name: 'Laptop', width: 1024 },
        { name: 'Desktop', width: 1440 }
    ];
    
    const bpHTML = `
        <div style="color: var(--color-text);">
            <h3 style="margin-bottom: 16px; color: var(--color-primary);">📱 Breakpoint Tester</h3>
            <p style="margin-bottom: 16px; color: var(--color-text-secondary); font-size: 14px;">
                Click a breakpoint to test your design at different screen sizes
            </p>
            
            <div style="display: grid; gap: 8px;">
                ${breakpoints.map(bp => `
                    <button class="btn btn-secondary" onclick="setCanvasWidth(${bp.width})" style="justify-content: space-between; width: 100%;">
                        <span>${bp.name}</span>
                        <span style="font-size: 12px; opacity: 0.7;">${bp.width}px</span>
                    </button>
                `).join('')}
            </div>
            
            <button class="btn btn-primary" onclick="resetCanvasWidth()" style="width: 100%; margin-top: 16px;">
                Reset to Full Width
            </button>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            ${bpHTML}
            <button class="btn btn-secondary" onclick="this.closest('.modal').remove()" style="margin-top: 16px; width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function setCanvasWidth(width) {
    const canvas = document.getElementById('canvas');
    canvas.style.maxWidth = width + 'px';
    canvas.style.transition = 'max-width 0.3s ease';
    showToast(`Canvas set to ${width}px`);
}

function resetCanvasWidth() {
    const canvas = document.getElementById('canvas');
    canvas.style.maxWidth = '1200px';
    showToast('Canvas reset to full width');
}

// ===== UNIQUE ANIMATION EFFECTS =====

// Magnetic button hover effect
function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .logo-icon').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.3s ease';
        });
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s ease';
        });
    });
}

// Parallax tilt effect for cards
function initTiltEffect() {
    document.querySelectorAll('.template-card, .component-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// Cursor glow trail effect
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    let timeout;
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            glow.style.opacity = '0';
        }, 1000);
    });
}

// Typing animation for text elements
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid var(--color-primary)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    type();
}

// Staggered entrance animation
function animateStaggered(selector, delay = 100) {
    document.querySelectorAll(selector).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Number counter animation
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    update();
}

// Smooth scroll reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.canvas-element').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Particle burst effect on click
function createParticleBurst(x, y) {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f472b6'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;
        document.body.appendChild(particle);
        
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Add particle burst to primary button clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary')) {
        createParticleBurst(e.clientX, e.clientY);
    }
});

// Initialize all animation effects
document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initTiltEffect();
    initCursorGlow();
    initPanelResizers();
    
    // Stagger sidebar items entrance
    setTimeout(() => {
        animateStaggered('.component-item', 50);
        animateStaggered('.template-card', 80);
    }, 300);
});

// Panel Resizer Functionality
function initPanelResizers() {
    const sidebar = document.querySelector('.sidebar');
    const propertiesPanel = document.getElementById('propertiesPanel');
    const sidebarResizer = document.getElementById('sidebarResizer');
    const propertiesResizer = document.getElementById('propertiesResizer');
    
    if (sidebarResizer && sidebar) {
        initResizer(sidebarResizer, sidebar, 'right');
    }
    
    if (propertiesResizer && propertiesPanel) {
        initResizer(propertiesResizer, propertiesPanel, 'left');
    }
}

function initResizer(resizer, panel, direction) {
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = panel.offsetWidth;
        
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        resizer.classList.add('active');
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        let newWidth;
        
        if (direction === 'right') {
            // Sidebar: dragging right increases width
            newWidth = startWidth + deltaX;
        } else {
            // Properties panel: dragging left increases width
            newWidth = startWidth - deltaX;
        }
        
        // Get min/max from CSS computed styles
        const computedStyle = getComputedStyle(panel);
        const minWidth = parseInt(computedStyle.minWidth) || 200;
        const maxWidth = parseInt(computedStyle.maxWidth) || 450;
        
        // Clamp to min/max
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        
        panel.style.width = newWidth + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            resizer.classList.remove('active');
            
            // Save panel width to localStorage
            const panelId = panel.classList.contains('sidebar') ? 'sidebarWidth' : 'propertiesWidth';
            localStorage.setItem(panelId, panel.style.width);
        }
    });
    
    // Restore saved width
    const panelId = panel.classList.contains('sidebar') ? 'sidebarWidth' : 'propertiesWidth';
    const savedWidth = localStorage.getItem(panelId);
    if (savedWidth) {
        panel.style.width = savedWidth;
    }
}
