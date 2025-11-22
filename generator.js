/* ===================================
   SHORTCIRCUIT STUDIO V13
   Script Generator Engine
   =================================== */

class ViralScriptGenerator {
    constructor() {
        this.currentSeed = null;
        console.log('✅ Generator initialized');
    }

    generateScript(category, tone, audioType, language) {
        console.log('🎬 Generating:', { category, tone, audioType, language });
        
        try {
            // Generate Consistency Seed
            const seed = this.generateSeed(category, tone);
            this.currentSeed = seed;

            // Generate 3 clips
            const clips = [
                this.generateClip1(seed, audioType, language),
                this.generateClip2(seed, audioType, language),
                this.generateClip3(seed, audioType, language)
            ];

            const script = {
                seed: seed,
                clips: clips,
                metadata: {
                    category,
                    tone,
                    audioType,
                    language,
                    generated: new Date().toISOString()
                }
            };

            console.log('✅ Script generated successfully:', script);
            return script;
            
        } catch (error) {
            console.error('❌ Generator error:', error);
            throw error;
        }
    }

    generateSeed(category, tone) {
        // Get objects for this category
        const objects = CATEGORY_OBJECTS[category];
        
        if (!objects || objects.length === 0) {
            console.error(`❌ No objects found for category: ${category}`);
            throw new Error(`No objects for category: ${category}`);
        }

        const object = this.random(objects);
        const location = this.random(this.getLocationsForTone(tone));
        const palette = this.getColorPalette(tone);
        const ambientSound = this.getAmbientSound(tone);
        const emotionArc = this.getEmotionArc(tone);

        const seed = {
            primaryObject: object,
            location: location,
            palette: palette,
            ambientSound: ambientSound,
            emotionArc: emotionArc,
            tone: tone,
            category: category
        };

        console.log('🌱 Seed generated:', seed);
        return seed;
    }

    generateClip1(seed, audioType, lang) {
        const shockAction = this.getShockAction(seed.tone);
        
        // Core Prompt
        const corePrompt = `${this.getVisualStyle(seed.tone)}, ${this.getLighting(seed.tone)}, ${seed.palette} color palette, ${seed.location}, featuring ${seed.primaryObject}, 9:16 vertical format, 24fps, cinematic quality, hyper realistic`;

        // Visual Details
        const visual = {
            cameraAngle: "Low angle looking up at subject",
            cameraMovement: "Slow push in (0 to 20% zoom)",
            framing: "Medium shot establishing scene",
            lighting: this.getLighting(seed.tone),
            colorPalette: seed.palette,
            sceneDescription: `${seed.location}. A ${seed.primaryObject} sits perfectly still. Everything appears normal. Then suddenly, ${shockAction}.`
        };

        // Audio
        const audio = {
            voiceOver: audioType !== 'none' ? this.getVoiceover(1, seed, lang, audioType) : null,
            backgroundMusic: this.getMusic(seed.tone, 1)
        };

        return {
            number: 1,
            duration: "0-8 seconds",
            viralRule: VIRAL_RULES[1] + " + " + VIRAL_RULES[2],
            corePrompt: corePrompt,
            visual: visual,
            audio: audio,
            emotion: seed.emotionArc[0]
        };
    }

    generateClip2(seed, audioType, lang) {
        const escalation = this.getEscalation(seed.tone);
        
        // Core Prompt
        const corePrompt = `${this.getVisualStyle(seed.tone)}, ${this.getLighting(seed.tone)} intensified, ${seed.palette} glowing dramatically, ${seed.location} reality distorting, featuring ${seed.primaryObject}, 9:16 vertical format, 24fps, surreal cinematic quality`;

        // Visual Details
        const visual = {
            cameraAngle: "Dutch angle tilted 15 degrees",
            cameraMovement: "Intense handheld shake or swirl",
            framing: "Extreme close-up on impossible detail",
            lighting: `${this.getLighting(seed.tone)} + dramatic contrast`,
            colorPalette: `${seed.palette} + glowing effects`,
            sceneDescription: `Same ${seed.location}, but reality bends. The ${seed.primaryObject} ${escalation}. ${this.getEnvironmentalChange()}. Impossible physics manifest visually.`
        };

        // Audio
        const audio = {
            voiceOver: audioType !== 'none' ? this.getVoiceover(2, seed, lang, audioType) : null,
            backgroundMusic: this.getMusic(seed.tone, 2)
        };

        return {
            number: 2,
            duration: "8-16 seconds",
            viralRule: VIRAL_RULES[3] + " + " + VIRAL_RULES[2],
            corePrompt: corePrompt,
            visual: visual,
            audio: audio,
            emotion: seed.emotionArc[1]
        };
    }

