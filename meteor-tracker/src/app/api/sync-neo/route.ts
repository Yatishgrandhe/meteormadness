import { NextResponse } from 'next/server'
import { syncNEOData } from '@/lib/nasa-api'

export async function POST() {
  try {
    const result = await syncNEOData()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully synced ${result.neosProcessed} NEOs and ${result.cometsProcessed} comets`,
        data: result
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('API sync error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'NEO sync endpoint. Use POST to trigger sync.',
    endpoints: {
      POST: '/api/sync-neo - Trigger NEO data sync'
    }
  })
}
