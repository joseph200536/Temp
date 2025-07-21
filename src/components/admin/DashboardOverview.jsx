import React, { useState } from 'react';
import { TrendingUp, BookOpen, Users, DollarSign, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DashboardOverview = () => {
  const [filter, setFilter] = useState('week');
  const [rangeType, setRangeType] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = [
    {
      name: 'Total Sales',
      value: '₹42,390',
      icon: DollarSign,
      color: 'bg-green-100 text-green-700',
    },
    {
      name: 'Books Sold',
      value: '1,543',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Active Users',
      value: '678',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      name: 'Top Rating',
      value: '4.9 ★',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-700',
    },
  ];

  const topSellersData = {
    day: [
      { title: 'Atomic Habits', author: 'James Clear', sales: 32 },
      { title: 'The Psychology of Money', author: 'Morgan Housel', sales: 25 },
    ],
    week: [
      { title: 'The Alchemist', author: 'Paulo Coelho', sales: 215 },
      { title: 'Atomic Habits', author: 'James Clear', sales: 187 },
      { title: 'Ikigai', author: 'Héctor García', sales: 165 },
    ],
    month: [
      { title: 'The Subtle Art...', author: 'Mark Manson', sales: 510 },
      { title: 'Think and Grow Rich', author: 'Napoleon Hill', sales: 475 },
      { title: 'The Alchemist', author: 'Paulo Coelho', sales: 460 },
    ],
  };

  const frequentUsersData = {
    day: [
      { name: 'Sneha M.', email: 'sneha@example.com', purchases: 3 },
      { name: 'Ravi Kumar', email: 'ravi@example.com', purchases: 2 },
    ],
    week: [
      { name: 'John Doe', email: 'john@example.com', purchases: 12 },
      { name: 'Sneha M.', email: 'sneha@example.com', purchases: 10 },
      { name: 'Alex Smith', email: 'alex@example.com', purchases: 9 },
    ],
    month: [
      { name: 'Anita Sharma', email: 'anita@example.com', purchases: 12 },
      { name: 'John Doe', email: 'john@example.com', purchases: 13 },
      { name: 'Sneha M', email: 'sneha@example.com', purchases: 20 },
    ],
  };

  const topSellers = topSellersData[filter];
  const frequentUsers = frequentUsersData[filter];

  const handleDownloadReport = (selectedFilter) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Bookstore Report - ${selectedFilter.toUpperCase()}`, 14, 20);

    const filtersToExport = selectedFilter === 'all' ? ['day', 'week', 'month'] : [selectedFilter];

    filtersToExport.forEach((filterKey, index) => {
      const yStart = 30 + index * 80;
      const sellers = topSellersData[filterKey] || [];
      const users = frequentUsersData[filterKey] || [];

      doc.setFontSize(12);
      doc.text(`Top Selling Books (${filterKey})`, 14, yStart);
      autoTable(doc, {
        startY: yStart + 5,
        head: [['Title', 'Author', 'Sales']],
        body: sellers.map((book) => [book.title, book.author, book.sales]),
      });

      const afterSellerTable = doc.lastAutoTable.finalY + 10;
      doc.text(`Frequent Buyers (${filterKey})`, 14, afterSellerTable);
      autoTable(doc, {
        startY: afterSellerTable + 5,
        head: [['Name', 'Email', 'Purchases']],
        body: users.map((user) => [user.name, user.email, user.purchases]),
      });
    });

    doc.save(`bookstore_${selectedFilter}_report.pdf`);
  };

  const handleDownloadSpecificReport = (rangeType, date) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Bookstore Report - ${rangeType.toUpperCase()}`, 14, 20);
    doc.text(`Selected Date: ${date.toDateString()}`, 14, 30);

    const sellers = topSellersData[filter] || [];
    const users = frequentUsersData[filter] || [];

    doc.text('Top Sellers', 14, 40);
    autoTable(doc, {
      startY: 45,
      head: [['Title', 'Author', 'Sales']],
      body: sellers.map((book) => [book.title, book.author, book.sales]),
    });

    const afterSellerTable = doc.lastAutoTable.finalY + 10;
    doc.text('Frequent Buyers', 14, afterSellerTable);
    autoTable(doc, {
      startY: afterSellerTable + 5,
      head: [['Name', 'Email', 'Purchases']],
      body: users.map((user) => [user.name, user.email, user.purchases]),
    });

    const formattedDate = date.toISOString().split('T')[0];
    doc.save(`bookstore_${rangeType}_${formattedDate}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">📊 Bookstore Dashboard</h2>
      </div>

      {/* Custom Date Filter */}
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Select Range:</label>
          <select
            value={rangeType}
            onChange={(e) => setRangeType(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mr-2">Choose Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat={
              rangeType === 'year'
                ? 'yyyy'
                : rangeType === 'month'
                ? 'MMMM yyyy'
                : rangeType === 'week'
                ? "'Week of' MMM d, yyyy"
                : 'dd/MM/yyyy'
            }
            showYearPicker={rangeType === 'year'}
            showMonthYearPicker={rangeType === 'month'}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        <button
          onClick={() => handleDownloadSpecificReport(rangeType, selectedDate)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Download {rangeType} Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Toggle Buttons */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-200 rounded-full p-1 shadow-inner">
          {['day', 'week', 'month'].map((time) => (
            <button
              key={time}
              onClick={() => setFilter(time)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                filter === time ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-white'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Top Sellers & Frequent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            📚 Top Selling Books <span className="text-sm text-gray-500">({filter})</span>
          </h3>
          <ul className="divide-y">
            {topSellers.map((book, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{book.title}</p>
                  <p className="text-sm text-gray-500">by {book.author}</p>
                </div>
                <span className="text-sm font-semibold text-green-700">{book.sales} sold</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            👥 Frequent Buyers <span className="text-sm text-gray-500">({filter})</span>
          </h3>
          <ul className="divide-y">
            {frequentUsers.map((user, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-sm font-semibold text-blue-700">{user.purchases} purchases</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
