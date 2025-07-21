import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const UserAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      address: '123 Blossom St, Bangalore',
      gender: 'Female',
      age: 28,
      image: 'https://via.placeholder.com/120',
      purchases: [
        { id: 1, book: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', price: '₹499', date: '2025-06-21', status: 'completed', address: '123 Blossom St, Bangalore' },
        { id: 2, book: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', price: '₹699', date: '2025-06-28', status: 'in process', address: '123 Blossom St, Bangalore' },
        { id: 3, book: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', price: '₹599', date: '2025-07-02', status: 'cancelled', address: '123 Blossom St, Bangalore' }
      ],
      reviews: [
        { id: 1, book: 'The Alchemist', rating: 4, comment: 'Inspirational read!' },
        { id: 2, book: 'Sapiens', rating: 5, comment: 'Mind-blowing!' },
      ],
    },
    {
      id: 2,
      name: 'Brian Smith',
      email: 'brian@example.com',
      address: '456 Garden Ave, Mumbai',
      gender: 'Male',
      age: 32,
      image: 'https://via.placeholder.com/120',
      purchases: [
        { id: 104, book: '1984', author: 'George Orwell', genre: 'Dystopian', price: '₹399', date: '2025-07-01', status: 'completed', address: '456 Garden Ave, Mumbai' },
      ],
      reviews: [
        { id: 3, book: '1984', rating: 3, comment: 'Thought-provoking.' },
      ],
    },
    {
      id: 3,
      name: 'Catherine West',
      email: 'cathy@example.com',
      address: '789 Ocean Blvd, Chennai',
      gender: 'Female',
      age: 26,
      image: 'https://via.placeholder.com/120',
      purchases: [],
      reviews: [],
    },
    {
  id: 4,
  name: 'Rahul Mehta',
  email: 'rahul.mehta@example.com',
  address: '45 Maple Ave, Mumbai',
  gender: 'Male',
  age: 32,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Ikigai', author: 'Francesc Miralles', genre: 'Philosophy', price: '₹450', date: '2025-06-15', status: 'completed', address: '45 Maple Ave, Mumbai' },
    { id: 2, book: 'The Psychology of Money', author: 'Morgan Housel', genre: 'Finance', price: '₹399', date: '2025-07-01', status: 'in process', address: '45 Maple Ave, Mumbai' }
  ],
  reviews: [
    { id: 1, book: 'Ikigai', rating: 5, comment: 'Deep and meaningful.' },
  ],
},
{
  id: 5,
  name: 'Sneha Reddy',
  email: 'sneha.reddy@example.com',
  address: '9 Lotus Road, Hyderabad',
  gender: 'Female',
  age: 25,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', genre: 'Biography', price: '₹349', date: '2025-06-10', status: 'completed', address: '9 Lotus Road, Hyderabad' },
  ],
  reviews: [
    { id: 1, book: 'Wings of Fire', rating: 5, comment: 'Truly motivating.' }
  ],
},
{
  id: 6,
  name: 'Amit Sharma',
  email: 'amit.sharma@example.com',
  address: '77 Residency Rd, Delhi',
  gender: 'Male',
  age: 40,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Finance', price: '₹299', date: '2025-06-05', status: 'completed', address: '77 Residency Rd, Delhi' },
    { id: 2, book: 'Think and Grow Rich', author: 'Napoleon Hill', genre: 'Self-help', price: '₹349', date: '2025-06-30', status: 'cancelled', address: '77 Residency Rd, Delhi' }
  ],
  reviews: [
    { id: 1, book: 'Rich Dad Poor Dad', rating: 4, comment: 'Eye-opening concepts.' }
  ],
},
{
  id: 7,
  name: 'Priya Verma',
  email: 'priya.verma@example.com',
  address: '12 Lake View, Pune',
  gender: 'Female',
  age: 30,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Becoming', author: 'Michelle Obama', genre: 'Biography', price: '₹550', date: '2025-06-12', status: 'completed', address: '12 Lake View, Pune' },
    { id: 2, book: 'The Secret', author: 'Rhonda Byrne', genre: 'Motivation', price: '₹399', date: '2025-07-03', status: 'in process', address: '12 Lake View, Pune' }
  ],
  reviews: [
    { id: 1, book: 'Becoming', rating: 5, comment: 'Powerful journey.' }
  ],
},
{
  id: 8,
  name: 'Karan Desai',
  email: 'karan.desai@example.com',
  address: '59 Green Fields, Ahmedabad',
  gender: 'Male',
  age: 27,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'The Subtle Art', author: 'Mark Manson', genre: 'Self-help', price: '₹499', date: '2025-06-20', status: 'completed', address: '59 Green Fields, Ahmedabad' }
  ],
  reviews: [
    { id: 1, book: 'The Subtle Art', rating: 4, comment: 'Unfiltered and honest.' }
  ],
},
{
  id: 9,
  name: 'Divya Iyer',
  email: 'divya.iyer@example.com',
  address: '33 Sea Breeze Ln, Chennai',
  gender: 'Female',
  age: 35,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'The Power of Now', author: 'Eckhart Tolle', genre: 'Spirituality', price: '₹379', date: '2025-06-09', status: 'completed', address: '33 Sea Breeze Ln, Chennai' },
    { id: 2, book: 'Untamed', author: 'Glennon Doyle', genre: 'Memoir', price: '₹429', date: '2025-07-05', status: 'in process', address: '33 Sea Breeze Ln, Chennai' }
  ],
  reviews: [
    { id: 1, book: 'The Power of Now', rating: 5, comment: 'Life-changing.' }
  ],
},
{
  id: 10,
  name: 'Vikram Patil',
  email: 'vikram.patil@example.com',
  address: '80 Sunrise St, Nagpur',
  gender: 'Male',
  age: 29,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Can’t Hurt Me', author: 'David Goggins', genre: 'Biography', price: '₹499', date: '2025-06-23', status: 'completed', address: '80 Sunrise St, Nagpur' },
    { id: 2, book: 'Start With Why', author: 'Simon Sinek', genre: 'Leadership', price: '₹349', date: '2025-07-06', status: 'cancelled', address: '80 Sunrise St, Nagpur' }
  ],
  reviews: [
    { id: 1, book: 'Can’t Hurt Me', rating: 5, comment: 'Super inspiring!' }
  ],
},
{
  id: 11,
  name: 'Ananya Das',
  email: 'ananya.das@example.com',
  address: '5 Rose Lane, Kolkata',
  gender: 'Female',
  age: 26,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'Educated', author: 'Tara Westover', genre: 'Memoir', price: '₹499', date: '2025-06-17', status: 'completed', address: '5 Rose Lane, Kolkata' }
  ],
  reviews: [
    { id: 1, book: 'Educated', rating: 4, comment: 'Touching and powerful.' }
  ],
},
{
  id: 12,
  name: 'Manoj Nair',
  email: 'manoj.nair@example.com',
  address: '88 Cloud Street, Kochi',
  gender: 'Male',
  age: 31,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: '1984', author: 'George Orwell', genre: 'Dystopian', price: '₹299', date: '2025-06-26', status: 'completed', address: '88 Cloud Street, Kochi' },
    { id: 2, book: 'Brave New World', author: 'Aldous Huxley', genre: 'Sci-Fi', price: '₹350', date: '2025-07-04', status: 'in process', address: '88 Cloud Street, Kochi' }
  ],
  reviews: [
    { id: 1, book: '1984', rating: 5, comment: 'Chilling and relevant.' }
  ],
},
{
  id: 13,
  name: 'Neha Kapoor',
  email: 'neha.kapoor@example.com',
  address: '99 City Heights, Jaipur',
  gender: 'Female',
  age: 33,
  image: 'https://via.placeholder.com/120',
  purchases: [
    { id: 1, book: 'The Book Thief', author: 'Markus Zusak', genre: 'Historical Fiction', price: '₹399', date: '2025-06-18', status: 'completed', address: '99 City Heights, Jaipur' }
  ],
  reviews: [
    { id: 1, book: 'The Book Thief', rating: 5, comment: 'Heartbreaking and beautiful.' }
  ],
}
  ];

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'az') return a.name.localeCompare(b.name);
      if (sortOrder === 'za') return b.name.localeCompare(a.name);
      if (sortOrder === 'most') return b.purchases.length - a.purchases.length;
      if (sortOrder === 'least') return a.purchases.length - b.purchases.length;
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleDownload = () => {
  if (!selectedUser) return;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('User Analytics Report', 14, 20);

  // Summary table
  autoTable(doc, {
    startY: 30,
    head: [['Name', 'Email', 'Age', 'Gender', 'Total Purchases', 'Reviews']],
    body: [[
      selectedUser.name,
      selectedUser.email,
      selectedUser.age,
      selectedUser.gender,
      selectedUser.purchases.length,
      selectedUser.reviews.length,
    ]],
  });

  // Purchase table
  if (selectedUser.purchases.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Book', 'Author', 'Genre', 'Price', 'Date', 'Status']],
      body: selectedUser.purchases.map(order => [
        order.book,
        order.author,
        order.genre,
        order.price,
        order.date,
        order.status,
      ]),
    });
  }

  // Review table
  if (selectedUser.reviews.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Book', 'Rating', 'Comment']],
      body: selectedUser.reviews.map(review => [
        review.book,
        review.rating,
        review.comment,
      ]),
    });
  }

  doc.save(`${selectedUser.name}_report.pdf`);
};


  if (selectedUser) {
    const cancelledCount = selectedUser.purchases.filter(p => p.status === 'cancelled').length;
    const inProcessCount = selectedUser.purchases.filter(p => p.status === 'in process').length;

    return (
      <div className="bg-gray-100 min-h-screen">
        <button
          onClick={() => {
            setSelectedUser(null);
            setActiveOrderId(null);
          }}
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 px-4 py-2 rounded shadow mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to User List
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img src={selectedUser.image} alt="User" className="w-28 h-28 rounded-lg border" />
          <div className="text-gray-800 space-y-1">
            <h2 className="text-2xl font-semibold">{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[{ label: 'Books Bought', value: selectedUser.purchases.length },
            { label: 'Reviews', value: selectedUser.reviews.length },
            { label: 'Cancelled Orders', value: cancelledCount },
            { label: 'On-Process Deliveries', value: inProcessCount }].map((stat, i) => (
              <div key={i} className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-teal-700">{stat.value}</p>
              </div>
            ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Purchase History</h3>
          {selectedUser.purchases.length === 0 ? (
            <p className="text-sm text-gray-500">No books purchased yet.</p>
          ) : (
            <div className="space-y-0">
              {selectedUser.purchases
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((order) => (
                  <div key={order.id} className="bg-white border rounded shadow-sm">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setActiveOrderId(order.id === activeOrderId ? null : order.id)}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{order.book}</p>
                        <p className="text-xs text-gray-500">Status: {order.status}</p>
                      </div>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    {activeOrderId === order.id && (
                      <div className="px-4 pb-4 text-sm text-gray-700">
                        <p><strong>Author:</strong> {order.author}</p>
                        <p><strong>Genre:</strong> {order.genre}</p>
                        <p><strong>Price:</strong> {order.price}</p>
                        <p><strong>Order Date:</strong> {order.date}</p>
                        <p><strong>Delivery Address:</strong> {order.address || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Book Reviews</h3>
          {selectedUser.reviews.length > 0 ? (
            <ul className="space-y-0">
              {selectedUser.reviews.map((r) => (
                <li key={r.id} className="bg-gray-50 p-4 rounded border shadow-sm">
                  <p className="font-medium">{r.book}</p>
                  <p className="text-yellow-500 text-sm">⭐ {r.rating}</p>
                  <p className="text-gray-700 text-sm">{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No reviews submitted.</p>
          )}
        </div>

        <button
          onClick={handleDownload}
          className="mt-8 px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          Download Report as PDF
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Analytics</h2>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Sort By</option>
          <option value="az">Name A–Z</option>
          <option value="za">Name Z–A</option>
          <option value="most">Most Purchases</option>
          <option value="least">Least Purchases</option>
        </select>
      </div>

      <div className="grid gap-0">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer bg-white border rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
