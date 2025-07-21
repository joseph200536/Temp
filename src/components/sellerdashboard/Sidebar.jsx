import { React, useState } from 'react'
import {
    ShoppingBag, Users, User, LogOut, BarChart3, Package, Plus, TrendingUp, Edit
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Sidebar({ activeTab, setActiveTab }) {
    const { user, logout, isAuthenticated } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div>
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome, </p>
                </div>
                <nav className="mt-6">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                            }`}
                    >
                        <BarChart3 className="h-5 w-5 mr-3" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'products' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                            }`}
                    >
                        <User className="h-5 w-5 mr-3" />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('bookManagement')}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                            }`}
                    >
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        Product Management
                    </button>
                    <button
                        onClick={() => setActiveTab('report')}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${activeTab === 'customers' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                            }`}
                    >
                        <Users className="h-5 w-5 mr-3" />
                        Report analysis
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
