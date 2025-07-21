import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaStore,
  FaFileAlt,
  FaUserCheck,
  FaBoxOpen,
  FaClipboardList,
  FaChartLine,
  FaSignOutAlt,
  FaBlog,
  FaPhone
} from 'react-icons/fa';

import DashboardOverview from '../components/admin/DashboardOverview';
import UserAnalytics from '../components/admin/userAnalytics';
import SellerAnalytics from '../components/admin/SellerAnalytics';
import SellerRequest from '../components/admin/SellerRequest';
import SystemLogs from '../components/admin/SystemLogs';
import BlogManagement from '../components/admin/BlogManagement';
import ContactManagement from '../components/admin/ContactManagement';



const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboardOverView');

  React.useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

const renderContent = () => {
  switch (activeTab) {
    case 'dashboardOverView':
      return <DashboardOverview />;
    case 'userAnalytics':
      return <UserAnalytics />;
    case 'sellerAnalytics':
      return <SellerAnalytics />;
    case 'logs':
      return <SystemLogs />;
    case 'sellerRequests':
      return <SellerRequest />;
    case 'blogManagement':
      return <BlogManagement />;
    case 'contactManagement':
      return <ContactManagement />;
    default:
      return <p>Select an option from the sidebar.</p>;
  }
};



const menuItems = [
  { key: 'dashboardOverView', label: 'Dashboard Overview', icon: <FaChartLine /> },
  { key: 'userAnalytics', label: 'User Analytics', icon: <FaUser /> },
  { key: 'sellerAnalytics', label: 'Seller Analytics', icon: <FaStore /> },
  { key: 'blogManagement', label: 'Blog Management', icon: <FaBlog /> },
  { key: 'contactManagement', label: 'Contact Management', icon: <FaPhone /> },
  { key: 'logs', label: 'System Logs', icon: <FaFileAlt /> },
  { key: 'sellerRequests', label: 'Seller Requests', icon: <FaUserCheck /> }
];


  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

    return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.key
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};


export default AdminDashboard;