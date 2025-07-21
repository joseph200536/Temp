import React, { useState } from 'react';

const BookManagement = () => {
  const [formType, setFormType] = useState(null);
  const [books, setBooks] = useState([
    { serial: '001', name: 'React Basics', genre: 'Tech', quantity: 10, price: 500 },
    { serial: '002', name: 'Advanced JS', genre: 'Tech', quantity: 7, price: 650 },
  ]);
  const [formData, setFormData] = useState({
    serial: '',
    name: '',
    description: '',
    year: '',
    genre: '',
    language: '',
    quantity: '',
    price: '',
    reason: '',
    confirm: ''
  });

  const genres = ['Tech', 'Science', 'Math', 'History', 'Fiction', 'Romance', 'Thriller', 'Biography', 'Fantasy', 'Adventure'];
  const languages = ['English', 'Tamil', 'Hindi', 'Malayalam', 'Telugu', 'Kannada', 'French', 'German'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setBooks([...books, {
      serial: formData.serial,
      name: formData.name,
      genre: formData.genre,
      quantity: Number(formData.quantity),
      price: Number(formData.price)
    }]);
    setFormData({ serial: '', name: '', description: '', year: '', genre: '', language: '', quantity: '', price: '', reason: '', confirm: '' });
  };

  const handleUpdate = () => {
    const updatedBooks = books.map(book =>
      book.serial === formData.serial
        ? { ...book, name: formData.name, genre: formData.genre, quantity: Number(formData.quantity), price: Number(formData.price) }
        : book
    );
    setBooks(updatedBooks);
    setFormData({ serial: '', name: '', description: '', year: '', genre: '', language: '', quantity: '', price: '', reason: '', confirm: '' });
  };

  const handleDelete = () => {
    if (formData.confirm !== 'DELETE') {
      alert('Type DELETE to confirm deletion');
      return;
    }
    setBooks(books.filter(book => book.serial !== formData.serial));
    setFormData({ serial: '', name: '', description: '', year: '', genre: '', language: '', quantity: '', price: '', reason: '', confirm: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'add') handleAdd();
    if (formType === 'update') handleUpdate();
    if (formType === 'delete') handleDelete();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">📚 Book Management</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFormType('add')}
          className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300"
        >
          Add
        </button>
        <button
          onClick={() => setFormType('update')}
          className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-300"
        >
          Update
        </button>
        <button
          onClick={() => setFormType('delete')}
          className="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300"
        >
          Delete
        </button>
        <button
          onClick={() => setFormType(null)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Hide Form
        </button>
      </div>

      {formType && (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="serial" placeholder="Book Serial Number" value={formData.serial} onChange={handleInputChange} className="border rounded p-2 w-full" required />
            {formType !== 'delete' && <input type="text" name="name" placeholder="Book Name" value={formData.name} onChange={handleInputChange} className="border rounded p-2 w-full" required />}
            {formType !== 'delete' && <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="border rounded p-2 w-full" />}
            {formType !== 'delete' && <input type="date" name="year" placeholder="Published Year" value={formData.year} onChange={handleInputChange} className="border rounded p-2 w-full" />}
            {formType !== 'delete' && (
              <select name="genre" value={formData.genre} onChange={handleInputChange} className="border rounded p-2 w-full">
                <option value="">Select Genre</option>
                {genres.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            )}
            {formType !== 'delete' && (
              <select name="language" value={formData.language} onChange={handleInputChange} className="border rounded p-2 w-full">
                <option value="">Select Language</option>
                {languages.map((l, i) => <option key={i} value={l}>{l}</option>)}
              </select>
            )}
            {formType !== 'delete' && <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} className="border rounded p-2 w-full" />}
            {formType !== 'delete' && <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="border rounded p-2 w-full" />}
            {formType === 'delete' && <textarea name="reason" placeholder="Reason for Deletion" value={formData.reason} onChange={handleInputChange} className="border rounded p-2 w-full" required />}
            {formType === 'delete' && <input type="text" name="confirm" placeholder="Type DELETE to confirm" value={formData.confirm} onChange={handleInputChange} className="border rounded p-2 w-full text-red-600" required />}
          </div>
          <div className="text-center mt-6">
            <button type="submit" className="bg-green-400 text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-collapse bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Serial</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Genre</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{book.serial}</td>
                <td className="border px-4 py-2">{book.name}</td>
                <td className="border px-4 py-2">{book.genre}</td>
                <td className="border px-4 py-2">{book.quantity}</td>
                <td className="border px-4 py-2">₹{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
