-- Create customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
    is_group_rep BOOLEAN DEFAULT FALSE,
    group_members JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
