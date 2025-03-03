import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Word } from "@/lib/words"

// Sample Balti words data
const sampleWords: Word[] = [
  {
    word: "ཆུ",
    transliteration: "chu",
    meaning: "water",
    partOfSpeech: "noun",
    direction: "balti-to-english",
    example: "ཆུ འཐུང་ (chu athung) - Drink water",
    pronunciation: "/tʃuː/",
    etymology: "From Classical Tibetan: ཆུ (chu)",
    relatedWords: ["ཆུ་མིག (chumik) - spring", "ཆུ་ཚན (chutsen) - hot spring"],
  },
  {
    word: "རི",
    transliteration: "ri",
    meaning: "mountain",
    partOfSpeech: "noun",
    direction: "balti-to-english",
    example: "རི མཐོན་པོ་ (ri thönpo) - High mountain",
    pronunciation: "/ri/",
    etymology: "From Classical Tibetan: རི (ri)",
    relatedWords: ["རི་མགོ (rigo) - mountain top", "རི་ཁྲོད (ritrö) - hermitage"],
  },
  {
    word: "ཉི་མ",
    transliteration: "nyima",
    meaning: "sun",
    partOfSpeech: "noun",
    direction: "balti-to-english",
    example: "ཉི་མ ཤར་ (nyima shar) - The sun rises",
    pronunciation: "/ɲima/",
    etymology: "From Classical Tibetan: ཉི་མ (nyi ma)",
    relatedWords: ["ཉིན་མོ (nyinmo) - day", "ཉི་འོད (nyi'ö) - sunlight"],
  },
  {
    word: "water",
    transliteration: "pronounced as 'water'",
    meaning: "ཆུ",
    partOfSpeech: "noun",
    direction: "english-to-balti",
    example: "Can I have some water? - ང་ལ་ཆུ་ཏོག་ཙམ་དགོས།",
    pronunciation: "chu",
    etymology: "From Classical Tibetan: ཆུ (chu)",
    relatedWords: ["river - ཆུ་བོ", "lake - མཚོ"],
  },
  {
    word: "mountain",
    transliteration: "pronounced as 'mountain'",
    meaning: "རི",
    partOfSpeech: "noun",
    direction: "english-to-balti",
    example: "I can see the mountain - ང་ཡིས་རི་མཐོང་ཐུབ།",
    pronunciation: "ri",
    etymology: "From Classical Tibetan: རི (ri)",
    relatedWords: ["hill - རི་ཆུང་", "peak - རི་རྩེ"],
  },
  {
    word: "sun",
    transliteration: "pronounced as 'sun'",
    meaning: "ཉི་མ",
    partOfSpeech: "noun",
    direction: "english-to-balti",
    example: "The sun is shining - ཉི་མ་འཆར་གྱི་འདུག",
    pronunciation: "nyima",
    etymology: "From Classical Tibetan: ཉི་མ (nyi ma)",
    relatedWords: ["day - ཉིན་མོ", "sunlight - ཉི་འོད"],
  },
]

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("balti_dictionary")
    const collection = db.collection("words")

    // Check if collection already has data
    const count = await collection.countDocuments()
    if (count > 0) {
      return NextResponse.json({
        message: `Database already has ${count} words. Skipping seed.`,
        success: true,
        count,
      })
    }

    // Add timestamps to each word
    const now = new Date()
    const wordsWithTimestamps = sampleWords.map((word) => ({
      ...word,
      createdAt: now,
      updatedAt: now,
    }))

    // Insert the sample words
    const result = await collection.insertMany(wordsWithTimestamps)

    return NextResponse.json({
      message: `Successfully inserted ${result.insertedCount} words into the database`,
      success: true,
      count: result.insertedCount,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database", success: false }, { status: 500 })
  }
}

