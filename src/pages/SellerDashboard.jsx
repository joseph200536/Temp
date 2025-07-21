import { React, useState } from 'react'
import {
  ShoppingBag, Users, User, LogOut, BarChart3, Package,
  Plus, TrendingUp,
  Edit,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sellerdashboard/Sidebar';
import SellerProfile from '../components/sellerdashboard/SellerProfile';
import Dashboard from '../components/sellerdashboard/Dashboard';
import ReportAnalysis from '../components/sellerdashboard/ReportAnalysis';
import BookManagement from '../components/sellerdashboard/BookManagement';
function SellerDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <SellerProfile />}
        {activeTab === 'report' && <ReportAnalysis />}
        {activeTab === 'bookManagement' && <BookManagement />}
      </div>
    </div>
  )
}

export default SellerDashboard