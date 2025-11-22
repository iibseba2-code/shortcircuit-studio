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
        const clip1Text = script.clips[0].text.toLowerCase();
        const shockWords = ['until', 'suddenly', 'freeze', 'impossible', 'wait', 'what'];
        const count = shockWords.filter(word => clip1Text.includes(word)).length;
        return Math.min(100, 70 + (count * 10));
    }

    scoreVisual(script) {
        let score = 80;
        script.clips.forEach(clip => {
            if (clip.visualCue && clip.visualCue.length > 20) score += 5;
            if (clip.text.match(/\b(color|glow|light|dark|bright)\b/i)) score += 5;
        });
        return Math.min(100, score);
    }

    scoreWeird(script) {
        const weirdActions = ['transform', 'multiply', 'float', 'reverse', 'portal', 'glitch'];
        let score = 75;
        script.clips.forEach(clip => {
            weirdActions.forEach(action => {
                if (clip.text.toLowerCase().includes(action)) score += 5;
            });
        });
        return Math.min(100, score);
    }

    scoreLoop(script) {
        const clip1Words = script.clips[0].text.toLowerCase().split(' ');
        const clip3Words = script.clips[2].text.toLowerCase().split(' ');
        const commonWords = clip1Words.filter(word => 
            clip3Words.includes(word) && word.length > 4
        );
        return Math.min(100, 70 + (commonWords.length * 10));
    }

    scoreEmotion(script) {
        const emotionWords = ['feel', 'heart', 'soul', 'memory', 'fear', 'love', 'wonder'];
        let count = 0;
        script.clips.forEach(clip => {
            emotionWords.forEach(word => {
                if (clip.text.toLowerCase().includes(word)) count++;
            });
        });
        return Math.min(100, 80 + (count * 5));
    }

    getUploadTimes() {
        return [
            {
                label: "Morning Prime (BD)",
                est: "4:00 AM - 6:00 AM",
                bst: "3:00 PM - 5:00 PM",
                audience: "Afternoon re-scroll (Bangladesh)"
            },
            {
                label: "Lunch Rush (USA)",
                est: "12:00 PM - 2:00 PM",
                bst: "11:00 PM - 1:00 AM",
                audience: "Lunch break + Night scroll (BD)"
            },
            {
                label: "Evening Prime (USA)",
                est: "7:00 PM - 10:00 PM",
                bst: "6:00 AM - 9:00 AM",
                audience: "Prime time + Morning commute (BD)"
            }
        ];
    }

    updateAverageScore(newScore) {
        let scores = JSON.parse(localStorage.getItem('scs_scores') || '[]');
        scores.push(newScore);
        if (scores.length > 40) scores = scores.slice(-40);
        localStorage.setItem('scs_scores', JSON.stringify(scores));
        
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return Math.round(avg);
    }

    getAverageScore() {
        const scores = JSON.parse(localStorage.getItem('scs_scores') || '[]');
        if (scores.length === 0) return 0;
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
}