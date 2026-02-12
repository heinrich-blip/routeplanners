'use client';

import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useRouteStore } from '@/stores/routeStore';
import { BarChart3, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const { stops, customers } = useRouteStore();

  // Sample data for charts
  const stopDurationData = stops.map(stop => ({
    name: stop.name,
    duration: stop.duration_minutes || 0,
  }));

  const customerDistribution = customers.reduce((acc, customer) => {
    const stopName = stops.find(s => s.id === customer.trip_stop_id)?.name || 'Unknown';
    acc[stopName] = (acc[stopName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(customerDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const totalDistance = stops.reduce((sum, stop) => sum + (stop.distance_km || 0), 0);
  const totalDuration = stops.reduce((sum, stop) => sum + (stop.duration_minutes || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Route Planner</h1>
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <MapPin size={20} />
            Map
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white">
            <BarChart3 size={20} />
            Dashboard
          </Link>
        </nav>
      </header>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Route Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Distance</h3>
            <p className="text-3xl font-bold text-blue-600">{totalDistance.toFixed(1)} km</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Duration</h3>
            <p className="text-3xl font-bold text-green-600">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Stops</h3>
            <p className="text-3xl font-bold text-purple-600">{stops.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Stop Duration</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stopDurationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Customer Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
