import { state } from './state.js';
import { initKeyboardShortcuts } from './core/events.js';
import { showToast } from './utils/helpers.js';
import { createComponent } from './core/components.js';
import { saveProject, exportProjectAsJSON, importProjectFromJSON } from './core/storage.js';
import { refreshLayers } from './ui/layers.js';
import { addResizeHandles, removeResizeHandles } from './core/resize.js';
import { loadTemplate as loadTemplateModule } from './core/templates.js';
import { initContextMenu } from './ui/contextMenu.js';
import { StylePresets, applyPreset } from './core/presets.js';
import { SectionTemplates, addSection } from './core/sections.js';
import { Animations, applyAnimation } from './utils/animations.js';
import { AssetCategories, useAsset, searchAssets } from './ui/assets.js';
import { applyAIContent } from './utils/ai.js';
import { runSEOCheck, runAccessibilityCheck } from './utils/analysis.js';

// Initialize the application
function init() {
    console.log('WebBuilder Modular System Initialized ⚡');
    initKeyboardShortcuts();
    initContextMenu();
    initSidebarTabs();
    initSectionLibrary();
    initAssetExplorer();
    initStylePresets();
    
    // Grid Toggle Logic
    const toggleGridBtn = document.getElementById('toggleGrid');
    const canvas = document.getElementById('canvas');
    if (toggleGridBtn) {
        toggleGridBtn.onclick = () => {
            canvas.classList.toggle('no-grid');
            toggleGridBtn.classList.toggle('active');
            showToast(canvas.classList.contains('no-grid') ? 'Grid disabled' : 'Grid enabled');
        };
    }
    
    // Bind essential functions to window for HTML onclick compatibility
    window.saveProject = () => saveProject(document.getElementById('canvas'));
    window.exportProjectJSON = () => exportProjectAsJSON(document.getElementById('canvas'));
    window.importProjectJSON = (event) => importProjectFromJSON(document.getElementById('canvas'), event.target.files[0]);
    window.refreshLayers = refreshLayers;
    window.loadTemplate = loadTemplateModule;
    window.applyAI = (type) => applyAIContent(state.selectedElement, type);
    window.onAnimationChange = (val) => applyAnimation(state.selectedElement, val);
    
    // Override selectElement to integrate Layers and Resizing
    const originalSelectElement = window.selectElement;
    window.selectElement = (element) => {
        // Clear previous handles
        if (state.selectedElement) {
            removeResizeHandles(state.selectedElement);
        }

        // Update state
        state.selectedElement = element;

        // Call original if it exists
        if (typeof originalSelectElement === 'function') {
            originalSelectElement(element);
        }

        // Add new handles and refresh layers
        addResizeHandles(element);
        refreshLayers();

        // Sync UI properties
        const animSelect = document.getElementById('elementAnimation');
        if (animSelect) {
            animSelect.value = element.dataset.animation || '';
        }
    };

    // Override createComponent with the structured system
    window.createComponent = (type) => {
        const canvas = document.getElementById('canvas');
        const element = createComponent(type);
        if (element) {
            canvas.appendChild(element);
            if (window.saveState) window.saveState();
            showToast(`Added ${type}! ✨`);
            refreshLayers();
        }
    };

    // Sync layers on state changes (Delete, Undo, Redo)
    const originalDelete = window.deleteElement;
    window.deleteElement = (button) => {
        if (typeof originalDelete === 'function') originalDelete(button);
        refreshLayers();
    };

    const originalUndo = window.undoAction;
    window.undoAction = () => {
        if (typeof originalUndo === 'function') originalUndo();
        refreshLayers();
    };

    const originalRedo = window.redoAction;
    window.redoAction = () => {
        if (typeof originalRedo === 'function') originalRedo();
        refreshLayers();
    };

    // Initial layers refresh
    refreshLayers();
}

function initSidebarTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabContent = document.getElementById(`tab-${btn.dataset.tab}`);
            if (tabContent) tabContent.classList.add('active');
        };
    });
}

function initSectionLibrary() {
    const sectionList = document.getElementById('sectionList');
    if (!sectionList) return;

    Object.entries(SectionTemplates).forEach(([id, template]) => {
        const item = document.createElement('div');
        item.className = 'section-item';
        item.innerHTML = `
            <div class="section-item-header">
                <span class="section-item-icon">${template.icon}</span>
                <span class="section-item-name">${template.name}</span>
            </div>
        `;
        item.onclick = () => addSection(id);
        sectionList.appendChild(item);
    });
}

function initAssetExplorer() {
    const assetGrid = document.getElementById('assetGrid');
    const assetSearch = document.getElementById('assetSearch');
    if (!assetGrid) return;

    const renderAssets = (query = '') => {
        assetGrid.innerHTML = '';
        const results = searchAssets(query);
        
        results.forEach(asset => {
            const item = document.createElement('div');
            item.className = 'asset-item';
            
            if (asset.url) {
                item.innerHTML = `<img src="${asset.url}" alt="${asset.name}" title="${asset.name}">`;
            } else if (asset.icon) {
                item.className += ' asset-icon-item';
                item.textContent = asset.icon;
                item.title = asset.name;
            }
            
            item.onclick = () => useAsset(asset, state.selectedElement);
            assetGrid.appendChild(item);
        });
    };

    if (assetSearch) {
        assetSearch.oninput = (e) => renderAssets(e.target.value);
    }
    renderAssets();
}

function initStylePresets() {
    const presetGrid = document.getElementById('presetGrid');
    if (!presetGrid) return;

    Object.entries(StylePresets).forEach(([id, preset]) => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.innerHTML = `
            <div class="preset-swatch">
                <div style="flex: 2; background: ${preset.colors.primary}; border-radius: 4px 0 0 4px;"></div>
                <div style="flex: 1; background: ${preset.colors.surface}; border-radius: 0 4px 4px 0; border: 1px solid ${preset.colors.border}"></div>
            </div>
            <div style="font-size: 11px; font-weight: 500;">${preset.name}</div>
        `;
        card.onclick = () => applyPreset(id);
        presetGrid.appendChild(card);
    });
}

// Global Bridges for HTML onclick handlers
window.runSEOAudit = () => runSEOCheck();
window.runA11yAudit = () => runAccessibilityCheck();
window.generateAI = (type) => applyAIContent(type);

document.addEventListener('DOMContentLoaded', init);
