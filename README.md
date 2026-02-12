# Route Planner

A full-stack route planning application with interactive maps, analytics dashboard, and Supabase backend.

## Features

- Interactive Leaflet map with route visualization
- Stop management with drag-and-drop reordering
- Customer tracking per stop
- Route analytics and reporting dashboard
- Dark mode support
- Responsive design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL with PostGIS)
- **Map**: Leaflet.js
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Forms**: React Hook Form

## Setup

### Prerequisites

- Node.js 18+
- Supabase account

### Backend Setup

1. Create a new Supabase project
2. Run the migration files in `backend/migrations/` in order:
   - 20250101000001_create_routes_table.sql
   - 20250101000002_create_trip_stops_table.sql
   - 20250101000003_create_customers_table.sql
   - 20250101000004_create_variants_table.sql
   - 20250101000005_create_trip_instances_table.sql
   - 20250101000006_create_geolocations_table.sql
   - 20250101000007_create_reports_table.sql
   - 20250101000008_enable_rls_and_policies.sql
   - 20250101000009_seed_initial_data.sql

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel + Supabase

1. Deploy to Vercel
2. Configure environment variables in Vercel dashboard
3. Update Supabase CORS settings for your Vercel domain

## Project Structure

```
├── backend/migrations/     # Supabase migration files
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and configurations
│   ├── stores/           # Zustand state stores
│   └── types/            # TypeScript type definitions
├── .env.local            # Environment variables
└── README.md
```

## Database Schema

- `routes`: Main route definitions
- `trip_stops`: Stops along routes with coordinates
- `customers`: Customers assigned to stops
- `variants`: Time variants for stops
- `trip_instances`: Specific trip executions
- `geolocations`: Geographic coordinates
- `reports`: Analytics and reporting data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
