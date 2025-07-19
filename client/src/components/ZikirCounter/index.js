import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const ZikirCounter = () => {
  const [localCount, setLocalCount] = useState(() => {
    const savedCount = localStorage.getItem('localZikirCount');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  const [totalZikir, setTotalZikir] = useState(0);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error
  const user = useRef(null);

  // Kullanıcı bilgisini al ve sunucudaki toplam zikrini yükle
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      user.current = storedUser;
      setTotalZikir(storedUser.totalZikir || 0);
    }
  }, []);

  // Local sayacı localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('localZikirCount', localCount);
  }, [localCount]);

  // Senkronizasyon fonksiyonu
  const syncWithServer = useCallback(async () => {
    if (localCount === 0 || !user.current) return;

    setSyncStatus('syncing');
    try {
      const res = await axios.post('/api/zikir/sync', {
        userId: user.current.id,
        count: localCount,
      });

      setTotalZikir(res.data.totalZikir);
      setLocalCount(0); // Senkronizasyon başarılı olunca local sayacı sıfırla
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
    } finally {
      setTimeout(() => setSyncStatus('idle'), 2000); // Durumu 2 saniye sonra normale döndür
    }
  }, [localCount]);

  // Periyodik senkronizasyon
  useEffect(() => {
    const intervalId = setInterval(syncWithServer, 30000); // Her 30 saniyede bir senkronize et
    return () => clearInterval(intervalId);
  }, [syncWithServer]);

  // Sayfadan ayrılırken senkronize et
  useEffect(() => {
    const handleBeforeUnload = () => {
      syncWithServer();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [syncWithServer]);


  const increment = useCallback(() => {
    setLocalCount(prevCount => prevCount + 1);
  }, []);

  const resetLocal = () => {
    if (window.confirm('Bu oturumdaki sayacı sıfırlamak istediğinizden emin misiniz? (Sunucudaki toplamınız etkilenmez)')) {
      setLocalCount(0);
    }
  };

  const getSyncMessage = () => {
    switch (syncStatus) {
      case 'syncing': return 'Senkronize ediliyor...';
      case 'success': return 'Sunucuyla senkronize edildi!';
      case 'error': return 'Senkronizasyon hatası!';
      default: return `Sunucudaki Toplam: ${totalZikir.toLocaleString()}`;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 text-white text-center">
      <div className="text-sm text-gray-400 mb-2 h-5">{getSyncMessage()}</div>
      <h2 className="text-2xl font-light text-gray-400 mb-2">Bu Oturum</h2>
      <div className="text-8xl font-bold mb-8">{localCount}</div>

      <button
        onClick={increment}
        className="w-48 h-48 bg-blue-600 rounded-full text-white text-5xl font-bold focus:outline-none hover:bg-blue-700 active:bg-blue-800 transform active:scale-95 transition-all duration-150 shadow-lg mx-auto block"
      >
        +1
      </button>

      <div className="flex justify-center space-x-4 mt-8">
        <button onClick={syncWithServer} disabled={syncStatus==='syncing'} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg disabled:bg-green-400">Şimdi Eşitle</button>
        <button onClick={resetLocal} className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg">Sıfırla</button>
      </div>
    </div>
  );
};

export default ZikirCounter;
