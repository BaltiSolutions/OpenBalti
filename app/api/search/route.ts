import { NextResponse } from "next/server"
import { searchWords } from "@/lib/words"
import type { LanguageDirection } from "@/lib/words"

// Prevent static generation
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const direction = searchParams.get("direction") as LanguageDirection | undefined

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const results = await searchWords(query, direction)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching words:", error)
    return NextResponse.json({ error: "Failed to search words" }, { status: 500 })
  }
}

