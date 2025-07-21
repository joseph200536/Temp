// src/pages/Shop.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Import Link for breadcrumbs
import { Search, Heart, ShoppingCart, X } from 'lucide-react';
import bookData from '../data/Book.json';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const Shop = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getProductAverageRating } = useReviews();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const getFilterParam = (paramName) => searchParams.getAll(paramName);
  const getSortByParam = () => searchParams.get('sortBy') || 'Title';
  const getSearchTermParam = () => searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(getSearchTermParam());
  const [selectedAuthors, setSelectedAuthors] = useState(getFilterParam('author'));
  const [selectedFormats, setSelectedFormats] = useState(getFilterParam('format'));
  const [selectedLanguages, setSelectedLanguages] = useState(getFilterParam('language'));
  const [selectedPublishers, setSelectedPublishers] = useState(getFilterParam('publisher'));
  const [selectedCategories, setSelectedCategories] = useState(getFilterParam('category'));
  const [sortBy, setSortBy] = useState(getSortByParam());

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (searchTerm) newSearchParams.set('search', searchTerm);
    selectedAuthors.forEach(author => newSearchParams.append('author', author));
    selectedFormats.forEach(format => newSearchParams.append('format', format));
    selectedLanguages.forEach(language => newSearchParams.append('language', language));
    selectedPublishers.forEach(publisher => newSearchParams.append('publisher', publisher));
    selectedCategories.forEach(category => newSearchParams.append('category', category));
    if (sortBy && sortBy !== 'Title') newSearchParams.set('sortBy', sortBy);
    
    setCurrentPage(1);

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  }, [searchTerm, selectedAuthors, selectedFormats, selectedLanguages, selectedPublishers, selectedCategories, sortBy, navigate]);

  useEffect(() => {
    setSearchTerm(getSearchTermParam());
    setSelectedAuthors(getFilterParam('author'));
    setSelectedFormats(getFilterParam('format'));
    setSelectedLanguages(getFilterParam('language'));
    setSelectedPublishers(getFilterParam('publisher'));
    setSelectedCategories(getFilterParam('category'));
    setSortBy(getSortByParam());
  }, [location.search]);

  const authors = Array.from(new Set(bookData.map(b => b.Author)));
  const formats = Array.from(new Set(bookData.map(b => b.Format)));
  const languages = Array.from(new Set(bookData.map(b => b.Language)));
  const publishers = Array.from(new Set(bookData.map(b => b.Publisher)));

  const categoriesSet = new Set();
  bookData.forEach(book => {
    if (book.Breadcrumbs) {
      book.Breadcrumbs.split('|').forEach(cat => {
        const trimmed = cat.trim();
        if (trimmed) categoriesSet.add(trimmed);
      });
    }
  });
  const categories = Array.from(categoriesSet);

  const filteredBooks = useMemo(() => {
    return bookData.filter(book => {
      const matchesSearch = book.Title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(book.Author);
      const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(book.Format);
      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(book.Language);
      const matchesPublisher = selectedPublishers.length === 0 || selectedPublishers.includes(book.Publisher);
      const matchesCategory = selectedCategories.length === 0 || 
        (book.Breadcrumbs && book.Breadcrumbs.split('|')
          .map(c => c.trim())
          .some(c => selectedCategories.includes(c)));

      return matchesSearch && matchesAuthor && matchesFormat && matchesLanguage && matchesPublisher && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'Title') {
        return a.Title.localeCompare(b.Title);
      } else if (sortBy === 'Price-low') {
        return parseFloat(a.Price.replace('$', '')) - parseFloat(b.Price.replace('$', ''));
      } else if (sortBy === 'Price-high') {
        return parseFloat(b.Price.replace('$', '')) - parseFloat(a.Price.replace('$', ''));
      }
      return 0;
    });
  }, [searchTerm, selectedAuthors, selectedFormats, selectedLanguages, selectedPublishers, selectedCategories, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    addToCart({
      id: book['ISBN-10'] || book.ISBN || book['Uniq id'],
      name: book.Title.replace(/b'|'/g, ''),
      price: parseFloat(book.Price.replace('$', '')) || 0,
      image: book.Images
    });
  };

  const handleWishlistToggle = (book) => {
    const id = book['ISBN-10'] || book.ISBN || book['Uniq id'];
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id: id,
        name: book.Title.replace(/b'|'/g, ''),
        price: parseFloat(book.Price.replace('$', '')) || 0,
        image: book.Images,
        category: book.Format
      });
    }
  };

  const removeFilter = (type, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (type === 'search') {
      newSearchParams.delete('search');
    } else if (type === 'sortBy') {
      newSearchParams.delete('sortBy');
    } else {
      const currentValues = newSearchParams.getAll(type);
      newSearchParams.delete(type);
      currentValues.filter(v => v !== value).forEach(v => newSearchParams.append(type, v));
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 flex gap-6">
        <FilterSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
          selectedFormats={selectedFormats}
          setSelectedFormats={setSelectedFormats}
          selectedLanguages={selectedLanguages}
          setSelectedLanguages={setSelectedLanguages}
          selectedPublishers={selectedPublishers}
          setSelectedPublishers={setSelectedPublishers}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          authors={authors}
          formats={formats}
          languages={languages}
          publishers={publishers}
          categories={categories}
        />

        <div className="flex-1">
          {/* Main Navigation Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/shop" className="text-blue-600 hover:underline">
                  Shop
                </Link>
                {selectedCategories.length > 0 && <span className="mx-2">/</span>}
              </li>
              {selectedCategories.length > 0 && (
                <li className="flex items-center">
                  <span className="text-gray-700">{selectedCategories[0]}</span> {/* Display first selected category */}
                </li>
              )}
            </ol>
          </nav>

          {/* Active Filters and Sort By */}
          <div className="mb-4 p-3 bg-white rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-700">Filters:</span>
              {searchTerm && (
                <span className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button onClick={() => removeFilter('search')} className="ml-1 text-gray-600 hover:text-gray-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedAuthors.map(author => (
                <span key={author} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Author: {author}
                  <button onClick={() => removeFilter('author', author)} className="ml-1 text-blue-600 hover:text-blue-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedFormats.map(format => (
                <span key={format} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Format: {format}
                  <button onClick={() => removeFilter('format', format)} className="ml-1 text-green-600 hover:text-green-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedLanguages.map(language => (
                <span key={language} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Language: {language}
                  <button onClick={() => removeFilter('language', language)} className="ml-1 text-purple-600 hover:text-purple-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedPublishers.map(publisher => (
                <span key={publisher} className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Publisher: {publisher}
                  <button onClick={() => removeFilter('publisher', publisher)} className="ml-1 text-yellow-600 hover:text-yellow-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedCategories.map(category => (
                <span key={category} className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Category: {category}
                  <button onClick={() => removeFilter('category', category)} className="ml-1 text-red-600 hover:text-red-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label className="block font-semibold text-gray-700">Sort By:</label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Title">Sort by Title</option>
                <option value="Price-low">Price: Low to High</option>
                <option value="Price-high">Price: High to Low</option>
              </select>
              {sortBy !== 'Title' && (
                <button onClick={() => removeFilter('sortBy')} className="text-gray-600 hover:text-gray-900">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedBooks.map((book) => (
              <ProductCard
                key={book['ISBN-10']}
                book={book}
                isInWishlist={isInWishlist}
                handleWishlistToggle={handleWishlistToggle}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredBooks.length > 0 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;