    generateClip3(seed, audioType, lang) {
        const resolution = this.getResolution(seed.tone);
        
        // Core Prompt
        const corePrompt = `${this.getVisualStyle(seed.tone)}, ${this.getLighting(seed.tone)}, ${seed.palette} subtle baseline, ${seed.location}, ${seed.primaryObject} centered, 9:16 vertical format, 24fps, matches Clip 1 composition, cinematic loop-ready`;

        // Visual Details
        const visual = {
            cameraAngle: "Eye level centered (matches Clip 1)",
            cameraMovement: "Slow pull out (reverse of Clip 1)",
            framing: "Wide shot matching opening frame",
            lighting: this.getLighting(seed.tone),
            colorPalette: seed.palette,
            sceneDescription: `Return to opening. ${seed.location}, same angle as Clip 1. The ${seed.primaryObject} ${resolution}. ${this.getLoopHint()}. Perfect loop point.`
        };

        // Audio
        const audio = {
            voiceOver: audioType !== 'none' ? this.getVoiceover(3, seed, lang, audioType) : null,
            backgroundMusic: this.getMusic(seed.tone, 3)
        };

        return {
            number: 3,
            duration: "16-24 seconds",
            viralRule: VIRAL_RULES[4] + " + " + VIRAL_RULES[5],
            corePrompt: corePrompt,
            visual: visual,
            audio: audio,
            emotion: seed.emotionArc[2]
        };
    }

    // ============== AUDIO GENERATION ==============

    getVoiceover(clipNum, seed, lang, type) {
        if (type === 'voiceover') {
            const scripts = {
                1: {
                    en: `I thought I knew what a ${seed.primaryObject} was. I was completely wrong.`,
                    bn: `আমি ভেবেছিলাম ${seed.primaryObject} কি তা আমি জানি। আমি সম্পূর্ণ ভুল ছিলাম।`
                },
                2: {
                    en: `Reality doesn't work the way we think it does. Watch closely.`,
                    bn: `বাস্তবতা আমরা যেভাবে ভাবি সেভাবে কাজ করে না। ভালো করে দেখুন।`
                },
                3: {
                    en: `Some things can't be explained. They can only be experienced.`,
                    bn: `কিছু জিনিস ব্যাখ্যা করা যায় না। শুধু অনুভব করা যায়।`
                }
            };
            return scripts[clipNum][lang];
        } else if (type === 'dialogue') {
            const dialogues = {
                1: {
                    en: `CHARACTER: "What is that ${seed.primaryObject}?"`,
                    bn: `চরিত্র: "ওটা কি ${seed.primaryObject}?"`
                },
                2: {
                    en: `CHARACTER: "This is impossible!"`,
                    bn: `চরিত্র: "এটা অসম্ভব!"`
                },
                3: {
                    en: `CHARACTER: "Did that really happen?"`,
                    bn: `চরিত্র: "এটা কি সত্যিই ঘটল?"`
                }
            };
            return dialogues[clipNum][lang];
        }
    }

    getMusic(tone, clipNum) {
        const music = {
            "Cinematic Epic": [
                "Epic orchestral build with soaring brass and strings",
                "Full orchestra dramatic crescendo with thundering percussion",
                "Triumphant resolution fading to mysterious quiet"
            ],
            "Dark Mystery": [
                "Eerie ambient drone with distant whispers",
                "Dissonant string tension with sharp violin stabs",
                "Mysterious fade to haunting silence"
            ],
            "Warm Emotional": [
                "Gentle piano melody with soft string accompaniment",
                "Emotional string swell with heartfelt crescendo",
                "Soft peaceful resolution with tender piano notes"
            ],
            "Surreal Dream": [
                "Ethereal synth pads with floating atmosphere",
                "Dreamy echoing arpeggios with reverb wash",
                "Floating ambient fade with celestial tones"
            ],
            "Horror Tension": [
                "Deep ominous drone with unsettling bass rumble",
                "Sharp violin sting with discordant screech",
                "Haunting silence with breathing sound design"
            ],
            "Comedy Bright": [
                "Playful ukulele with bouncing cheerful rhythm",
                "Upbeat comedy timing with bouncy brass accents",
                "Happy cheerful ending with xylophone flourish"
            ]
        };
        return music[tone]?.[clipNum - 1] || "Ambient background music with emotional undertone";
    }

