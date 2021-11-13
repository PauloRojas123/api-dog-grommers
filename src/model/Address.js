import mongoose from 'mongoose'
const { Schema, model } = mongoose


const addressSchema = new Schema({
    street: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        require: true,
    },
    postalCode: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    }
});

export default model('Address', addressSchema)

