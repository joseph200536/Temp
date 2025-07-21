import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import books from '../data/Book.json';

const Home = () => {
  // Select first 4 books for featured section
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src="/assets/videos/ecommerce-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Top gradient to match navbar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[rgb(182,215,204)] via-[rgba(182,215,204,0.3)] to-transparent"></div>
          
          {/* Bottom gradient for better transition */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative py-48 text-right">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-raleway">
                Welcome to <span className="text-green-400">ShopVerse</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 font-raleway">
                Discover amazing products with unbeatable prices and exceptional quality. 
                Your one-stop destination for everything you need.
              </p>
              <Link
                to="/shop"
                className="underline bg-green-600 inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors font-raleway tracking-wide"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
              <p className="text-gray-600">Products</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
              <p className="text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">99%</h3>
              <p className="text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-raleway">Featured Books</h2>
            <p className="text-gray-600 font-raleway">Discover our most popular books</p>
          </div><Link
              to="/shop"
              >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div key={book['ISBN-10']} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={book.Images}
                  alt={book.Title}
                  className="w-full h-48 object-contain p-2"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.Title.replace(/^b'|'$/g, '')}</h3>
                  <p className="text-gray-600 text-sm mb-4">{book.Author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${book.Price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Link>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
        </div>

      </section>
      


      {/* Newsletter */}
      <section className="py-16 bg-gray-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter and get exclusive deals and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;