import { state } from './state.js';

// DOM Elements Cache
const elements = {
    loginModal: document.getElementById('login-modal'),
    userProfile: document.getElementById('user-profile'),
    usernameDisplay: document.getElementById('username-display'),
    countElement: document.getElementById('count'),
    leaderboardContainer: document.getElementById('leaderboard-container'),
    leaderboardList: document.getElementById('leaderboard-list'),
    counterContainer: document.getElementById('counter-container'),
};

export function showUserProfile(username) {
    elements.usernameDisplay.textContent = username;
    elements.userProfile.classList.remove('hidden');
    elements.userProfile.classList.add('flex');
    elements.loginModal.classList.add('hidden');
}

export function updateCounterDisplay() {
    elements.countElement.textContent = state.localCount;
}

export function animateCounter() {
    const counterDisplay = elements.countElement.parentElement;
    counterDisplay.classList.add('scale-105');
    setTimeout(() => counterDisplay.classList.remove('scale-105'), 150);
}

export function renderLeaderboard(data) {
    elements.leaderboardList.innerHTML = '';
    data.forEach((user, index) => {
        const li = document.createElement('li');
        li.className = `flex justify-between items-center p-2 rounded ${user.username === state.currentUser?.username ? 'bg-blue-600' : 'bg-gray-700'}`;
        li.innerHTML = `
            <span class="font-bold">${index + 1}. ${user.username}</span>
            <span class="text-blue-300">${user.total_zikir}</span>
        `;
        elements.leaderboardList.appendChild(li);
    });
}

export function toggleLeaderboardView(show) {
    if (show) {
        elements.leaderboardContainer.classList.remove('hidden');
        elements.counterContainer.classList.add('hidden');
    } else {
        elements.leaderboardContainer.classList.add('hidden');
        elements.counterContainer.classList.remove('hidden');
    }
}

// Zikir Modal UI
const zikirModal = document.getElementById('zikir-modal');
const zikirList = document.getElementById('zikir-list');

export function renderZikirList(zikirler, selectHandler) {
    zikirList.innerHTML = '';
    zikirler.forEach(zikir => {
        const li = document.createElement('li');
        li.className = 'p-4 bg-gray-700 rounded hover:bg-blue-600 cursor-pointer';
        li.textContent = zikir.name;
        li.dataset.id = zikir.id;
        li.addEventListener('click', () => selectHandler(zikir));
        zikirList.appendChild(li);
    });
}

export function toggleZikirModal(show) {
    if (show) {
        zikirModal.classList.remove('hidden');
    } else {
        zikirModal.classList.add('hidden');
    }
}

export function updateZikirDisplay(zikirName, goal) {
    document.getElementById('current-zikir-name').textContent = zikirName;
    document.getElementById('current-zikir-goal').textContent = `Hedef: ${goal > 0 ? goal : 'Yok'}`;
}
