-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create geolocations table
CREATE TABLE geolocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    geography_point GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add FK to trip_stops
ALTER TABLE trip_stops ADD CONSTRAINT fk_trip_stops_geolocation FOREIGN KEY (geolocation_id) REFERENCES geolocations(id) ON DELETE CASCADE;
