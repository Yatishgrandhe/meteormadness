import { NEOFeedResponse, NEOObject, CometData } from '@/types/nasa'
import { supabaseAdmin } from './supabase'
import { calculateImpactEnergy, getImpactCategory, getThreatLevel } from './utils'

const NASA_API_KEY = process.env.NASA_API_KEY!
const COMETS_URL = process.env.NEAR_EARTH_COMETS_URL!

export async function fetchNEODailyData(startDate?: string, endDate?: string): Promise<NEOFeedResponse> {
  const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed'
  const params = new URLSearchParams({
    api_key: NASA_API_KEY,
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate })
  })

  const response = await fetch(`${baseUrl}?${params}`)
  
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`)
  }

  return response.json()
}

export async function fetchCometsData(): Promise<CometData[]> {
  try {
    const response = await fetch(COMETS_URL)
    
    if (!response.ok) {
      console.warn(`Comets API error: ${response.status}. Using fallback data.`)
      // Return empty array as fallback since the S3 URL has expired
      return []
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.warn('Comets API failed, using fallback:', error)
    // Return empty array as fallback
    return []
  }
}

export async function processAndStoreNEOData(neoObjects: NEOObject[]) {
  const processedData = neoObjects.map(async (neo) => {
    // Calculate average diameter
    const avgDiameter = (neo.estimated_diameter.kilometers.estimated_diameter_min + 
                        neo.estimated_diameter.kilometers.estimated_diameter_max) / 2

    // Process close approach data
    const closeApproaches = neo.close_approach_data.map(approach => ({
      close_approach_date: approach.close_approach_date,
      close_approach_date_full: approach.close_approach_date_full,
      epoch_date_close_approach: approach.epoch_date_close_approach,
      relative_velocity: approach.relative_velocity,
      miss_distance: approach.miss_distance,
      orbiting_body: approach.orbiting_body
    }))

    // Store NEO object
    const { data: storedNEO, error: neoError } = await supabaseAdmin
      .from('neo_objects')
      .upsert({
        neo_reference_id: neo.neo_reference_id,
        name: neo.name,
        nasa_jpl_url: neo.nasa_jpl_url,
        absolute_magnitude_h: neo.absolute_magnitude_h,
        estimated_diameter_min: neo.estimated_diameter.kilometers.estimated_diameter_min,
        estimated_diameter_max: neo.estimated_diameter.kilometers.estimated_diameter_max,
        estimated_diameter_avg: avgDiameter,
        is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
        is_sentry_object: neo.is_sentry_object,
        close_approach_data: closeApproaches,
        orbital_data: neo.orbital_data,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'neo_reference_id'
      })
      .select()
      .single()

    if (neoError) {
      console.error('Error storing NEO:', neoError)
      return
    }

    // Calculate and store impact assessments for each close approach
    for (const approach of closeApproaches) {
      const missDistanceKm = parseFloat(approach.miss_distance.kilometers)
      const velocityKmS = parseFloat(approach.relative_velocity.kilometers_per_second)
      
      // Calculate impact energy (simplified)
      const impactEnergy = calculateImpactEnergy(avgDiameter * 1000, velocityKmS)
      const impactCategory = getImpactCategory(impactEnergy)
      const threatLevel = getThreatLevel(neo.is_potentially_hazardous_asteroid, missDistanceKm / 149597870.7, avgDiameter)

      // Store impact assessment
      await supabaseAdmin
        .from('impact_assessments')
        .upsert({
          neo_id: storedNEO.id,
          impact_probability: calculateImpactProbability(missDistanceKm, avgDiameter),
          kinetic_energy_megatons: impactEnergy,
          impact_category: impactCategory,
          threat_level: threatLevel,
          closest_approach_date: approach.close_approach_date,
          miss_distance_km: missDistanceKm,
          relative_velocity_km_s: velocityKmS
        }, {
          onConflict: 'neo_id,closest_approach_date'
        })
    }
  })

  await Promise.all(processedData)
}

export async function processAndStoreCometsData(comets: CometData[]) {
  const processedData = comets.map(async (comet) => {
    await supabaseAdmin
      .from('comet_data')
      .upsert({
        designation: comet.designation,
        name: comet.name,
        orbital_elements: comet.orbital_elements,
        discovery_date: comet.discovery_date,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'designation'
      })
  })

  await Promise.all(processedData)
}

function calculateImpactProbability(missDistanceKm: number, diameterKm: number): number {
  // Simplified probability calculation
  // Real calculations would involve complex orbital mechanics
  const earthRadiusKm = 6371
  const crossSectionArea = Math.PI * Math.pow(earthRadiusKm + (diameterKm * 1000), 2)
  const missArea = Math.PI * Math.pow(missDistanceKm, 2)
  
  return Math.min(crossSectionArea / missArea, 1)
}

export async function syncNEOData() {
  try {
    console.log('Starting NEO data sync...')
    
    // Fetch today's data
    const today = new Date().toISOString().split('T')[0]
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    const neoData = await fetchNEODailyData(today, nextWeek)
    const allNEOs = Object.values(neoData.near_earth_objects).flat()
    
    await processAndStoreNEOData(allNEOs)
    
    // Fetch and store comets data
    const cometsData = await fetchCometsData()
    await processAndStoreCometsData(cometsData)
    
    console.log(`Successfully synced ${allNEOs.length} NEOs and ${cometsData.length} comets`)
    
    return {
      success: true,
      neosProcessed: allNEOs.length,
      cometsProcessed: cometsData.length
    }
  } catch (error) {
    console.error('Error syncing NEO data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
