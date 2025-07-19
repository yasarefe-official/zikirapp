import React from 'react';
import ZikirCounter from '../../components/ZikirCounter';

const ZikirPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Gelecekte buraya kullanıcı profili veya header eklenebilir */}
      <header className="w-full max-w-md mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center">Zikirmatik</h1>
      </header>

      <main className="w-full">
        <ZikirCounter />
      </main>

      {/* Gelecekte buraya navigasyon veya footer eklenebilir */}
      <footer className="w-full max-w-md mx-auto mt-8 text-center text-gray-500">
        <p>Offline modda çalışır. Verileriniz güvende.</p>
      </footer>
    </div>
  );
};

export default ZikirPage;
