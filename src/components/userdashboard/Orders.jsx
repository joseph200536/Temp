import React from 'react';
import { Package, MapPin, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = ({ orders }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order content */}
        </div>
      ))}
    </div>
  );
};

export default Orders;