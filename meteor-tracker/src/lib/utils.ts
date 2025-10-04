import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)} km`
  }
  return `${distance.toFixed(2)} AU`
}

export function formatVelocity(velocity: number): string {
  return `${velocity.toFixed(2)} km/s`
}

export function calculateImpactEnergy(diameter: number, velocity: number): number {
  // Simplified impact energy calculation (kinetic energy)
  const mass = (4/3) * Math.PI * Math.pow(diameter/2, 3) * 3000 // Assuming 3000 kg/m³ density
  return 0.5 * mass * Math.pow(velocity * 1000, 2) / Math.pow(10, 15) // Convert to megatons TNT
}

export function getImpactCategory(energy: number): string {
  if (energy < 0.001) return 'Minimal'
  if (energy < 0.01) return 'Small'
  if (energy < 0.1) return 'Moderate'
  if (energy < 1) return 'Large'
  if (energy < 10) return 'Major'
  return 'Catastrophic'
}

export function getThreatLevel(hazardous: boolean, distance: number, diameter: number): 'low' | 'medium' | 'high' {
  if (!hazardous) return 'low'
  if (distance < 0.05 && diameter > 140) return 'high'
  if (distance < 0.1 && diameter > 100) return 'medium'
  return 'low'
}
