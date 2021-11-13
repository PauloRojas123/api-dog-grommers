import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    versionKey: false,
}
);

export default model('Service', serviceSchema)
