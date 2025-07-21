import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Package, Search, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const TrackOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('tracking') || '');
  const [orderFound, setOrderFound] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  // Mock tracking data - in a real app, this would come from an API
  const mockTrackingData = {
    'TRK123456789': {
      orderId: 'ORD-2024-001',
      date: '2024-05-15',
      status: 'In Transit',
      carrier: 'FedEx',
      estimatedDelivery: '2024-05-18',
      items: [
        { name: 'Less Than Zero', quantity: 1, price: 5.99 },
        { name: 'Women and Autoimmune Disease', quantity: 2, price: 16.99 },
        { name: 'In The Garden Of The North American Martyrs', quantity: 1, price: 13.95 },
        { name: "Amelia Bedelia's Family Album", quantity: 3, price: 4.99 }
      ],
      updates: [
        { date: '2024-05-16 09:30', status: 'Package picked up', location: 'Sorting Facility' },
        { date: '2024-05-16 14:45', status: 'In transit', location: 'Distribution Center' },
        { date: '2024-05-17 08:15', status: 'Out for delivery', location: 'Local Carrier Facility' }
      ]
    },
    'TRK987654321': {
      orderId: 'ORD-2024-002',
      date: '2024-05-10',
      status: 'Processing',
      carrier: 'UPS',
      estimatedDelivery: '2024-05-20',
      items: [
        { name: 'Truesight', quantity: 1, price: 10.99 },
        { name: 'Living On Luck', quantity: 1, price: 18.99 },
        { name: "Molly Moon's Incredible Book of Hypnotism", quantity: 1, price: 7.99 }
      ],
      updates: [
        { date: '2024-05-10 16:20', status: 'Order received', location: 'Online Store' },
        { date: '2024-05-11 10:35', status: 'Processing', location: 'Warehouse' }
      ]
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setError('');
    
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    // Check if tracking number exists in our mock data
    if (mockTrackingData[trackingNumber]) {
      setOrderDetails(mockTrackingData[trackingNumber]);
      setOrderFound(true);
    } else {
      setError('No order found with this tracking number. Please check and try again.');
      setOrderFound(false);
      setOrderDetails(null);
    }
  };

  useEffect(() => {
    if (trackingNumber) {
      handleTrack(new Event('submit'));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your tracking number
              </label>
              <input
                type="text"
                id="tracking-number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. TRK123456789"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(182,215,204)]"
              />
            </div>
            <button
              type="submit"
              className="bg-[rgb(182,215,204)] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center md:self-end"
            >
              <Search className="mr-2 h-5 w-5" />
              Track Order
            </button>
          </form>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              {error}
            </div>
          )}
        </div>
        
        {orderFound && orderDetails && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{orderDetails.orderId}</h2>
                  <p className="text-sm text-gray-600">Placed on {orderDetails.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    orderDetails.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    orderDetails.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {orderDetails.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="text-gray-800">{trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carrier:</span>
                  <span className="text-gray-800">{orderDetails.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="text-gray-800">{orderDetails.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    orderDetails.status === 'Delivered' ? 'text-green-600' :
                    orderDetails.status === 'In Transit' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>{orderDetails.status}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-800">{item.name}</span>
                      <span className="text-gray-500 mx-2">×</span>
                      <span className="text-gray-800">{item.quantity}</span>
                    </div>
                    <span className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Updates</h3>
              <div className="space-y-4">
                {orderDetails.updates.map((update, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 relative">
                      <div className="h-full w-0.5 bg-gray-200 absolute left-2.5 top-6"></div>
                      <div className="w-5 h-5 rounded-full bg-[rgb(182,215,204)] flex items-center justify-center">
                        {index === 0 ? <Clock className="h-3 w-3 text-white" /> : 
                         index === orderDetails.updates.length - 1 ? <Truck className="h-3 w-3 text-white" /> :
                         <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-semibold text-gray-900">{update.status}</p>
                      <p className="text-xs text-gray-600">{update.date} • {update.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;