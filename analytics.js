class AnalyticsEngine {
    calculateViralScore(script) {
        const scores = {
            shock: this.scoreShock(script),
            visual: this.scoreVisual(script),
            weird: this.scoreWeird(script),
            loop: this.scoreLoop(script),
            emotion: this.scoreEmotion(script)
        };

        const total = 
            scores.shock * 0.25 +
            scores.visual * 0.20 +
            scores.weird * 0.20 +
            scores.loop * 0.20 +
            scores.emotion * 0.15;

        return Math.round(total);
    }

    scoreShock(script) {
        const clip1 = script.clips[0].prompt.toLowerCase();
        const shockWords = ['suddenly', 'impossible', 'dramatic', 'shock', 'reveals'];
        let score = 75;
        shockWords.forEach(word => {
            if (clip1.includes(word)) score += 5;
        });
        return Math.min(100, score);
    }

    scoreVisual(script) {
        let score = 80;
        if (script.clips.every(c => c.prompt.length > 200)) score += 10;
        if (script.clips.every(c => c.prompt.includes('9:16'))) score += 10;
        return Math.min(100, score);
    }

    scoreWeird(script) {
        const weirdWords = ['impossible', 'distort', 'surreal', 'defying', 'reality'];
        let score = 70;
        script.clips.forEach(clip => {
            weirdWords.forEach(word => {
                if (clip.prompt.toLowerCase().includes(word)) score += 5;
            });
        });
        return Math.min(100, score);
    }

    scoreLoop(script) {
        const clip1Words = script.clips[0].prompt.toLowerCase().split(' ');
        const clip3Words = script.clips[2].prompt.toLowerCase().split(' ');
        const common = clip1Words.filter(w => clip3Words.includes(w) && w.length > 5);
        return Math.min(100, 70 + (common.length * 2));
    }

    scoreEmotion(script) {
        let score = 75;
        if (script.clips.every(c => c.emotion)) score += 15;
        if (script.clips.every(c => c.music)) score += 10;
        return Math.min(100, score);
    }
}
