let storage, generator, analytics;
let currentScript = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    storage = new StorageManager();
    generator = new CinematicScriptGenerator();
    analytics = new AnalyticsEngine();

    loadSettings();
    populateCategories();
    setupEventListeners();
    displayHistory();

    showToast('🎬 Cinematic Script Generator Ready!');
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
    document.getElementById('copyBtn').addEventListener('click', copyScript);
    document.getElementById('downloadBtn').addEventListener('click', downloadScript);
    document.getElementById('clearHistory').addEventListener('click', clearHistoryConfirm);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('collapseHistory').addEventListener('click', toggleHistory);
}

function generateScript() {
    const category = document.getElementById('categorySelect').value;
    const tone = document.getElementById('toneSelect').value;
    const visualStyle = document.getElementById('visualStyle').value;
    const lighting = document.getElementById('lightingSetup').value;
    const camera = document.getElementById('cameraStyle').value;
    const audioType = document.getElementById('audioType').value;
    const voiceLang = document.getElementById('voiceLanguage').value;

    if (!category) {
        showToast('⚠️ Please select a category');
        return;
    }

    showToast('🎬 Generating cinematic script...');

    // Generate master prompt
    const masterPrompt = generator.generateMasterPrompt(category, tone, visualStyle, lighting);
    
    // Generate full script
    const script = generator.generateFullScript(masterPrompt, camera, audioType, voiceLang);
    
    currentScript = script;
    generator.currentSeed = masterPrompt;

    // Display
    displayScript(script);

    // Calculate score
    const score = analytics.calculateViralScore(script);
    displayScore(score);

    // Save to history
    storage.saveHistory({
        ...script,
        score: score.total
    });

    displayHistory();

    // Update header
    document.getElementById('currentCategory').textContent = category;
    document.getElementById('currentSpecs').textContent = `${tone} • ${visualStyle} • ${lighting}`;

    showToast('✅ Script generated successfully!');
}

function displayScript(script) {
    document.getElementById('placeholder').style.display = 'none';
    const container = document.getElementById('scriptContent');
    container.style.display = 'block';
    container.innerHTML = '';

    // Master Prompt Section
    const masterSection = document.createElement('div');
    masterSection.className = 'master-prompt';
    masterSection.innerHTML = `
        <h3>🎯 MASTER PROMPT — Consistent Visual Style</h3>
        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
            Apply these settings to ALL three clips for visual consistency:
        </p>
        <div class="prompt-grid">
            <div class="prompt-item">
                <strong>Primary Object</strong>
                ${script.masterPrompt.primaryObject}
            </div>
            <div class="prompt-item">
                <strong>Location</strong>
                ${script.masterPrompt.location}
            </div>
            <div class="prompt-item">
                <strong>Visual Style</strong>
                ${script.masterPrompt.visualStyle}
            </div>
            <div class="prompt-item">
                <strong>Lighting</strong>
                ${script.masterPrompt.lighting}
            </div>
            <div class="prompt-item">
                <strong>Color Palette</strong>
                ${script.masterPrompt.colorPalette.primary} + ${script.masterPrompt.colorPalette.secondary}
            </div>
            <div class="prompt-item">
                <strong>Aspect Ratio</strong>
                ${script.masterPrompt.aspectRatio}
            </div>
            <div class="prompt-item">
                <strong>Resolution</strong>
                ${script.masterPrompt.resolution}
            </div>
            <div class="prompt-item">
                <strong>FPS</strong>
                ${script.masterPrompt.fps}
            </div>
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px;">
            <strong style="color: var(--accent);">AI Video Prompt Base:</strong>
            <p style="margin-top: 0.5rem;">${script.masterPrompt.styleKeywords}</p>
        </div>
        <div style="margin-top: 1rem;">
            <strong style="color: var(--accent);">Emotional Arc:</strong>
            ${script.masterPrompt.emotionArc.join(' → ')}
        </div>
    `;
    container.appendChild(masterSection);

    // Individual Clips
    script.clips.forEach((clip, index) => {
        const clipCard = document.createElement('div');
        clipCard.className = 'clip-card';
        
        clipCard.innerHTML = `
            <div class="clip-header">
                <span class="clip-title">🎬 ${clip.title}</span>
                <span class="clip-duration">${clip.duration}</span>
            </div>

            <!-- Scene Description -->
            <div class="section">
                <div class="section-title">📖 Scene Description</div>
                <div class="section-content">${clip.sceneDescription}</div>
            </div>

            <!-- Camera Work -->
            <div class="section">
                <div class="section-title">📹 Camera Setup</div>
                <div class="tech-specs">
                    <div class="spec-item">
                        <div class="spec-label">Angle</div>
                        <div class="spec-value">${clip.camera.angle}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Movement</div>
                        <div class="spec-value">${clip.camera.movement}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Framing</div>
                        <div class="spec-value">${clip.camera.framing}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Focus</div>
                        <div class="spec-value">${clip.camera.focus}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Transition</div>
                        <div class="spec-value">${clip.camera.transition}</div>
                    </div>
                </div>
            </div>

            <!-- Lighting -->
            <div class="section">
                <div class="section-title">💡 Lighting Details</div>
                <div class="tech-specs">
                    <div class="spec-item">
                        <div class="spec-label">Setup</div>
                        <div class="spec-value">${clip.lighting.setup}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Direction</div>
                        <div class="spec-value">${clip.lighting.direction}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Mood</div>
                        <div class="spec-value">${clip.lighting.mood}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Shadows</div>
                        <div class="spec-value">${clip.lighting.shadows}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Practical Lights</div>
                        <div class="spec-value">${clip.lighting.practical}</div>
                    </div>
                </div>
            </div>

            <!-- Action -->
            <div class="section">
                <div class="section-title">🎭 Action & Performance</div>
                <div class="section-content">${clip.action}</div>
            </div>

            <!-- Audio -->
            <div class="section">
                <div class="section-title">🎵 Audio</div>
                ${formatAudio(clip.audio)}
            </div>

            <!-- AI Prompt -->
            <div class="section">
                <div class="section-title">🤖 AI Video Generator Prompt</div>
                <div class="section-content" style="background: var(--bg-primary); border-left: 3px solid var(--accent); font-family: monospace; font-size: 0.9rem;">
                    ${clip.aiPrompt}
                </div>
            </div>

            <!-- Emotional Beat -->
            <div class="section">
                <div class="section-title">❤️ Emotional Beat</div>
                <div class="section-content">${clip.emotion}</div>
            </div>
        `;
        
        container.appendChild(clipCard);
    });
}

