class ViralScriptGenerator {
    constructor() {
        this.currentSeed = null;
    }

    generateScript(category, tone, audioType, language) {
        // Core elements for consistency
        const object = this.random(this.getObjectsForCategory(category));
        const location = this.random(this.getLocationsForTone(tone));
        const visualStyle = this.getVisualStyle(tone);
        const lighting = this.getLighting(tone);
        const palette = this.getColorPalette(tone);
        const emotionArc = this.getEmotionArc(tone);
        
        const coreData = {
            object,
            location,
            visualStyle,
            lighting,
            palette,
            emotionArc,
            tone,
            category
        };

        this.currentSeed = coreData;

        const clips = [
            this.generateClip1(coreData, audioType, language),
            this.generateClip2(coreData, audioType, language),
            this.generateClip3(coreData, audioType, language)
        ];

        return {
            core: coreData,
            clips: clips,
            metadata: {
                category,
                tone,
                audioType,
                language,
                generated: new Date().toISOString()
            }
        };
    }

    generateClip1(core, audioType, lang) {
        const shockAction = this.getShockAction(core.tone);
        const camera = "Low angle, slow push in";
        const viralRule = `${VIRAL_RULES[1]} + ${VIRAL_RULES[2]}`;
        
        // ONE COMPLETE PROMPT - Everything together
        const fullPrompt = `${core.visualStyle}, ${core.lighting}, ${core.palette.primary} and ${core.palette.secondary} color palette, ${core.location}, ${camera}, medium shot, a ${core.object} sits centered, everything appears normal, then ${shockAction}, dramatic reveal, shallow depth of field, ${this.getAtmosphere(core.tone)} atmosphere, 9:16 vertical, cinematic, professional, 24fps, hyper realistic`;

        const audio = this.generateAudio(audioType, lang, 1, core);

        return {
            number: 1,
            duration: "0-8 seconds",
            viralRule: viralRule,
            prompt: fullPrompt,
            voiceover: audio.voiceover || null,
            music: audio.music,
            emotion: core.emotionArc[0]
        };
    }

    generateClip2(core, audioType, lang) {
        const escalation = this.getEscalation(core.tone);
        const camera = "Dutch angle 15°, intense movement";
        const viralRule = `${VIRAL_RULES[3]} + ${VIRAL_RULES[2]}`;
        
        // ONE COMPLETE PROMPT - Everything together
        const fullPrompt = `${core.visualStyle}, ${core.lighting} intensified, ${core.palette.primary} glowing dramatically, ${core.location} reality distorting, ${camera}, close-up on impossible detail, the ${core.object} ${escalation}, ${this.getEnvironmentalChange()}, surreal impossible physics, tight focus everything else blur, atmospheric intensity, 9:16 vertical, cinematic chaos, 24fps, ultra detailed`;

        const audio = this.generateAudio(audioType, lang, 2, core);

        return {
            number: 2,
            duration: "8-16 seconds",
            viralRule: viralRule,
            prompt: fullPrompt,
            voiceover: audio.voiceover || null,
            music: audio.music,
            emotion: core.emotionArc[1]
        };
    }

    generateClip3(core, audioType, lang) {
        const resolution = this.getResolution(core.tone);
        const camera = "Eye level, slow pull out (matches Clip 1)";
        const viralRule = `${VIRAL_RULES[4]} + ${VIRAL_RULES[5]}`;
        
        // ONE COMPLETE PROMPT - Everything together
        const fullPrompt = `${core.visualStyle}, ${core.lighting}, ${core.palette.primary} subtle baseline, return to ${core.location} opening composition, ${camera}, wide shot same as Clip 1, the ${core.object} ${resolution}, ${this.getLoopHint()}, mysterious ambiguous ending invites replay, perfect loop setup, cinematic resolution, 9:16 vertical, 24fps, professional quality`;

        const audio = this.generateAudio(audioType, lang, 3, core);

        return {
            number: 3,
            duration: "16-24 seconds",
            viralRule: viralRule,
            prompt: fullPrompt,
            voiceover: audio.voiceover || null,
            music: audio.music,
            emotion: core.emotionArc[2]
        };
    }

