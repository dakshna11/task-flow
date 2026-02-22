import mongoose from 'mongoose';

const MONGODB_URL: string = process.env.MONGODB_URL!;
console.log('MONGODB_URL:', MONGODB_URL);

if(!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn;
    }

    if((!cached.promise)) {
        cached.promise = mongoose.connect(MONGODB_URL);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}