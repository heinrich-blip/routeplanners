-- Create variants table
CREATE TABLE variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
    variant_name TEXT NOT NULL,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
