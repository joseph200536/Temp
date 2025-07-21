import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/userdashboard/Sidebar';
import Profile from '../components/userdashboard/Profile';
import Orders from '../components/userdashboard/Orders';

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '(555) 123-4567',
    address: user?.address || '123 Main St, Anytown, AT 12345',
  });

  // Mock data for orders
  const orders = [/* ... your orders data ... */];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-50 flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout}
        />
        <div className="flex-1 p-8">
          {activeTab === 'orders' && <Orders orders={orders} />}
          {activeTab === 'profile' && (
            <Profile 
              user={user}
              profileData={profileData}
              setProfileData={setProfileData}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;