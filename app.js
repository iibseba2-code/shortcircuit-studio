let storage, generator, analytics;
let currentScript = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('🎬 Initializing ShortCircuit Studio v13...');
    
    storage = new StorageManager();
    generator = new ViralScriptGenerator();
    analytics = new AnalyticsEngine();

    loadSettings();
    populateCategories();
    setupEventListeners();
    displayHistory();
    updateClocks();
    setInterval(updateClocks, 1000);

    showToast('⚡ ShortCircuit Studio v13 Ready!');
}

function loadSettings() {
    const theme = storage.load('theme') || 'dark';
    document.body.setAttribute('data-theme', theme);
}

function populateCategories() {
    const select = document.getElementById('categorySelect');
    CATEGORIES.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
    console.log(`✅ Loaded ${CATEGORIES.length} categories`);
}

function setupEventListeners() {
    document.getElementById('generateBtn').addEventListener('click', generateScript);
    document.getElementById('remixBtn').addEventListener('click', remixScript);
    document.getElementById('copyAllBtn').addEventListener('click', copyAll);
    document.getElementById('downloadBtn').addEventListener('click', downloadScript);
    document.getElementById('clearHistory').addEventListener('click', clearHistoryConfirm);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function updateClocks() {
    const now = new Date();
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const bstTime = new Date(estTime.getTime() + (11 * 60 * 60 * 1000));
    
    document.getElementById('currentEST').textContent = estTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('currentBST').textContent = bstTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function generateScript() {
    const category = document.getElementById('categorySelect').value;
    const tone = document.getElementById('toneSelect').value;
    const audioType = document.getElementById('audioType').value;
    const language = document.getElementById('language').value;

    if (!category) {
        showToast('⚠️ Please select a category first');
        return;
    }

    showToast('⚡ Generating viral script...');

    try {
        const script = generator.generateScript(category, tone, audioType, language);
        currentScript = script;

        displayScript(script);
        displayUploadTimes();

        const score = analytics.calculateViralScore(script);
        displayScore(score);

        storage.saveHistory(script);
        displayHistory();

        document.getElementById('projectTitle').textContent = category;
        document.getElementById('projectSpecs').textContent = `${tone} • 3×8s = 24s viral video`;

        showToast('✅ Script generated successfully!');
        
        console.log('✅ Script generated:', script);
    } catch (error) {
        console.error('❌ Generation error:', error);
        showToast('❌ Error generating script. Please try again.');
    }
}

function displayScript(script) {
    document.getElementById('placeholder').style.display = 'none';
    const container = document.getElementById('scriptDisplay');
    container.style.display = 'block';
    container.innerHTML = '';

    // Consistency Seed Section
    const seedSection = document.createElement('div');
    seedSection.className = 'seed-section';
    seedSection.innerHTML = `
        <h3>🎯 Consistency Seed System</h3>
        <p>These elements remain consistent across all 3 clips for perfect visual continuity:</p>
        <div class="seed-grid">
            <div class="seed-item">
                <strong>Primary Object</strong>
                ${script.seed.primaryObject}
            </div>
            <div class="seed-item">
                <strong>Location</strong>
                ${script.seed.location}
            </div>
            <div class="seed-item">
                <strong>Color Palette</strong>
                ${script.seed.palette}
            </div>
            <div class="seed-item">
                <strong>Ambient Sound</strong>
                ${script.seed.ambientSound}
            </div>
            <div class="seed-item">
                <strong>Emotion Arc</strong>
                ${script.seed.emotionArc.join(' → ')}
            </div>
        </div>
    `;
    container.appendChild(seedSection);

    // Each Clip = One Complete Box
    script.clips.forEach(clip => {
        const clipSection = document.createElement('div');
        clipSection.className = 'clip-section';
        
        // Build complete clip text for the box
        let clipText = `CLIP ${clip.number} (${clip.duration})\n\n`;
        clipText += `📊 VIRAL RULE:\n${clip.viralRule}\n\n`;
        clipText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        clipText += `🎯 CORE PROMPT:\n${clip.corePrompt}\n\n`;
        clipText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        clipText += `🎬 VISUAL:\n`;
        clipText += `Camera Angle: ${clip.visual.cameraAngle}\n`;
        clipText += `Camera Movement: ${clip.visual.cameraMovement}\n`;
        clipText += `Framing: ${clip.visual.framing}\n`;
        clipText += `Lighting: ${clip.visual.lighting}\n`;
        clipText += `Color Palette: ${clip.visual.colorPalette}\n`;
        clipText += `Scene: ${clip.visual.sceneDescription}\n\n`;
        
        if (clip.audio.voiceOver) {
            clipText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
            clipText += `🗣️ VOICE OVER:\n${clip.audio.voiceOver}\n\n`;
        }
        
        clipText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        clipText += `🎵 BACKGROUND MUSIC:\n${clip.audio.backgroundMusic}`;
        
        // Display in one complete box
        clipSection.innerHTML = `
            <div class="clip-header">
                <span class="clip-title">CLIP ${clip.number}</span>
                <span class="clip-duration">${clip.duration}</span>
            </div>

            <div class="clip-complete-box" id="clipBox${clip.number}">${clipText}</div>

            <button class="copy-clip-btn" onclick="copyClipBox(${clip.number})">
                📋 Copy Clip ${clip.number} to Clipboard
            </button>
        `;
        
        container.appendChild(clipSection);
    });
}

function displayUploadTimes() {
    const card = document.getElementById('timingCard');
    card.style.display = 'block';
    
    const grid = document.getElementById('timingGrid');
    grid.innerHTML = '';
    
    analytics.getUploadTimes().forEach(slot => {
        const div = document.createElement('div');
        div.className = 'timing-slot';
        div.innerHTML = `
            <h4>${slot.label}</h4>
            <p><strong>EST:</strong> ${slot.est}</p>
            <p><strong>BST:</strong> ${slot.bst}</p>
            <p style="margin-top: 0.5rem; color: var(--text-secondary);">${slot.audience}</p>
        `;
        grid.appendChild(div);
    });
}

function displayScore(score) {
    document.getElementById('scoreBadge').style.display = 'flex';
    document.getElementById('scoreValue').textContent = score;
}

function remixScript() {
    if (!generator.currentSeed) {
        showToast('⚠️ Generate a script first');
        return;
    }

    const audioType = document.getElementById('audioType').value;
    const language = document.getElementById('language').value;

    showToast('🔄 Remixing script...');

    const newSeed = generator.remix(generator.currentSeed);
    const script = generator.generateScript(newSeed.category, newSeed.tone, audioType, language);

    currentScript = script;

    displayScript(script);
    displayUploadTimes();

    const score = analytics.calculateViralScore(script);
    displayScore(score);

    storage.saveHistory(script);
    displayHistory();

    showToast('✅ Script remixed with new tone!');
}

function copyClipBox(clipNum) {
    const boxElement = document.getElementById(`clipBox${clipNum}`);
    const text = boxElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Clip ${clipNum} copied to clipboard!`);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`📋 Clip ${clipNum} copied!`);
    });
}

function copyAll() {
    if (!currentScript) {
        showToast('⚠️ No script to copy');
        return;
    }

    let text = `SHORTCIRCUIT STUDIO V13 — VIRAL SCRIPT\n`;
    text += `${'='.repeat(80)}\n\n`;
    text += `Category: ${currentScript.metadata.category}\n`;
    text += `Tone: ${currentScript.metadata.tone}\n`;
    text += `Audio: ${currentScript.metadata.audioType}\n`;
    text += `Language: ${currentScript.metadata.language.toUpperCase()}\n\n`;
    
    text += `CONSISTENCY SEED:\n`;
    text += `${'─'.repeat(80)}\n`;
    text += `Primary Object: ${currentScript.seed.primaryObject}\n`;
    text += `Location: ${currentScript.seed.location}\n`;
    text += `Color Palette: ${currentScript.seed.palette}\n`;
    text += `Ambient Sound: ${currentScript.seed.ambientSound}\n`;
    text += `Emotion Arc: ${currentScript.seed.emotionArc.join(' → ')}\n\n`;
    
    currentScript.clips.forEach(clip => {
        text += `${'='.repeat(80)}\n`;
        text += `CLIP ${clip.number} (${clip.duration})\n`;
        text += `${'='.repeat(80)}\n\n`;
        text += `📊 VIRAL RULE:\n${clip.viralRule}\n\n`;
        text += `🎯 CORE PROMPT:\n${clip.corePrompt}\n\n`;
        text += `🎬 VISUAL:\n`;
        text += `Camera Angle: ${clip.visual.cameraAngle}\n`;
        text += `Camera Movement: ${clip.visual.cameraMovement}\n`;
        text += `Framing: ${clip.visual.framing}\n`;
        text += `Lighting: ${clip.visual.lighting}\n`;
        text += `Color Palette: ${clip.visual.colorPalette}\n`;
        text += `Scene: ${clip.visual.sceneDescription}\n\n`;
        
        if (clip.audio.voiceOver) {
            text += `🗣️ VOICE OVER:\n${clip.audio.voiceOver}\n\n`;
        }
        
        text += `🎵 BACKGROUND MUSIC:\n${clip.audio.backgroundMusic}\n\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Full script copied to clipboard!');
    }).catch(() => {
        showToast('❌ Copy failed. Please try again.');
    });
}

