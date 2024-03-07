import { MongoClient, Db, Collection } from 'mongodb';

// Connection URI
// Database Name
const dbName = 'test';
// Collection Name
const collectionName = 'songs';
const collectionNameAlbum = 'albums';

// Define a custom type for the return value
type MongoCollections = [Collection<any>, Collection<any>, MongoClient];

// Function to connect to MongoDB
export default async function connectToMongo(): Promise<MongoCollections> {
    const client: MongoClient = await MongoClient.connect(process.env.MONGO_URI!);
    const db: Db = client.db(dbName);
    const collection: Collection<any> = db.collection(collectionName);
    const albumCollection: Collection<any> = db.collection(collectionNameAlbum);

    // Return a list containing all three collections and the client
    return [collection, albumCollection, client];
}
