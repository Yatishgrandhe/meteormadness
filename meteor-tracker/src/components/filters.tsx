'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Settings, X, ChevronDown } from 'lucide-react'

interface FilterOptions {
  threatLevel: string[]
  hazardous: boolean | null
  minDiameter: number | null
  maxDiameter: number | null
  dateRange: {
    start: string
    end: string
  } | null
  objectType?: 'all' | 'asteroids' | 'comets'
}

interface FiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  totalCount: number
  filteredCount: number
}

export function Filters({ filters, onFiltersChange, totalCount, filteredCount }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      threatLevel: [],
      hazardous: null,
      minDiameter: null,
      maxDiameter: null,
      dateRange: null
    })
  }

  const hasActiveFilters = 
    filters.threatLevel.length > 0 ||
    filters.hazardous !== null ||
    filters.minDiameter !== null ||
    filters.maxDiameter !== null ||
    filters.dateRange !== null

  const threatLevels = ['low', 'medium', 'high']
  const threatColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {filteredCount} of {totalCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-6">
              {/* Threat Level */}
              <div>
                <label className="block text-sm font-medium mb-2">Threat Level</label>
                <div className="flex flex-wrap gap-2">
                  {threatLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        const newLevels = filters.threatLevel.includes(level)
                          ? filters.threatLevel.filter(l => l !== level)
                          : [...filters.threatLevel, level]
                        updateFilter('threatLevel', newLevels)
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filters.threatLevel.includes(level)
                          ? threatColors[level as keyof typeof threatColors]
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hazardous Objects */}
              <div>
                <label className="block text-sm font-medium mb-2">Object Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateFilter('hazardous', filters.hazardous === true ? null : true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.hazardous === true
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Potentially Hazardous
                  </button>
                  <button
                    onClick={() => updateFilter('hazardous', filters.hazardous === false ? null : false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.hazardous === false
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Non-Hazardous
                  </button>
                </div>
              </div>

              {/* Diameter Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Diameter Range (km)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minDiameter || ''}
                      onChange={(e) => updateFilter('minDiameter', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxDiameter || ''}
                      onChange={(e) => updateFilter('maxDiameter', e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Approach Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={filters.dateRange?.start || ''}
                      onChange={(e) => updateFilter('dateRange', {
                        start: e.target.value,
                        end: filters.dateRange?.end || ''
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={filters.dateRange?.end || ''}
                      onChange={(e) => updateFilter('dateRange', {
                        start: filters.dateRange?.start || '',
                        end: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
