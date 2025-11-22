let storage, generator, analytics, audio;
let currentScript = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    storage = new StorageManager();
    generator = new ScriptGenerator();
    analytics = new AnalyticsEngine();
    audio = new AudioManager();

    loadSettings();
    populateCategories();
    setupEventListeners();
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);
    displayHistory();

    showToast('✨ ShortCircuit Studio v13 Ready!', 'success');
}

function loadSettings() {
    const theme = storage.load('theme') || 'dark';
    const accent = storage.load('accent') || 'magenta';
    const hfKey = storage.load('hfApiKey') || '';
    const repKey = storage.load('replicateApiKey') || '';
    const lang = storage.load('defaultLang') || 'en';

    document.body.setAttribute('data-theme', theme);
    document.body.setAttribute('data-accent', accent);
    
    document.getElementById('hfApiKey').value = hfKey;
    document.getElementById('replicateApiKey').value = repKey;
    document.getElementById('defaultLang').value = lang;

    if (hfKey) audio.setAPIKey('huggingface', hfKey);
    if (repKey) audio.setAPIKey('replicate', repKey);

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === accent);
    });

    updateThemeIcon(theme);
}

function saveSettings() {
    const hfKey = document.getElementById('hfApiKey').value;
    const repKey = document.getElementById('replicateApiKey').value;
    const lang = document.getElementById('defaultLang').value;

    storage.save('hfApiKey', hfKey);
    storage.save('replicateApiKey', repKey);
    storage.save('defaultLang', lang);

    if (hfKey) audio.setAPIKey('huggingface', hfKey);
    if (repKey) audio.setAPIKey('replicate', repKey);

    showToast('💾 Settings saved successfully!', 'success');
    closeSidebar();
}

function setupEventListeners() {
    document.getElementById('settingsBtn').addEventListener('click', openSidebar);
    document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => setAccent(btn.dataset.color));
    });

    document.getElementById('generateBtn').addEventListener('click', generateScript);
    document.getElementById('remixBtn').addEventListener('click', remixScript);
    document.getElementById('clearBtn').addEventListener('click', clearScript);
    document.getElementById('copyBtn').addEventListener('click', copyScript);
    document.getElementById('downloadBtn').addEventListener('click', downloadScript);
    document.getElementById('clearHistory').addEventListener('click', clearHistoryConfirm);
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    storage.save('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    document.getElementById('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function setAccent(color) {
    document.body.setAttribute('data-accent', color);
    storage.save('accent', color);
    
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === color);
    });
}

