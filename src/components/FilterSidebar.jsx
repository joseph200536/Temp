// src/components/FilterSidebar.jsx
import React from 'react';
import { Search } from 'lucide-react';
import Select from 'react-select'; // Import react-select

const FilterSidebar = ({
  searchTerm,
  setSearchTerm,
  selectedAuthors,
  setSelectedAuthors,
  selectedFormats,
  setSelectedFormats,
  selectedLanguages,
  setSelectedLanguages,
  selectedPublishers,
  setSelectedPublishers,
  selectedCategories,
  setSelectedCategories,
  // sortBy, // Removed
  // setSortBy, // Removed
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  authors,
  formats,
  languages,
  publishers,
  categories,
}) => {
  // Helper function to format options for react-select
  const formatOptions = (options) =>
    options.map((option) => ({ value: option, label: option }));

  // Helper function to handle multi-select changes
  const handleMultiSelectChange = (selectedOptions, setter) => {
    setter(selectedOptions ? selectedOptions.map((option) => option.value) : []);
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-6 mr-8 sticky top-20 left-0  max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Sort By section removed from here */}

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Items per Page</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)] bg-white"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          >
          {[4, 8, 12, 16].map(num => (
            <option key={num} value={num}>{num} items</option>
          ))}
        </select>
      </div>

      {/* Author Filter */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Author</label>
        <Select
          isMulti
          options={formatOptions(authors)}
          value={formatOptions(selectedAuthors)}
          onChange={(selected) => handleMultiSelectChange(selected, setSelectedAuthors)}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Authors"
        />
      </div>

      {/* Format Filter */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Format</label>
        <Select
          isMulti
          options={formatOptions(formats)}
          value={formatOptions(selectedFormats)}
          onChange={(selected) => handleMultiSelectChange(selected, setSelectedFormats)}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Formats"
        />
      </div>

      {/* Language Filter */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Language</label>
        <Select
          isMulti
          options={formatOptions(languages)}
          value={formatOptions(selectedLanguages)}
          onChange={(selected) => handleMultiSelectChange(selected, setSelectedLanguages)}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Languages"
        />
      </div>

      {/* Publisher Filter */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Publisher</label>
        <Select
          isMulti
          options={formatOptions(publishers)}
          value={formatOptions(selectedPublishers)}
          onChange={(selected) => handleMultiSelectChange(selected, setSelectedPublishers)}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Publishers"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Category</label>
        <Select
          isMulti
          options={formatOptions(categories)}
          value={formatOptions(selectedCategories)}
          onChange={(selected) => handleMultiSelectChange(selected, setSelectedCategories)}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Categories"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;