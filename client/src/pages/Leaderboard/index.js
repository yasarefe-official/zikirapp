import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeaderboardTable from '../../components/LeaderboardTable';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // API endpoint'i için tam URL'yi belirtiyoruz.
        // Geliştirme sırasında proxy ayarı yapılabilir.
        const res = await axios.get('/api/zikir/leaderboard');
        setUsers(res.data);
        setError(null);
      } catch (err) {
        setError('Liderlik tablosu yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Global Liderlik Tablosu</h1>

        {loading && <p className="text-center">Yükleniyor...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && <LeaderboardTable users={users} />}

        <div className="text-center mt-8">
            <a href="/" className="text-blue-500 hover:underline">Zikir Sayacına Geri Dön</a>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