function updateTimeDisplay() {
    const now = new Date();
    
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const estStr = estTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const bstTime = new Date(estTime.getTime() + (11 * 60 * 60 * 1000));
    const bstStr = bstTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    document.getElementById('timeEST').textContent = estStr;
    document.getElementById('timeBST').textContent = bstStr;
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

function generateScript() {
    const category = document.getElementById('categorySelect').value;
    const tone = document.getElementById('toneSelect').value;
    const music = document.getElementById('musicSelect').value;
    const voiceLang = document.getElementById('voiceLangSelect').value;
    const apiProvider = document.getElementById('apiProvider').value;

    if (!category) {
        showToast('⚠️ Please select a category', 'warning');
        return;
    }

    showToast('⚡ Generating your viral script...', 'info');

    const seed = generator.generateSeed(category, tone);
    const script = generator.generateScript(seed, music);
    
    currentScript = script;
    generator.currentSeed = seed;

    displayScript(script, voiceLang, apiProvider);

    const score = analytics.calculateViralScore(script);
    displayAnalytics(score);

    storage.saveHistory({
        ...script,
        score: score.total
    });

    displayHistory();

    showToast('✅ Script generated successfully!', 'success');
}

function remixScript() {
    if (!generator.currentSeed) {
        showToast('⚠️ Generate a script first!', 'warning');
        return;
    }

    const music = document.getElementById('musicSelect').value;
    const voiceLang = document.getElementById('voiceLangSelect').value;
    const apiProvider = document.getElementById('apiProvider').value;

    showToast('🔄 Remixing with new emotion arc...', 'info');

    const newSeed = generator.remix(generator.currentSeed);
    const script = generator.generateScript(newSeed, music);

    currentScript = script;
    generator.currentSeed = newSeed;

    displayScript(script, voiceLang, apiProvider);

    const score = analytics.calculateViralScore(script);
    displayAnalytics(score);

    storage.saveHistory({
        ...script,
        score: score.total
    });

    displayHistory();

    showToast('✅ Script remixed!', 'success');
}

function clearScript() {
    document.getElementById('scriptPlaceholder').style.display = 'block';
    document.getElementById('scriptContent').style.display = 'none';
    document.getElementById('analyticsCard').style.display = 'none';
    currentScript = null;
    showToast('🗑️ Script cleared', 'info');
}

function displayScript(script, voiceLang, apiProvider) {
    document.getElementById('scriptPlaceholder').style.display = 'none';
    const container = document.getElementById('scriptContent');
    container.style.display = 'block';
    container.innerHTML = '';

    const seedDiv = document.createElement('div');
    seedDiv.className = 'clip-section';
    seedDiv.innerHTML = `
        <div class="clip-header">🌱 Consistency Seed</div>
        <div class="clip-text"><strong>Object:</strong> ${script.seed.primaryObject}</div>
        <div class="clip-text"><strong>Location:</strong> ${script.seed.location}</div>
        <div class="clip-text"><strong>Palette:</strong> ${script.seed.palette}</div>
        <div class="clip-text"><strong>Sound:</strong> ${script.seed.ambientSound}</div>
        <div class="clip-text"><strong>Emotion Arc:</strong> ${script.seed.emotionArc.join(' → ')}</div>
    `;
    container.appendChild(seedDiv);

    const musicDiv = document.createElement('div');
    musicDiv.className = 'clip-section';
    musicDiv.innerHTML = `
        <div class="clip-header">🎵 Music</div>
        <div class="clip-text">${audio.getMusicCue(script.music)}</div>
    `;
    container.appendChild(musicDiv);

    script.clips.forEach((clip, index) => {
        const clipDiv = document.createElement('div');
        clipDiv.className = 'clip-section';
        clipDiv.innerHTML = `
            <div class="clip-header">🎞 Clip ${index + 1} (${index * 8}-${(index + 1) * 8}s)</div>
            <div class="clip-text">${clip.text}</div>
            <div class="clip-meta">
                <span><strong>Visual:</strong> ${clip.visualCue}</span>
                <span><strong>Sound:</strong> ${clip.soundCue}</span>
                <span><strong>Emotion:</strong> ${clip.emotion}</span>
            </div>
        `;
        container.appendChild(clipDiv);

        if (voiceLang !== 'none') {
            const voiceDiv = document.createElement('div');
            voiceDiv.className = 'clip-text';
            voiceDiv.innerHTML = `<em>🗣️ Voice: ${voiceLang === 'en' ? 'English' : 'Bangla'} (${apiProvider})</em>`;
            clipDiv.appendChild(voiceDiv);
        }
    });
}

function displayAnalytics(score) {
    const card = document.getElementById('analyticsCard');
    card.style.display = 'block';

    document.getElementById('scoreDisplay').textContent = score.total;

    const breakdown = document.getElementById('scoreBreakdown');
    breakdown.innerHTML = '';
    
    Object.entries(score.breakdown).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'score-item';
        item.innerHTML = `
            <div class="score-label">${VIRAL_RULES[key].desc}</div>
            <div class="score-value">${value}</div>
        `;
        breakdown.appendChild(item);
    });

    const timeGrid = document.getElementById('timeGrid');
    timeGrid.innerHTML = '';
    
    analytics.getUploadTimes().forEach(slot => {
        const item = document.createElement('div');
        item.className = 'time-slot';
        item.innerHTML = `
            <div class="time-slot-label">${slot.label}</div>
            <div class="time-slot-value">EST: ${slot.est}</div>
            <div class="time-slot-value">BST: ${slot.bst}</div>
            <div class="clip-text" style="margin-top: 0.5rem; font-size: 0.85rem;">${slot.audience}</div>
        `;
        timeGrid.appendChild(item);
    });

    const avg = analytics.updateAverageScore(score.total);
    console.log(`Session average: ${avg}`);
}

