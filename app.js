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
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            These elements remain consistent across all 3 clips:
        </p>
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
        
        // Build complete clip text
        let clipText = `CLIP ${clip.number} (${clip.duration})\n\n`;
        clipText += `📊 VIRAL RULE:\n${clip.viralRule}\n\n`;
        clipText += `🎯 CORE PROMPT:\n${clip.corePrompt}\n\n`;
        clipText += `🎬 VISUAL:\n`;
        clipText += `Camera Angle: ${clip.visual.cameraAngle}\n`;
        clipText += `Camera Movement: ${clip.visual.cameraMovement}\n`;
        clipText += `Framing: ${clip.visual.framing}\n`;
        clipText += `Lighting: ${clip.visual.lighting}\n`;
        clipText += `Color Palette: ${clip.visual.colorPalette}\n`;
        clipText += `Scene: ${clip.visual.sceneDescription}\n\n`;
        
        if (clip.audio.voiceOver) {
            clipText += `🗣️ VOICE OVER:\n${clip.audio.voiceOver}\n\n`;
        }
        
        clipText += `🎵 BACKGROUND MUSIC:\n${clip.audio.backgroundMusic}`;
        
        // Display in one box
        clipSection.innerHTML = `
            <div class="clip-header">
                <span class="clip-title">CLIP ${clip.number}</span>
                <span class="clip-duration">${clip.duration}</span>
            </div>

            <div class="clip-complete-box" id="clipBox${clip.number}">
                <div style="white-space: pre-wrap; line-height: 1.8;">${clipText}</div>
            </div>

            <button class="copy-clip-btn" onclick="copyClipBox(${clip.number})">
                📋 Copy Clip ${clip.number}
            </button>
        `;
        
        container.appendChild(clipSection);
    });
}

// Updated copy function
function copyClipBox(clipNum) {
    const boxElement = document.getElementById(`clipBox${clipNum}`);
    const text = boxElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Clip ${clipNum} copied to clipboard!`);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`📋 Clip ${clipNum} copied!`);
    });
}

// Add to global scope
window.copyClipBox = copyClipBox;