    generateAudio(type, lang, clipNum, core) {
        const music = this.getMusicCue(core.tone, clipNum);
        
        if (type === 'voiceover') {
            return {
                voiceover: this.getVoiceover(clipNum, core, lang),
                music: music
            };
        } else if (type === 'dialogue') {
            return {
                voiceover: this.getDialogue(clipNum, core, lang),
                music: music
            };
        } else {
            return {
                music: music
            };
        }
    }

    getVoiceover(clipNum, core, lang) {
        const scripts = {
            1: {
                en: `I thought I knew what a ${core.object} was. I was wrong.`,
                bn: `আমি ভেবেছিলাম আমি জানি ${core.object} কী। আমি ভুল ছিলাম।`
            },
            2: {
                en: `Reality doesn't work the way we think it does.`,
                bn: `বাস্তবতা যেভাবে আমরা ভাবি সেভাবে কাজ করে না।`
            },
            3: {
                en: `Some things can't be explained. Only experienced.`,
                bn: `কিছু জিনিস ব্যাখ্যা করা যায় না। শুধু অনুভব করা যায়।`
            }
        };
        return scripts[clipNum][lang];
    }

    getDialogue(clipNum, core, lang) {
        const dialogues = {
            1: {
                en: `"What is that ${core.object} doing?"`,
                bn: `"ওই ${core.object} কি করছে?"`
            },
            2: {
                en: `"This... this is impossible!"`,
                bn: `"এটা... এটা অসম্ভব!"`
            },
            3: {
                en: `"Did that really happen?"`,
                bn: `"এটা কি সত্যিই ঘটেছে?"`
            }
        };
        return dialogues[clipNum][lang];
    }

    getMusicCue(tone, clipNum) {
        const cues = {
            "Cinematic Epic": ["Epic orchestral build", "Dramatic tension peak", "Triumphant resolution"],
            "Dark Mystery": ["Eerie ambient drone", "Dissonant string tension", "Mysterious fade to silence"],
            "Warm Emotional": ["Gentle piano melody", "Emotional string swell", "Soft peaceful resolution"],
            "Surreal Dream": ["Ethereal synth pads", "Dreamy echoing arpeggios", "Floating ambient fade"],
            "Horror Tension": ["Deep ominous drone", "Sharp violin sting", "Haunting silence"],
            "Comedy Bright": ["Playful ukulele", "Bouncy upbeat rhythm", "Happy cheerful ending"]
        };
        return cues[tone]?.[clipNum - 1] || "Ambient background music";
    }

    // HELPER METHODS

    getVisualStyle(tone) {
        const styles = {
            "Cinematic Epic": "Cinematic film style, anamorphic lens",
            "Dark Mystery": "Film noir aesthetic, high contrast",
            "Warm Emotional": "Soft cinematic, warm tones",
            "Surreal Dream": "Dreamy ethereal, soft focus",
            "Horror Tension": "Dark horror aesthetic, grainy texture",
            "Comedy Bright": "Bright colorful, vibrant clarity"
        };
        return styles[tone] || "Professional cinematic";
    }

    getLighting(tone) {
        const lighting = {
            "Cinematic Epic": "golden hour dramatic side lighting",
            "Dark Mystery": "moody low-key lighting with deep shadows",
            "Warm Emotional": "soft warm natural window light",
            "Surreal Dream": "ethereal diffused backlight with glow",
            "Horror Tension": "harsh single-source dramatic shadows",
            "Comedy Bright": "bright even studio lighting"
        };
        return lighting[tone] || "natural daylight";
    }

