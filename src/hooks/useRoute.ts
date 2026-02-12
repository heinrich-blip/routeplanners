import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Route, TripStop, Customer, Variant, TripInstance, Report } from '@/types';

export function useRoutes() {
  return useQuery({
    queryKey: ['routes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('routes')
        .select('*');
      if (error) throw error;
      return data as Route[];
    },
  });
}

export function useTripStops(routeId?: string) {
  return useQuery({
    queryKey: ['trip_stops', routeId],
    queryFn: async () => {
      let query = supabase
        .from('trip_stops')
        .select(`
          *,
          geolocation:geolocations(*)
        `);
      if (routeId) {
        query = query.eq('route_id', routeId);
      }
      const { data, error } = await query.order('stop_order');
      if (error) throw error;
      return data as (TripStop & { geolocation?: any })[];
    },
    enabled: !!routeId,
  });
}

export function useCustomers(stopId?: string) {
  return useQuery({
    queryKey: ['customers', stopId],
    queryFn: async () => {
      let query = supabase.from('customers').select('*');
      if (stopId) {
        query = query.eq('trip_stop_id', stopId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Customer[];
    },
  });
}

export function useVariants(stopId?: string) {
  return useQuery({
    queryKey: ['variants', stopId],
    queryFn: async () => {
      let query = supabase.from('variants').select('*');
      if (stopId) {
        query = query.eq('trip_stop_id', stopId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Variant[];
    },
  });
}

export function useTripInstances(routeId?: string) {
  return useQuery({
    queryKey: ['trip_instances', routeId],
    queryFn: async () => {
      let query = supabase.from('trip_instances').select('*');
      if (routeId) {
        query = query.eq('route_id', routeId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as TripInstance[];
    },
  });
}

export function useReports(instanceId?: string) {
  return useQuery({
    queryKey: ['reports', instanceId],
    queryFn: async () => {
      let query = supabase.from('reports').select('*');
      if (instanceId) {
        query = query.eq('trip_instance_id', instanceId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Report[];
    },
  });
}
