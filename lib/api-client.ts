import { fetcher } from "./utils"
import { apiConfig } from "./config"
import type { Word, LanguageDirection } from "./words"

export const api = {
  // Word endpoints
  getWords: async (direction?: LanguageDirection) => {
    const url = new URL(`${apiConfig.baseUrl}${apiConfig.endpoints.words}`)
    if (direction) {
      url.searchParams.append("direction", direction)
    }
    return fetcher<Word[]>(url.toString())
  },

  getWordById: async (id: string) => {
    return fetcher<Word>(`${apiConfig.baseUrl}${apiConfig.endpoints.words}/${id}`)
  },

  createWord: async (word: Partial<Word>) => {
    return fetcher<Word>(`${apiConfig.baseUrl}${apiConfig.endpoints.words}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    })
  },

  updateWord: async (id: string, word: Partial<Word>) => {
    return fetcher<Word>(`${apiConfig.baseUrl}${apiConfig.endpoints.words}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    })
  },

  deleteWord: async (id: string) => {
    return fetcher(`${apiConfig.baseUrl}${apiConfig.endpoints.words}/${id}`, {
      method: "DELETE",
    })
  },

  // Search endpoint
  searchWords: async (query: string, direction?: LanguageDirection) => {
    const url = new URL(`${apiConfig.baseUrl}${apiConfig.endpoints.search}`)
    url.searchParams.append("q", query)
    if (direction) {
      url.searchParams.append("direction", direction)
    }
    return fetcher<Word[]>(url.toString())
  },

  // Seed endpoint
  seedDatabase: async () => {
    return fetcher(`${apiConfig.baseUrl}${apiConfig.endpoints.seed}`)
  },
}

