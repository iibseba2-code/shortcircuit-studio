class CinematicScriptGenerator {
    constructor() {
        this.currentSeed = null;
    }

    generateMasterPrompt(category, tone, visualStyle, lighting) {
        const objects = this.getObjectsForCategory(category);
        const locations = this.getLocationsForTone(tone);
        
        return {
            // Core Visual Consistency
            primaryObject: this.random(objects),
            location: this.random(locations),
            visualStyle: visualStyle,
            colorPalette: this.getColorPalette(lighting),
            lighting: lighting,
            
            // Technical Specs
            aspectRatio: "9:16 (vertical short)",
            resolution: "1080x1920",
            fps: "24",
            
            // Emotional Arc
            emotionArc: this.getEmotionArc(tone),
            tone: tone,
            
            // Style Keywords (for AI video generators)
            styleKeywords: this.getStyleKeywords(visualStyle, tone),
            
            // Category
            category: category,
            
            // Timestamp
            generated: new Date().toISOString()
        };
    }

    generateFullScript(masterPrompt, cameraStyle, audioType, voiceLanguage) {
        const clips = [
            this.generateClip1(masterPrompt, cameraStyle, audioType, voiceLanguage),
            this.generateClip2(masterPrompt, cameraStyle, audioType, voiceLanguage),
            this.generateClip3(masterPrompt, cameraStyle, audioType, voiceLanguage)
        ];

        return {
            masterPrompt: masterPrompt,
            clips: clips,
            audioType: audioType,
            voiceLanguage: voiceLanguage,
            cameraStyle: cameraStyle,
            totalDuration: 24,
            metadata: {
                category: masterPrompt.category,
                tone: masterPrompt.tone,
                generatedAt: masterPrompt.generated
            }
        };
    }

    generateClip1(master, camera, audio, lang) {
        const shockAction = this.getShockAction(master.tone);
        
        return {
            clipNumber: 1,
            duration: "0-8 seconds",
            title: "OPENING HOOK — Establish Reality",
            
            // DETAILED SCENE DESCRIPTION
            sceneDescription: `${master.location}. ${this.getTimeOfDay(master.lighting)}. A ${master.primaryObject} ${this.getObjectPlacement()}. The atmosphere is ${this.getAtmosphere(master.tone)}. Everything appears normal until ${shockAction}.`,
            
            // CAMERA WORK
            camera: {
                angle: this.getCameraAngle(camera, 1),
                movement: this.getCameraMovement(camera, 1),
                framing: "Medium shot establishing the scene",
                focus: `Rack focus from environment to ${master.primaryObject}`,
                transition: "Fade in from black"
            },
            
            // LIGHTING DETAILS
            lighting: {
                setup: master.lighting,
                direction: this.getLightDirection(master.lighting),
                mood: `${master.colorPalette.primary} tones with ${master.colorPalette.secondary} accents`,
                shadows: this.getShadowType(master.lighting),
                practical: this.getPracticalLights(master.location)
            },
            
            // CHARACTER/OBJECT ACTION
            action: `The ${master.primaryObject} ${this.getInitialAction(master.tone)}. Suddenly, it ${shockAction}. ${this.getReactionBeat(master.tone)}.`,
            
            // AUDIO
            audio: this.generateAudio(audio, lang, 1, master),
            
            // AI VIDEO PROMPT (Ready for RunwayML, Pika, etc.)
            aiPrompt: `${master.styleKeywords}, ${master.location}, ${master.lighting}, ${this.getCameraAngle(camera, 1)}, ${master.primaryObject} ${shockAction}, ${master.colorPalette.primary} and ${master.colorPalette.secondary} color grading, cinematic, ${master.visualStyle}, 9:16 aspect ratio, 24fps`,
            
            // EMOTIONAL BEAT
            emotion: master.emotionArc[0]
        };
    }

    generateClip2(master, camera, audio, lang) {
        const escalation = this.getEscalation(master.tone);
        
        return {
            clipNumber: 2,
            duration: "8-16 seconds",
            title: "ESCALATION — Reality Breaks",
            
            // DETAILED SCENE DESCRIPTION
            sceneDescription: `Same ${master.location}, but reality distorts. The ${master.primaryObject} ${escalation}. ${this.getEnvironmentalChange(master.tone)}. The ${master.colorPalette.primary} lighting intensifies, casting impossible shadows.`,
            
            // CAMERA WORK
            camera: {
                angle: this.getCameraAngle(camera, 2),
                movement: this.getCameraMovement(camera, 2),
                framing: "Close-up on impossible detail",
                focus: `Tight focus on ${master.primaryObject}, shallow depth of field`,
                transition: "Match cut from previous clip"
            },
            
            // LIGHTING DETAILS
            lighting: {
                setup: `${master.lighting} intensified`,
                direction: "Dramatic multi-directional",
                mood: `${master.colorPalette.primary} glowing, ${master.colorPalette.accent} highlights`,
                shadows: "Moving, defying physics",
                practical: `${master.primaryObject} emitting light`
            },
            
            // CHARACTER/OBJECT ACTION
            action: `The ${master.primaryObject} ${escalation}. ${this.getImpossiblePhysics(master.tone)}. ${this.getEmotionalReaction(master.emotionArc[1])}.`,
            
            // AUDIO
            audio: this.generateAudio(audio, lang, 2, master),
            
            // AI VIDEO PROMPT
            aiPrompt: `${master.styleKeywords}, ${master.location} reality distortion, ${master.primaryObject} ${escalation}, dramatic ${master.lighting}, ${this.getCameraAngle(camera, 2)}, ${master.colorPalette.primary} glowing effects, impossible physics, surreal, ${master.visualStyle}, cinematic chaos, 9:16 vertical`,
            
            // EMOTIONAL BEAT
            emotion: master.emotionArc[1]
        };
    }

    generateClip3(master, camera, audio, lang) {
        const resolution = this.getResolution(master.tone);
        
        return {
            clipNumber: 3,
            duration: "16-24 seconds",
            title: "RESOLUTION — Return & Loop",
            
            // DETAILED SCENE DESCRIPTION
            sceneDescription: `Return to the opening frame. ${master.location}, same ${master.lighting}. The ${master.primaryObject} ${resolution}. ${this.getLoopSetup(master.tone)}. Everything returns to normal, but something has changed.`,
            
            // CAMERA WORK
            camera: {
                angle: "Mirror of Clip 1 opening",
                movement: this.getCameraMovement(camera, 3),
                framing: "Wide shot, same composition as opening",
                focus: `Pull focus back to environment, ${master.primaryObject} in center`,
                transition: "Smooth dissolve, creating seamless loop"
            },
            
            // LIGHTING DETAILS
            lighting: {
                setup: master.lighting,
                direction: "Return to natural direction",
                mood: `${master.colorPalette.primary} fading, back to baseline`,
                shadows: "Normal, but with subtle impossibility",
                practical: this.getPracticalLights(master.location)
            },
            
            // CHARACTER/OBJECT ACTION
            action: `The ${master.primaryObject} ${resolution}. ${this.getSubtleHint(master.tone)}. Frame freezes on ambiguous detail. Cut to black with ${master.emotionArc[2]}.`,
            
            // AUDIO
            audio: this.generateAudio(audio, lang, 3, master),
            
            // AI VIDEO PROMPT
            aiPrompt: `${master.styleKeywords}, ${master.location}, return to opening shot, ${master.primaryObject} ${resolution}, ${master.lighting} fading, ${master.colorPalette.primary} subtle, mysterious ending, loop-ready composition, ${master.visualStyle}, cinematic resolution, 9:16 format`,
            
            // EMOTIONAL BEAT
            emotion: master.emotionArc[2]
        };
    }

    generateAudio(type, lang, clipNum, master) {
        if (type === 'dialogue') {
            return {
                type: 'dialogue',
                language: lang,
                lines: this.getDialogue(clipNum, master, lang),
                musicUnderscore: this.getMusicCue(master.tone, clipNum)
            };
        } else if (type === 'narration') {
            return {
                type: 'narration',
                language: lang,
                script: this.getNarration(clipNum, master, lang),
                musicUnderscore: this.getMusicCue(master.tone, clipNum)
            };
        } else {
            return {
                type: 'music',
                track: this.getMusicCue(master.tone, clipNum),
                soundEffects: this.getSoundEffects(clipNum, master)
            };
        }
    }

    getDialogue(clipNum, master, lang) {
        const dialogues = {
            1: {
                en: [
                    { character: "PROTAGONIST (V.O.)", text: `I never thought a ${master.primaryObject} could change everything.` },
                    { character: "AMBIENT", text: "Sound of normal environment" }
                ],
                bn: [
                    { character: "নায়ক (ভয়েস ওভার)", text: `আমি কখনো ভাবিনি একটা ${master.primaryObject} সবকিছু বদলে দিতে পারে।` }
                ]
            },
            2: {
                en: [
                    { character: "PROTAGONIST", text: "Wait... that's impossible!" },
                    { character: "SOUND", text: "Reality distortion sounds" }
                ],
                bn: [
                    { character: "নায়ক", text: "দাঁড়াও... এটা অসম্ভব!" }
                ]
            },
            3: {
                en: [
                    { character: "PROTAGONIST (V.O.)", text: "Or was it?" },
                    { character: "MUSIC", text: "Mysterious fade out" }
                ],
                bn: [
                    { character: "নায়ক (ভয়েস ওভার)", text: "নাকি সম্ভব ছিল?" }
                ]
            }
        };

        return dialogues[clipNum][lang] || dialogues[clipNum]['en'];
    }

    getNarration(clipNum, master, lang) {
        const narrations = {
            1: {
                en: `In a ${master.location}, a ${master.primaryObject} waited. No one knew what would happen next.`,
                bn: `${master.location}-এ একটি ${master.primaryObject} অপেক্ষা করছিল। কেউ জানত না এরপর কী হবে।`
            },
            2: {
                en: `Reality bent. Physics broke. The impossible became real.`,
                bn: `বাস্তবতা বাঁকল। পদার্থবিজ্ঞান ভাঙল। অসম্ভব সম্ভব হলো।`
            },
            3: {
                en: `And then, as suddenly as it began, everything returned to normal. Almost.`,
                bn: `এবং তারপর, যেমন হঠাৎ শুরু হয়েছিল, সবকিছু স্বাভাবিক হয়ে গেল। প্রায়।`
            }
        };

        return narrations[clipNum][lang] || narrations[clipNum]['en'];
    }

    getMusicCue(tone, clipNum) {
        const cues = {
            "Cinematic Epic": ["Orchestral rise", "Percussion build", "Epic resolution"],
            "Dark Mystery": ["Eerie ambient", "Tension strings", "Mysterious fade"],
            "Warm Emotional": ["Piano gentle", "Strings swell", "Emotional peak"],
            "Surreal Dream": ["Ethereal pads", "Dreamy arpeggios", "Floating resolution"],
            "Horror Tension": ["Low drone", "Sharp stings", "Terror climax"],
            "Comedy Bright": ["Playful ukulele", "Bouncy beat", "Happy resolve"],
            "Sci-Fi Future": ["Synth wave", "Digital pulses", "Future bass"],
            "Fantasy Magic": ["Harp glissando", "Magical chimes", "Wonder theme"]
        };

        return cues[tone]?.[clipNum - 1] || "Ambient underscore";
    }

    getSoundEffects(clipNum, master) {
        const effects = {
            1: `Ambient ${master.location} sounds, subtle ${master.primaryObject} interaction`,
            2: `Reality distortion, impossible physics sounds, dramatic impact`,
            3: `Return to ambient, subtle impossibility, mysterious fade`
        };
        return effects[clipNum];
    }

    // HELPER METHODS FOR DETAILED DESCRIPTIONS

    getColorPalette(lighting) {
        const palettes = {
            "Golden Hour Warm": { primary: "amber gold", secondary: "deep orange", accent: "crimson" },
            "Blue Hour Cool": { primary: "deep blue", secondary: "purple twilight", accent: "silver" },
            "Neon Night": { primary: "electric pink", secondary: "cyber blue", accent: "neon green" },
            "Soft Studio": { primary: "soft white", secondary: "pearl gray", accent: "pastel" },
            "Hard Dramatic": { primary: "stark white", secondary: "deep black", accent: "blood red" },
            "Natural Daylight": { primary: "clear white", secondary: "sky blue", accent: "green" },
            "Moody Dark": { primary: "charcoal", secondary: "midnight blue", accent: "ember orange" }
        };
        return palettes[lighting] || palettes["Natural Daylight"];
    }

    getStyleKeywords(style, tone) {
        const keywords = {
            "Hyper Realistic": "photorealistic, ultra detailed, 8K, cinematic realism",
            "Cinematic Film": "anamorphic, film grain, cinematic color grading, Hollywood quality",
            "Anime Studio": "Studio Ghibli style, anime aesthetic, hand-drawn quality",
            "3D Pixar": "Pixar style, 3D animation, vibrant colors, stylized realism",
            "Oil Painting": "oil painting texture, classical art, painted aesthetic",
            "Noir Black & White": "film noir, high contrast black and white, dramatic shadows"
        };
        return keywords[style] || "cinematic, professional";
    }

    getCameraAngle(style, clipNum) {
        const angles = {
            "Dynamic Tracking": ["Low angle tracking shot", "Dutch angle follow", "Eye level stabilized"],
            "Static Cinematic": ["Low angle static", "High angle looking down", "Eye level centered"],
            "Handheld POV": ["Shoulder level POV", "Close handheld", "First person view"],
            "Aerial Drone": ["High aerial establishing", "Descending drone shot", "Overhead bird's eye"],
            "Slow Motion": ["Dramatic low angle slow-mo", "Close detail slow-mo", "Wide slow-mo"],
            "Time Lapse": ["Static wide angle", "Slow pan time-lapse", "Return to start"]
        };
        return angles[style]?.[clipNum - 1] || "Standard angle";
    }

    getCameraMovement(style, clipNum) {
        const movements = {
            1: "Slow push in",
            2: "Intense shake/distortion",
            3: "Smooth pull out"
        };
        return movements[clipNum];
    }

    getObjectsForCategory(category) {
        // Same as before, but more detailed
        const map = {
            "Hyper-Real Illusions": ["antique mirror", "old photograph", "reflection in water", "shadow"],
            "Pocket Worlds": ["snow globe", "glass jar", "smartphone screen", "keyhole"],
            "Reverse Cause & Effect": ["broken clock", "melting candle", "spilled coffee", "wet footprint"],
            // ... (keep all 30 categories from before)
        };
        return map[category] || ["mysterious object"];
    }

    getLocationsForTone(tone) {
        const map = {
            "Cinematic Epic": ["mountain peak", "ancient ruins", "vast desert", "stormy ocean"],
            "Dark Mystery": ["abandoned mansion", "foggy forest", "empty subway", "dark alley"],
            "Warm Emotional": ["childhood home", "cozy cafe", "sunset beach", "family garden"],
            "Surreal Dream": ["floating islands", "infinite hallway", "mirror maze", "cloud palace"],
            "Horror Tension": ["decaying hospital", "haunted church", "dark basement", "empty graveyard"],
            "Comedy Bright": ["busy office", "colorful market", "sunny park", "quirky apartment"],
            "Sci-Fi Future": ["neon city", "space station", "cyber cafe", "hologram room"],
            "Fantasy Magic": ["enchanted forest", "crystal cave", "wizard tower", "magical library"]
        };
        return map[tone] || ["mysterious location"];
    }

    getEmotionArc(tone) {
        const arcs = {
            "Cinematic Epic": ["anticipation", "awe", "triumph"],
            "Dark Mystery": ["curiosity", "unease", "dread"],
            "Warm Emotional": ["nostalgia", "love", "peace"],
            "Surreal Dream": ["wonder", "confusion", "enlightenment"],
            "Horror Tension": ["calm", "fear", "terror"],
            "Comedy Bright": ["amusement", "surprise", "joy"],
            "Sci-Fi Future": ["intrigue", "discovery", "transcendence"],
            "Fantasy Magic": ["wonder", "belief", "magic"]
        };
        return arcs[tone] || ["interest", "engagement", "satisfaction"];
    }

    getTimeOfDay(lighting) {
        const times = {
            "Golden Hour Warm": "Late afternoon, golden hour",
            "Blue Hour Cool": "Twilight, blue hour",
            "Neon Night": "Deep night, neon-lit",
            "Soft Studio": "Timeless studio environment",
            "Hard Dramatic": "High noon or midnight",
            "Natural Daylight": "Mid-morning, natural light",
            "Moody Dark": "Overcast day or dusk"
        };
        return times[lighting] || "Daytime";
    }

    getAtmosphere(tone) {
        const atmospheres = {
            "Cinematic Epic": "charged with destiny",
            "Dark Mystery": "thick with unease",
            "Warm Emotional": "filled with warmth",
            "Surreal Dream": "dreamlike and fluid",
            "Horror Tension": "oppressively silent",
            "Comedy Bright": "light and playful",
            "Sci-Fi Future": "humming with technology",
            "Fantasy Magic": "alive with possibility"
        };
        return atmospheres[tone] || "calm";
    }

    getShockAction(tone) {
        const actions = {
            "Cinematic Epic": "begins to glow with ancient power",
            "Dark Mystery": "reveals a hidden symbol that shouldn't exist",
            "Warm Emotional": "shows a memory that brings tears",
            "Surreal Dream": "starts to float and rotate impossibly",
            "Horror Tension": "opens eyes where there should be none",
            "Comedy Bright": "starts dancing to unheard music",
            "Sci-Fi Future": "glitches and shows alternate timelines",
            "Fantasy Magic": "sparkles and transforms"
        };
        return actions[tone] || "changes unexpectedly";
    }

    getEscalation(tone) {
        const escalations = {
            "Cinematic Epic": "unleashes a wave of energy that transforms everything",
            "Dark Mystery": "multiplies into impossible copies",
            "Warm Emotional": "projects memories into the air like holograms",
            "Surreal Dream": "tears reality like paper, revealing another world",
            "Horror Tension": "grows organic eyes and watches everything",
            "Comedy Bright": "recruits other objects to join the dance",
            "Sci-Fi Future": "opens portals to multiple timelines simultaneously",
            "Fantasy Magic": "becomes a sentient magical being"
        };
        return escalations[tone] || "intensifies dramatically";
    }

    getResolution(tone) {
        const resolutions = {
            "Cinematic Epic": "returns to stillness, but now radiates quiet power",
            "Dark Mystery": "sits motionless, but one detail is wrong",
            "Warm Emotional": "rests peacefully, having shared its gift",
            "Surreal Dream": "fades back, leaving only a shimmer",
            "Horror Tension": "appears normal, but one eye remains open",
            "Comedy Bright": "winks at the camera before freezing",
            "Sci-Fi Future": "resets, but displays a different timeline",
            "Fantasy Magic": "settles, with a subtle magical aura remaining"
        };
        return resolutions[tone] || "returns to normal";
    }

    getObjectPlacement() {
        return this.random([
            "sits centered on a weathered table",
            "rests against an old wall",
            "lies on the floor catching light",
            "hangs suspended in the frame",
            "occupies the foreground, sharp focus"
        ]);
    }

    getInitialAction(tone) {
        return "sits perfectly still, ordinary and unremarkable";
    }

    getReactionBeat(tone) {
        return this.random([
            "Time seems to slow",
            "The air changes",
            "Everything pauses",
            "Silence falls"
        ]);
    }

    getEnvironmentalChange(tone) {
        return this.random([
            "The walls ripple like water",
            "Gravity loses meaning",
            "Colors shift to impossible hues",
            "Time fragments visibly"
        ]);
    }

    getImpossiblePhysics(tone) {
        return this.random([
            "Gravity inverts around it",
            "Light bends toward it",
            "Space compresses",
            "Time loops visibly"
        ]);
    }

    getEmotionalReaction(emotion) {
        return `The feeling of ${emotion} becomes overwhelming`;
    }

    getLoopSetup(tone) {
        return "The camera angle mirrors the opening exactly";
    }

    getSubtleHint(tone) {
        return this.random([
            "A subtle detail is different",
            "One element remains changed",
            "Something is watching",
            "The cycle begins again"
        ]);
    }

    getLightDirection(lighting) {
        const directions = {
            "Golden Hour Warm": "Low angle, 45° side",
            "Blue Hour Cool": "Soft overhead diffused",
            "Neon Night": "Multi-colored practical sources",
            "Soft Studio": "Even 3-point lighting",
            "Hard Dramatic": "Single hard source, deep shadows",
            "Natural Daylight": "Window light, soft shadows",
            "Moody Dark": "Dim, directional, atmospheric"
        };
        return directions[lighting] || "Natural";
    }

    getShadowType(lighting) {
        const shadows = {
            "Golden Hour Warm": "Long, warm, soft-edged",
            "Blue Hour Cool": "Cool, diffused, minimal",
            "Neon Night": "Multiple colored shadows",
            "Soft Studio": "Soft, controlled, minimal",
            "Hard Dramatic": "Sharp, deep, high contrast",
            "Natural Daylight": "Natural, medium contrast",
            "Moody Dark": "Deep, atmospheric, mysterious"
        };
        return shadows[lighting] || "Normal";
    }

    getPracticalLights(location) {
        const practicals = {
            "mountain peak": "None, natural sunlight only",
            "abandoned mansion": "Dusty chandelier, flickering candles",
            "neon city": "Shop signs, street lights, hologram ads",
            "cozy cafe": "Warm pendant lights, window glow",
            "empty subway": "Fluorescent tubes, some broken",
            "enchanted forest": "Glowing mushrooms, fireflies",
            "space station": "LED panels, monitor glow"
        };
        return practicals[location] || "Ambient environment lighting";
    }

    remix(existingSeed) {
        const newTone = this.randomTone();
        const newEmotion = this.getEmotionArc(newTone);
        
        return {
            ...existingSeed,
            emotionArc: newEmotion,
            tone: newTone,
            colorPalette: this.getColorPalette(existingSeed.lighting)
        };
    }

    randomTone() {
        const tones = ["Cinematic Epic", "Dark Mystery", "Warm Emotional", "Surreal Dream", "Horror Tension", "Comedy Bright", "Sci-Fi Future", "Fantasy Magic"];
        return this.random(tones);
    }

    random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}