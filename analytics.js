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

        return {
            total: Math.round(total),
            breakdown: scores
        };
    }

    scoreShock(script) {
        const clip1 = script.clips[0];
        const shockWords = ['impossible', 'suddenly', 'never', 'glows', 'reveals'];
        let score = 75;
        
        const text = clip1.sceneDescription + clip1.action;
        shockWords.forEach(word => {
            if (text.toLowerCase().includes(word)) score += 5;
        });
        
        return Math.min(100, score);
    }

    scoreVisual(script) {
        let score = 80;
        script.clips.forEach(clip => {
            if (clip.camera && clip.lighting) score += 5;
            if (clip.aiPrompt && clip.aiPrompt.length > 100) score += 5;
        });
        return Math.min(100, score);
    }

    scoreWeird(script) {
        const weirdWords = ['impossible', 'distorts', 'reality', 'physics', 'transforms'];
        let score = 70;
        
        script.clips.forEach(clip => {
            weirdWords.forEach(word => {
                if (clip.sceneDescription.toLowerCase().includes(word)) score += 3;
            });
        });
        
        return Math.min(100, score);
    }

    scoreLoop(script) {
        const clip1 = script.clips[0].sceneDescription.toLowerCase();
        const clip3 = script.clips[2].sceneDescription.toLowerCase();
        
        const commonWords = clip1.split(' ').filter(word => 
            clip3.includes(word) && word.length > 4
        );
        
        return Math.min(100, 75 + (commonWords.length * 5));
    }

    scoreEmotion(script) {
        let score = 75;
        script.clips.forEach(clip => {
            if (clip.emotion) score += 5;
            if (clip.audio) score += 5;
        });
        return Math.min(100, score);
    }
}