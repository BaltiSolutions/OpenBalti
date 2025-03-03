import Link from "next/link"
import { siteConfig } from "@/lib/config"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            {siteConfig.name}
          </Link>
          <nav className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/words" className="text-gray-600 hover:text-blue-600">
              Dictionary
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

