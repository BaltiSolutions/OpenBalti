type ErrorWithMessage = {
  message: string
  stack?: string
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (maybeError instanceof Error) {
    return maybeError
  }

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function logError(error: unknown) {
  const errorWithMessage = toErrorWithMessage(error)
  console.error(errorWithMessage)

  // Here you would typically send the error to your error tracking service
  // For example, using Sentry:
  // Sentry.captureException(errorWithMessage)
}

