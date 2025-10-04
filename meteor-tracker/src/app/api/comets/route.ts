import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search')

    let query = supabase
      .from('comet_data')
      .select('*')
      .limit(limit)

    if (search) {
      query = query.or(`designation.ilike.%${search}%,name.ilike.%${search}%`)
    }

    const { data, error } = await query.order('designation')

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Error fetching comets data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch comets data'
    }, { status: 500 })
  }
}
