'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { Header } from '@/components/header'
import { ImpactVisualizer } from '@/components/impact-visualizer'
import { AIImpactAnalysis } from '@/components/ai-impact-analysis'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Globe, Zap, TrendingUp } from 'lucide-react'

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

export default function HomePage() {
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
        const hasMatchingThreat = neo.impact_assessments?.some(assessment => 
          filters.threatLevel.includes(assessment.threat_level)
        )
        if (!hasMatchingThreat) return false
      }

      // Hazardous filter
      if (filters.hazardous !== null) {
        if (neo.is_potentially_hazardous_asteroid !== filters.hazardous) return false
      }

      // Diameter filters
      if (filters.minDiameter !== null && neo.estimated_diameter_avg < filters.minDiameter) {
        return false
      }
      if (filters.maxDiameter !== null && neo.estimated_diameter_avg > filters.maxDiameter) {
        return false
      }

      // Date range filter
      if (filters.dateRange?.start || filters.dateRange?.end) {
        const hasMatchingDate = neo.impact_assessments?.some(assessment => {
          const approachDate = new Date(assessment.closest_approach_date)
          const startDate = filters.dateRange?.start ? new Date(filters.dateRange.start) : null
          const endDate = filters.dateRange?.end ? new Date(filters.dateRange.end) : null
          
          if (startDate && approachDate < startDate) return false
          if (endDate && approachDate > endDate) return false
          return true
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LoadingSpinner message="Loading Near-Earth Objects..." size="lg" />
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
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
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

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
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

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
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
            id="impact"
            className="mb-12"
          >
            <ImpactVisualizer data={impactData} />
          </motion.section>
        )}

        {/* AI Impact Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <AIImpactAnalysis neoData={neoData} />
        </motion.section>
      </main>
    </div>
  )
}