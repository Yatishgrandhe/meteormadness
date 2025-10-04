'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, ArrowUpDown, AlertTriangle, Globe, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

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

interface NEOTableProps {
  data: NEOObject[]
  loading?: boolean
}

type SortField = 'name' | 'absolute_magnitude_h' | 'estimated_diameter_avg' | 'close_approach_date' | 'miss_distance' | 'threat_level'
type SortDirection = 'asc' | 'desc'

export function NEOTable({ data, loading = false }: NEOTableProps) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const router = useRouter()

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortField) {
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      case 'absolute_magnitude_h':
        aValue = a.absolute_magnitude_h
        bValue = b.absolute_magnitude_h
        break
      case 'estimated_diameter_avg':
        aValue = a.estimated_diameter_avg
        bValue = b.estimated_diameter_avg
        break
      case 'close_approach_date':
        aValue = a.close_approach_data?.[0]?.close_approach_date || ''
        bValue = b.close_approach_data?.[0]?.close_approach_date || ''
        break
      case 'miss_distance':
        aValue = parseFloat(a.close_approach_data?.[0]?.miss_distance?.kilometers || '0')
        bValue = parseFloat(b.close_approach_data?.[0]?.miss_distance?.kilometers || '0')
        break
      case 'threat_level':
        aValue = a.impact_assessments?.[0]?.threat_level || 'low'
        bValue = b.impact_assessments?.[0]?.threat_level || 'low'
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const getThreatLevel = (neo: NEOObject) => {
    return neo.impact_assessments?.[0]?.threat_level || 'low'
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDistance = (kilometers: string) => {
    const km = parseFloat(kilometers)
    if (km >= 1000000) {
      return `${(km / 1000000).toFixed(2)}M km`
    } else if (km >= 1000) {
      return `${(km / 1000).toFixed(2)}K km`
    }
    return `${km.toFixed(2)} km`
  }

  const handleRowClick = (neo: NEOObject) => {
    router.push(`/neo/${neo.neo_reference_id}`)
  }

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-purple-400 transition-colors"
    >
      {children}
      {sortField === field ? (
        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
      ) : (
        <ArrowUpDown className="w-4 h-4 opacity-50" />
      )}
    </button>
  )

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading NEO data...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card neon-glow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-text">
          Near-Earth Objects
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Click on any row to view detailed information
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-4 px-2">
                  <SortButton field="name">Name</SortButton>
                </th>
                <th className="text-left py-4 px-2">
                  <SortButton field="absolute_magnitude_h">Magnitude</SortButton>
                </th>
                <th className="text-left py-4 px-2">
                  <SortButton field="estimated_diameter_avg">Diameter (km)</SortButton>
                </th>
                <th className="text-left py-4 px-2">
                  <SortButton field="close_approach_date">Next Approach</SortButton>
                </th>
                <th className="text-left py-4 px-2">
                  <SortButton field="miss_distance">Miss Distance</SortButton>
                </th>
                <th className="text-left py-4 px-2">
                  <SortButton field="threat_level">Threat Level</SortButton>
                </th>
                <th className="text-left py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((neo, index) => {
                const threatLevel = getThreatLevel(neo)
                const nextApproach = neo.close_approach_data?.[0]
                
                return (
                  <motion.tr
                    key={neo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="table-row-hover border-b border-border/30"
                    onClick={() => handleRowClick(neo)}
                  >
                    <td className="py-4 px-2">
                      <div className="font-medium text-foreground">{neo.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {neo.neo_reference_id}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span>{neo.absolute_magnitude_h?.toFixed(2) || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span>{neo.estimated_diameter_avg?.toFixed(2) || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        {nextApproach ? formatDate(nextApproach.close_approach_date) : 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        {nextApproach ? formatDistance(nextApproach.miss_distance.kilometers) : 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={`${getThreatColor(threatLevel)} border`}>
                        <Zap className="w-3 h-3 mr-1" />
                        {threatLevel.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex gap-1">
                        {neo.is_potentially_hazardous_asteroid && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Hazardous
                          </Badge>
                        )}
                        {neo.is_sentry_object && (
                          <Badge variant="secondary" className="text-xs">
                            Sentry
                          </Badge>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {sortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No NEO objects found matching the current filters.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
