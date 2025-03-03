"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import WordCard from "./word-card"
import LoadingSpinner from "./loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { Word, LanguageDirection } from "@/lib/words"

export default function WordList() {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const direction = (searchParams.get("direction") as LanguageDirection) || "balti-to-english"

  const fetchWords = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)

      // Include direction in the API request
      const url = `/api/words?direction=${direction}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch words")
      }

      const data = await response.json()
      setWords(data)
    } catch (error) {
      console.error("Error fetching words:", error)
      setError("Failed to load words. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [direction])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner text="Loading words..." />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription className="flex justify-between items-center">
          {error}
          <Button size="sm" variant="outline" onClick={fetchWords}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No words found in the dictionary yet.</p>
        <Button asChild>
          <Link href="/admin/add-word">Add Your First Word</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {words.map((word) => (
        <WordCard key={word._id?.toString()} word={word} />
      ))}
      <div className="col-span-full text-center mt-4">
        <Button asChild>
          <Link href={`/words?direction=${direction}`}>View All Words</Link>
        </Button>
      </div>
    </div>
  )
}

