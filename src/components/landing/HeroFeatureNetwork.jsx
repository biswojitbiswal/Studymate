"use client"

import { useState, useEffect, useRef } from "react"

const CARDS = [
  { id: "live-class", title: "Live Class", x: 10, y: 15 },
  { id: "mentor-support", title: "Mentor Support", x: 65, y: 15 },
  { id: "assignment", title: "Assignment", x: 10, y: 55 },
  { id: "resources", title: "Resources", x: 45, y: 45 },
  { id: "smart-scheduling", title: "Smart Scheduling", x: 70, y: 65 },
  { id: "attendance", title: "Attendance & Progress", x: 38, y: 80 },
]

// Define connections with their path types to match the drawing
const CONNECTIONS = [
  { from: "live-class", to: "assignment", type: "straight" },
  { from: "live-class", to: "mentor-support", type: "straight" },
  { from: "mentor-support", to: "assignment", type: "angled-l" },
  { from: "assignment", to: "resources", type: "straight" },
  { from: "resources", to: "attendance", type: "straight" },
  { from: "mentor-support", to: "smart-scheduling", type: "straight" },
  { from: "smart-scheduling", to: "attendance", type: "straight" },
]

export default function HeroFeatureNetwork() {
  const [activeConnection, setActiveConnection] = useState(null)
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({})

  useEffect(() => {
    const updateCoords = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newCoords = {}

      CARDS.forEach((card) => {
        const element = document.getElementById(`card-${card.id}`)
        if (element) {
          const elRect = element.getBoundingClientRect()
          newCoords[card.id] = {
            x: elRect.left - rect.left + elRect.width / 2,
            y: elRect.top - rect.top + elRect.height / 2,
            width: elRect.width,
            height: elRect.height,
          }
        }
      })
      setCoords(newCoords)
    }

    updateCoords()
    window.addEventListener("resize", updateCoords)
    // Extra checks to ensure coords are captured after layout shifts
    const timer = setInterval(updateCoords, 1000)
    return () => {
      window.removeEventListener("resize", updateCoords)
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setActiveConnection(CONNECTIONS[index])
      index = (index + 1) % CONNECTIONS.length
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getPathData = (start, end, type) => {
    if (!start || !end) return ""
    if (type === "angled-l") {
      // Create an L-shaped path for the Mentor Support -> Assignment connection
      return `M ${start.x} ${start.y} L ${start.x - 20} ${start.y} L ${start.x - 20} ${end.y} L ${end.x} ${end.y}`
    }
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl aspect-[4/3] border border-gray-100 rounded-3xl bg-white shadow-xl overflow-hidden"
      >
        <svg className="absolute inset-0 w-full h-full z-10">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {CONNECTIONS.map((conn, i) => {
            const start = coords[conn.from]
            const end = coords[conn.to]
            if (!start || !end) return null

            const isActive = activeConnection?.from === conn.from && activeConnection?.to === conn.to
            const d = getPathData(start, end, conn.type)

            return (
              <g key={`connection-${i}`}>
                {/* Base Gray Line */}
                <path d={d} stroke="#e5e7eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Animated Lighting Line */}
                <path
                  d={d}
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="10, 50"
                  style={{
                    filter: "url(#glow)",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                    animation: isActive ? "lighting 2s linear infinite" : "none",
                  }}
                />
              </g>
            )
          })}
        </svg>

        {/* Cards mapping over the provided coordinates */}
        {CARDS.map((card) => (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className="absolute z-20 w-48 md:w-64 p-5 rounded-xl border border-blue-50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-200 group"
            style={{ left: `${card.x}%`, top: `${card.y}%` }}
          >
            <h3 className="text-sm md:text-base font-bold text-blue-600 mb-3">{card.title}</h3>
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-100/50 w-[85%]" />
              </div>
              <div className="h-2 w-[60%] bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-100/50 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
