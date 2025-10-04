'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Calendar, Globe, Search } from 'lucide-react'

interface CometData {
  id: string
  designation: string
  name?: string
  orbital_elements?: any
  discovery_date?: string
  last_updated: string
  created_at: string
}

export default function CometsPage() {
  const [cometData, setCometData] = useState<CometData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch comet data
  const fetchCometData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/comets?limit=100')
      const result = await response.json()
      
      if (result.success) {
        setCometData(result.data || [])
        setError(null)
      } else {
        setError('Failed to fetch comet data')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching comet data:', err)
    } finally {
      setLoading(false)
    }
  }


  // Filter comets based on search term
  const filteredComets = cometData.filter(comet => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      comet.designation?.toLowerCase().includes(searchLower) ||
      comet.name?.toLowerCase().includes(searchLower)
    )
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  useEffect(() => {
    fetchCometData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingSpinner message="Loading Comet Data..." size="lg" />
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
          <h1 className="text-4xl font-bold gradient-text mb-4">Near-Earth Comets</h1>
          <p className="text-muted-foreground text-lg">
            Track comets that come close to Earth's orbit
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
                  placeholder="Search comets by designation or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comets Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredComets.length === 0 ? (
            <div className="col-span-full">
              <Card className="glass-card">
                <CardContent className="p-12 text-center">
                  {searchTerm ? (
                    <>
                      <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No comets found</h3>
                      <p className="text-muted-foreground">
                        No comets match your search term "{searchTerm}"
                      </p>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No comet data available</h3>
                      <p className="text-muted-foreground">
                        The comet database is currently empty. Try syncing data to populate it.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredComets.map((comet, index) => (
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
                          Discovered: {formatDate(comet.discovery_date)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <Badge variant="secondary" className="text-xs">
                        Last Updated: {formatDate(comet.last_updated)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Summary Stats */}
        {filteredComets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4">
                  <Sparkles className="w-8 h-8 text-blue-400" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">{filteredComets.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {searchTerm ? 'Comets found' : 'Total comets'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}
