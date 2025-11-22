class StorageManager {
    constructor() {
        this.prefix = 'scs_';
    }

    save(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }

    load(key) {
        try {
            const value = localStorage.getItem(this.prefix + key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('Load error:', e);
            return null;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    saveHistory(script) {
        let history = this.load('history') || [];
        const scriptHash = this.hashScript(script);
        
        if (history.some(item => item.hash === scriptHash)) {
            return false;
        }

        history.unshift({
            ...script,
            hash: scriptHash,
            timestamp: Date.now()
        });

        if (history.length > 30) {
            history = history.slice(0, 30);
        }

        this.save('history', history);
        return true;
    }

    getHistory() {
        return this.load('history') || [];
    }

    clearHistory() {
        this.save('history', []);
    }

    hashScript(script) {
        const str = JSON.stringify(script);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }
}