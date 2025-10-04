# Meteor Tracker

A comprehensive Next.js application for tracking near-Earth objects (NEOs), meteors, and asteroids with real-time impact assessment and threat analysis.

## Features

- 🌍 **Real-time NEO Tracking**: Fetch and display near-Earth objects from NASA's API
- 🎯 **Impact Assessment**: Calculate potential impact energy and threat levels
- 📊 **Data Visualization**: Interactive charts and graphs for impact analysis
- 🔍 **Advanced Filtering**: Filter objects by threat level, size, date, and more
- 🚀 **Supabase Integration**: Store and manage NEO data with real-time updates
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Performance Optimized**: Built with Next.js 14, Tailwind CSS, and Framer Motion

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- NASA API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meteor-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NASA API
NASA_API_KEY=your_nasa_api_key
NEAR_EARTH_COMETS_URL=your_comets_api_url
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/neo` - Fetch NEO objects with optional filters
- `POST /api/sync-neo` - Sync data from NASA APIs
- `GET /api/comets` - Fetch comet data

## Database Schema

The application uses the following main tables:

- `neo_objects` - Store NEO data from NASA API
- `impact_assessments` - Calculate and store impact assessments
- `comet_data` - Store comet orbital elements
- `user_preferences` - User-specific settings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NASA_API_KEY`
- `NEAR_EARTH_COMETS_URL`

## Usage

1. **Dashboard**: View overview statistics and recent NEO activity
2. **Sync Data**: Click "Sync Data" to fetch latest information from NASA APIs
3. **Filter Objects**: Use the filter panel to find specific objects
4. **View Details**: Click on any NEO card to see detailed information
5. **Impact Analysis**: Review impact assessments and threat levels

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NASA for providing the NEO Web Service API
- Supabase for the backend infrastructure
- The open-source community for the amazing tools and libraries

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Note**: This application is for educational and informational purposes. Always refer to official NASA sources for critical space weather information.