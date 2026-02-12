-- Enable RLS on all tables
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE geolocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
-- Routes
CREATE POLICY "Users can view their own routes" ON routes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own routes" ON routes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own routes" ON routes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own routes" ON routes FOR DELETE USING (auth.uid() = user_id);

-- Trip stops (inherit from route)
CREATE POLICY "Users can view trip stops for their routes" ON trip_stops FOR SELECT USING (EXISTS (SELECT 1 FROM routes WHERE routes.id = trip_stops.route_id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can insert trip stops for their routes" ON trip_stops FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM routes WHERE routes.id = trip_stops.route_id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can update trip stops for their routes" ON trip_stops FOR UPDATE USING (EXISTS (SELECT 1 FROM routes WHERE routes.id = trip_stops.route_id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can delete trip stops for their routes" ON trip_stops FOR DELETE USING (EXISTS (SELECT 1 FROM routes WHERE routes.id = trip_stops.route_id AND routes.user_id = auth.uid()));

-- Customers
CREATE POLICY "Users can view customers for their routes" ON customers FOR SELECT USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE customers.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can insert customers for their routes" ON customers FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE customers.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can update customers for their routes" ON customers FOR UPDATE USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE customers.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can delete customers for their routes" ON customers FOR DELETE USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE customers.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));

-- Variants
CREATE POLICY "Users can view variants for their routes" ON variants FOR SELECT USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE variants.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can insert variants for their routes" ON variants FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE variants.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can update variants for their routes" ON variants FOR UPDATE USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE variants.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));
CREATE POLICY "Users can delete variants for their routes" ON variants FOR DELETE USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE variants.trip_stop_id = trip_stops.id AND routes.user_id = auth.uid()));

-- Trip instances
CREATE POLICY "Users can view their trip instances" ON trip_instances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their trip instances" ON trip_instances FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their trip instances" ON trip_instances FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their trip instances" ON trip_instances FOR DELETE USING (auth.uid() = user_id);

-- Geolocations - allow all for now, or tie to routes
CREATE POLICY "Users can view geolocations for their routes" ON geolocations FOR SELECT USING (EXISTS (SELECT 1 FROM trip_stops JOIN routes ON trip_stops.route_id = routes.id WHERE trip_stops.geolocation_id = geolocations.id AND routes.user_id = auth.uid()));

-- Reports
CREATE POLICY "Users can view their reports" ON reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their reports" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their reports" ON reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their reports" ON reports FOR DELETE USING (auth.uid() = user_id);
