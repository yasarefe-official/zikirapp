import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Bu veriler normalde API'den veya state management'tan gelir.
  // Şimdilik sahte veri kullanıyoruz.
  const [userData] = useState({
    username: 'ornek_kullanici',
    totalZikir: 125430,
    dailyAverage: 450,
    memberSince: new Date().toLocaleDateString('tr-TR'),
    achievements: '100.000 Zikir Tamamlandı'
  });

  const [shareableLink, setShareableLink] = useState('');

  const generateShareLink = () => {
    const dataToEncode = {
      username: userData.username,
      totalZikir: userData.totalZikir,
      achievements: userData.achievements,
    };

    const jsonString = JSON.stringify(dataToEncode);
    const encodedData = btoa(jsonString); // Base64 encode
    const link = `${window.location.origin}/stats/${encodedData}`;

    setShareableLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert('Link panoya kopyalandı!');
    }, (err) => {
        alert('Link kopyalanamadı.');
        console.error('Clipboard error:', err);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Profilim</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
              {userData.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.username}</h2>
              <p className="text-sm text-gray-400">Üyelik tarihi: {userData.memberSince}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">İstatistiklerim</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Toplam Zikir</p>
                <p className="text-3xl font-bold">{userData.totalZikir.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Günlük Ortalama</p>
                <p className="text-3xl font-bold">{userData.dailyAverage.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">İstatistikleri Paylaş</h3>
            {!shareableLink ? (
              <button
                onClick={generateShareLink}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Paylaşım Linki Oluştur
              </button>
            ) : (
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-green-400 mb-2">Linkiniz hazır!</p>
                <input
                  type="text"
                  readOnly
                  value={shareableLink}
                  className="w-full bg-gray-600 text-white p-2 rounded border border-gray-500"
                />
                <button
                  onClick={copyToClipboard}
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Kopyala
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-8">
            <Link to="/" className="text-blue-500 hover:underline">Ana Sayfaya Dön</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
