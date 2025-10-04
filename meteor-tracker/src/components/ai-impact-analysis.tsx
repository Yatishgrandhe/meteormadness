'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Loader2, Sparkles, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'

interface ImpactAnalysisRequest {
  objectName: string
  diameter: number
  velocity: number
  missDistance: number
  threatLevel: string
  approachDate: string
}

interface ImpactAnalysisResponse {
  riskAssessment: string
  potentialImpact: string
  recommendations: string[]
  confidence: number
}

interface AIImpactAnalysisProps {
  neoData: any[]
}

export function AIImpactAnalysis({ neoData }: AIImpactAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ImpactAnalysisResponse | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeIndividualObject = async (object: any) => {
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const requestData: ImpactAnalysisRequest = {
        objectName: object.name,
        diameter: object.estimated_diameter_avg || 0,
        velocity: parseFloat(object.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || '0'),
        missDistance: parseFloat(object.close_approach_data?.[0]?.miss_distance?.kilometers || '0'),
        threatLevel: object.impact_assessments?.[0]?.threat_level || 'low',
        approachDate: object.close_approach_data?.[0]?.close_approach_date || ''
      }

      const response = await fetch('/api/analyze-impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'individual',
          data: requestData
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setAnalysis(result.data)
      } else {
        setError(result.error || 'Analysis failed')
      }
    } catch (err) {
      setError('Failed to analyze object')
      console.error('Error analyzing object:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateSummary = async () => {
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analyze-impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'summary',
          data: neoData
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSummary(result.data.summary)
      } else {
        setError(result.error || 'Summary generation failed')
      }
    } catch (err) {
      setError('Failed to generate summary')
      console.error('Error generating summary:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400'
    if (confidence >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="glass-card neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            AI-Powered Impact Analysis
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Advanced AI analysis using Google Gemini for comprehensive impact risk assessment
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={generateSummary}
              disabled={isAnalyzing}
              className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-center transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-400" />
              ) : (
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              )}
              <p className="font-medium">Generate AI Summary</p>
              <p className="text-sm text-muted-foreground">Analyze overall threat landscape</p>
            </button>
            
            <button
              onClick={() => {
                const highThreatObject = neoData.find(neo => 
                  neo.impact_assessments?.some((a: any) => a.threat_level === 'high')
                )
                if (highThreatObject) {
                  analyzeIndividualObject(highThreatObject)
                } else {
                  analyzeIndividualObject(neoData[0])
                }
              }}
              disabled={isAnalyzing || neoData.length === 0}
              className="p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-center transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-red-400" />
              ) : (
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
              )}
              <p className="font-medium">Analyze High-Risk Object</p>
              <p className="text-sm text-muted-foreground">Deep dive into threat assessment</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
        >
          <p className="font-medium">Analysis Error</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      {/* AI Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI Threat Landscape Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{summary}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Individual Object Analysis */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Risk Assessment
                <Badge className={`${getConfidenceColor(analysis.confidence)} border ml-auto`}>
                  {analysis.confidence}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Risk Assessment</h4>
                <p className="text-muted-foreground">{analysis.riskAssessment}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Potential Impact</h4>
                <p className="text-muted-foreground">{analysis.potentialImpact}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
