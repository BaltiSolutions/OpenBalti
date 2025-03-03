import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

class Singleton {
  private static _instance: Promise<MongoClient>

  public static async getInstance(): Promise<MongoClient> {
    if (!this._instance) {
      const client = new MongoClient(uri, options)
      this._instance = client.connect()

      // Handle errors globally
      this._instance.catch((err) => {
        console.error("MongoDB connection error:", err)
        return Promise.reject(err)
      })

      // Handle process termination
      process.on("SIGINT", async () => {
        try {
          const client = await this._instance
          await client.close()
          console.log("MongoDB connection closed")
        } catch (error) {
          console.error("Error closing MongoDB connection:", error)
        } finally {
          process.exit(0)
        }
      })
    }
    return this._instance
  }
}

// In development, use global singleton
// In production, create a new instance
const clientPromise = process.env.NODE_ENV === "development" ? getDevClient() : getProdClient()

function getDevClient() {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = Singleton.getInstance()
  }
  return global._mongoClientPromise
}

function getProdClient() {
  return Singleton.getInstance()
}

export default clientPromise

