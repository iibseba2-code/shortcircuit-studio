class ScriptGenerator {
    constructor() {
        this.currentSeed = null;
    }

    generateSeed(category, tone) {
        const objects = this.getObjectsForCategory(category);
        const locations = this.getLocationsForTone(tone);
        const palettes = ["amber + neon blue", "crimson + silver", "jade + gold", "violet + white"];
        const sounds = ["soft rain + distant music", "wind chimes + footsteps", "heartbeat + whispers", "city hum + silence"];
        const emotions = this.getEmotionArc(tone);

        return {
            primaryObject: this.random(objects),
            location: this.random(locations),
            palette: this.random(palettes),
            ambientSound: this.random(sounds),
            emotionArc: emotions,
            category: category,
            tone: tone
        };
    }

    getObjectsForCategory(category) {
        const objectMap = {
            "Hyper-Real Illusions": ["mirror", "shadow", "reflection", "photograph"],
            "Pocket Worlds": ["snow globe", "jar", "phone screen", "keyhole"],
            "Reverse Cause & Effect": ["clock", "candle", "coffee cup", "footprint"],
            "Everyday Portals": ["doorway", "window", "puddle", "elevator"],
            "Reality Errors": ["glitch", "duplicate", "lag", "cursor"],
            "Micro Mundane Rebels": ["paperclip", "stapler", "pen", "sticky note"],
            "Time Sneaks": ["watch", "calendar", "hourglass", "metronome"],
            "Nature Reboots": ["tree", "cloud", "river", "bird"],
            "Emotions as Errors": ["tear", "laugh", "yawn", "blush"],
            "Micro Dreams": ["pillow", "blanket", "closed eyes", "sleep"],
            "Parallel Me": ["twin", "doppelganger", "mirror self", "photo"],
            "AI Paradoxes": ["chatbot", "algorithm", "code", "AI"],
            "Cute → Creepy → Cute": ["teddy bear", "cat", "baby", "smile"],
            "Instant Evolution": ["seed", "egg", "caterpillar", "spark"],
            "Object Existential Crisis": ["chair", "lamp", "book", "key"],
            "Impossible Lifestyle Hacks": ["toothbrush", "alarm", "shower", "door"],
            "Emotion Metaphors": ["heart", "mind", "soul", "feeling"],
            "Data Ghosts": ["old email", "deleted file", "cache", "cookie"],
            "Pocket Time Machines": ["photo album", "diary", "old phone", "letter"],
            "Dream Becomes News": ["headline", "breaking news", "alert", "notification"],
            "Everyday Deities": ["barista", "janitor", "guard", "driver"],
            "Reflections in Reverse": ["mirror", "water", "glass", "screen"],
            "Digital Wildlife": ["emoji", "cursor", "pixel", "icon"],
            "Forgotten Futures": ["old prediction", "vintage sci-fi", "retro future", "past tomorrow"],
            "Urban Myths 2.0": ["wifi ghost", "algorithm curse", "viral hex", "digital legend"],
            "Silent Signals": ["glance", "gesture", "pause", "silence"],
            "Quantum Routines": ["morning", "commute", "lunch", "sleep"],
            "Human Software Updates": ["memory patch", "emotion bug", "thought upgrade", "dream update"],
            "Dream Shortcuts": ["lucid door", "sleep portal", "dream tunnel", "subconscious path"],
            "Reality Audits": ["life review", "existence check", "reality test", "truth scan"]
        };

        return objectMap[category] || ["object", "thing", "item", "element"];
    }

    getLocationsForTone(tone) {
        const locationMap = {
            "Funny": ["busy office", "grocery store", "waiting room", "coffee shop"],
            "Creepy": ["empty hallway", "foggy street", "old basement", "dark forest"],
            "Cute": ["sunny park", "cozy cafe", "flower garden", "home kitchen"],
            "OMG": ["city rooftop", "moving train", "crowded mall", "highway"],
            "Mysterious": ["abandoned library", "misty lake", "silent museum", "moonlit road"],
            "Emotional": ["childhood home", "old bridge", "rainy window", "sunset beach"]
        };

        return locationMap[tone] || ["everyday location", "familiar place", "common spot"];
    }

    getEmotionArc(tone) {
        const arcMap = {
            "Funny": ["confusion", "surprise", "delight"],
            "Creepy": ["curiosity", "unease", "dread"],
            "Cute": ["warmth", "joy", "love"],
            "OMG": ["shock", "disbelief", "awe"],
            "Mysterious": ["intrigue", "tension", "wonder"],
            "Emotional": ["nostalgia", "longing", "peace"]
        };

        return arcMap[tone] || ["interest", "engagement", "satisfaction"];
    }

    generateScript(seed, music = "Ambient Tension") {
        const clips = [
            this.generateClip1(seed),
            this.generateClip2(seed),
            this.generateClip3(seed)
        ];

        return {
            seed: seed,
            clips: clips,
            music: music,
            totalDuration: 24,
            metadata: {
                category: seed.category,
                tone: seed.tone,
                generatedAt: new Date().toISOString()
            }
        };
    }

    generateClip1(seed) {
        const templates = [
            `A ${seed.primaryObject} sits in ${seed.location}. Everything seems normal until it ${this.getShockAction(seed.tone)}.`,
            `Close-up: ${seed.primaryObject} in ${seed.location}. ${seed.palette} lighting. Then it ${this.getShockAction(seed.tone)}.`,
            `${seed.location}. Someone notices their ${seed.primaryObject} ${this.getShockAction(seed.tone)}. They freeze.`,
            `Establishing shot: ${seed.location}. Focus shifts to ${seed.primaryObject}. It ${this.getShockAction(seed.tone)}.`
        ];

        return {
            duration: 8,
            text: this.random(templates),
            visualCue: `${seed.palette} palette, ${seed.primaryObject} featured`,
            soundCue: seed.ambientSound,
            emotion: seed.emotionArc[0]
        };
    }

    generateClip2(seed) {
        const templates = [
            `The ${seed.primaryObject} ${this.getEscalation(seed.tone)}. Reality bends. ${seed.palette} intensifies.`,
            `Impossible: the ${seed.primaryObject} ${this.getEscalation(seed.tone)}. The ${seed.location} shifts.`,
            `Point of view shifts. The ${seed.primaryObject} ${this.getEscalation(seed.tone)}. Everything feels wrong but true.`,
            `Time stutters. The ${seed.primaryObject} ${this.getEscalation(seed.tone)}. ${seed.ambientSound} distorts.`
        ];

        return {
            duration: 8,
            text: this.random(templates),
            visualCue: `${seed.palette} glowing, reality distortion`,
            soundCue: `${seed.ambientSound} + tension`,
            emotion: seed.emotionArc[1]
        };
    }

    generateClip3(seed) {
        const templates = [
            `Cut back to the ${seed.primaryObject}. It's normal again. Was it ever real? ${seed.emotionArc[2]}.`,
            `The ${seed.primaryObject} returns to ${seed.location}. Everything resets. Loop begins again.`,
            `Final frame: ${seed.primaryObject} in original position. ${seed.palette} fades. ${seed.emotionArc[2]} lingers.`,
            `Back to start. The ${seed.primaryObject} waits. Someone else will notice. Cycle continues.`
        ];

        return {
            duration: 8,
            text: this.random(templates),
            visualCue: `Return to opening shot, subtle ${seed.palette}`,
            soundCue: seed.ambientSound,
            emotion: seed.emotionArc[2]
        };
    }

    getShockAction(tone) {
        const actions = {
            "Funny": ["starts dancing", "talks back", "multiplies", "floats away"],
            "Creepy": ["watches them", "bleeds", "whispers", "ages rapidly"],
            "Cute": ["smiles", "waves", "hugs itself", "sparkles"],
            "OMG": ["explodes with color", "defies gravity", "reverses time", "opens a portal"],
            "Mysterious": ["glows faintly", "shows a symbol", "hums", "ripples"],
            "Emotional": ["shows a memory", "cries", "reaches out", "fades"]
        };

        return this.random(actions[tone] || ["transforms"]);
    }

    getEscalation(tone) {
        const escalations = {
            "Funny": ["throws a party", "becomes sentient", "starts a revolution", "breaks physics"],
            "Creepy": ["multiplies endlessly", "drains color", "shows teeth", "opens eyes everywhere"],
            "Cute": ["brings friends", "creates rainbows", "shares warmth", "heals everything"],
            "OMG": ["rewrites reality", "becomes infinite", "transcends space", "becomes god"],
            "Mysterious": ["reveals hidden truth", "connects everything", "shows the pattern", "unlocks secrets"],
            "Emotional": ["shows everyone's story", "holds all pain", "gives closure", "brings peace"]
        };

        return this.random(escalations[tone] || ["changes everything"]);
    }

    remix(existingSeed) {
        const newArc = this.getEmotionArc(this.randomTone());
        return {
            ...existingSeed,
            emotionArc: newArc,
            tone: this.randomTone()
        };
    }

    randomTone() {
        const tones = ["Funny", "Creepy", "Cute", "OMG", "Mysterious", "Emotional"];
        return this.random(tones);
    }

    random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}