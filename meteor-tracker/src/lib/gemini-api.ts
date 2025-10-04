const GEMINI_API_KEY = "AIzaSyB42RrQJ3LCmZhX-EvGYNiDNLjr2r3TcIk"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export interface ImpactAnalysisRequest {
  objectName: string
  diameter: number
  velocity: number
  missDistance: number
  threatLevel: string
  approachDate: string
}

export interface ImpactAnalysisResponse {
  riskAssessment: string
  potentialImpact: string
  recommendations: string[]
  confidence: number
}

export async function analyzeImpactWithGemini(data: ImpactAnalysisRequest): Promise<ImpactAnalysisResponse> {
  try {
    const prompt = `
Analyze the potential impact risk of this Near-Earth Object:

Object: ${data.objectName}
Diameter: ${data.diameter} km
Velocity: ${data.velocity} km/s
Miss Distance: ${data.missDistance} km
Threat Level: ${data.threatLevel}
Closest Approach: ${data.approachDate}

Please provide:
1. Risk Assessment (1-2 sentences on overall risk level)
2. Potential Impact (description of what could happen if impact occurs)
3. Recommendations (3-4 specific recommendations for monitoring/action)
4. Confidence Level (0-100% confidence in this assessment)

Format your response as JSON with these exact fields: riskAssessment, potentialImpact, recommendations, confidence
`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const result = await response.json()
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from Gemini API')
    }

    // Parse JSON response from Gemini
    try {
      const parsedResponse = JSON.parse(generatedText)
      return {
        riskAssessment: parsedResponse.riskAssessment || 'Risk assessment unavailable',
        potentialImpact: parsedResponse.potentialImpact || 'Impact analysis unavailable',
        recommendations: parsedResponse.recommendations || ['Continue monitoring', 'Update orbital predictions', 'Assess mitigation options'],
        confidence: parsedResponse.confidence || 75
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        riskAssessment: 'AI analysis completed - see details below',
        potentialImpact: generatedText.substring(0, 200) + '...',
        recommendations: ['Continue monitoring', 'Update orbital predictions', 'Assess mitigation options'],
        confidence: 75
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw new Error('Failed to analyze impact with AI')
  }
}

export async function generateImpactSummary(neoData: any[]): Promise<string> {
  try {
    const prompt = `
Based on this Near-Earth Object data, provide a brief summary (2-3 sentences) about the current impact risk situation:

Total Objects: ${neoData.length}
Hazardous Objects: ${neoData.filter(n => n.is_potentially_hazardous_asteroid).length}
High Threat Objects: ${neoData.filter(n => n.impact_assessments?.some((a: any) => a.threat_level === 'high')).length}
Average Diameter: ${(neoData.reduce((sum, n) => sum + (n.estimated_diameter_avg || 0), 0) / neoData.length).toFixed(2)} km

Provide a concise summary of the current threat landscape and any notable concerns.
`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const result = await response.json()
    return result.candidates?.[0]?.content?.parts?.[0]?.text || 'Impact summary unavailable'
  } catch (error) {
    console.error('Error generating impact summary:', error)
    return 'Impact summary generation failed'
  }
}
