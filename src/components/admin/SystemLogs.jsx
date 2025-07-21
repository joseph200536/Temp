import React, { useState } from 'react';

const mockLogs = [
  {
    timestamp: '2025-07-07 14:02:10',
    type: 'Login Success',
    message: "User 'admin@shopverse.com' logged in",
    user: 'admin',
  },
  {
    timestamp: '2025-07-07 14:04:30',
    type: 'API Error',
    message: 'Failed to fetch product list: timeout',
    user: 'system',
  },
  {
    timestamp: '2025-07-07 14:10:20',
    type: 'Product Update',
    message: 'Product ID 191 updated (price, stock)',
    user: 'seller101',
  },
  {
    timestamp: '2025-07-07 14:15:00',
    type: 'Failed Login',
    message: 'Invalid password attempt for admin@shopverse.com',
    user: 'admin',
  },
  {
    timestamp: '2025-07-07 14:25:00',
    type: 'API Error',
    message: 'Timeout fetching user stats',
    user: 'system',
  },
  {
    timestamp: '2025-07-07 14:30:00',
    type: 'Product Update',
    message: 'Product ID 202 price updated',
    user: 'seller101',
  },
];

const getBadgeClass = (type) => {
  switch (type) {
    case 'Login Success':
      return 'bg-green-100 text-green-800';
    case 'API Error':
      return 'bg-red-100 text-red-800';
    case 'Product Update':
      return 'bg-blue-100 text-blue-800';
    case 'Failed Login':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function SystemLogs() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  const eventTypes = [...new Set(mockLogs.map((log) => log.type))];
  const users = [...new Set(mockLogs.map((log) => log.user))];

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.type.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    const matchesType = eventFilter ? log.type === eventFilter : true;
    const matchesUser = userFilter ? log.user === userFilter : true;

    return matchesSearch && matchesType && matchesUser;
  });

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const changePage = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">System Logs</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={eventFilter}
            onChange={(e) => {
              setEventFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Types</option>
            {eventTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={userFilter}
            onChange={(e) => {
              setUserFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Users</option>
            {users.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-primary text-gray-900">
            <tr>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">Event Type</th>
              <th className="px-6 py-3 font-medium">Message</th>
              <th className="px-6 py-3 font-medium">User</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.length > 0 ? (
              currentLogs.map((log, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClass(
                        log.type
                      )}`}
                    >
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{log.message}</td>
                  <td className="px-6 py-3 text-gray-800 font-semibold">
                    {log.user}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => changePage(num)}
              className={`px-4 py-1 rounded-md text-sm font-medium border ${
                num === currentPage
                  ? 'bg-primary text-black'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
