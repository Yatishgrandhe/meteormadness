import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { data, error } = await supabase
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
      .eq('neo_reference_id', resolvedParams.id)
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return NextResponse.json({
        success: false,
        error: 'NEO object not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    console.error('Error fetching NEO data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch NEO data'
    }, { status: 500 })
  }
}
