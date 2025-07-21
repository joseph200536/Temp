import React, { useState } from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function SellerAnalytics() {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [analyticsTab, setAnalyticsTab] = useState('posts');
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [summaryView, setSummaryView] = useState('day');

  const sellersPerPage = 2;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const sellers = [ 
    {
      id: 1,
      name: 'Arun Bookstore',
      owner: 'Arun Kumar',
      email: 'arun@books.com',
      joinDate: '2025-06-12',
      address: '12, MG Road, Chennai',
      contact: '9123456780',
      image: 'https://prashantb.wordpress.com/wp-content/uploads/2023/05/bookshop.jpg?w=640',
      uploaded: 200,
      sales: 120,
      returned: 10,
      cancelled: 5,
      dailyStats: [
        { day: 'Jul 1', sales: 5, returns: 1, cancelled: 0 },
        { day: 'Jul 2', sales: 6, returns: 0, cancelled: 1 },
         { day: 'Jan 1', sales: 5, returns: 1, cancelled: 0 },
        { day: 'Feb 2', sales: 6, returns: 0, cancelled: 1 },
      ],
    orders: [
  { user: "Ravi", date: "Jul 1", status: "ordered", book: "Introduction to Algorithms" },
  { user: "Sneha", date: "Jul 2", status: "cancelled", book: "JavaScript: The Good Parts" },
  { user: "Deepa", date: "Jul 2", status: "pending", book: "Data Structures in C" }
]

    },
    {
      id: 2,
      name: 'Meena Publications',
      owner: 'Meena Devi',
      email: 'meena@publish.com',
      joinDate: '2025-05-15',
      address: 'B-32, New Market, Delhi',
      contact: '9876543210',
      image: 'https://i.pinimg.com/736x/90/a8/d3/90a8d3e2aa2479ecf3ad51f5b99db790.jpg',
      uploaded: 300,
      sales: 250,
      returned: 5,
      cancelled: 10,
      dailyStats: [
        { day: 'Jul 1', sales: 12, returns: 0, cancelled: 1 },
        { day: 'Jul 2', sales: 10, returns: 1, cancelled: 0 },
      ],
      orders: [
        { user: "Arjun", date: "Jul 1", status: "ordered" ,book:"The Secret"},
        { user: "Divya", date: "Jul 2", status: "pending",book:"Love Hypothesis" },
        { user: "Karan", date: "Jul 2", status: "cancelled",book:"Never Lie" }
      ]
    },
    {
  id: 3,
  name: 'Galaxy Books',
  owner: 'Suresh Babu',
  email: 'suresh@galaxybooks.com',
  joinDate: '2025-04-20',
  address: '22, Park Street, Kolkata',
  contact: '9988776655',
  image: 'https://cdn.pixabay.com/photo/2015/09/10/09/50/library-934285_640.jpg',
  uploaded: 150,
  sales: 100,
  returned: 8,
  cancelled: 3,
  dailyStats: [
    { day: 'Jul 1', sales: 7, returns: 1, cancelled: 1 },
    { day: 'Jul 2', sales: 5, returns: 0, cancelled: 0 },
  ],
  orders: [
    { user: "Kavya", date: "Jul 1", status: "ordered", book: "Atomic Habits" },
    { user: "Rahul", date: "Jul 2", status: "pending", book: "Think and Grow Rich" },
    { user: "Parthiban", date: "Jul 2", status: "cancelled", book: "Shadow Fall" }
  ]
}
  ];

  const handleDownload = () => {
    if (!selectedSeller) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Seller Analytics Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Sales", "Returned", "Cancelled"]],
      body: [[
        selectedSeller.name,
        selectedSeller.sales,
        selectedSeller.returned,
        selectedSeller.cancelled,
      ]],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Date", "Sales", "Returns", "Cancelled"]],
      body: selectedSeller.dailyStats.map((entry) => [
        entry.day,
        entry.sales,
        entry.returns,
        entry.cancelled,
      ]),
    });

    if (selectedSeller.orders && selectedSeller.orders.length > 0) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["User", "Date", "Book", "Status"]],
        body: selectedSeller.orders.map((order) => [
          order.user,
          order.date,
          order.book,
          order.status,
        ]),
      });
    }

    doc.save(`${selectedSeller.name}_report.pdf`);
  };

  if (selectedSeller) {
    return (
      <div>
        <button
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded"
          onClick={() => setSelectedSeller(null)}
        >
          ← Back to Seller List
        </button>

        <div className="flex gap-6 items-start mb-6">
          <img src={selectedSeller.image} alt="Shop" className="w-28 h-28 rounded border" />
          <div>
            <h2 className="text-2xl font-bold">{selectedSeller.name}</h2>
            <p className="text-gray-600"><strong>Owner:</strong> {selectedSeller.owner}</p>
            <p className="text-gray-600"><strong>Joined:</strong> {selectedSeller.joinDate}</p>
            <p className="text-gray-600"><strong>Address:</strong> {selectedSeller.address}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {selectedSeller.contact}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold">Summary:</h3>
          {['day', 'month', 'year'].map((view) => (
            <button
              key={view}
              onClick={() => setSummaryView(view)}
              className={`px-3 py-1 rounded-full text-sm ${
                summaryView === view ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        {summaryView === 'month' && (
          <div className="mb-4">
            <label className="mr-2">Filter by Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="">All</option>
              {monthNames.map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}

        {summaryView === 'year' && (
          <div className="mb-4">
            <label className="mr-2">Filter by Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="">All</option>
              {[2023, 2024, 2025].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        <table className="w-full border text-left bg-white shadow-md rounded mb-6">
          <thead className="bg-teal-100">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Sales</th>
              <th className="p-2">Returns</th>
              <th className="p-2">Cancelled</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              let entries = selectedSeller.dailyStats;

              const formatSummary = () => {
                if (summaryView === 'day') {
                  return entries;
                }

               if (summaryView === 'month') {
  const result = {};

  entries.forEach(({ day, sales, returns, cancelled }) => {
    const [shortMonth] = day.split(' ');
    const date = new Date(`${shortMonth} 1, 2025`);
    const fullMonth = date.toLocaleString('default', { month: 'long' }); // e.g., "July"
    const shortMonthName = date.toLocaleString('default', { month: 'short' }); // "Jul"

    // Only include data for selected month or all if not filtered
    if (!selectedMonth || selectedMonth === shortMonthName) {
      if (!result[fullMonth]) {
        result[fullMonth] = { sales: 0, returns: 0, cancelled: 0 };
      }

      result[fullMonth].sales += sales;
      result[fullMonth].returns += returns;
      result[fullMonth].cancelled += cancelled;
    }
  });

  return Object.entries(result).map(([month, data]) => ({
    day: month,
    ...data,
  }));
}


                if (summaryView === 'year') {
                  let total = { sales: 0, returns: 0, cancelled: 0 };

                  entries.forEach(({ sales, returns, cancelled }) => {
                    total.sales += sales;
                    total.returns += returns;
                    total.cancelled += cancelled;
                  });

                  return [{ day: selectedYear || '2025', ...total }];
                }
              };

              return formatSummary().map((entry, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{entry.day}</td>
                  <td className="p-2">{entry.sales}</td>
                  <td className="p-2">{entry.returns}</td>
                  <td className="p-2">{entry.cancelled}</td>
                </tr>
              ));
            })()}
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mb-2">User Orders</h3>
        <table className="w-full border text-left bg-white shadow-md rounded">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Date</th>
              <th className="p-2">Book</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeller.orders.map((order, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{order.user}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.book}</td>
                <td className="p-2 capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          onClick={handleDownload}
        >
          Download Report
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Seller Analytics</h2>

      <input
        type="text"
        placeholder="Search seller by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <div className="space-y-1">
        {(() => {
          const filtered = sellers.filter((s) =>
            (s.name || '').toLowerCase().includes(searchTerm.toLowerCase())
          );
          const totalPages = Math.ceil(filtered.length / sellersPerPage);
          const paginated = filtered.slice(
            (currentPage - 1) * sellersPerPage,
            currentPage * sellersPerPage
          );

          return (
            <>
              {paginated.map((seller) => (
                <div
                  key={seller.id}
                  onClick={() => setSelectedSeller(seller)}
                  className="cursor-pointer bg-white rounded-lg shadow p-4 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold">{seller.name}</h3>
                  <p className="text-sm text-gray-600">{seller.email}</p>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-teal-600 text-white'
                          : 'bg-white border text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}

export default SellerAnalytics;
