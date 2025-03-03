import { z } from "zod"

export const wordSchema = z.object({
  word: z.string().min(1, "Word is required"),
  transliteration: z.string().min(1, "Transliteration is required"),
  meaning: z.string().min(1, "Meaning is required"),
  partOfSpeech: z.enum([
    "noun",
    "verb",
    "adjective",
    "adverb",
    "pronoun",
    "preposition",
    "conjunction",
    "interjection",
  ]),
  direction: z.enum(["balti-to-english", "english-to-balti"]).default("balti-to-english"),
  example: z.string().optional(),
  pronunciation: z.string().optional(),
  etymology: z.string().optional(),
  relatedWords: z.array(z.string()).optional(),
})

export type WordFormData = z.infer<typeof wordSchema>

