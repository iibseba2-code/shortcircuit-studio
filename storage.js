class StorageManager {
    constructor() {
        this.prefix = 'scs_';
    }

    save(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    load(key) {
        try {
            const value = localStorage.getItem(this.prefix + key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            return null;
        }
    }

    saveHistory(script) {
        let history = this.load('history') || [];
        history.unshift({
            ...script,
            timestamp: Date.now()
        });
        if (history.length > 20) history = history.slice(0, 20);
        this.save('history', history);
    }

    getHistory() {
        return this.load('history') || [];
    }

    clearHistory() {
        this.save('history', []);
    }
}
