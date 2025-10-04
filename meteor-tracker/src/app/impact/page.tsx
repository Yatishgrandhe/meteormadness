'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { ImpactVisualizer } from '@/components/impact-visualizer'
import { AIImpactAnalysis } from '@/components/ai-impact-analysis'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, AlertTriangle, BarChart3, TrendingUp, Zap, Globe } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

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

export default function ImpactAnalysisPage() {
  const [neoData, setNEOData] = useState<NEOObject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch NEO data
  const fetchNEOData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/neo?limit=200')
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


  // Calculate impact statistics
  const impactStats = useMemo(() => {
    const totalObjects = neoData.length
    const objectsWithAssessments = neoData.filter(neo => neo.impact_assessments && neo.impact_assessments.length > 0)
    
    const threatLevels = {
      low: 0,
      medium: 0,
      high: 0
    }
    
    const impactCategories: Record<string, number> = {}
    const energyDistribution: Array<{ name: string; energy: number; threat: string }> = []
    
    objectsWithAssessments.forEach(neo => {
      neo.impact_assessments?.forEach(assessment => {
        threatLevels[assessment.threat_level as keyof typeof threatLevels]++
        
        if (!impactCategories[assessment.impact_category]) {
          impactCategories[assessment.impact_category] = 0
        }
        impactCategories[assessment.impact_category]++
        
        energyDistribution.push({
          name: neo.name,
          energy: assessment.kinetic_energy_megatons,
          threat: assessment.threat_level
        })
      })
    })

    return {
      totalObjects,
      objectsWithAssessments: objectsWithAssessments.length,
      threatLevels,
      impactCategories,
      energyDistribution: energyDistribution.sort((a, b) => b.energy - a.energy).slice(0, 10)
    }
  }, [neoData])

  // Get impact data for visualization
  const impactData = useMemo(() => {
    return neoData.flatMap(neo => 
      neo.impact_assessments?.map(assessment => ({
        threat_level: assessment.threat_level as 'low' | 'medium' | 'high',
        impact_category: assessment.impact_category,
        kinetic_energy_megatons: assessment.kinetic_energy_megatons,
        miss_distance_km: assessment.miss_distance_km,
        closest_approach_date: assessment.closest_approach_date
      })) || []
    )
  }, [neoData])

  // Chart data for threat levels
  const threatLevelData = Object.entries(impactStats.threatLevels).map(([level, count]) => ({
    name: level.toUpperCase(),
    value: count,
    color: level === 'high' ? '#ef4444' : level === 'medium' ? '#f59e0b' : '#10b981'
  }))

  useEffect(() => {
    fetchNEOData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingSpinner message="Loading Impact Analysis..." size="lg" />
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Impact Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis of potential impact threats and risk assessment
          </p>
        </motion.div>

        {/* Summary Stats */}
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
                  <p className="text-2xl font-bold text-blue-700">{impactStats.totalObjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">With Assessments</p>
                  <p className="text-2xl font-bold text-purple-700">{impactStats.objectsWithAssessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-red-600 font-medium">High Threat</p>
                  <p className="text-2xl font-bold text-red-700">{impactStats.threatLevels.high}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card neon-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600 font-medium">Assessment Rate</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {((impactStats.objectsWithAssessments / impactStats.totalObjects) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Threat Level Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Threat Level Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={threatLevelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {threatLevelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Energy Objects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Top Energy Objects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={impactStats.energyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="energy" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Impact Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Impact Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(impactStats.impactCategories).map(([category, count]) => (
                  <div key={category} className="text-center p-4 bg-background/20 rounded-lg">
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Impact Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <AIImpactAnalysis neoData={neoData} />
        </motion.section>

        {/* Detailed Impact Visualization */}
        {impactData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Detailed Impact Analysis</h2>
            </div>
            <ImpactVisualizer data={impactData} />
          </motion.section>
        )}
      </main>
    </div>
  )
}
