"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LanguageDirection } from "@/lib/words"

export default function LanguageDirectionSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [direction, setDirection] = useState<LanguageDirection>(
    (searchParams.get("direction") as LanguageDirection) || "balti-to-english",
  )

  // Update when URL changes
  useEffect(() => {
    const directionFromUrl = searchParams.get("direction") as LanguageDirection
    if (directionFromUrl && directionFromUrl !== direction) {
      setDirection(directionFromUrl)
    }
  }, [searchParams, direction])

  const handleDirectionChange = (value: string) => {
    const newDirection = value as LanguageDirection
    setDirection(newDirection)

    // Update the URL when the direction changes
    const params = new URLSearchParams(searchParams.toString())
    params.set("direction", newDirection)

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <label id="direction-label" className="block text-sm font-medium text-gray-700 mb-2">
        Translation Direction
      </label>
      <Tabs value={direction} onValueChange={handleDirectionChange} aria-labelledby="direction-label">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="balti-to-english">
            <span className="flex items-center gap-2">
              <span className="font-tibetan">བལྟི</span>
              <span className="text-xs">→</span>
              <span>English</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="english-to-balti">
            <span className="flex items-center gap-2">
              <span>English</span>
              <span className="text-xs">→</span>
              <span className="font-tibetan">བལྟི</span>
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

