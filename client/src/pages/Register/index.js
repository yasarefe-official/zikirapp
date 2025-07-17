import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="kullanici_adiniz"
              required
            />
             <p className="text-xs text-gray-400 mt-1">Sadece harf, rakam ve alt çizgi kullanın.</p>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Zaten hesabın var mı? <a href="/login" className="text-blue-500 hover:underline">Giriş Yap</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
