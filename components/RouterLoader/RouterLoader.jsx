'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RouteLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 800) // tempo simulado de loading

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )
}