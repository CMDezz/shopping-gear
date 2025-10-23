// src/libs/database/connection.ts
import { MongoClient, Db, Collection, Document } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME || 'shopping-gear');
}

// Singleton database manager
class DatabaseManager {
  private static instance: DatabaseManager;
  private db: Db | null = null;
  private collections: Map<string, Collection<Document>> = new Map();

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async getDatabase(): Promise<Db> {
    if (!this.db) {
      const client = await clientPromise;
      this.db = client.db(process.env.MONGODB_DB_NAME || 'shopping-gear');
    }
    return this.db;
  }

  public async getCollection<T extends Document>(name: string): Promise<Collection<T>> {
    if (!this.collections.has(name)) {
      const db = await this.getDatabase();
      const collection = db.collection<T>(name);
      this.collections.set(name, collection as unknown as Collection<Document>);
    }
    return this.collections.get(name) as unknown as Collection<T>;
  }

  public async createIndexes(): Promise<void> {
    const usersCollection = await this.getCollection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
  }
}

export const dbManager = DatabaseManager.getInstance();