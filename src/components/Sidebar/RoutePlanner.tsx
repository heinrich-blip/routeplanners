'use client';

import { useState } from 'react';
import { Search, Plus, Moon, Sun, Menu } from 'lucide-react';
import { useRouteStore } from '@/stores/routeStore';
import { useUIStore } from '@/stores/uiStore';
import type { TripStop } from '@/types';

export function RoutePlanner() {
  const [searchTerm, setSearchTerm] = useState('');
  const { stops, selectedStop, setSelectedStop } = useRouteStore();
  const { darkMode, toggleDarkMode, setSidebarOpen } = useUIStore();

  const filteredStops = stops.filter(stop =>
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStopClick = (stop: TripStop) => {
    setSelectedStop(stop);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Route Planner</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search stops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {filteredStops.map((stop) => (
            <div
              key={stop.id}
              onClick={() => handleStopClick(stop)}
              className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                selectedStop?.id === stop.id
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              <div className="font-medium">{stop.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stop.scheduled_time && `Time: ${stop.scheduled_time}`}
                {stop.distance_km && ` • ${stop.distance_km} km`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
        <Plus size={20} />
        Add Stop
      </button>
    </div>
  );
}
