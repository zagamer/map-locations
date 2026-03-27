'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  id: number
  lat: number
  lng: number
  name: string
  type: string
  description: string
}

interface MapProps {
  selectedTypes: string[]
}

const SAMPLE_LOCATIONS: Location[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    name: 'Central Park',
    type: 'Park',
    description: 'A large public park in Manhattan',
  },
  {
    id: 2,
    lat: 40.758,
    lng: -73.9855,
    name: 'Times Square',
    type: 'Museum',
    description: 'Iconic public area with shops and entertainment',
  },
  {
    id: 3,
    lat: 40.7505,
    lng: -73.9972,
    name: 'The Plaza Hotel',
    type: 'Hotel',
    description: 'Luxury hotel in Midtown Manhattan',
  },
  {
    id: 4,
    lat: 40.7614,
    lng: -73.9776,
    name: 'Grand Central Terminal',
    type: 'Cafe',
    description: 'Historic transport hub with dining options',
  },
  {
    id: 5,
    lat: 40.7580,
    lng: -73.9855,
    name: 'Bryant Park',
    type: 'Park',
    description: 'Public park with seasonal activities',
  },
  {
    id: 6,
    lat: 40.748,
    lng: -73.968,
    name: 'Empire State Building',
    type: 'Museum',
    description: 'Iconic skyscraper with observation decks',
  },
  {
    id: 7,
    lat: 40.7489,
    lng: -73.968,
    name: 'Local Bistro',
    type: 'Restaurant',
    description: 'Cozy neighborhood restaurant',
  },
  {
    id: 8,
    lat: 40.7505,
    lng: -73.9934,
    name: 'Coffee Corner',
    type: 'Cafe',
    description: 'Popular coffee shop',
  },
]

const getMarkerColor = (type: string): string => {
  const colors: Record<string, string> = {
    Restaurant: '#ff6b6b',
    Cafe: '#ffa94d',
    Park: '#51cf66',
    Museum: '#748ffc',
    Hotel: '#ff922b',
  }
  return colors[type] || '#888888'
}

const createCustomIcon = (type: string) => {
  const color = getMarkerColor(type)
  const svgString = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 0C7.04 0 3 4.04 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.96-4.04-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    </svg>
  `)
  
  return new L.Icon({
    iconUrl: `data:image/svg+xml;charset=utf8,${svgString}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

export default function Map({ selectedTypes }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef(new globalThis.Map<number, L.Marker>())

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([40.7128, -74.006], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current)
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Add markers for selected types
    SAMPLE_LOCATIONS.forEach((location) => {
      if (selectedTypes.includes(location.type)) {
        const marker = L.marker([location.lat, location.lng], {
          icon: createCustomIcon(location.type),
        })
          .bindPopup(`
            <div>
              <h3 class="font-bold">${location.name}</h3>
              <p class="text-sm text-gray-600">${location.type}</p>
              <p class="text-sm">${location.description}</p>
            </div>
          `)
          .addTo(map.current!)

        markersRef.current.set(location.id, marker)
      }
    })
  }, [selectedTypes])

  return <div ref={mapContainer} className="h-full w-full" />
}
