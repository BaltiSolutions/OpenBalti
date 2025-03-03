import { NextResponse } from "next/server"
import { getWords, createWord } from "@/lib/words"
import { wordSchema } from "@/lib/validations"
import { ZodError } from "zod"
import type { LanguageDirection } from "@/lib/words"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const direction = searchParams.get("direction") as LanguageDirection | undefined

    const words = await getWords(direction)
    return NextResponse.json(words)
  } catch (error) {
    console.error("Error fetching words:", error)
    return NextResponse.json(
      { error: "An error occurred while fetching words. Please try again later." },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const data = wordSchema.parse(json)
    const newWord = await createWord(data)
    return NextResponse.json(newWord, { status: 201 })
  } catch (error) {
    console.error("Error creating word:", error)

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    return NextResponse.json(
      { error: "An error occurred while creating the word. Please try again later." },
      { status: 500 },
    )
  }
}

