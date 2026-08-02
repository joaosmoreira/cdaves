import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function getDatabase(dbName: "cdaves_portal" | "cdaves_design" | "cdaves_socios" | "cdaves_security"): Promise<Db> {
  const conn = await getMongoClient();
  return conn.db(dbName);
}

// Helpers para Coleções de cdaves_portal
export async function getCollectionPortal(collectionName: string) {
  const db = await getDatabase("cdaves_portal");
  return db.collection(collectionName);
}

// Helpers para Coleções de cdaves_design
export async function getCollectionDesign(collectionName: string) {
  const db = await getDatabase("cdaves_design");
  return db.collection(collectionName);
}

// Helpers para Coleções de cdaves_socios
export async function getCollectionSocios(collectionName: string) {
  const db = await getDatabase("cdaves_socios");
  return db.collection(collectionName);
}