    getColorPalette(tone) {
        const palettes = {
            "Cinematic Epic": { primary: "warm amber gold", secondary: "deep cinematic blue" },
            "Dark Mystery": { primary: "deep shadow black", secondary: "cool moonlight blue" },
            "Warm Emotional": { primary: "soft peach", secondary: "gentle cream" },
            "Surreal Dream": { primary: "pastel purple", secondary: "dreamy pink" },
            "Horror Tension": { primary: "dark charcoal", secondary: "blood crimson" },
            "Comedy Bright": { primary: "vibrant yellow", secondary: "playful orange" }
        };
        return palettes[tone] || { primary: "natural", secondary: "neutral" };
    }

    getEmotionArc(tone) {
        const arcs = {
            "Cinematic Epic": ["anticipation", "awe", "triumph"],
            "Dark Mystery": ["curiosity", "unease", "dread"],
            "Warm Emotional": ["nostalgia", "warmth", "peace"],
            "Surreal Dream": ["wonder", "confusion", "enlightenment"],
            "Horror Tension": ["calm", "fear", "terror"],
            "Comedy Bright": ["amusement", "surprise", "joy"]
        };
        return arcs[tone] || ["interest", "engagement", "satisfaction"];
    }

    getAtmosphere(tone) {
        return {
            "Cinematic Epic": "grand epic",
            "Dark Mystery": "mysterious tense",
            "Warm Emotional": "warm nostalgic",
            "Surreal Dream": "dreamlike surreal",
            "Horror Tension": "ominous terrifying",
            "Comedy Bright": "playful light"
        }[tone] || "neutral";
    }

    getShockAction(tone) {
        return {
            "Cinematic Epic": "begins glowing with ancient divine power",
            "Dark Mystery": "reveals a cryptic symbol that shouldn't exist",
            "Warm Emotional": "shows a forgotten cherished memory",
            "Surreal Dream": "floats and rotates defying all physics",
            "Horror Tension": "opens countless eyes where none should be",
            "Comedy Bright": "starts dancing energetically to silent music"
        }[tone] || "transforms unexpectedly";
    }

    getEscalation(tone) {
        return {
            "Cinematic Epic": "unleashes massive waves of transformative cosmic energy",
            "Dark Mystery": "multiplies into impossible infinite mirror copies",
            "Warm Emotional": "projects beautiful memories into air like glowing holograms",
            "Surreal Dream": "tears reality fabric revealing parallel dimension",
            "Horror Tension": "grows organic pulsing tendrils with watching eyes",
            "Comedy Bright": "recruits all nearby objects into choreographed dance number"
        }[tone] || "intensifies beyond comprehension";
    }

    getResolution(tone) {
        return {
            "Cinematic Epic": "settles radiating quiet eternal power",
            "Dark Mystery": "appears completely normal but one detail remains impossibly wrong",
            "Warm Emotional": "rests peacefully having shared its precious gift",
            "Surreal Dream": "fades leaving only mysterious shimmer in air",
            "Horror Tension": "looks normal except subtle wrongness lingers",
            "Comedy Bright": "freezes mid-wink directly at camera"
        }[tone] || "returns to original state";
    }

    getEnvironmentalChange() {
        return this.random([
            "walls ripple like disturbed water surface",
            "gravity loses all meaning around it",
            "colors shift to impossible spectrum hues",
            "time visibly fragments and stutters"
        ]);
    }

    getLoopHint() {
        return this.random([
            "but one subtle element has permanently changed",
            "ready for cycle to begin again seamlessly",
            "inviting viewer to replay and discover difference",
            "perfect loop point back to opening frame"
        ]);
    }

