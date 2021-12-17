import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const { ObjectId } = mongoose.Schema.Types


const commentSchema = new Schema({
    dogGrommer: {
        type:ObjectId,
        ref: 'Dog'
    },
    rate: {
        type: Number,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        //required: true,
    },
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)
