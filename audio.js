class AudioManager {
    constructor() {
        this.apiKeys = {
            huggingface: null,
            replicate: null
        };
    }

    setAPIKey(provider, key) {
        this.apiKeys[provider] = key;
    }

    async generateVoice(text, language, provider) {
        if (provider === 'none') {
            return { type: 'text', content: text };
        }

        if (!this.apiKeys[provider]) {
            console.warn(`No API key for ${provider}`);
            return { type: 'text', content: text };
        }

        try {
            if (provider === 'huggingface') {
                return await this.generateHuggingFaceTTS(text, language);
            } else if (provider === 'replicate') {
                return await this.generateReplicateTTS(text, language);
            }
        } catch (error) {
            console.error('TTS Error:', error);
            return { type: 'text', content: text };
        }
    }

    async generateHuggingFaceTTS(text, language) {
        const model = language === 'bn' 
            ? 'facebook/mms-tts-ben'
            : 'facebook/fastspeech2-en-ljspeech';

        const response = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKeys.huggingface}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputs: text })
            }
        );

        if (!response.ok) throw new Error('HF API Error');

        const audioBlob = await response.blob();
        return {
            type: 'audio',
            content: URL.createObjectURL(audioBlob)
        };
    }

    async generateReplicateTTS(text, language) {
        return { type: 'text', content: text };
    }

    getMusicCue(musicStyle) {
        const cues = {
            "Ambient Tension": "🎵 Slow synth pads with distant piano notes",
            "Lo-Fi Chill": "🎵 Relaxed beats with vinyl crackle",
            "Synth Wave": "🎵 Retro 80s synths with driving bass",
            "Piano Minimal": "🎵 Single piano notes with reverb",
            "Ethnic Fusion": "🎵 Traditional instruments with modern beat",
            "None": "🔇 No music"
        };

        return cues[musicStyle] || cues["None"];
    }
}