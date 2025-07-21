import React from 'react';

export default function ReportAnalysis() {
  const topBooks = [
    { title: 'Atomic Habits', sold: 40, revenue: 8000, stock: 10, rating: 4.8 },
    { title: 'Rich Dad Poor Dad', sold: 35, revenue: 7000, stock: 7, rating: 4.5 }
  ];

  const orders = [
    { id: 'ORD123', title: 'Atomic Habits', quantity: 2, buyer: 'John Doe', date: '2025-07-15', price: 800 },
    { id: 'ORD124', title: 'Rich Dad Poor Dad', quantity: 1, buyer: 'Jane Smith', date: '2025-07-14', price: 350 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">Total Books Sold: 120</div>
        <div className="bg-green-100 p-4 rounded shadow">Total Revenue: ₹25,000</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Pending Orders: 5</div>
        <div className="bg-purple-100 p-4 rounded shadow">Top-Selling Book: "Atomic Habits"</div>
      </div>

      {/* Top Selling Books */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Top Selling Books</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Sold</th>
              <th className="p-2 border">Revenue</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Rating</th>
            </tr>
          </thead>
          <tbody>
            {topBooks.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{book.title}</td>
                <td className="p-2 border">{book.sold}</td>
                <td className="p-2 border">₹{book.revenue}</td>
                <td className="p-2 border">{book.stock}</td>
                <td className="p-2 border">{book.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue Breakdown */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Revenue Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded">This Week: ₹5,000</div>
          <div className="bg-green-200 p-4 rounded">This Month: ₹15,000</div>
          <div className="bg-green-300 p-4 rounded">All Time: ₹25,000</div>
        </div>
      </div>

      {/* Orders Report Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Orders Report</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Book Title</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Order Date</th>
              <th className="p-2 border">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.title}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.buyer}</td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border">₹{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Report */}
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Download PDF</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Download CSV</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Print</button>
      </div>
    </div>
  );
}