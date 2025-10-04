import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const hazardous = searchParams.get('hazardous') === 'true'
    const threatLevel = searchParams.get('threat_level')
    const date = searchParams.get('date')

    let query = supabase
      .from('neo_objects')
      .select(`
        *,
        impact_assessments (
          id,
          impact_probability,
          kinetic_energy_megatons,
          impact_category,
          threat_level,
          closest_approach_date,
          miss_distance_km,
          relative_velocity_km_s
        )
      `)
      .limit(limit)

    if (hazardous) {
      query = query.eq('is_potentially_hazardous_asteroid', true)
    }

    if (threatLevel) {
      query = query.eq('impact_assessments.threat_level', threatLevel)
    }

    if (date) {
      query = query.gte('impact_assessments.closest_approach_date', date)
    }

    const { data, error } = await query.order('absolute_magnitude_h', { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Error fetching NEO data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch NEO data'
    }, { status: 500 })
  }
}
