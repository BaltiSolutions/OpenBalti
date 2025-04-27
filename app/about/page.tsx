import { generateMetadata } from "@/lib/metadata"

export const metadata = generateMetadata(
  "About OpenBalti - Preserving the Balti Language",
  "Discover the history, importance, and preservation efforts of the Balti language through OpenBalti — an open-source project led by Dilshad Hussain."
)

export default function AboutPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            About OpenBalti
          </h1>
          <p className="text-lg text-muted-foreground">
            Preserving language. Protecting heritage. Empowering generations.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            OpenBalti is an open-source project dedicated to documenting, preserving, and celebrating the Balti language — a Tibetic language spoken primarily in Baltistan, a beautiful region in Gilgit-Baltistan, Pakistan, and parts of Ladakh, India.
          </p>

          <h2 id="about-balti-language">The Balti Language</h2>
          <p>
            Balti is one of the oldest surviving forms of the Tibetan language. It is deeply tied to the culture, traditions, and collective memory of the Balti people. Balti has historically been written in a script called "Yige," a variant of the classical Tibetan script. However, due to cultural shifts, it is now often written in a modified Perso-Arabic script.
          </p>
          <p>
            Despite its deep roots, Balti faces modern challenges. Urbanization, migration, and the dominance of national languages like Urdu and English have led to its gradual decline, especially among younger generations. Yet, within its songs, stories, and daily conversations, the heart of Baltistan still beats in Balti.
          </p>

          <h2 id="mission-of-openbalti">Mission of OpenBalti</h2>
          <p>
            OpenBalti exists to make the Balti language accessible to everyone — speakers, learners, and linguists. Our mission is to:
          </p>
          <ul>
            <li>Create a freely accessible, accurate Balti-English dictionary.</li>
            <li>Preserve rare and traditional Balti vocabulary that risks being forgotten.</li>
            <li>Encourage language learning through easy-to-use digital tools.</li>
            <li>Celebrate and protect Balti culture through its language.</li>
          </ul>

          <h2 id="features">Key Features</h2>
          <ul>
            <li>Modern, searchable Balti-English dictionary.</li>
            <li>Contributions from native speakers and linguists.</li>
            <li>Support for both classical and modern Balti scripts.</li>
            <li>Open-source code available for collaboration and improvement.</li>
          </ul>

          <h2 id="about-the-developer">About the Developer</h2>
          <p>
            OpenBalti was created by <strong>Dilshad Hussain</strong> — a self-taught web developer from Baltistan, Pakistan. As the first engineer in his family and a proud speaker of Balti, Dilshad combined his passion for technology and cultural preservation to build OpenBalti.
          </p>
          <p>
            Growing up in the mountains of Baltistan, he experienced firsthand how quickly traditional languages and customs could fade. Through OpenBalti, he hopes to give back to his community and inspire others to protect their linguistic heritage using the power of technology.
          </p>

          <h2 id="how-to-contribute">How You Can Help</h2>
          <p>
            OpenBalti welcomes contributions from everyone — whether you're a native speaker, a linguist, a developer, or simply someone passionate about preserving endangered languages.
          </p>
          <p>
            You can contribute by:
          </p>
          <ul>
            <li>Suggesting new words or corrections.</li>
            <li>Helping improve the app or website (open-source code on GitHub).</li>
            <li>Sharing OpenBalti with your community.</li>
          </ul>
          <p>
            Together, we can ensure that the Balti language thrives for generations to come.
          </p>

          <h2 id="closing-words">Closing Words</h2>
          <p>
            Languages are more than just words — they are carriers of identity, tradition, and spirit. OpenBalti stands as a bridge between the past and the future, preserving the voice of Baltistan for the world to hear.
          </p>
          <p className="text-center font-semibold text-primary">
            Language is our identity. OpenBalti is our voice.
          </p>
        </div>
      </div>
    </div>
  )
}