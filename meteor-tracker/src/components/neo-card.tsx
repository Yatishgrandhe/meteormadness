'use client'

import { motion, Variants } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatDate, formatDistance, formatVelocity } from '@/lib/utils'
import { AlertTriangle, Globe, Zap, Calendar } from 'lucide-react'

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
    threat_level: 'low' | 'medium' | 'high'
    impact_category: string
    kinetic_energy_megatons: number
    closest_approach_date: string
    miss_distance_km: number
    relative_velocity_km_s: number
  }>
}

interface NEOCardProps {
  neo: NEOObject
  index: number
}

export function NEOCard({ neo, index }: NEOCardProps) {
  const latestAssessment = neo.impact_assessments?.[0]
  const threatLevel = latestAssessment?.threat_level || 'low'
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-green-200 bg-green-50'
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="w-full"
    >
      <Card className={`h-full transition-all duration-200 ${getThreatColor(threatLevel)}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">
              {neo.name}
            </CardTitle>
            <div className="flex gap-2">
              {neo.is_potentially_hazardous_asteroid && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Hazardous
                </Badge>
              )}
              {neo.is_sentry_object && (
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Sentry
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Reference ID: {neo.neo_reference_id}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Diameter</span>
              </div>
              <p className="text-muted-foreground">
                {neo.estimated_diameter_avg?.toFixed(2) || 'N/A'} km
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Magnitude</span>
              </div>
              <p className="text-muted-foreground">
                {neo.absolute_magnitude_h?.toFixed(2) || 'N/A'}
              </p>
            </div>
          </div>

          {/* Impact Assessment */}
          {latestAssessment && (
            <div className="space-y-3 p-4 bg-white/50 rounded-lg border">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Latest Assessment</h4>
                <Badge variant={threatLevel}>
                  {threatLevel.toUpperCase()} THREAT
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Closest Approach:</span>
                  <span className="font-medium">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {formatDate(latestAssessment.closest_approach_date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Miss Distance:</span>
                  <span className="font-medium">
                    {formatDistance(latestAssessment.miss_distance_km / 149597870.7)} AU
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Velocity:</span>
                  <span className="font-medium">
                    {formatVelocity(latestAssessment.relative_velocity_km_s)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Impact Category:</span>
                  <span className="font-medium">
                    {latestAssessment.impact_category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy:</span>
                  <span className="font-medium">
                    {latestAssessment.kinetic_energy_megatons.toFixed(2)} MT TNT
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Close Approaches Count */}
          <div className="text-center text-sm text-muted-foreground">
            {neo.close_approach_data?.length || 0} close approach(es) recorded
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