    // ============== HELPER METHODS ==============

    getVisualStyle(tone) {
        const styles = {
            "Cinematic Epic": "Epic cinematic film style, anamorphic lens flare, Hollywood blockbuster aesthetic",
            "Dark Mystery": "Film noir aesthetic, high contrast chiaroscuro lighting, mystery thriller cinematography",
            "Warm Emotional": "Soft cinematic warmth, natural film grain, indie film heartfelt aesthetic",
            "Surreal Dream": "Dreamy ethereal atmosphere, soft focus edges, magical realism visual style",
            "Horror Tension": "Dark horror film aesthetic, desaturated colors, grainy found footage quality",
            "Comedy Bright": "Bright colorful sitcom style, vibrant clarity, commercial advertisement aesthetic"
        };
        return styles[tone] || "Professional cinematic quality";
    }

    getLighting(tone) {
        const lighting = {
            "Cinematic Epic": "golden hour dramatic side lighting with rim light separation",
            "Dark Mystery": "moody low-key lighting with deep noir shadows",
            "Warm Emotional": "soft warm natural window light with gentle fill",
            "Surreal Dream": "ethereal diffused backlight with magical glow",
            "Horror Tension": "harsh single-source dramatic shadows",
            "Comedy Bright": "bright even studio three-point lighting"
        };
        return lighting[tone] || "natural balanced daylight";
    }

    getColorPalette(tone) {
        const palettes = {
            "Cinematic Epic": "warm amber gold + deep cinematic blue",
            "Dark Mystery": "deep shadow black + cool moonlight blue",
            "Warm Emotional": "soft peach + gentle cream",
            "Surreal Dream": "pastel lavender purple + dreamy cotton candy pink",
            "Horror Tension": "dark charcoal gray + blood crimson red",
            "Comedy Bright": "vibrant sunny yellow + playful bright orange"
        };
        return palettes[tone] || "natural balanced tones";
    }

    getAmbientSound(tone) {
        const sounds = {
            "Cinematic Epic": "wind + distant thunder + epic atmosphere",
            "Dark Mystery": "creaking wood + whispers + eerie silence",
            "Warm Emotional": "gentle birds + soft breeze + warmth",
            "Surreal Dream": "ethereal hum + echoes + floating sounds",
            "Horror Tension": "ominous silence + breathing + dread",
            "Comedy Bright": "cheerful ambience + light chatter + joy"
        };
        return sounds[tone] || "ambient environmental sound";
    }

    getEmotionArc(tone) {
        const arcs = {
            "Cinematic Epic": ["building anticipation", "overwhelming awe", "triumphant satisfaction"],
            "Dark Mystery": ["intrigued curiosity", "growing unease", "chilling dread"],
            "Warm Emotional": ["gentle nostalgia", "heartfelt warmth", "peaceful contentment"],
            "Surreal Dream": ["enchanted wonder", "beautiful confusion", "ethereal enlightenment"],
            "Horror Tension": ["deceptive calm", "rising fear", "absolute terror"],
            "Comedy Bright": ["playful amusement", "delighted surprise", "infectious joy"]
        };
        return arcs[tone] || ["interest", "engagement", "satisfaction"];
    }

