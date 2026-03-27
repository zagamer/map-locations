'use client'

import { useRef, useState } from 'react'

interface PhotoModalProps {
  locationId: number
  locationName: string
  photos: string[]
  onClose: () => void
  onPhotoAdd: (locationId: number, photo: string) => void
  onPhotoDelete: (locationId: number, index: number) => void
}

export default function PhotoModal({
  locationId,
  locationName,
  photos,
  onClose,
  onPhotoAdd,
  onPhotoDelete,
}: PhotoModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [pendingPhotos, setPendingPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setPendingPhotos((prev) => [...prev, imageData])
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSavePhotos = () => {
    pendingPhotos.forEach((photo) => {
      onPhotoAdd(locationId, photo)
    })
    setPendingPhotos([])
  }

  const handleDeletePendingPhoto = (index: number) => {
    setPendingPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteSavedPhoto = (index: number) => {
    onPhotoDelete(locationId, index)
  }

  const allPhotos = [...photos, ...pendingPhotos]
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
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
          {allPhotos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {allPhotos.map((photo, index) => {
                  const isSaved = index < photos.length
                  return (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                        {index + 1}/{allPhotos.length}
                      </div>
                      {!isSaved && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          NEW
                        </div>
                      )}
                      <button
                        onClick={() => isSaved ? handleDeleteSavedPhoto(index) : handleDeletePendingPhoto(index - photos.length)}
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <span className="text-white font-bold text-2xl">🗑️</span>
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
                {pendingPhotos.length > 0 && (
                  <button
                    onClick={handleSavePhotos}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Save {pendingPhotos.length} Photo{pendingPhotos.length !== 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </>
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
