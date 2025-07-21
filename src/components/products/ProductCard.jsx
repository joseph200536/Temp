import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ book, isInWishlist, handleWishlistToggle, handleAddToCart }) => {
  const id = book['ISBN-10'] || book.ISBN || book['Uniq id']; // Use a more robust ID
  const imageUrl = book.Images || 'https://via.placeholder.com/150'; // Fallback to a placeholder image

  return (
    <Link to={`/product/${id}`} className="block h-full"> {/* Ensure the whole card is clickable */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative">
          <img
            src={imageUrl} // Using the imageUrl with fallback
            alt={book.Title}
            className="w-full h-64 object-contain p-4" // Changed to h-64 and object-contain with some padding
          />
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating when clicking wishlist
              handleWishlistToggle(book);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isInWishlist(id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow"> {/* Use flex-col and flex-grow for content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2"> {/* Limit title to 2 lines */}
            {book.Title.replace(/b'|'/g, '')} {/* Remove 'b'' from title if present */}
          </h3>
          <p className="text-gray-600 text-sm mb-1 line-clamp-1">Author: {book.Author}</p>
          <p className="text-gray-600 text-sm mb-1 line-clamp-1">Format: {book.Format}</p>
          <p className="text-gray-600 text-sm mb-1 line-clamp-1">Language: {book.Language}</p>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">Publisher: {book.Publisher}</p>
          <div className="flex items-center justify-between mt-auto"> {/* Push price and button to bottom */}
            <span className="text-xl font-bold text-gray-900">₹{parseFloat(book.Price.replace('$', '')).toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigating when clicking add to cart
                handleAddToCart(book);
              }}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-green-600 transition-colors transition-transform hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;