"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export function MoodBoard() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const noteRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart])

  return (
    <div className="relative h-full flex items-start justify-center">
      <div
        ref={noteRef}
        className="absolute cursor-move select-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="bg-yellow-100/90 p-6 rounded-sm shadow-lg rotate-2 border-l-4 border-yellow-400/50 max-w-xs">
          <div className="space-y-2">
            <p className="text-xs text-yellow-900/60 font-mono mb-3">My Mood</p>
            <p className="text-sm italic text-yellow-900/80 font-serif leading-relaxed">
              Specialized in crafting digital product, mobile apps, and websites
            </p>
            <p className="text-sm italic text-yellow-900/80 font-serif leading-relaxed mt-4">
              Crafted an outstanding digital product experiences in last 4 years
            </p>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full shadow-md" />
        </div>
      </div>
    </div>
  )
}