function formatAudio(audio) {
    if (audio.type === 'dialogue') {
        let html = '<div>';
        audio.lines.forEach(line => {
            html += `
                <div class="dialogue-block">
                    <div class="character-name">${line.character}</div>
                    <div class="dialogue-text">${line.text}</div>
                </div>
            `;
        });
        html += `<div class="music-cue">🎵 ${audio.musicUnderscore}</div>`;
        html += '</div>';
        return html;
    } else if (audio.type === 'narration') {
        return `
            <div class="dialogue-block">
                <div class="character-name">NARRATOR (${audio.language.toUpperCase()})</div>
                <div class="dialogue-text">${audio.script}</div>
            </div>
            <div class="music-cue">🎵 ${audio.musicUnderscore}</div>
        `;
    } else {
        return `
            <div class="music-cue">🎵 ${audio.track}</div>
            <div class="music-cue">🔊 SFX: ${audio.soundEffects}</div>
        `;
    }
}

function displayScore(score) {
    document.getElementById('scoreBadge').style.display = 'flex';
    document.getElementById('scoreValue').textContent = score.total;
}

function remixScript() {
    if (!generator.currentSeed) {
        showToast('⚠️ Generate a script first!');
        return;
    }

    const camera = document.getElementById('cameraStyle').value;
    const audioType = document.getElementById('audioType').value;
    const voiceLang = document.getElementById('voiceLanguage').value;

    showToast('🔄 Remixing with new emotional arc...');

    const newSeed = generator.remix(generator.currentSeed);
    const script = generator.generateFullScript(newSeed, camera, audioType, voiceLang);

    currentScript = script;
    generator.currentSeed = newSeed;

    displayScript(script);

    const score = analytics.calculateViralScore(script);
    displayScore(score);

    storage.saveHistory({
        ...script,
        score: score.total
    });

    displayHistory();

    showToast('✅ Script remixed!');
}

function copyScript() {
    if (!currentScript) {
        showToast('⚠️ No script to copy');
        return;
    }

    const text = formatScriptForExport(currentScript);
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Copied to clipboard!');
    }).catch(() => {
        showToast('❌ Copy failed');
    });
}

function downloadScript() {
    if (!currentScript) {
        showToast('⚠️ No script to download');
        return;
    }

    const text = formatScriptForExport(currentScript);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinematic_script_${currentScript.metadata.category}_${Date.now()}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('💾 Downloaded!');
}

