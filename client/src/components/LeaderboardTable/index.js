import React from 'react';

const LeaderboardTable = ({ users }) => {
  if (!users || users.length === 0) {
    return <p className="text-gray-400">Liderlik tablosu boş veya yükleniyor...</p>;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Liderlik Tablosu</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">Sıra</th>
              <th scope="col" className="px-6 py-3">Kullanıcı</th>
              <th scope="col" className="px-6 py-3 text-right">Toplam Zikir</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || index} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-4 py-4 font-medium text-white">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {user.username}
                </th>
                <td className="px-6 py-4 text-right font-bold text-lg">{user.totalZikir.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
