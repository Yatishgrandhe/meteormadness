export interface NEOObject {
  neo_reference_id: string
  name: string
  nasa_jpl_url: string
  absolute_magnitude_h: number
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
    meters: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
    miles: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
    feet: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  close_approach_data: CloseApproachData[]
  orbital_data: {
    orbit_id: string
    orbit_determination_date: string
    first_observation_date: string
    last_observation_date: string
    data_arc_in_days: number
    observations_used: number
    orbit_uncertainty: string
    minimum_orbit_intersection: string
    jupiter_tisserand_invariant: string
    epoch_osculation: string
    eccentricity: string
    semi_major_axis: string
    inclination: string
    ascending_node_longitude: string
    orbital_period: string
    perihelion_distance: string
    perihelion_argument: string
    aphelion_distance: string
    perihelion_time: string
    mean_anomaly: string
    mean_motion: string
    equinox: string
    orbit_class: {
      orbit_class_type: string
      orbit_class_description: string
      orbit_class_range: string
    }
  }
}

export interface CloseApproachData {
  close_approach_date: string
  close_approach_date_full: string
  epoch_date_close_approach: number
  relative_velocity: {
    kilometers_per_second: string
    kilometers_per_hour: string
    miles_per_hour: string
  }
  miss_distance: {
    astronomical: string
    lunar: string
    kilometers: string
    miles: string
  }
  orbiting_body: string
}

export interface NEOFeedResponse {
  near_earth_objects: {
    [date: string]: NEOObject[]
  }
  element_count: number
  links: {
    next: string
    prev: string
    self: string
  }
}

export interface CometData {
  designation: string
  name?: string
  orbital_elements: {
    epoch: string
    eccentricity: number
    semi_major_axis: number
    inclination: number
    longitude_of_ascending_node: number
    argument_of_perihelion: number
    mean_anomaly: number
    perihelion_distance: number
    orbital_period: number
  }
  discovery_date?: string
}

export interface ImpactAssessment {
  neo_id: string
  impact_probability: number
  kinetic_energy_megatons: number
  impact_category: string
  threat_level: 'low' | 'medium' | 'high'
  closest_approach_date: string
  miss_distance_km: number
  relative_velocity_km_s: number
}