function formatScriptForExport(script) {
    let text = `SHORTCIRCUIT STUDIO V13 — CINEMATIC SCRIPT\n`;
    text += `${'='.repeat(80)}\n\n`;
    
    text += `CATEGORY: ${script.metadata.category}\n`;
    text += `TONE: ${script.masterPrompt.tone}\n`;
    text += `VISUAL STYLE: ${script.masterPrompt.visualStyle}\n`;
    text += `LIGHTING: ${script.masterPrompt.lighting}\n`;
    text += `GENERATED: ${new Date(script.metadata.generatedAt).toLocaleString()}\n\n`;
    
    text += `MASTER PROMPT — APPLY TO ALL CLIPS:\n`;
    text += `${'─'.repeat(80)}\n`;
    text += `Object: ${script.masterPrompt.primaryObject}\n`;
    text += `Location: ${script.masterPrompt.location}\n`;
    text += `Visual Style: ${script.masterPrompt.visualStyle}\n`;
    text += `Lighting: ${script.masterPrompt.lighting}\n`;
    text += `Color Palette: ${script.masterPrompt.colorPalette.primary} + ${script.masterPrompt.colorPalette.secondary}\n`;
    text += `Aspect Ratio: ${script.masterPrompt.aspectRatio}\n`;
    text += `Resolution: ${script.masterPrompt.resolution}\n`;
    text += `FPS: ${script.masterPrompt.fps}\n`;
    text += `Emotional Arc: ${script.masterPrompt.emotionArc.join(' → ')}\n\n`;
    
    script.clips.forEach((clip, index) => {
        text += `${'='.repeat(80)}\n`;
        text += `CLIP ${index + 1}: ${clip.title}\n`;
        text += `Duration: ${clip.duration}\n`;
        text += `${'='.repeat(80)}\n\n`;
        
        text += `SCENE DESCRIPTION:\n${clip.sceneDescription}\n\n`;
        
        text += `CAMERA:\n`;
        text += `  Angle: ${clip.camera.angle}\n`;
        text += `  Movement: ${clip.camera.movement}\n`;
        text += `  Framing: ${clip.camera.framing}\n`;
        text += `  Focus: ${clip.camera.focus}\n`;
        text += `  Transition: ${clip.camera.transition}\n\n`;
        
        text += `LIGHTING:\n`;
        text += `  Setup: ${clip.lighting.setup}\n`;
        text += `  Direction: ${clip.lighting.direction}\n`;
        text += `  Mood: ${clip.lighting.mood}\n`;
        text += `  Shadows: ${clip.lighting.shadows}\n`;
        text += `  Practical: ${clip.lighting.practical}\n\n`;
        
        text += `ACTION:\n${clip.action}\n\n`;
        
        text += `AUDIO:\n`;
        if (clip.audio.type === 'dialogue') {
            clip.audio.lines.forEach(line => {
                text += `  ${line.character}: "${line.text}"\n`;
            });
            text += `  Music: ${clip.audio.musicUnderscore}\n`;
        } else if (clip.audio.type === 'narration') {
            text += `  Narrator: "${clip.audio.script}"\n`;
            text += `  Music: ${clip.audio.musicUnderscore}\n`;
        } else {
            text += `  Music: ${clip.audio.track}\n`;
            text += `  SFX: ${clip.audio.soundEffects}\n`;
        }
        text += `\n`;
        
        text += `AI VIDEO PROMPT:\n${clip.aiPrompt}\n\n`;
        
        text += `EMOTIONAL BEAT: ${clip.emotion}\n\n`;
    });
    
    return text;
}

function displayHistory() {
    const container = document.getElementById('historyList');
    const history = storage.getHistory();

    if (history.length === 0) {
        container.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-secondary);">No scripts yet</p>';
        return;
    }

    container.innerHTML = '';

    history.forEach((item, index) => {
        if (index >= 10) return; // Show only 10 recent

        const div = document.createElement('div');
        div.className = 'history-item';
        
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString();
        
        div.innerHTML = `
            <div class="history-category">${item.metadata.category}</div>
            <div class="history-date">${dateStr}</div>
        `;
        
        div.addEventListener('click', () => loadHistoryItem(item));
        container.appendChild(div);
    });
}

function loadHistoryItem(item) {
    currentScript = item;
    generator.currentSeed = item.masterPrompt;
    
    displayScript(item);
    
    if (item.score) {
        displayScore({ total: item.score });
    }
    
    document.getElementById('currentCategory').textContent = item.metadata.category;
    document.getElementById('currentSpecs').textContent = `${item.masterPrompt.tone} • ${item.masterPrompt.visualStyle}`;
    
    showToast('📚 Loaded from history');
}

function clearHistoryConfirm() {
    if (confirm('Clear all history? This cannot be undone.')) {
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
    showToast(newTheme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode');
}

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    const btn = document.getElementById('collapseHistory');
    panel.classList.toggle('collapsed');
    btn.textContent = panel.classList.contains('collapsed') ? '+' : '−';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}