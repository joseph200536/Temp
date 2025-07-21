import React, { useState, useMemo } from 'react';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import bookData from '../data/Book.json';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('Title');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getProductAverageRating } = useReviews();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Add this import at the top
  
  // Extract unique filter options from book data
  const authors = Array.from(new Set(bookData.map(b => b.Author)));
  const formats = Array.from(new Set(bookData.map(b => b.Format)));
  const languages = Array.from(new Set(bookData.map(b => b.Language)));
  const publishers = Array.from(new Set(bookData.map(b => b.Publisher)));

  // Extract unique categories from Breadcrumbs field by splitting on '|'
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

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (value, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(item => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    addToCart({
      id: book['ISBN-10'] || book.ISBN || book['Uniq id'],
      name: book.Title,
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
        name: book.Title,
        price: parseFloat(book.Price.replace('$', '')) || 0,
        image: book.Images,
        category: book.Format
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 flex gap-6"> {/* Added gap-6 here */}
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
          sortBy={sortBy}
          setSortBy={setSortBy}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          authors={authors}
          formats={formats}
          languages={languages}
          publishers={publishers}
          categories={categories}
          handleCheckboxChange={handleCheckboxChange}
        />

        <div className="flex-1"> {/* Removed ml-72 */}
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

          {/* Pagination Controls */}
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