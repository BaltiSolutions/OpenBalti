import { ObjectId } from "mongodb"
import clientPromise from "./mongodb"
import { unstable_noStore as noStore } from "next/cache"

export interface Word {
  _id?: string | ObjectId
  word: string
  transliteration: string
  meaning: string
  partOfSpeech: string
  direction?: "balti-to-english" | "english-to-balti"
  example?: string
  pronunciation?: string
  etymology?: string
  relatedWords?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export type LanguageDirection = "balti-to-english" | "english-to-balti"

export async function getWords(direction?: LanguageDirection) {
  // Opt out of static rendering
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    const query = direction ? { direction } : {}
    const words = await collection.find(query).sort({ word: 1 }).toArray()

    return JSON.parse(JSON.stringify(words))
  } catch (error) {
    console.error("Error fetching words:", error)
    return []
  }
}

export async function getWordById(id: string) {
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    const word = await collection.findOne({ _id: new ObjectId(id) })

    if (!word) return null

    return JSON.parse(JSON.stringify(word))
  } catch (error) {
    console.error("Error fetching word:", error)
    return null
  }
}

export async function searchWords(query: string, direction?: LanguageDirection) {
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    const searchQuery: any = {
      $or: [
        { word: { $regex: query, $options: "i" } },
        { transliteration: { $regex: query, $options: "i" } },
        { meaning: { $regex: query, $options: "i" } },
      ],
    }

    if (direction) {
      searchQuery.direction = direction
    }

    const words = await collection.find(searchQuery).sort({ word: 1 }).toArray()

    return JSON.parse(JSON.stringify(words))
  } catch (error) {
    console.error("Error searching words:", error)
    return []
  }
}

export async function createWord(wordData: Word) {
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    const now = new Date()
    const word = {
      ...wordData,
      direction: wordData.direction || "balti-to-english", // Default direction
      createdAt: now,
      updatedAt: now,
    }

    const result = await collection.insertOne(word)

    return {
      ...word,
      _id: result.insertedId,
    }
  } catch (error) {
    console.error("Error creating word:", error)
    throw new Error("Failed to create word")
  }
}

export async function updateWord(id: string, wordData: Partial<Word>) {
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    const now = new Date()
    const update = {
      ...wordData,
      updatedAt: now,
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: update })

    return {
      ...update,
      _id: id,
    }
  } catch (error) {
    console.error("Error updating word:", error)
    throw new Error("Failed to update word")
  }
}

export async function deleteWord(id: string) {
  noStore()

  try {
    const client = await clientPromise
    const collection = client.db("balti_dictionary").collection("words")

    await collection.deleteOne({ _id: new ObjectId(id) })

    return { success: true }
  } catch (error) {
    console.error("Error deleting word:", error)
    throw new Error("Failed to delete word")
  }
}

