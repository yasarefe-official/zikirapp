import { state, setCurrentUser, loadUserFromStorage } from './state.js';
import { api } from './api.js';
import * as ui from './ui.js';

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const incrementBtn = document.getElementById('increment-btn');
const resetBtn = document.getElementById('reset-btn');
const syncBtn = document.getElementById('sync-btn');
const leaderboardToggle = document.getElementById('leaderboard-toggle');
const changeZikirBtn = document.getElementById('change-zikir-btn');
const closeZikirModalBtn = document.getElementById('close-zikir-modal');


// Event Handlers
async function handleLogin() {
    const username = usernameInput.value.trim();
    if (!username) return alert('Lütfen bir kullanıcı adı girin.');
    try {
        const user = await api.login(username);
        setCurrentUser(user);
        // Do not update counter display on login, wait for zikir selection
        ui.showUserProfile(user.username);
        // Auto-fetch zikir list after login
        const zikirler = await api.getZikirList();
        state.zikirler = zikirler;
        ui.renderZikirList(zikirler, handleZikirSelect);
    } catch (error) {
        console.error("Login failed:", error);
        alert("Giriş başarısız oldu.");
    }
}

async function handleIncrement() {
    if (!state.currentUser || !state.currentZikir) {
        return alert("Lütfen önce bir zikir seçin.");
    }
    state.localCount++;
    state.unsyncedCount++;
    ui.updateCounterDisplay();
    ui.animateCounter();

    if (state.currentGoal > 0 && state.localCount === state.currentGoal) {
        alert(`Tebrikler! ${state.currentGoal} hedefinize ulaştınız.`);
        // Save history when goal is reached
        await api.saveToHistory(state.currentUser.id, state.currentZikir.id, state.localCount);
        // Reset for next round
        state.localCount = 0;
        state.unsyncedCount = 0;
        setTimeout(ui.updateCounterDisplay, 500); // give user a moment to see the completed count
    }
}

function handleReset() {
    if (!state.currentUser) return;
    if (confirm('Lokal sayacınızı sıfırlamak istediğinizden emin misiniz? Bu işlem sunucudaki toplamınızı etkilemez.')) {
        state.localCount -= state.unsyncedCount;
        state.unsyncedCount = 0;
        ui.updateCounterDisplay();
    }
}

async function handleSync() {
    if (!state.currentUser || state.unsyncedCount === 0) return alert("Eşitlenecek yeni zikir yok.");
    try {
        const result = await api.sync(state.currentUser.id, state.unsyncedCount);
        state.localCount = result.total_zikir;
        state.unsyncedCount = 0;
        ui.updateCounterDisplay();
        alert("Sunucuyla başarıyla eşitlendi!");
    } catch (error) {
        console.error("Sync failed:", error);
        alert("Eşitleme başarısız oldu.");
    }
}

async function handleToggleLeaderboard() {
    state.isLeaderboardVisible = !state.isLeaderboardVisible;
    if (state.isLeaderboardVisible) {
        try {
            const data = await api.getLeaderboard();
            ui.renderLeaderboard(data);
        } catch (error) {
            console.error("Failed to load leaderboard:", error);
            alert("Liderlik tablosu yüklenemedi.");
            state.isLeaderboardVisible = false; // Revert state on failure
            return;
        }
    }
    ui.toggleLeaderboardView(state.isLeaderboardVisible);
}

function handleZikirSelect(zikir) {
    state.currentZikir = zikir;
    state.localCount = 0;
    state.unsyncedCount = 0;
    state.currentGoal = 0; // Reset goal
    ui.updateZikirDisplay(zikir.name, 0);
    ui.updateCounterDisplay();
    ui.toggleZikirModal(false);
}

function handleGoalSelect(event) {
    const goal = parseInt(event.target.dataset.goal, 10);
    if (isNaN(goal)) return;
    state.currentGoal = goal;
    ui.updateZikirDisplay(state.currentZikir?.name || 'Genel Sayım', goal);
    // Highlight selected button
    document.querySelectorAll('.goal-btn').forEach(btn => btn.classList.remove('bg-blue-600'));
    event.target.classList.add('bg-blue-600');
}


// Initialization
async function init() {
    loadUserFromStorage();
    if (state.currentUser) {
        ui.showUserProfile(state.currentUser.username);
        ui.updateCounterDisplay();
        // Fetch zikir list for logged in user
        try {
            const zikirler = await api.getZikirList();
            state.zikirler = zikirler;
            ui.renderZikirList(zikirler, handleZikirSelect);
        } catch (error) {
            console.error("Failed to fetch zikir list:", error);
        }
    }

    loginBtn.addEventListener('click', handleLogin);
    incrementBtn.addEventListener('click', handleIncrement);
    resetBtn.addEventListener('click', handleReset);
    syncBtn.addEventListener('click', handleSync);
    leaderboardToggle.addEventListener('click', handleToggleLeaderboard);
    changeZikirBtn.addEventListener('click', () => ui.toggleZikirModal(true));
    closeZikirModalBtn.addEventListener('click', () => ui.toggleZikirModal(false));
    document.getElementById('goal-buttons').addEventListener('click', handleGoalSelect);


    console.log("Zikirmatik App Initialized");
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
