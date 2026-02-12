import { create } from 'zustand';
import type { Route, TripStop, Customer, Variant } from '@/types';

interface RouteState {
  route: Route | null;
  stops: TripStop[];
  customers: Customer[];
  variants: Variant[];
  selectedStop: TripStop | null;
  isLoading: boolean;
  error: string | null;

  setRoute: (route: Route) => void;
  setStops: (stops: TripStop[]) => void;
  setCustomers: (customers: Customer[]) => void;
  setVariants: (variants: Variant[]) => void;
  setSelectedStop: (stop: TripStop | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  route: null,
  stops: [],
  customers: [],
  variants: [],
  selectedStop: null,
  isLoading: false,
  error: null,

  setRoute: (route) => set({ route }),
  setStops: (stops) => set({ stops }),
  setCustomers: (customers) => set({ customers }),
  setVariants: (variants) => set({ variants }),
  setSelectedStop: (selectedStop) => set({ selectedStop }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
