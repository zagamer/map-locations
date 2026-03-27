'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Header from '@/components/Header'

const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading map...</div>,
})

const LOCATION_TYPES = ['Restaurant', 'Cafe', 'Park', 'Museum', 'Hotel']

export default function Home() {
  const [currentPage, setCurrentPage] = useState('Map')
  const [selectedTypes, setSelectedTypes] = useState<string[]>(LOCATION_TYPES)

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Map Locations</h2>
              <p className="text-lg text-blue-600 mb-6">
                Explore and discover amazing locations around you. Filter by type to find exactly what you're looking for.
              </p>
              <button
                onClick={() => setCurrentPage('Map')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Map
              </button>
            </div>
          </div>
        )
      case 'Map':
        return (
          <div className="flex h-full flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white p-6 border-r border-gray-200 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Filter by Type</h3>
              <div className="space-y-3">
                {LOCATION_TYPES.map((type) => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="mr-3 w-4 h-4"
                    />
                    <span className="text-blue-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="flex-1">
              <MapComponent selectedTypes={selectedTypes} />
            </div>
          </div>
        )
      case 'Contact Us':
        return (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center max-w-2xl bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
              <p className="text-blue-600 mb-4">We'd love to hear from you!</p>
              <div className="space-y-3 text-left">
                <p className="text-blue-600"><strong>Email:</strong> info@maplocations.com</p>
                <p className="text-blue-600"><strong>Phone:</strong> (555) 123-4567</p>
                <p className="text-blue-600"><strong>Address:</strong> 123 Main Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}
