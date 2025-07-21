import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderSummary from './pages/OrderSummary';
import Wishlist from './pages/Wishlist';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import SellerDashboard from './pages/SellerDashboard';
import UserDashboard from './pages/UserDashboard';
import TrackOrder from './pages/TrackOrder';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ReviewProvider } from './context/ReviewContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ReviewProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/shop" element={<Layout><Shop /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Layout><Cart /></Layout>
                  </ProtectedRoute>
                } />
                <Route path="/payment" element={
                  <ProtectedRoute>
                    <Layout><Payment /></Layout>
                  </ProtectedRoute>
                } />
                <Route path="/order-summary" element={
                  <ProtectedRoute>
                    <Layout><OrderSummary /></Layout>
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/seller" element={<SellerDashboard />} />
                <Route path="/user-dashboard" element={
                  
                    <UserDashboard />
                  
                } />
                
              </Routes>
            </Router>
          </ReviewProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
