import { MongoClient, Db, Collection } from 'mongodb';

// Connection URI
// Database Name
const dbName = 'test';
// Collection Name
const collectionName = 'songs';
const collectionNameAlbum = 'albums';

// Define a custom type for the return value
interface MongoCollections {
    c1: Collection<any>;
    c2: Collection<any>;
}

// Function to connect to MongoDB
export default async function connectToMongo(): Promise<[Collection<any>, Collection<any>]> {
    const client = await MongoClient.connect(process.env.MONGO_URI!);
    const db: Db = client.db(dbName);
    const collection: Collection<any> = db.collection(collectionName);
    const albumCollection: Collection<any> = db.collection(collectionNameAlbum);
    return [collection, albumCollection];
}
