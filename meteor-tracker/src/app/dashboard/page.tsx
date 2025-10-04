'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { Header } from '@/components/header'
import { NEOTable } from '@/components/neo-table'
import { Filters } from '@/components/filters'
import { ImpactVisualizer } from '@/components/impact-visualizer'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Globe, Zap, TrendingUp, BarChart3, Target } from 'lucide-react'

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

interface FilterOptions {
  threatLevel: string[]
  hazardous: boolean | null
  minDiameter: number | null
  maxDiameter: number | null
  dateRange: {
    start: string
    end: string
  } | null
}

export default function DashboardPage() {
  const [neoData, setNEOData] = useState<NEOObject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    threatLevel: [],
    hazardous: null,
    minDiameter: null,
    maxDiameter: null,
    dateRange: null
  })

  // Fetch NEO data
  const fetchNEOData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/neo?limit=100')
      const result = await response.json()
      
      if (result.success) {
        setNEOData(result.data || [])
        setError(null)
      } else {
        setError('Failed to fetch NEO data')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching NEO data:', err)
    } finally {
      setLoading(false)
    }
  }


  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return neoData.filter(neo => {
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
  }, [neoData, filters])

  // Get impact data for visualization
  const impactData = useMemo(() => {
    return filteredData.flatMap(neo => 
      neo.impact_assessments?.map(assessment => ({
        threat_level: assessment.threat_level as 'low' | 'medium' | 'high',
        impact_category: assessment.impact_category,
        kinetic_energy_megatons: assessment.kinetic_energy_megatons,
        miss_distance_km: assessment.miss_distance_km,
        closest_approach_date: assessment.closest_approach_date
      })) || []
    )
  }, [filteredData])

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = neoData.length
    const hazardous = neoData.filter(neo => neo.is_potentially_hazardous_asteroid).length
    const highThreat = neoData.filter(neo => 
      neo.impact_assessments?.some(a => a.threat_level === 'high')
    ).length
    const avgDiameter = neoData.reduce((sum, neo) => sum + (neo.estimated_diameter_avg || 0), 0) / total || 0

    return { total, hazardous, highThreat, avgDiameter }
  }, [neoData])

  useEffect(() => {
    fetchNEOData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingSpinner message="Loading Dashboard..." size="lg" />
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Meteor Tracker Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor near-Earth objects and track potential impact threats
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Objects</p>
                  <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-red-600 font-medium">Hazardous</p>
                  <p className="text-2xl font-bold text-red-700">{stats.hazardous}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">High Threat</p>
                  <p className="text-2xl font-bold text-orange-700">{stats.highThreat}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg Diameter</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {stats.avgDiameter.toFixed(2)} km
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Visualization */}
        {impactData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Impact Analysis</h2>
            </div>
            <ImpactVisualizer data={impactData} />
          </motion.section>
        )}

        {/* Quick Actions Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/objects" 
                  className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-center transition-colors"
                >
                  <Globe className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="font-medium">View All Objects</p>
                  <p className="text-sm text-muted-foreground">Browse NEOs & Comets</p>
                </a>
                <a 
                  href="/impact" 
                  className="p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-center transition-colors"
                >
                  <Target className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <p className="font-medium">Impact Analysis</p>
                  <p className="text-sm text-muted-foreground">Risk Assessment</p>
                </a>
                <a 
                  href="/objects?objectType=asteroids" 
                  className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-center transition-colors"
                >
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="font-medium">Hazardous Objects</p>
                  <p className="text-sm text-muted-foreground">{stats.hazardous} identified</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Database updated with latest NEO data</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm">3 new potentially hazardous objects identified</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Impact assessment completed for 15 objects</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