    getObjectsForCategory(category) {
        const map = {
            "Hyper-Real Illusions": ["antique mirror", "old photograph", "shadow", "reflection in water"],
            "Pocket Worlds": ["snow globe", "glass jar", "smartphone screen", "music box"],
            "Reverse Cause & Effect": ["clock running backwards", "melting candle reforming", "broken glass healing"],
            "Everyday Portals": ["ordinary doorway", "window pane", "rain puddle", "elevator doors"],
            "Reality Errors": ["digital glitch", "duplicate person", "floating coffee cup"],
            "Micro Mundane Rebels": ["rebellious paperclip", "sentient pen", "dancing stapler"],
            "Time Sneaks": ["vintage pocket watch", "wall calendar", "sand hourglass"],
            "Nature Reboots": ["ancient tree", "storm cloud", "blooming flower"],
            "Emotions as Errors": ["crystallized tear", "frozen laugh", "trapped scream"],
            "Micro Dreams": ["dream pillow", "sleeping blanket", "closed bedroom door"],
            "Parallel Me": ["mirror twin", "photograph double", "shadow self"],
            "AI Paradoxes": ["glowing chatbot", "sentient algorithm", "conscious code"],
            "Cute → Creepy → Cute": ["old teddy bear", "porcelain doll", "childhood toy"],
            "Instant Evolution": ["sprouting seed", "hatching egg", "chrysalis"],
            "Object Existential Crisis": ["lonely chair", "forgotten book", "abandoned key"],
            "Impossible Lifestyle Hacks": ["self-tying shoelace", "auto-cooking pan", "instant-clean room"],
            "Emotion Metaphors": ["glowing heart", "storm cloud mind", "burning soul"],
            "Data Ghosts": ["old email notification", "deleted file icon", "forgotten password"],
            "Pocket Time Machines": ["vintage photo album", "antique watch", "childhood toy box"],
            "Dream Becomes News": ["breaking news headline", "phone alert", "TV broadcast"],
            "Everyday Deities": ["cosmic barista", "divine janitor", "godlike bus driver"],
            "Reflections in Reverse": ["mirror showing past", "water puddle portal", "glass window twin"],
            "Digital Wildlife": ["escaped cursor", "wild loading bar", "free wifi signal"],
            "Forgotten Futures": ["retro robot toy", "vintage sci-fi poster", "old future prediction"],
            "Urban Myths 2.0": ["haunted wifi router", "cursed mobile app", "viral ghost"],
            "Silent Signals": ["meaningful glance", "secret hand gesture", "knowing smile"],
            "Quantum Routines": ["morning coffee ritual", "daily commute", "bedtime routine"],
            "Human Software Updates": ["person buffering", "emotion loading bar", "memory updating"],
            "Dream Shortcuts": ["lucid dream doorway", "sleep tunnel portal", "subconscious staircase"],
            "Reality Audits": ["life review screen", "existence check meter", "reality verification"]
        };
        return map[category] || ["mysterious object"];
    }

    getLocationsForTone(tone) {
        const map = {
            "Cinematic Epic": ["mountain peak temple", "ancient stone ruins", "vast desert expanse"],
            "Dark Mystery": ["abandoned Victorian mansion", "foggy moonlit forest", "empty subway station"],
            "Warm Emotional": ["cozy childhood home", "sunset beach", "grandmother's kitchen"],
            "Surreal Dream": ["floating cloud islands", "infinite mirror hallway", "impossible staircase"],
            "Horror Tension": ["decaying hospital corridor", "haunted church basement", "dark forest clearing"],
            "Comedy Bright": ["busy coffee shop", "sunny park", "colorful apartment"]
        };
        return map[tone] || ["everyday familiar location"];
    }

    remix(existingSeed) {
        const newTone = this.randomTone();
        return {
            ...existingSeed,
            tone: newTone,
            visualStyle: this.getVisualStyle(newTone),
            lighting: this.getLighting(newTone),
            palette: this.getColorPalette(newTone),
            emotionArc: this.getEmotionArc(newTone)
        };
    }

    randomTone() {
        return this.random(["Cinematic Epic", "Dark Mystery", "Warm Emotional", "Surreal Dream", "Horror Tension", "Comedy Bright"]);
    }

    random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
