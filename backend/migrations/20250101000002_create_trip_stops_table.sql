-- Create trip_stops table
CREATE TABLE trip_stops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    stop_order INTEGER,
    scheduled_time TIME,
    duration_minutes INTEGER,
    distance_km NUMERIC,
    geolocation_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
