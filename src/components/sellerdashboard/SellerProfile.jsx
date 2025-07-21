import React, { useState } from "react";

function SellerProfile() {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    storeName: "",
    sellerName: "",
    email: "",
    phone: "",
    companyName: "",
    registrationNumber: "",
    businessType: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (

    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Seller Profile</h1>
        <button
          onClick={handleEditToggle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Edit" : "Save"}
        </button>
      </div>

      {isEditing ? (

        <>
          {/* Read-Only View */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Seller Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-medium">Store Name:</span> {formData.storeName}</p>
              <p><span className="font-medium">Seller Name:</span> {formData.sellerName}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-medium">Company Name:</span> {formData.companyName}</p>
              <p><span className="font-medium">Registration Number:</span> {formData.registrationNumber}</p>
              <p><span className="font-medium">Business Type:</span> {formData.businessType}</p>
              <p><span className="font-medium">Address:</span> {formData.address}</p>
              <p><span className="font-medium">Country:</span> {formData.country}</p>
              <p><span className="font-medium">State:</span> {formData.state}</p>
              <p><span className="font-medium">City:</span> {formData.city}</p>
              <p><span className="font-medium">ZIP Code:</span> {formData.zip}</p>
            </div>
          </div>
        </>



      ) : (

        <>
          {/* Editable Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Seller Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="storeName"
                placeholder="Store Name"
                value={formData.storeName}
                onChange={handleChange}
                disabled={isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="sellerName"
                placeholder="Seller Name"
                value={formData.sellerName}
                onChange={handleChange}
                disabled={isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="registrationNumber"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              >
                <option value="">Business Type</option>
                <option value="individual">Individual</option>
                <option value="company">Company</option>
                <option value="partnership">Partnership</option>
              </select>
              <textarea
                name="address"
                placeholder="Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full md:col-span-2 ${isEditing ? "bg-white" : "bg-gray-100"}`}
              ></textarea>
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
              <input
                name="zip"
                type="number"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                disabled={!isEditing}
                className={`border rounded px-3 py-2 w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SellerProfile;
