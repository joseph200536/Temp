// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import bookData from '../data/Book.json';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { getProductReviews, getProductAverageRating } = useReviews();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Find the book using either ISBN-10, ISBN, or Uniq id
  const book = bookData.find(b => {
    const bookId = b['ISBN-10'] || b.ISBN || b['Uniq id'];
    return String(bookId) === String(id);
  });
  
  const productReviews = getProductReviews(id);
  const averageRating = getProductAverageRating(id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[rgb(182,215,204)] text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const product = {
      id: book['ISBN-10'] || book.ISBN || book['Uniq id'],
      name: book.Title.replace(/b'|'/g, ''),
      price: parseFloat(book.Price.replace('$', '')) || 0,
      image: book.Images
    };
    
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const product = {
      id: book['ISBN-10'] || book.ISBN || book['Uniq id'],
      name: book.Title.replace(/b'|'/g, ''),
      price: parseFloat(book.Price.replace('$', '')) || 0,
      image: book.Images
    };
    
    addToCart(product);
    navigate('/cart');
  };

  const categories = book.Breadcrumbs ? book.Breadcrumbs.split('|').map(c => c.trim()) : [];
  const primaryCategory = categories.length > 0 ? categories[0] : 'Uncategorized';
  const cleanTitle = book.Title.replace(/b'|'/g, '');

  const publisherMatch = book.Publisher.match(/\((\w+ \d{1,2}, \d{4})\)/);
  const publishingDate = publisherMatch ? publisherMatch[1] : 'N/A';
  const publisherName = book.Publisher.split('(')[0].trim();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Main flex container for left and right columns */}
      <div className="flex justify-center flex-col md:flex-row gap-8">
        {/* Left side - Product Image and Buttons (Fixed/Sticky on desktop) */}
        {/* `md:sticky md:top-24 md:self-start` makes this column stay in place as the page scrolls */}
        <div className="md:w-1/2 flex flex-col items-center gap-4 md:sticky md:top-24 md:self-start">
          <img
            src={book.Images}
            alt={cleanTitle}
            className="w-full h-auto max-w-sm rounded-lg shadow-lg" // Image size kept as provided
          />
          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex justify-center gap-4 mt-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className="bg-gray-500 text-white py-3 px-12 rounded-lg hover:bg-green-600 transition duration-200 whitespace-nowrap" // Button styling kept as provided
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white py-3 px-12 rounded-lg hover:bg-green-700 transition duration-200 whitespace-nowrap" // Button styling kept as provided
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Right side - Product Details and Reviews (Scrollable on desktop) */}
        {/* `md:w-1/2` column width, `md:max-h` defines max height, `overflow-y-auto` enables vertical scrolling */}
        {/* `custom-scrollbar` can be defined in your `index.css` for custom scrollbar appearance */}
        <div className="md:w-1/2 md:max-h-[calc(100vh-16rem)] md:overflow-y-auto custom-scrollbar pr-4">
          {/* Navigation Breadcrumb (Kept inside right column as per your provided code) */}
          <nav className="text-sm text-gray-500 mb-4">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to={`/shop?category=${encodeURIComponent(primaryCategory)}`} className="text-blue-600 hover:underline">
                  {primaryCategory}
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-700 font-semibold line-clamp-1">{cleanTitle}</span>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-4">{cleanTitle}</h1>
          <p className="text-2xl font-semibold text-[rgb(182,215,204)] mb-4">
            Rs.{book.Price}
          </p>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-600 leading-relaxed">{book['Raw description']}</p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Highlights</h2>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li><strong className="text-gray-800">Author:</strong> {book.Author}</li>
              <li><strong className="text-gray-800">Pages:</strong> {book.Pages || 'N/A'}</li>
              <li><strong className="text-gray-800">Category:</strong> {book.Breadcrumbs || 'N/A'}</li>
              <li><strong className="text-gray-800">Language:</strong> {book.Language}</li>
              <li><strong className="text-gray-800">Format:</strong> {book.Format}</li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Specifications</h2>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li><strong className="text-gray-800">Dimensions:</strong> {book.Dimensions || 'N/A'}</li>
              <li><strong className="text-gray-800">Weight:</strong> {book.Weight || 'N/A'}</li>
              <li><strong className="text-gray-800">Publishing Date:</strong> {publishingDate}</li>
              <li><strong className="text-gray-800">Publisher:</strong> {publisherName}</li>
            </ul>
          </div>

          {/* Rating and Reviews Summary */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.floor(averageRating) ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} out of 5</span>
            </div>
            <p className="text-gray-600">{productReviews.length} reviews</p>
          </div>

          {/* Review Section (Moved inside the scrollable right column) */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              {!showReviewForm && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Write a Review
                </button>
              )}
            </div>
            
            {showReviewForm ? (
              <div className="mb-8">
                <ReviewForm 
                  productId={id}
                  onReviewSubmitted={() => setShowReviewForm(false)}
                />
              </div>
            ) : null}
            
            <ReviewList productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;