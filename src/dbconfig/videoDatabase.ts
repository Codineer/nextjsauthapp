import { MongoClient, Db, Collection } from 'mongodb';

// Connection URI
// Database Name
const dbName = 'test';
// Collection Name
const collectionName = 'videos';

// Define a custom type for the return value
type MongoCollections = [Collection<any>, MongoClient];

// Function to connect to MongoDB
export default async function connectToVMongo(): Promise<MongoCollections> {
    const client: MongoClient = await MongoClient.connect(process.env.MONGO_URI!);
    const db: Db = client.db(dbName);
    const collection: Collection<any> = db.collection(collectionName);


    // Return a list containing all three collections and the client
    return [collection, client];
}