import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`
}

export class FetchError extends Error {
  status: number
  statusText: string
  data?: any

  constructor(message: string, status: number, statusText: string, data?: any) {
    super(message)
    this.name = "FetchError"
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const response = await fetch(input, init)

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch (error) {
      // If the response is not JSON, just use the statusText
      errorData = { message: response.statusText }
    }

    const errorMessage = errorData?.error || errorData?.message || "An error occurred"
    throw new FetchError(errorMessage, response.status, response.statusText, errorData)
  }

  return response.json()
}

