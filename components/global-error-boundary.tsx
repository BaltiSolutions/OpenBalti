"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { logError } from "@/lib/monitoring"

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error tracking service
    logError(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800 mb-2">Error: {error.message || "An unexpected error occurred"}</p>
          {error.digest && <p className="text-xs text-red-600">Error ID: {error.digest}</p>}
        </div>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => (window.location.href = "/")}>Go to Homepage</Button>
          <Button onClick={() => reset()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}

