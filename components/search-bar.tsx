"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize query from URL if present
  useEffect(() => {
    const urlQuery = searchParams.get("q")
    if (urlQuery) {
      setQuery(urlQuery)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsSubmitting(true)

      // Preserve the direction parameter if it exists
      const direction = searchParams.get("direction")
      const params = new URLSearchParams()
      params.set("q", query.trim())
      if (direction) {
        params.set("direction", direction)
      }

      router.push(`/search?${params.toString()}`)
      setTimeout(() => setIsSubmitting(false), 300) // Reset after navigation
    }
  }

  return (
    <form onSubmit={handleSearch} className={cn("relative", className)}>
      <Input
        type="search"
        placeholder="Search for words..."
        className="pr-12"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full px-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

