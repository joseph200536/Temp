import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '123 Shopping Street\nCommerce City, CC 12345',
    phone: '(555) 123-4567',
    email: 'info@shopverse.com',
    businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(contactInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactInfo(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(contactInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Contact Information Management</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[rgb(182,215,204)] text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Contact Info
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
            <textarea
              name="businessHours"
              value={formData.businessHours}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)]"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[rgb(182,215,204)] text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-700 whitespace-pre-line">{contactInfo.address}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-700">{contactInfo.phone}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-700">{contactInfo.email}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
            <p className="text-gray-700 whitespace-pre-line">{contactInfo.businessHours}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview</h3>
        <p className="text-sm text-gray-600 mb-4">This is how the contact information will appear on the Contact page.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <span className="text-blue-600">📍</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <span className="text-blue-600">📞</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">{contactInfo.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <span className="text-blue-600">✉️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">{contactInfo.email}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <span className="text-blue-600">🕒</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Business Hours</h3>
              <p className="text-gray-600 whitespace-pre-line">{contactInfo.businessHours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;