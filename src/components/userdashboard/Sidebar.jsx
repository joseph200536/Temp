import React from 'react';
import { ShoppingBag, Package, User, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 space-y-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === 'orders' ? 'bg-[rgb(182,215,204)] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <Package className="h-5 w-5" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === 'profile' ? 'bg-[rgb(182,215,204)] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center space-x-2 w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;