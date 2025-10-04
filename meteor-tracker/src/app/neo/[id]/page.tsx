'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe, AlertTriangle, Zap, Calendar, Ruler, Target, Gauge } from 'lucide-react'
import { Header } from '@/components/header'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NEOObject {
  id: string
  neo_reference_id: string
  name: string
  nasa_jpl_url: string
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

export default function NEODetailPage() {
  const params = useParams()
  const router = useRouter()
  const [neo, setNEO] = useState<NEOObject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNEOData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/neo/${params.id}`)
        const result = await response.json()
        
        if (result.success) {
          setNEO(result.data)
        } else {
          setError('NEO object not found')
        }
      } catch (err) {
        setError('Failed to fetch NEO data')
        console.error('Error fetching NEO data:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchNEOData()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDistance = (kilometers: string) => {
    const km = parseFloat(kilometers)
    if (km >= 1000000) {
      return `${(km / 1000000).toFixed(2)} million km`
    } else if (km >= 1000) {
      return `${(km / 1000).toFixed(2)} thousand km`
    }
    return `${km.toFixed(2)} km`
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <LoadingSpinner message="Loading NEO details..." size="lg" />
      </div>
    )
  }

  if (error || !neo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">NEO Not Found</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Return to Dashboard
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const latestAssessment = neo.impact_assessments?.[0]
  const nextApproach = neo.close_approach_data?.[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">{neo.name}</h1>
          <p className="text-muted-foreground">ID: {neo.neo_reference_id}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Basic Properties */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Basic Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Absolute Magnitude</label>
                    <p className="text-lg font-semibold">{neo.absolute_magnitude_h?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Average Diameter</label>
                    <p className="text-lg font-semibold">{neo.estimated_diameter_avg?.toFixed(2) || 'N/A'} km</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {neo.is_potentially_hazardous_asteroid && (
                    <Badge variant="destructive">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Potentially Hazardous
                    </Badge>
                  )}
                  {neo.is_sentry_object && (
                    <Badge variant="secondary">Sentry Object</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Close Approach Data */}
            {nextApproach && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Next Close Approach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Date & Time</label>
                      <p className="font-semibold">{formatDate(nextApproach.close_approach_date_full)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Orbiting Body</label>
                      <p className="font-semibold">{nextApproach.orbiting_body}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Relative Velocity</label>
                      <p className="font-semibold">{parseFloat(nextApproach.relative_velocity.kilometers_per_second).toFixed(2)} km/s</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Miss Distance</label>
                      <p className="font-semibold">{formatDistance(nextApproach.miss_distance.kilometers)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Impact Assessment */}
            {latestAssessment && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Impact Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className={`${getThreatColor(latestAssessment.threat_level)} border text-lg px-4 py-2`}>
                      <Zap className="w-4 h-4 mr-2" />
                      {latestAssessment.threat_level.toUpperCase()} THREAT
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Impact Probability</label>
                      <p className="text-lg font-semibold">{(latestAssessment.impact_probability * 100).toFixed(6)}%</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Kinetic Energy</label>
                      <p className="text-lg font-semibold">{latestAssessment.kinetic_energy_megatons.toFixed(2)} megatons</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Impact Category</label>
                      <p className="text-lg font-semibold">{latestAssessment.impact_category}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Relative Velocity</label>
                      <p className="text-lg font-semibold">{latestAssessment.relative_velocity_km_s.toFixed(2)} km/s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diameter</span>
                  <span className="font-semibold">{neo.estimated_diameter_avg?.toFixed(2) || 'N/A'} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Magnitude</span>
                  <span className="font-semibold">{neo.absolute_magnitude_h?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hazardous</span>
                  <span className="font-semibold">{neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</span>
                </div>
                {nextApproach && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Approach</span>
                    <span className="font-semibold text-sm">{formatDate(nextApproach.close_approach_date)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>External Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {neo.nasa_jpl_url && (
                  <a
                    href={neo.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                  >
                    View on NASA JPL
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
