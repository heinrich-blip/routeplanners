-- Create reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_instance_id UUID NOT NULL REFERENCES trip_instances(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    report_data JSONB,
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
