import { getDataFromToken } from '@/helpers/getDataFromToken'
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/userModel.js"
import { connect } from "@/dbconfig/dbConfig"
import mongoose from 'mongoose'



// Establish database connection
mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('Database connected');
}).catch(error => {
    console.error('Error connecting to database:', error.message);
});

// Define your GET handler
export async function GET(req: NextRequest) {
    try {
        // Get user ID from token
        const userId = await getDataFromToken(req);

        // Find user by ID
        const user = await User.findById(userId).select('-password');

        // Return user data
        return NextResponse.json({
            message: 'User Found',
            data: user
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    } finally {

    }
}

// Disconnect from database when the process exits
process.on('exit', async () => {
    await mongoose.disconnect();
    console.log('Database connection closed');
});
