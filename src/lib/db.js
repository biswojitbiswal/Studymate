import mongoose from 'mongoose';

const connection = {};

export async function connectDB() {
    if(connection.isConnected){
        console.log('Already connected to the database');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, {});
        // console.log(db);

        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to the database');
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

