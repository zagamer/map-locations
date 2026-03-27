'use client'

interface HeaderProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const tabs = ['Home', 'Map', 'Contact Us']

  return (
    <header className="bg-gradient-to-r from-pink-300 to-pink-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Map Locations</h1>
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onPageChange(tab)}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
                currentPage === tab
                  ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                  : 'bg-pink-200 text-blue-600 hover:bg-pink-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
