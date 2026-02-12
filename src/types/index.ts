export interface Route {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Geolocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface TripStop {
  id: string;
  route_id: string;
  name: string;
  stop_order: number;
  scheduled_time?: string;
  duration_minutes?: number;
  distance_km?: number;
  geolocation_id?: string;
  geolocation?: Geolocation;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  trip_stop_id: string;
  is_group_rep: boolean;
  group_members?: string[];
  created_at: string;
  updated_at: string;
}

export interface Variant {
  id: string;
  trip_stop_id: string;
  variant_name: string;
  start_time?: string;
  end_time?: string;
  created_at: string;
  updated_at: string;
}

export interface TripInstance {
  id: string;
  route_id: string;
  instance_date?: string;
  is_return_trip: boolean;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  trip_instance_id: string;
  report_type: string;
  report_data: any;
  created_at: string;
  updated_at: string;
}