function displayHistory() {
    const container = document.getElementById('historyList');
    const history = storage.getHistory();

    if (history.length === 0) {
        container.innerHTML = '<p class="history-empty">No scripts generated yet</p>';
        return;
    }

    container.innerHTML = '';

    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        div.innerHTML = `
            <div class="history-item-header">
                <span class="history-category">${item.metadata.category}</span>
                <span class="history-date">${dateStr}</span>
            </div>
            <div class="history-preview">${item.clips[0].text.substring(0, 80)}...</div>
            <div class="history-preview" style="margin-top: 0.25rem; color: var(--accent);">
                Score: ${item.score || '--'}
            </div>
        `;
        
        div.addEventListener('click', () => loadHistoryItem(item));
        container.appendChild(div);
    });
}

function loadHistoryItem(item) {
    currentScript = item;
    generator.currentSeed = item.seed;
    
    const voiceLang = document.getElementById('voiceLangSelect').value;
    const apiProvider = document.getElementById('apiProvider').value;
    
    displayScript(item, voiceLang, apiProvider);
    
    if (item.score) {
        const scoreObj = {
            total: item.score,
            breakdown: {
                shock: 90,
                visual: 85,
                weird: 88,
                loop: 92,
                emotion: 87
            }
        };
        displayAnalytics(scoreObj);
    }
    
    showToast('📚 Loaded from history', 'info');
}

function clearHistoryConfirm() {
    if (confirm('Clear all history? This cannot be undone.')) {
        storage.clearHistory();
        displayHistory();
        showToast('🗑️ History cleared', 'info');
    }
}

function copyScript() {
    if (!currentScript) {
        showToast('⚠️ No script to copy', 'warning');
        return;
    }

    const text = formatScriptForExport(currentScript);
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('❌ Copy failed', 'error');
    });
}

function downloadScript() {
    if (!currentScript) {
        showToast('⚠️ No script to download', 'warning');
        return;
    }

    const text = formatScriptForExport(currentScript);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `script_${currentScript.metadata.category}_${Date.now()}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('💾 Downloaded!', 'success');
}

function formatScriptForExport(script) {
    let text = `SHORTCIRCUIT STUDIO V13 - VIRAL SCRIPT\n`;
    text += `${'='.repeat(50)}\n\n`;
    
    text += `CATEGORY: ${script.metadata.category}\n`;
    text += `TONE: ${script.seed.tone}\n`;
    text += `GENERATED: ${new Date(script.metadata.generatedAt).toLocaleString()}\n\n`;
    
    text += `CONSISTENCY SEED:\n`;
    text += `- Object: ${script.seed.primaryObject}\n`;
    text += `- Location: ${script.seed.location}\n`;
    text += `- Palette: ${script.seed.palette}\n`;
    text += `- Sound: ${script.seed.ambientSound}\n`;
    text += `- Emotion Arc: ${script.seed.emotionArc.join(' → ')}\n\n`;
    
    text += `MUSIC: ${script.music}\n`;
    text += `${audio.getMusicCue(script.music)}\n\n`;
    
    script.clips.forEach((clip, index) => {
        text += `${'─'.repeat(50)}\n`;
        text += `CLIP ${index + 1} (${index * 8}-${(index + 1) * 8}s)\n`;
        text += `${'─'.repeat(50)}\n`;
        text += `${clip.text}\n\n`;
        text += `Visual: ${clip.visualCue}\n`;
        text += `Sound: ${clip.soundCue}\n`;
        text += `Emotion: ${clip.emotion}\n\n`;
    });
    
    return text;
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}