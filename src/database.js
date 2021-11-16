import mongoose from 'mongoose';
import config from './config.js';

(async () => {
    try {
        const mongooseoptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // user: config.MONGO_USER,
            // pass: config.MONGO_PASSWORD
        }
        const db = await mongoose.connect(config.MONGO_URI, mongooseoptions);
        console.log('database is connected to:', db.connection.name);
    } catch (error) {
        console.error(error)
    }
})()
