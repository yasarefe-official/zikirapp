export const state = {
    currentUser: null,
    localCount: 0,
    unsyncedCount: 0,
    isLeaderboardVisible: false,
    zikirler: [],
    currentZikir: null,
    currentGoal: 0,
};

export function setCurrentUser(user) {
    state.currentUser = user;
    state.localCount = user.total_zikir || 0;
    localStorage.setItem('zikirmatik_user', JSON.stringify(user));
}

export function loadUserFromStorage() {
    const savedUser = localStorage.getItem('zikirmatik_user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        // We don't load total_zikir into localCount anymore,
        // as localCount is now zikir-specific.
    }
}
