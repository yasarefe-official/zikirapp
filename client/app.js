document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginModal = document.getElementById('login-modal');
    const usernameInput = document.getElementById('username-input');
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const usernameDisplay = document.getElementById('username-display');
    const countElement = document.getElementById('count');
    const incrementBtn = document.getElementById('increment-btn');
    const resetBtn = document.getElementById('reset-btn');
    const syncBtn = document.getElementById('sync-btn');
    const leaderboardToggle = document.getElementById('leaderboard-toggle');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const leaderboardList = document.getElementById('leaderboard-list');
    const counterContainer = document.getElementById('counter-container');

    // App State
    let currentUser = null;
    let localCount = 0;
    let unsyncedCount = 0;

    // --- API Functions ---
    const api = {
        async login(username) {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });
            return response.json();
        },
        async sync(userId, count) {
            if (count === 0) return; // Don't sync if there's nothing to sync
            const response = await fetch('/api/zikir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, count }),
            });
            return response.json();
        },
        async getLeaderboard() {
            const response = await fetch('/api/leaderboard');
            return response.json();
        }
    };

    // --- UI Functions ---
    function showUserProfile(username) {
        usernameDisplay.textContent = username;
        userProfile.classList.remove('hidden');
        userProfile.classList.add('flex');
    }

    function updateCounterDisplay() {
        countElement.textContent = localCount;
    }

    function renderLeaderboard(data) {
        leaderboardList.innerHTML = '';
        data.forEach((user, index) => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center p-2 rounded ' + (user.username === currentUser.username ? 'bg-blue-600' : 'bg-gray-700');
            li.innerHTML = `
                <span class="font-bold">${index + 1}. ${user.username}</span>
                <span class="text-blue-300">${user.total_zikir}</span>
            `;
            leaderboardList.appendChild(li);
        });
    }

    async function toggleLeaderboard() {
        const isHidden = leaderboardContainer.classList.contains('hidden');
        if (isHidden) {
            try {
                const data = await api.getLeaderboard();
                renderLeaderboard(data);
                leaderboardContainer.classList.remove('hidden');
                counterContainer.classList.add('hidden');
            } catch (error) {
                console.error("Failed to load leaderboard:", error);
                alert("Liderlik tablosu yüklenemedi.");
            }
        } else {
            leaderboardContainer.classList.add('hidden');
            counterContainer.classList.remove('hidden');
        }
    }

    // --- Event Handlers ---
    async function handleLogin() {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('Lütfen bir kullanıcı adı girin.');
            return;
        }
        try {
            const user = await api.login(username);
            currentUser = user;
            localCount = user.total_zikir;
            localStorage.setItem('zikirmatik_user', JSON.stringify(user));
            updateCounterDisplay();
            showUserProfile(user.username);
            loginModal.classList.add('hidden');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Giriş başarısız oldu.");
        }
    }

    function handleIncrement() {
        if (!currentUser) {
            alert("Lütfen önce giriş yapın.");
            return;
        }
        localCount++;
        unsyncedCount++;
        updateCounterDisplay();
        // Optional: Add animation
        countElement.parentElement.classList.add('scale-105');
        setTimeout(() => countElement.parentElement.classList.remove('scale-105'), 150);
    }

    function handleReset() {
        if (!currentUser) return;
        if (confirm('Lokal sayacınızı sıfırlamak istediğinizden emin misiniz? Bu işlem sunucudaki toplamınızı etkilemez.')) {
            localCount -= unsyncedCount; // Revert to server state
            unsyncedCount = 0;
            updateCounterDisplay();
        }
    }

    async function handleSync() {
        if (!currentUser || unsyncedCount === 0) {
            alert("Eşitlenecek yeni zikir yok.");
            return;
        }
        try {
            const result = await api.sync(currentUser.id, unsyncedCount);
            localCount = result.total_zikir;
            unsyncedCount = 0;
            updateCounterDisplay();
            alert("Sunucuyla başarıyla eşitlendi!");
        } catch (error) {
            console.error("Sync failed:", error);
            alert("Eşitleme başarısız oldu.");
        }
    }

    // --- Initialization ---
    function init() {
        // Check for saved user
        const savedUser = localStorage.getItem('zikirmatik_user');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            localCount = currentUser.total_zikir;
            updateCounterDisplay();
            showUserProfile(currentUser.username);
            loginModal.classList.add('hidden');
        }

        loginBtn.addEventListener('click', handleLogin);
        incrementBtn.addEventListener('click', handleIncrement);
        resetBtn.addEventListener('click', handleReset);
        syncBtn.addEventListener('click', handleSync);
        leaderboardToggle.addEventListener('click', toggleLeaderboard);
    }

    init();
});
