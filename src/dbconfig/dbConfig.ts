import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('mongodb connection established')
        })
        connection.on('error', (err) => {
            console.log('mongodb connection error' + err)
            process.exit();
        })
    }

    catch (err) {
        console.log("something went wrong");
        console.log(err);
    }
}