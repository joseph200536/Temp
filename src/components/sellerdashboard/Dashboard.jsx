import React from 'react'
import {
    ShoppingBag,
    Users,
    TrendingUp,
    Package,
    Plus,
    Edit,
    Trash2,
    LogOut,
    BarChart3
} from 'lucide-react';

const stats = [
    {
        name: 'Total Sales',
        value: '$12,345',
        change: '+12%',
        icon: TrendingUp,
        color: 'bg-green-100 text-green-600'
    },
    {
        name: 'Orders',
        value: '234',
        change: '+8%',
        icon: ShoppingBag,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        name: 'Products',
        value: '1,234',
        change: '+3%',
        icon: Package,
        color: 'bg-yellow-100 text-yellow-600'
    }
];
function Dashboard() {
    return (
        <div>
            <div className='p-6'>
                <h1 className='text-xl font-bold text-gray-900'>Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-green-600">{stat.change} from last month</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
