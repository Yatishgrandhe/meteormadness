'use client'

import { motion, Variants } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AlertTriangle, Zap, Globe, TrendingUp } from 'lucide-react'

interface ImpactData {
  threat_level: 'low' | 'medium' | 'high'
  impact_category: string
  kinetic_energy_megatons: number
  miss_distance_km: number
  closest_approach_date: string
}

interface ImpactVisualizerProps {
  data: ImpactData[]
}

const COLORS = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444'
}

const CATEGORY_COLORS = {
  'Minimal': '#6b7280',
  'Small': '#10b981',
  'Moderate': '#f59e0b',
  'Large': '#f97316',
  'Major': '#dc2626',
  'Catastrophic': '#7c2d12'
}

export function ImpactVisualizer({ data }: ImpactVisualizerProps) {
  // Process data for charts
  const threatLevelData = data.reduce((acc, item) => {
    acc[item.threat_level] = (acc[item.threat_level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryData = data.reduce((acc, item) => {
    acc[item.impact_category] = (acc[item.impact_category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const energyData = data
    .filter(item => item.kinetic_energy_megatons > 0)
    .sort((a, b) => b.kinetic_energy_megatons - a.kinetic_energy_megatons)
    .slice(0, 10)
    .map(item => ({
      name: item.closest_approach_date.split('T')[0],
      energy: item.kinetic_energy_megatons,
      category: item.impact_category
    }))

  const chartData = [
    { name: 'Low', value: threatLevelData.low || 0, color: COLORS.low },
    { name: 'Medium', value: threatLevelData.medium || 0, color: COLORS.medium },
    { name: 'High', value: threatLevelData.high || 0, color: COLORS.high }
  ]

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || '#6b7280'
  }))

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const stats = {
    total: data.length,
    hazardous: data.filter(item => item.threat_level === 'high').length,
    avgEnergy: data.reduce((sum, item) => sum + item.kinetic_energy_megatons, 0) / data.length,
    closestApproach: Math.min(...data.map(item => item.miss_distance_km))
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
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
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600 font-medium">High Threat</p>
                <p className="text-2xl font-bold text-red-700">{stats.hazardous}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Energy</p>
                <p className="text-2xl font-bold text-purple-700">{stats.avgEnergy.toFixed(2)} MT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Closest (km)</p>
                <p className="text-2xl font-bold text-green-700">
                  {(stats.closestApproach / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Level Distribution */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Threat Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Categories */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Energy Events */}
      {energyData.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Energy Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} MT TNT`, 'Energy']}
                  />
                  <Bar dataKey="energy" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
