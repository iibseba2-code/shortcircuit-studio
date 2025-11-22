let storage, generator, analytics;
let currentScript = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    storage = new StorageManager();
    generator = new ViralScriptGenerator();
    analytics = new AnalyticsEngine();

    loadSettings();
    populateCategories();
    setupEventListeners();
    displayHistory();

    showToast('🎬 Ready to create viral scripts!');
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
}

function setupEventListeners() {
    document.getElementById('generateBtn').addEventListener('click', generateScript);
    document.getElementById('remixBtn').addEventListener('click', remixScript);
    document.getElementById('copyAllBtn').addEventListener('click', copyAll);
    document.getElementById('downloadBtn').addEventListener('click', downloadScript);
    document.getElementById('clearHistory').addEventListener('click', () => {
        if (confirm('Clear all history?')) {
            storage.clearHistory();
            displayHistory();
            showToast('🗑️ History cleared');
        }
    });
    document.getElementById('themeToggle').addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        storage.save('theme', newTheme);
        showToast(newTheme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode');
    });
}

function generateScript() {
    const category = document.getElementById('categorySelect').value;
    const tone = document.getElementById('toneSelect').value;
    const audioType = document.getElementById('audioType').value;
    const language = document.getElementById('language').value;

    if (!category) {
        showToast('⚠️ Please select a category');
        return;
    }

    showToast('⚡ Generating viral script...');

    const script = generator.generateScript(category, tone, audioType, language);

    currentScript = script;

    displayScript(script);

    const score = analytics.calculateViralScore(script);
    displayScore(score);

    storage.saveHistory(script);
    displayHistory();

    document.getElementById('projectTitle').textContent = category;
    document.getElementById('projectSpecs').textContent = `${tone} • 3 clips × 8 seconds = 24 second viral video`;

    showToast('✅ Script generated successfully!');
}

function displayScript(script) {
    document.getElementById('placeholder').style.display = 'none';
    const container = document.getElementById('scriptDisplay');
    container.style.display = 'block';
    container.innerHTML = '';

    // Core Info Section
    const coreSection = document.createElement('div');
    coreSection.className = 'core-section';
    coreSection.innerHTML = `
        <h3>🎯 Core Consistent Elements (All 3 Clips)</h3>
        <div class="core-info">
            <div class="core-info-item">
                <strong>Object</strong>
                ${script.core.object}
            </div>
            <div class="core-info-item">
                <strong>Location</strong>
                ${script.core.location}
            </div>
            <div class="core-info-item">
                <strong>Visual Style</strong>
                ${script.core.visualStyle}
            </div>
            <div class="core-info-item">
                <strong>Lighting</strong>
                ${script.core.lighting}
            </div>
            <div class="core-info-item">
                <strong>Color Palette</strong>
                ${script.core.palette.primary} + ${script.core.palette.secondary}
            </div>
            <div class="core-info-item">
                <strong>Emotional Journey</strong>
                ${script.core.emotionArc.join(' → ')}
            </div>
        </div>
    `;
    container.appendChild(coreSection);

    // Clip Cards
    script.clips.forEach(clip => {
        const clipCard = document.createElement('div');
        clipCard.className = 'clip-card';
        
        clipCard.innerHTML = `
            <div class="clip-header">
                <span class="clip-title">🎬 CLIP ${clip.number}</span>
                <span class="clip-duration">${clip.duration}</span>
            </div>

            <div class="viral-tag">
                <strong>📊 Viral Rule:</strong> ${clip.viralRule}
            </div>

            <div class="prompt-section">
                <span class="prompt-label">🤖 Complete AI Video Prompt</span>
                <div class="prompt-box" id="prompt${clip.number}">${clip.prompt}</div>
                <button class="copy-btn" onclick="copyPrompt(${clip.number})">
                    📋 Copy Clip ${clip.number} Prompt
                </button>
            </div>

            ${clip.voiceover ? `
                <div class="prompt-section">
                    <span class="prompt-label">🗣️ Voiceover Script</span>
                    <div class="prompt-box">${clip.voiceover}</div>
                </div>
            ` : ''}

            <div class="prompt-section">
                <span class="prompt-label">���� Background Music</span>
                <div class="prompt-box">${clip.music}</div>
            </div>

            <div class="prompt-section">
                <span class="prompt-label">❤️ Emotional Beat</span>
                <div class="prompt-box">${clip.emotion}</div>
            </div>
        `;
        
        container.appendChild(clipCard);
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

    const newSeed = generator.remix(generator.currentSeed);
    const category = newSeed.category;
    const tone = newSeed.tone;

    const script = generator.generateScript(category, tone, audioType, language);

    currentScript = script;

    displayScript(script);

    const score = analytics.calculateViralScore(script);
    displayScore(score);

    storage.saveHistory(script);
    displayHistory();

    showToast('✅ Script remixed with new tone!');
}

function copyPrompt(clipNumber) {
    const element = document.getElementById(`prompt${clipNumber}`);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Clip ${clipNumber} prompt copied!`);
    }).catch(() => {
        showToast('❌ Copy failed');
    });
}

function copyAll() {
    if (!currentScript) {
        showToast('⚠️ No script to copy');
        return;
    }

    const text = formatForExport(currentScript);
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Full script copied to clipboard!');
    }).catch(() => {
        showToast('❌ Copy failed');
    });
}

function downloadScript() {
    if (!currentScript) {
        showToast('⚠️ No script to download');
        return;
    }

    const text = formatForExport(currentScript);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `viral_script_${currentScript.metadata.category}_${Date.now()}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('💾 Script downloaded!');
}

function formatForExport(script) {
    let text = `VIRAL VIDEO SCRIPT — ${script.metadata.category}\n`;
    text += `Tone: ${script.metadata.tone}\n`;
    text += `Generated: ${new Date(script.metadata.generated).toLocaleString()}\n`;
    text += `${'='.repeat(80)}\n\n`;
    
    text += `CORE CONSISTENT ELEMENTS (Apply to all 3 clips):\n`;
    text += `Object: ${script.core.object}\n`;
    text += `Location: ${script.core.location}\n`;
    text += `Visual Style: ${script.core.visualStyle}\n`;
    text += `Lighting: ${script.core.lighting}\n`;
    text += `Colors: ${script.core.palette.primary} + ${script.core.palette.secondary}\n`;
    text += `Emotional Arc: ${script.core.emotionArc.join(' → ')}\n\n`;
    
    script.clips.forEach(clip => {
        text += `${'='.repeat(80)}\n`;
        text += `CLIP ${clip.number} (${clip.duration})\n`;
        text += `${'='.repeat(80)}\n\n`;
        
        text += `VIRAL RULE:\n${clip.viralRule}\n\n`;
        
        text += `AI VIDEO PROMPT:\n${clip.prompt}\n\n`;
        
        if (clip.voiceover) {
            text += `VOICEOVER:\n${clip.voiceover}\n\n`;
        }
        
        text += `MUSIC:\n${clip.music}\n\n`;
        
        text += `EMOTION:\n${clip.emotion}\n\n`;
    });
    
    return text;
}

function displayHistory() {
    const container = document.getElementById('historyItems');
    const history = storage.getHistory();

    if (history.length === 0) {
        container.innerHTML = '<div style="padding: 1rem; color: var(--text-secondary);">No scripts yet</div>';
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
            const score = analytics.calculateViralScore(item);
            displayScore(score);
            showToast('📚 Loaded from history');
        });
        
        container.appendChild(div);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Global function
window.copyPrompt = copyPrompt;
