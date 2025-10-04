import { NextRequest, NextResponse } from 'next/server'
import { analyzeImpactWithGemini, generateImpactSummary } from '@/lib/gemini-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.type === 'individual') {
      // Analyze individual object
      const analysis = await analyzeImpactWithGemini(body.data)
      return NextResponse.json({
        success: true,
        data: analysis
      })
    } else if (body.type === 'summary') {
      // Generate summary for multiple objects
      const summary = await generateImpactSummary(body.data)
      return NextResponse.json({
        success: true,
        data: { summary }
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid analysis type'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Error in impact analysis API:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to analyze impact'
    }, { status: 500 })
  }
}
