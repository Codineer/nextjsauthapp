import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from '@/dbconfig/dbConfig'
import User from "@/models/userModel.js"

// Establish connection to the database
connect();

export const verifyToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ",";

        // Verify JWT token
        let decodedToken: any;
        try {
            decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET!);
        } catch (e) {
            return false; // Token verification failed
        }

        // Find user based on decoded token
        const user = await User.findOne({ _id: decodedToken._id });

        // Check if user exists
        if (user) {
            return true; // Token is valid, user exists
        } else {
            return false; // Token is valid, but user not found
        }
    } catch (error: any) {
        return false;
    }
};