    getLocationsForTone(tone) {
        const locations = {
            "Cinematic Epic": [
                "mountain peak ancient temple at sunrise",
                "vast desert ruins at golden hour",
                "stormy ocean cliff with crashing waves",
                "grand cathedral with light streaming"
            ],
            "Dark Mystery": [
                "abandoned Victorian mansion hallway",
                "foggy moonlit forest path",
                "empty midnight subway station",
                "rain-soaked dark alley"
            ],
            "Warm Emotional": [
                "cozy childhood bedroom at sunset",
                "quiet beach at golden hour",
                "grandmother's warm kitchen",
                "family living room with fireplace"
            ],
            "Surreal Dream": [
                "floating cloud islands in sky",
                "infinite mirror hallway",
                "impossible spiral staircase",
                "upside-down room defying gravity"
            ],
            "Horror Tension": [
                "decaying hospital corridor",
                "haunted church basement",
                "dark forest clearing with fog",
                "abandoned asylum room"
            ],
            "Comedy Bright": [
                "busy colorful coffee shop",
                "sunny public park",
                "vibrant apartment living room",
                "cheerful kitchen counter"
            ]
        };
        return locations[tone] || ["everyday familiar indoor location"];
    }

    getShockAction(tone) {
        const actions = {
            "Cinematic Epic": "begins glowing with ancient divine power radiating golden light",
            "Dark Mystery": "reveals a cryptic impossible symbol that pulses with dark energy",
            "Warm Emotional": "shows a forgotten cherished memory glowing with warm light",
            "Surreal Dream": "floats upward and rotates slowly defying all known physics",
            "Horror Tension": "opens countless unblinking eyes where none existed before",
            "Comedy Bright": "starts dancing energetically to completely silent music"
        };
        return actions[tone] || "transforms unexpectedly in impossible way";
    }

    getEscalation(tone) {
        const escalations = {
            "Cinematic Epic": "unleashes massive cosmic waves of transformative divine energy",
            "Dark Mystery": "multiplies into infinite impossible mirror copies filling space",
            "Warm Emotional": "projects beautiful glowing memories into air like holograms",
            "Surreal Dream": "tears reality fabric like paper revealing parallel dimension",
            "Horror Tension": "grows organic pulsing tendrils covered with bloodshot eyes",
            "Comedy Bright": "recruits all nearby objects into perfectly choreographed dance"
        };
        return escalations[tone] || "intensifies dramatically beyond comprehension";
    }

    getResolution(tone) {
        const resolutions = {
            "Cinematic Epic": "settles back radiating quiet eternal divine power",
            "Dark Mystery": "appears completely normal but one detail remains impossibly wrong",
            "Warm Emotional": "rests peacefully having shared its precious heartfelt gift",
            "Surreal Dream": "fades gently away leaving only mysterious ethereal shimmer",
            "Horror Tension": "looks perfectly normal except subtle wrongness still lingers",
            "Comedy Bright": "freezes mid-wink looking directly at camera with knowing smile"
        };
        return resolutions[tone] || "returns to original state with subtle change";
    }

    getEnvironmentalChange() {
        const changes = [
            "Walls ripple and wave like disturbed water surface",
            "Gravity loses all meaning with objects floating chaotically",
            "Colors shift to impossible spectrum beyond human vision",
            "Time visibly fragments and stutters in broken loops"
        ];
        return this.random(changes);
    }

    getLoopHint() {
        const hints = [
            "but one subtle crucial element has permanently changed",
            "perfectly ready for seamless cycle to begin again",
            "inviting viewer to replay and discover hidden difference",
            "perfect loop point seamlessly transitioning back"
        ];
        return this.random(hints);
    }

    // ============== REMIX ==============

    remix(existingSeed) {
        const newTone = this.randomTone();
        return {
            ...existingSeed,
            tone: newTone,
            palette: this.getColorPalette(newTone),
            ambientSound: this.getAmbientSound(newTone),
            emotionArc: this.getEmotionArc(newTone)
        };
    }

    randomTone() {
        const tones = [
            "Cinematic Epic",
            "Dark Mystery",
            "Warm Emotional",
            "Surreal Dream",
            "Horror Tension",
            "Comedy Bright"
        ];
        return this.random(tones);
    }

    // ============== UTILITY ==============

    random(array) {
        if (!array || array.length === 0) {
            console.error('❌ Random called with empty array');
            return '';
        }
        return array[Math.floor(Math.random() * array.length)];
    }
}

console.log('✅ ViralScriptGenerator class loaded');
