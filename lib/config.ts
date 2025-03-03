export const siteConfig = {
  name: "OpenBalti",
  description: "A comprehensive, open-source dictionary for the Balti language.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://openbalti.org",
  ogImage: "/images/og-image.png",
  links: {
    twitter: "https://twitter.com/openbalti",
    github: "https://github.com/openbalti/dictionary",
  },
  keywords: [
    "Balti",
    "dictionary",
    "language",
    "translation",
    "Baltistan",
    "Tibet",
    "linguistics",
    "open source",
    "language preservation",
    "cultural heritage",
  ],
}

export const dbConfig = {
  name: "balti_dictionary",
  collections: {
    words: "words",
  },
}

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  endpoints: {
    words: "/words",
    search: "/search",
    seed: "/seed",
  },
}

