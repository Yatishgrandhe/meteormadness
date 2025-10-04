'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { NEOTable } from '@/components/neo-table'
import { Filters } from '@/components/filters'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Calendar, Globe, Search } from 'lucide-react'

interface NEOObject {
  id: string
  neo_reference_id: string
  name: string
  absolute_magnitude_h: number
  estimated_diameter_avg: number
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  close_approach_data: Array<{
    close_approach_date: string
    close_approach_date_full: string
    epoch_date_close_approach: number
    relative_velocity: {
      kilometers_per_second: string
      kilometers_per_hour: string
      miles_per_hour: string
    }
    miss_distance: {
      astronomical: string
      lunar: string
      kilometers: string
      miles: string
    }
    orbiting_body: string
  }>
  impact_assessments?: Array<{
    id: string
    impact_probability: number
    kinetic_energy_megatons: number
    impact_category: string
    threat_level: string
    closest_approach_date: string
    miss_distance_km: number
    relative_velocity_km_s: number
  }>
}

interface CometData {
  id: string
  designation: string
  name?: string
  orbital_elements?: any
  discovery_date?: string
  last_updated: string
  created_at: string
}

interface FilterOptions {
  threatLevel: string[]
  hazardous: boolean | null
  minDiameter: number | null
  maxDiameter: number | null
  dateRange: {
    start: string
    end: string
  } | null
  objectType: 'all' | 'asteroids' | 'comets'
}

export default function ObjectsPage() {
  const [neoData, setNEOData] = useState<NEOObject[]>([])
  const [cometData, setCometData] = useState<CometData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    threatLevel: [],
    hazardous: null,
    minDiameter: null,
    maxDiameter: null,
    dateRange: null,
    objectType: 'all'
  })

  // Fetch NEO data
  const fetchNEOData = async () => {
    try {
      setLoading(true)
      const [neoResponse, cometResponse] = await Promise.all([
        fetch('/api/neo?limit=200'),
        fetch('/api/comets?limit=100')
      ])
      
      const neoResult = await neoResponse.json()
      const cometResult = await cometResponse.json()
      
      if (neoResult.success) {
        setNEOData(neoResult.data || [])
      } else {
        setError('Failed to fetch NEO data')
      }
      
      if (cometResult.success) {
        setCometData(cometResult.data || [])
      } else {
        console.warn('Failed to fetch comet data')
      }
      
      setError(null)
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }


  // Filter NEO data based on current filters
  const filteredNEOData = useMemo(() => {
    return neoData.filter(neo => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (!neo.name.toLowerCase().includes(searchLower) && 
            !neo.neo_reference_id.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Object type filter
      if (filters.objectType === 'comets') return false

      // Threat level filter
      if (filters.threatLevel.length > 0) {
        const neoThreatLevel = neo.impact_assessments?.[0]?.threat_level || 'low'
        if (!filters.threatLevel.includes(neoThreatLevel)) return false
      }

      // Hazardous filter
      if (filters.hazardous !== null) {
        if (neo.is_potentially_hazardous_asteroid !== filters.hazardous) return false
      }

      // Diameter filters
      if (filters.minDiameter !== null && neo.estimated_diameter_avg < filters.minDiameter) return false
      if (filters.maxDiameter !== null && neo.estimated_diameter_avg > filters.maxDiameter) return false

      // Date range filter
      if (filters.dateRange !== null) {
        const hasMatchingDate = neo.close_approach_data?.some(approach => {
          const approachDate = new Date(approach.close_approach_date)
          const startDate = new Date(filters.dateRange!.start)
          const endDate = new Date(filters.dateRange!.end)
          return approachDate >= startDate && approachDate <= endDate
        })
        if (!hasMatchingDate) return false
      }

      return true
    })
  }, [neoData, filters, searchTerm])

  // Filter comet data based on current filters
  const filteredCometData = useMemo(() => {
    return cometData.filter(comet => {
      // Object type filter
      if (filters.objectType === 'asteroids') return false

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (!comet.designation.toLowerCase().includes(searchLower) && 
            !comet.name?.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      return true
    })
  }, [cometData, filters, searchTerm])

  useEffect(() => {
    fetchNEOData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingSpinner message="Loading NEO Objects..." size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Near Earth Objects</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive database of asteroids and comets near Earth
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search objects by name or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFiltersChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
          totalCount={neoData.length + cometData.length}
          filteredCount={filteredNEOData.length + filteredCometData.length}
        />

        {/* Object Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2 justify-center">
            {['all', 'asteroids', 'comets'].map((type) => (
              <button
                key={type}
                onClick={() => setFilters(prev => ({ ...prev, objectType: type as any }))}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filters.objectType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-background/50 text-foreground hover:bg-background/70'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <Badge variant="secondary" className="ml-2">
                  {type === 'all' ? filteredNEOData.length + filteredCometData.length :
                   type === 'asteroids' ? filteredNEOData.length : filteredCometData.length}
                </Badge>
              </button>
            ))}
          </div>
        </motion.div>

        {/* NEO Objects Table */}
        {(filters.objectType === 'all' || filters.objectType === 'asteroids') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              Asteroids ({filteredNEOData.length})
            </h2>
            <NEOTable data={filteredNEOData} loading={loading} />
          </motion.section>
        )}

        {/* Comets Grid */}
        {(filters.objectType === 'all' || filters.objectType === 'comets') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              Comets ({filteredCometData.length})
            </h2>
            
            {filteredCometData.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No comets found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? `No comets match your search term "${searchTerm}"` : 'No comet data available'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCometData.map((comet, index) => (
                  <motion.div
                    key={comet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card hover:neon-glow transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          {comet.name || comet.designation}
                        </CardTitle>
                        {comet.name && (
                          <p className="text-sm text-muted-foreground">Designation: {comet.designation}</p>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">{comet.designation}</span>
                        </div>
                        
                        {comet.discovery_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span className="text-sm">
                              Discovered: {new Date(comet.discovery_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center pt-2">
                          <Badge variant="secondary" className="text-xs">
                            Updated: {new Date(comet.last_updated).toLocaleDateString()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </main>
    </div>
  )
}
