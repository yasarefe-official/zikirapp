export const api = {
    async login(username) {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },
    async sync(userId, count) {
        if (count === 0) return;
        const response = await fetch('/api/zikir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, count }),
        });
        if (!response.ok) throw new Error('Sync failed');
        return response.json();
    },
    async getLeaderboard() {
        const response = await fetch('/api/zikir/leaderboard');
        if (!response.ok) throw new Error('Failed to get leaderboard');
        return response.json();
    },
    async getZikirList() {
        const response = await fetch('/api/zikir/list');
        if (!response.ok) throw new Error('Failed to get zikir list');
        return response.json();
    },
    async saveToHistory(userId, zikirId, count) {
        const response = await fetch('/api/zikir/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, zikirId, count }),
        });
        if (!response.ok) throw new Error('Failed to save history');
        return response.json();
    }
};
