'use client'

import { useRef, useState } from 'react'

interface PhotoModalProps {
  locationId: number
  locationName: string
  photos: string[]
  onClose: () => void
  onPhotoAdd: (locationId: number, photo: string) => void
}

export default function PhotoModal({
  locationId,
  locationName,
  photos,
  onClose,
  onPhotoAdd,
}: PhotoModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      onPhotoAdd(locationId, imageData)
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{locationName} - Photos</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-lg p-2 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Section */}
          <div className="mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {isUploading ? 'Uploading...' : '+ Add Photo'}
            </button>
          </div>

          {/* Photos Gallery */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1} of ${locationName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {index + 1}/{photos.length}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">📷 No photos yet</p>
              <p className="text-gray-400">Click "Add Photo" to upload your first image</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