function downloadScript() {
    if (!currentScript) {
        showToast('⚠️ No script to download');
        return;
    }

    let text = `SHORTCIRCUIT STUDIO V13 — VIRAL SCRIPT\n`;
    text += `${'='.repeat(80)}\n\n`;
    text += `Category: ${currentScript.metadata.category}\n`;
    text += `Tone: ${currentScript.metadata.tone}\n`;
    text += `Generated: ${new Date(currentScript.metadata.generated).toLocaleString()}\n\n`;
    
    text += `CONSISTENCY SEED:\n`;
    text += `${'─'.repeat(80)}\n`;
    text += `Primary Object: ${currentScript.seed.primaryObject}\n`;
    text += `Location: ${currentScript.seed.location}\n`;
    text += `Color Palette: ${currentScript.seed.palette}\n`;
    text += `Ambient Sound: ${currentScript.seed.ambientSound}\n`;
    text += `Emotion Arc: ${currentScript.seed.emotionArc.join(' → ')}\n\n`;
    
    currentScript.clips.forEach(clip => {
        text += `${'='.repeat(80)}\n`;
        text += `CLIP ${clip.number} (${clip.duration})\n`;
        text += `${'='.repeat(80)}\n\n`;
        text += `VIRAL RULE:\n${clip.viralRule}\n\n`;
        text += `CORE PROMPT:\n${clip.corePrompt}\n\n`;
        text += `VISUAL:\n`;
        text += `Camera Angle: ${clip.visual.cameraAngle}\n`;
        text += `Camera Movement: ${clip.visual.cameraMovement}\n`;
        text += `Framing: ${clip.visual.framing}\n`;
        text += `Lighting: ${clip.visual.lighting}\n`;
        text += `Color Palette: ${clip.visual.colorPalette}\n`;
        text += `Scene: ${clip.visual.sceneDescription}\n\n`;
        
        if (clip.audio.voiceOver) {
            text += `VOICE OVER:\n${clip.audio.voiceOver}\n\n`;
        }
        
        text += `BACKGROUND MUSIC:\n${clip.audio.backgroundMusic}\n\n`;
    });
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `shortcircuit_${currentScript.metadata.category.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('💾 Script downloaded successfully!');
}

function displayHistory() {
    const container = document.getElementById('historyItems');
    const history = storage.getHistory();

    const countElement = document.getElementById('historyCount');
    countElement.textContent = `${history.length} script${history.length !== 1 ? 's' : ''}`;

    if (history.length === 0) {
        container.innerHTML = '<p class="history-empty">No scripts generated yet</p>';
        return;
    }

    container.innerHTML = '';

    history.slice(0, 10).forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const date = new Date(item.timestamp);
        
        div.innerHTML = `
            <div class="history-category">${item.metadata.category}</div>
            <div class="history-date">${date.toLocaleDateString()}</div>
        `;
        
        div.addEventListener('click', () => {
            currentScript = item;
            displayScript(item);
            displayUploadTimes();
            const score = analytics.calculateViralScore(item);
            displayScore(score);
            showToast('📚 Script loaded from history');
        });
        
        container.appendChild(div);
    });
}

function clearHistoryConfirm() {
    if (confirm('Clear all script history? This cannot be undone.')) {
        storage.clearHistory();
        displayHistory();
        showToast('🗑️ History cleared');
    }
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    storage.save('theme', newTheme);
    showToast(newTheme === 'dark' ? '🌙 Dark mode activated' : '☀️ Light mode activated');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions global for onclick
window.copyClipBox = copyClipBox;

console.log('✅ ShortCircuit Studio v13 loaded successfully');
