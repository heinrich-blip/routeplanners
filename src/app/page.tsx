'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { RoutePlanner } from '@/components/Sidebar/RoutePlanner';
import { useUIStore } from '@/stores/uiStore';
import { useRouteStore } from '@/stores/routeStore';
import { useRoutes, useTripStops, useCustomers, useVariants } from '@/hooks/useRoute';
import { BarChart3, MapPin } from 'lucide-react';
import { useAuth } from '@/components/Providers';
import { SignIn, SignOutButton } from '@/components/Auth/SignIn';

const Map = dynamic(() => import('@/components/Map/Map').then(mod => ({ default: mod.Map })), { ssr: false });

export default function Home() {
  const { sidebarOpen } = useUIStore();
  const { setRoute, setStops, setCustomers, setVariants } = useRouteStore();
  const { user, loading } = useAuth();

  const { data: routes } = useRoutes();
  const routeId = routes?.[0]?.id;
  const { data: stops } = useTripStops(routeId);
  const { data: customers } = useCustomers();
  const { data: variants } = useVariants();

  useEffect(() => {
    if (routes?.[0]) {
      setRoute(routes[0]);
    }
  }, [routes, setRoute]);

  useEffect(() => {
    if (stops) {
      setStops(stops);
    }
  }, [stops, setStops]);

  useEffect(() => {
    if (customers) {
      setCustomers(customers);
    }
  }, [customers, setCustomers]);

  useEffect(() => {
    if (variants) {
      setVariants(variants);
    }
  }, [variants, setVariants]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <SignIn />;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Route Planner</h1>
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white">
            <MapPin size={20} />
            Map
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <BarChart3 size={20} />
            Dashboard
          </Link>
          <SignOutButton />
        </nav>
      </header>
      <div className="flex flex-1">
        {sidebarOpen && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <RoutePlanner />
          </div>
        )}
        <div className="flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}
