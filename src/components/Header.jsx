import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Shield, Store, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlistItems.length;
  // console.log(user.name);
  const handleAuthClick = () => {
    if (isAuthenticated) {
      if (user.name === 'Admin User') {
        navigate('/admin');
      } else if (user.name === 'Seller User') {
        navigate('/seller');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-[rgb(182,215,204)] sticky top-0 z-50 font-raleway5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
            <Store className="h-8 w-8" />
            <span>ShopVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">
              Shop
            </Link>
            <Link to="/track-order" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">
              Track Order
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium tracking-wide">
              Contact
            </Link>
          </nav>
      <div className="flex items-center space-x-4">
          {isAuthenticated && user.name === 'User' ? (
            <div className="flex items-center space-x-4">
              <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Heart className="h-6 w-6" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          ) : null}
        
        <div>
          <button
            onClick={handleAuthClick}
            className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
          >
            {isAuthenticated ? (
              <>
                {user.name === 'Admin User' ? (
                  <Shield className="h-6 w-6" />
                ) : user.role === 'Seller User' ? (
                  <Store className="h-6 w-6" />
                ) : (
                  <>
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </>
                )}
              </>
            ) : (
              <User className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/track-order"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;