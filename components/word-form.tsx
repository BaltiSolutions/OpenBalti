"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { wordSchema, type WordFormData } from "@/lib/validations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { LanguageDirection } from "@/lib/words"

interface WordFormProps {
  initialData?: WordFormData
}

export default function WordForm({ initialData }: WordFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState<LanguageDirection>(initialData?.direction || "balti-to-english")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<WordFormData>({
    resolver: zodResolver(wordSchema),
    defaultValues: initialData || {
      word: "",
      transliteration: "",
      meaning: "",
      partOfSpeech: "noun",
      direction: "balti-to-english",
      example: "",
      pronunciation: "",
      etymology: "",
      relatedWords: [],
    },
  })

  // Handle direction change
  const handleDirectionChange = (value: LanguageDirection) => {
    setDirection(value)
    setValue("direction", value)
  }

  const onSubmit = async (data: WordFormData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      const url = initialData?._id ? `/api/words/${initialData._id}` : "/api/words"
      const method = initialData?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save word")
      }

      router.push("/admin")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="direction">Dictionary Direction</Label>
        <Select value={watch("direction")} onValueChange={(value) => handleDirectionChange(value as LanguageDirection)}>
          <SelectTrigger id="direction">
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="balti-to-english">Balti to English</SelectItem>
            <SelectItem value="english-to-balti">English to Balti</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          {direction === "balti-to-english"
            ? "Enter Balti word and English meaning"
            : "Enter English word and Balti meaning"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="word">{direction === "balti-to-english" ? "Balti Word" : "English Word"}</Label>
          <Input
            id="word"
            {...register("word")}
            className={direction === "balti-to-english" ? "font-tibetan" : ""}
            aria-invalid={!!errors.word}
            aria-describedby={errors.word ? "word-error" : undefined}
          />
          {errors.word && (
            <p id="word-error" className="text-sm text-red-500">
              {errors.word.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="transliteration">
            {direction === "balti-to-english" ? "Transliteration" : "Pronunciation Guide"}
          </Label>
          <Input
            id="transliteration"
            {...register("transliteration")}
            aria-invalid={!!errors.transliteration}
            aria-describedby={errors.transliteration ? "transliteration-error" : undefined}
          />
          {errors.transliteration && (
            <p id="transliteration-error" className="text-sm text-red-500">
              {errors.transliteration.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meaning">{direction === "balti-to-english" ? "English Meaning" : "Balti Translation"}</Label>
        <Input
          id="meaning"
          {...register("meaning")}
          className={direction === "english-to-balti" ? "font-tibetan" : ""}
          aria-invalid={!!errors.meaning}
          aria-describedby={errors.meaning ? "meaning-error" : undefined}
        />
        {errors.meaning && (
          <p id="meaning-error" className="text-sm text-red-500">
            {errors.meaning.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="partOfSpeech">Part of Speech</Label>
        <Select
          value={watch("partOfSpeech")}
          onValueChange={(value) => setValue("partOfSpeech", value as WordFormData["partOfSpeech"])}
        >
          <SelectTrigger id="partOfSpeech">
            <SelectValue placeholder="Select part of speech" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="noun">Noun</SelectItem>
            <SelectItem value="verb">Verb</SelectItem>
            <SelectItem value="adjective">Adjective</SelectItem>
            <SelectItem value="adverb">Adverb</SelectItem>
            <SelectItem value="pronoun">Pronoun</SelectItem>
            <SelectItem value="preposition">Preposition</SelectItem>
            <SelectItem value="conjunction">Conjunction</SelectItem>
            <SelectItem value="interjection">Interjection</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="example">Example (Optional)</Label>
        <Textarea
          id="example"
          {...register("example")}
          className="min-h-[100px]"
          placeholder="Enter an example sentence..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pronunciation">
          {direction === "balti-to-english" ? "Pronunciation (Optional)" : "Additional Notes (Optional)"}
        </Label>
        <Input
          id="pronunciation"
          {...register("pronunciation")}
          placeholder={direction === "balti-to-english" ? "e.g., /tʃuː/" : "Additional information"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="etymology">Etymology (Optional)</Label>
        <Input id="etymology" {...register("etymology")} placeholder="e.g., From Classical Tibetan..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relatedWords">Related Words (Optional)</Label>
        <Textarea
          id="relatedWords"
          {...register("relatedWords")}
          className="min-h-[100px]"
          placeholder="Enter related words, one per line..."
          onChange={(e) => {
            const words = e.target.value
              .split("\n")
              .map((word) => word.trim())
              .filter(Boolean)
            setValue("relatedWords", words)
          }}
          value={watch("relatedWords")?.join("\n") || ""}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>{initialData ? "Update" : "Add"} Word</>
          )}
        </Button>
      </div>
    </form>
  )
}

