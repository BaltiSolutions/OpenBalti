import { Suspense } from "react"
import SearchBar from "@/components/search-bar"
import LanguageDirectionSelector from "@/components/language-direction-selector"
import { getWords } from "@/lib/words"
import Link from "next/link"
import type { LanguageDirection } from "@/lib/words"

// Prevent static generation
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

function WordSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
    </div>
  )
}

async function WordsList({ direction }: { direction: LanguageDirection }) {
  const words = await getWords(direction)

  if (!words || words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No words found in the dictionary yet.</p>
        <Link href="/admin/add-word" className="btn-primary">
          Add Your First Word
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {words.map((word) => (
        <Link key={word._id} href={`/words/${word._id}`}>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-2xl font-bold ${direction === "balti-to-english" ? "font-tibetan" : ""}`}>
                  {word.word}
                </h3>
                {direction === "balti-to-english" && <p className="text-sm text-gray-500">{word.transliteration}</p>}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{word.partOfSpeech}</span>
            </div>
            <p className="mt-3 text-gray-700">
              {direction === "balti-to-english" ? word.meaning : <span className="font-tibetan">{word.meaning}</span>}
            </p>
            {word.example && (
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Example:</span> {word.example}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function WordsPage({
  searchParams,
}: {
  searchParams: { direction?: LanguageDirection }
}) {
  const direction = (searchParams.direction as LanguageDirection) || "balti-to-english"

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">All Words</h1>

          <LanguageDirectionSelector />
          <SearchBar />

          <Suspense
            fallback={
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <WordSkeleton key={i} />
                ))}
              </div>
            }
          >
            <WordsList direction={direction} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

