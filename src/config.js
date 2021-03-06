import dotenv from 'dotenv'
dotenv.config();


export default {
    // MONGO_DATEBASE: process.env.MONGO_DATEBASE || 'usersdb',
    // MONGO_USER: process.env.MONGO_USER || 'admin',
    // MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    // MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3001,
    //Token keyword
    SECRET: 'user-api'
}

