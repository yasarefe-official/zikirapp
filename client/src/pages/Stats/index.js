import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const StatsPage = () => {
  const { encodedData } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (encodedData) {
      try {
        // Base64'ten decode et ve JSON'a parse et
        const decodedString = atob(encodedData);
        const parsedData = JSON.parse(decodedString);

        // Basit bir doğrulama
        if (parsedData.username && parsedData.totalZikir !== undefined) {
          setStats(parsedData);
        } else {
          throw new Error('Geçersiz veri formatı.');
        }
      } catch (e) {
        console.error("Decode hatası:", e);
        setError('Paylaşım linki geçersiz veya bozuk.');
      }
    }
  }, [encodedData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Hata</h1>
        <p className="text-lg mb-8">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  if (!stats) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"><p>Yükleniyor...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-blue-400">{stats.username}</span> adlı kullanıcının istatistikleri
        </h1>
        <p className="text-gray-400 mb-8">Bu link üzerinden paylaşıldı.</p>

        <div className="text-left space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Toplam Zikir</p>
            <p className="text-4xl font-bold">{stats.totalZikir.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Başarımlar (Örnek)</p>
            <p className="text-lg">{stats.achievements || 'Henüz başarım yok.'}</p>
          </div>
        </div>

        <Link to="/" className="mt-8 inline-block text-blue-500 hover:underline">
          Sen de Zikir Çekmeye Başla!
        </Link>
      </div>
    </div>
  );
};

export default StatsPage;
